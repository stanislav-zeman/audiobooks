use crate::handlers::adapters::{convert_author, convert_chapter, convert_user};
use database::models;
use database::repositories::{
    author_repository::AuthorRepo, book_repository::BookRepo, chapter_repository::ChapterRepo,
    user_repository::UserRepo,
};
use database::Library;
use std::sync::Arc;
use tonic::{Request, Response, Status};

use super::grpc::*;

pub struct EshopHandler {
    library: Library,
}

impl EshopHandler {
    pub async fn new() -> EshopHandler {
        EshopHandler {
            library: Library::new().await,
        }
    }
}

#[tonic::async_trait]
impl eshop_service_server::EshopService for EshopHandler {
    async fn get_book_by_id(
        &self,
        request: Request<GetBookByIdRequest>,
    ) -> Result<Response<Book>, Status> {
        let id = request.into_inner().id;

        let book = match self.library.books.get_book_by_id(id.clone()).await {
            Ok(b) => b,
            Err(_) => return Err(Status::not_found("Book not found.")),
        };

        Ok(Response::new(get_book(&self.library, book).await?))
    }

    async fn get_author_by_id(
        &self,
        request: Request<GetAuthorByIdRequest>,
    ) -> Result<Response<Author>, Status> {
        Ok(Response::new(convert_author(&match self
            .library
            .authors
            .get_author(request.into_inner().id)
            .await
        {
            Ok(author) => author,
            Err(_) => return Err(Status::not_found("Author not found.")),
        })))
    }

    async fn get_user_by_id(
        &self,
        request: Request<GetUserByIdRequest>,
    ) -> Result<Response<User>, Status> {
        let id = request.into_inner().id;
        let user = self.library.users.get_user_by_id(id.clone()).await.unwrap();

        Ok(Response::new(convert_user(&user)))
    }

    async fn get_books(
        &self,
        request: Request<GetBooksRequest>,
    ) -> Result<Response<Books>, Status> {
        let inner = request.into_inner();
        let filters = inner.filters.unwrap();
        let pagination = inner.pagination.unwrap();

        /*let books = self
        .library
        .books
        .get_filtered_books(
            models::BookFilter::from(&filters),
            models::Pagination::from(&pagination),
        )
        .await
        .unwrap()
        .iter()
        .map(|x| -> get_book(&self.library, x));*/

        Ok(Response::new(Books {
            total: 1,
            books: vec![Book {
                id: String::from("prdel"),
                is_owned: false,
                chapters: vec![],
                authors: vec![],
                length: 420_u64,
                name: String::from("epic book name"),
                description: String::from("desc"),
                file_url: String::from("file url"),
                cover_url: String::from("cover url"),
                price: 69_u64,
                isbn: String::from("IIII I  II"),
            }],
        }))
    }

    async fn get_authors(
        &self,
        _: Request<GetAuthorsRequest>,
    ) -> Result<Response<Authors>, Status> {
        Ok(Response::new(Authors {
            total: 1,
            authors: vec![Author {
                id: String::from("mock id"),
                name: String::from("mock name"),
            }],
        }))
    }

    async fn get_my_books(&self, _: Request<GetMyBooksRequest>) -> Result<Response<Books>, Status> {
        Ok(Response::new(Books {
            total: 1,
            books: vec![Book {
                id: String::from("prdel"),
                is_owned: false,
                chapters: vec![],
                authors: vec![],
                length: 420_u64,
                name: String::from("epic book name"),
                description: String::from("desc"),
                file_url: String::from("file url"),
                cover_url: String::from("cover url"),
                price: 69_u64,
                isbn: String::from("IIII I  II"),
            }],
        }))
    }
}

async fn get_book(library: &Library, book: models::Book) -> Result<Book, Status> {
    let chapters: Vec<Chapter> = match library.chapters.get_chapters_of_book(book.id.clone()).await
    {
        Ok(chapters) => chapters.iter().map(convert_chapter).collect(),
        Err(_) => return Err(Status::internal("Failed getting chapters.")),
    };

    let authors: Vec<_> = match library.authors.get_book_authors(book.id.clone()).await {
        Ok(authors) => authors.iter().map(convert_author).collect(),
        Err(_) => return Err(Status::internal("Failed getting authors.")),
    };

    Ok(Book {
        id: book.id,
        is_owned: false,
        chapters,
        authors,
        length: book.length as u64,
        name: book.name,
        description: book.description,
        file_url: book.file_url,
        cover_url: book.cover_url,
        price: book.price as u64,
        isbn: book.isbn,
    })
}
