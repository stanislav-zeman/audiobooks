use crate::handlers::grpc::{Author, Book, BookFilters, Chapter, Pagination, User};
use database::models;

// TODO: Convert to From traits
impl From<&models::Chapter> for Chapter {
    fn from(value: &models::Chapter) -> Self {
        Self {
            id: value.id.clone(),
            chapter_name: value.name.clone(),
            start: value.start as u32,
        }
    }
}

impl From<&models::Author> for Author {
    fn from(value: &models::Author) -> Self {
        Self {
            id: value.id.clone(),
            name: value.name.clone(),
        }
    }
}

impl From<&Author> for models::Author {
    fn from(value: &Author) -> Self {
        Self {
            id: value.id.clone(),
            name: value.name.clone(),
            created_at: None,
        }
    }
}

impl From<&models::User> for User {
    fn from(value: &models::User) -> Self {
        Self {
            id: value.id.clone(),
            name: value.id.clone(),
            studio_access: value.studio_access != 0,
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
            length: value.length as i32,
            file_url: value.file_url.clone(),
            cover_url: value.cover_url.clone(),
            price: value.price as i32,
            isbn: value.isbn.clone(),
            created_at: None,
        }
    }
}
