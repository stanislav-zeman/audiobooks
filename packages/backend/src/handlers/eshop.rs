use database::models;
use database::repositories::{
    author_repository::AuthorRepo, book_repository::BookRepo, chapter_repository::ChapterRepo,
    user_repository::UserRepo,
};
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

        let book = match self.library.books.get_book_by_id(id.clone()).await {
            Ok(b) => b,
            Err(_) => return Err(Status::not_found("Book not found.")),
        };

        Ok(Response::new(get_book(&self.library, &book).await?))
    }

    async fn get_author_by_id(
        &self,
        request: Request<GetAuthorByIdRequest>,
    ) -> Result<Response<Author>, Status> {
        Ok(Response::new(Author::from(&match self
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

        Ok(Response::new(User::from(&user)))
    }

    async fn get_books(
        &self,
        request: Request<GetBooksRequest>,
    ) -> Result<Response<Books>, Status> {
        let inner = request.into_inner();
        let filters = inner.filters.unwrap();
        let pagination = inner.pagination.unwrap();

        let books = self
            .library
            .books
            .get_filtered_books(
                models::BookFilter::from(&filters),
                models::Pagination::from(&pagination),
            )
            .await
            .unwrap();

        let books = map_books(&self.library, books).await?;

        Ok(Response::new(Books {
            total: books.len() as u32,
            books,
        }))
    }

    async fn get_authors(
        &self,
        request: Request<GetAuthorsRequest>,
    ) -> Result<Response<Authors>, Status> {
        let inner = request.into_inner();
        let author_name = inner.filters.unwrap().name;
        let pagination = inner.pagination.unwrap();

        let authors = self
            .library
            .authors
            .get_authors_by_name(
                author_name.unwrap_or_default(),
                models::Pagination::from(&pagination),
            )
            .await
            .unwrap()
            .iter()
            .map(Author::from)
            .collect();

        Ok(Response::new(Authors { total: 0, authors }))
    }

    async fn get_my_books(
        &self,
        request: Request<GetMyBooksRequest>,
    ) -> Result<Response<Books>, Status> {
        let pagination = request.into_inner().pagination.unwrap();

        let books = self
            .library
            .books
            .get_user_books(
                "".to_string(), // TODO: Add when we have identities
                models::Pagination::from(&pagination),
            )
            .await
            .unwrap();

        let books = map_books(&self.library, books).await?;

        Ok(Response::new(Books {
            total: books.len() as u32,
            books,
        }))
    }
}

async fn get_book(library: &Library, book: &models::Book) -> Result<Book, Status> {
    let chapters: Vec<Chapter> = match library.chapters.get_chapters_of_book(book.id.clone()).await
    {
        Ok(chapters) => chapters.iter().map(Chapter::from).collect(),
        Err(_) => return Err(Status::internal("Failed getting chapters.")),
    };

    let authors: Vec<_> = match library.authors.get_book_authors(book.id.clone()).await {
        Ok(authors) => authors.iter().map(Author::from).collect(),
        Err(_) => return Err(Status::internal("Failed getting authors.")),
    };

    Ok(Book {
        id: book.id.clone(),
        is_owned: false, // TODO: Change when we have identities
        chapters,
        authors,
        length: book.length as u64,
        name: book.name.clone(),
        description: book.description.clone(),
        file_url: book.file_url.clone(),
        cover_url: book.cover_url.clone(),
        price: book.price as u64,
        isbn: book.isbn.clone(),
    })
}

async fn map_books(library: &Library, books: Vec<models::Book>) -> Result<Vec<Book>, Status> {
    let mut result = Vec::new();

    for book in books {
        let book = get_book(library, &book).await?;
        result.push(book);
    }

    Ok(result)
}
