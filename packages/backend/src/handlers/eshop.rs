use database::repositories::author_repository::AuthorRepo;
use database::repositories::book_repository::BookRepo;
use database::repositories::chapter_repository::ChapterRepo;
use database::Library;
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

        // TODO: Clean unwraps
        let book = match self.library.books.get_book_by_id(id.clone()).await {
            Ok(b) => b,
            Err(_) => return Err(Status::not_found("Book not found.")),
        };

        let chapters: Vec<_> = self
            .library
            .chapters
            .get_chapters_of_book(id.clone())
            .await
            .unwrap()
            .iter()
            .map(convert_chapter)
            .collect();
        let authors: Vec<_> = self
            .library
            .authors
            .get_book_authors(id.clone())
            .await
            .unwrap()
            .iter()
            .map(convert_author)
            .collect();

        Ok(Response::new(Book {
            id,
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
        }))
    }

    async fn get_author_by_id(
        &self,
        request: Request<GetAuthorByIdRequest>,
    ) -> Result<Response<Author>, Status> {
        Ok(Response::new(convert_author(
            &self
                .library
                .authors
                .get_author(request.into_inner().id)
                .await
                .unwrap(),
        )))
    }

    async fn get_user_by_id(
        &self,
        _: Request<GetUserByIdRequest>,
    ) -> Result<Response<User>, Status> {
        Ok(Response::new(User {
            id: String::from("mock id"),
            name: String::from("this mock user"),
            studio_access: true,
        }))
    }

    async fn get_books(&self, _: Request<GetBooksRequest>) -> Result<Response<Books>, Status> {
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

fn convert_chapter(chapter: &database::models::Chapter) -> Chapter {
    Chapter {
        id: chapter.id.clone(),
        chapter_name: chapter.name.clone(),
        start: chapter.start as u32,
    }
}

fn convert_author(author: &database::models::Author) -> Author {
    Author {
        id: author.id.clone(),
        name: author.name.clone(),
    }
}
