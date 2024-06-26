use crate::handlers::grpc::{Book, BookFilters, Pagination, User};
use database::models;

impl From<&models::User> for User {
    fn from(value: &models::User) -> Self {
        Self {
            id: value.id.clone(),
            name: value.id.clone(),
        }
    }
}

impl From<&models::BookFilter> for BookFilters {
    fn from(value: &models::BookFilter) -> Self {
        Self {
            name: value.book_name.clone(),
            author_name: value.author_name.clone(),
            price_from: value.price_from,
            price_to: value.price_to,
            tag: value.tag.clone(),
        }
    }
}

impl From<&BookFilters> for models::BookFilter {
    fn from(value: &BookFilters) -> Self {
        Self {
            book_name: value.name.clone(),
            author_name: value.author_name.clone(),
            price_from: value.price_from,
            price_to: value.price_to,
            tag: value.tag.clone(),
        }
    }
}

impl From<&models::Pagination> for Pagination {
    fn from(value: &models::Pagination) -> Self {
        Self {
            limit: value.limit,
            offset: value.offset,
        }
    }
}

impl From<&Pagination> for models::Pagination {
    fn from(value: &Pagination) -> Self {
        Self {
            limit: value.limit,
            offset: value.offset,
        }
    }
}

impl From<&Book> for models::Book {
    fn from(value: &Book) -> Self {
        Self {
            id: value.id.clone(),
            name: value.name.clone(),
            description: value.description.clone(),
            tag: value.tag.clone(),
            cover_url: value.cover_url.clone(),
            price: value.price as i32,
            isbn: value.isbn.clone(),
            author: value.authors.clone(),
            created_at: None,
        }
    }
}
