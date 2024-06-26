use crate::handlers::helpers::jwt::validate;
use database::models;
use database::repositories::{book_repository::BookRepo, user_repository::UserRepo};
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
        let user_id = match validate(request.metadata()).await {
            Ok(claims) => Some(claims.sub),
            Err(_) => None,
        };

        let id = request.into_inner().id;
        let Ok(book) = self.library.books.get_book_by_id(id.clone()).await else {
            return Err(Status::not_found("Book not found!"))
        };

        Ok(Response::new(
            get_book(&self.library, &book, user_id).await?,
        ))
    }

    async fn get_user_by_id(
        &self,
        request: Request<GetUserByIdRequest>,
    ) -> Result<Response<User>, Status> {
        let id = request.into_inner().id;
        let Ok(user) = self.library.users.get_user_by_id(id.clone()).await else {
            return Err(Status::not_found("User not found!"))
        };

        Ok(Response::new(User::from(&user)))
    }

    async fn get_books(
        &self,
        request: Request<GetBooksRequest>,
    ) -> Result<Response<Books>, Status> {
        let user_id = match validate(request.metadata()).await {
            Ok(claims) => Some(claims.sub),
            Err(_) => None,
        };

        let inner = request.into_inner();

        let filters = match inner.filters {
            None => models::BookFilter {
                book_name: None,
                author_name: None,
                price_from: None,
                price_to: None,
                tag: None,
            },
            Some(filters) => models::BookFilter::from(&filters),
        };

        let pagination = match inner.pagination {
            None => models::Pagination {
                limit: i32::MAX as u32,
                offset: 0,
            },
            Some(pagination) => models::Pagination::from(&pagination),
        };

        let Ok(books) = self.library.books
            .get_filtered_books(
                filters,
                pagination,
            ).await else {
            return Err(Status::internal("Failed filtering books!"))
        };

        let Ok(books) = map_books(&self.library, books, user_id).await else {
            return Err(Status::internal("Failed mapping books!"))
        };

        Ok(Response::new(Books {
            total: books.len() as u32,
            books,
        }))
    }

    async fn get_my_books(
        &self,
        request: Request<GetMyBooksRequest>,
    ) -> Result<Response<Books>, Status> {
        let user_id = match validate(request.metadata()).await {
            Ok(claims) => claims.sub,
            Err(_) => return Err(Status::unauthenticated("User not authenticated.")),
        };

        let inner = request.into_inner();

        let pagination = match inner.pagination {
            None => models::Pagination {
                limit: i32::MAX as u32,
                offset: 0,
            },
            Some(pagination) => models::Pagination::from(&pagination),
        };

        let Ok(books) = self
            .library
            .books
            .get_user_books(
                user_id.clone(),
                pagination,
            )
            .await else {
            return Err(Status::internal("Failed getting user books."))
        };

        let Ok(books) = map_books(&self.library, books, Some(user_id)).await else {
            return Err(Status::internal("Failed mapping books."))
        };

        Ok(Response::new(Books {
            total: books.len() as u32,
            books,
        }))
    }

    async fn get_published_books(
        &self,
        request: Request<GetMyBooksRequest>,
    ) -> Result<Response<Books>, Status> {
        let Ok(claims) = validate(request.metadata()).await else {
            return Err(Status::unauthenticated("User not authenticated."));
        };

        if !claims.app_permissions.contains(&"author".into()) {
            return Err(Status::unauthenticated("User not authenticated."));
        }

        let inner = request.into_inner();

        let pagination = match inner.pagination {
            None => models::Pagination {
                limit: i32::MAX as u32,
                offset: 0,
            },
            Some(pagination) => models::Pagination::from(&pagination),
        };

        let Ok(books) = self
            .library
            .books
            .get_published_books(
                claims.sub.clone(),
                pagination,
            )
            .await else {
            return Err(Status::internal("Failed getting user books."))
        };

        let Ok(books) = map_books(&self.library, books, Some(claims.sub)).await else {
            return Err(Status::internal("Failed mapping books."))
        };

        Ok(Response::new(Books {
            total: books.len() as u32,
            books,
        }))
    }

    async fn get_tags(&self, _: Request<Void>) -> Result<Response<Tags>, Status> {
        let Ok(tags) = self.library.books.get_tags().await else {
            return Err(Status::internal("Failed getting tags."));
        };

        Ok(Response::new(Tags { tags }))
    }

    async fn add_book(&self, request: Request<Book>) -> Result<Response<Void>, Status> {
        let Ok(claims) = validate(request.metadata()).await else {
            return Err(Status::unauthenticated("User not authenticated."));
        };

        if !claims.app_permissions.contains(&"author".into()) {
            return Err(Status::unauthenticated("Permission denied."));
        }

        let new_book = request.into_inner();
        let book = models::Book::from(&new_book);

        if self.library.add_book(book, claims.sub).await.is_err() {
            return Err(Status::not_found("Book not found"));
        };

        Ok(Response::new(Void::default()))
    }

    async fn update_book(&self, request: Request<Book>) -> Result<Response<Void>, Status> {
        let Ok(claims) = validate(request.metadata()).await else {
            return Err(Status::unauthenticated("User not authenticated."));
        };

        if !claims.app_permissions.contains(&"author".into()) {
            return Err(Status::permission_denied("Permission denied."));
        }

        let updated_book = request.into_inner();
        let book = models::Book::from(&updated_book);

        if self.library.edit_book(book, claims.sub).await.is_err() {
            return Err(Status::not_found("Book not found"));
        };

        Ok(Response::new(Void::default()))
    }

    async fn buy_book(&self, request: Request<BuyBookRequest>) -> Result<Response<Void>, Status> {
        let user_id = match validate(request.metadata()).await {
            Ok(claims) => claims.sub,
            Err(_) => return Err(Status::unauthenticated("User not authenticated.")),
        };

        match self
            .library
            .users
            .add_book_to_user(user_id, request.into_inner().book_id)
            .await
        {
            Ok(_) => Ok(Response::new(Void::default())),
            Err(_) => Err(Status::internal("Failed buying book.")),
        }
    }
}

async fn map_books(
    library: &Library,
    books: Vec<models::Book>,
    user_id: Option<String>,
) -> Result<Vec<Book>, Status> {
    let mut result = Vec::new();

    for book in books {
        let book = get_book(library, &book, user_id.clone()).await?;
        result.push(book);
    }

    Ok(result)
}

async fn get_book(
    library: &Library,
    book: &models::Book,
    user_id: Option<String>,
) -> Result<Book, Status> {
    let mut book = Book {
        id: book.id.clone(),
        is_owned: false,
        authors: book.author.clone(),
        name: book.name.clone(),
        description: book.description.clone(),
        cover_url: book.cover_url.clone(),
        price: book.price as u64,
        isbn: book.isbn.clone(),
        tag: book.tag.clone(),
    };

    if let Some(user_id) = user_id {
        book.is_owned = match library.users.user_owns_book(user_id, book.id.clone()).await {
            Ok(b) => b,
            Err(_) => return Err(Status::internal("Failed checking ownership.")),
        };
    }

    Ok(book)
}
