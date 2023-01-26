use crate::handlers::grpc::{Author, BookFilters, Chapter, Pagination, User};

// TODO: Convert to From traits
impl From<&database::models::Chapter> for Chapter {
    fn from(value: &database::models::Chapter) -> Self {
        Self {
            id: value.id.clone(),
            chapter_name: value.name.clone(),
            start: value.start as u32,
        }
    }
}

impl From<&database::models::Author> for Author {
    fn from(value: &database::models::Author) -> Self {
        Self {
            id: value.id.clone(),
            name: value.name.clone(),
        }
    }
}

impl From<&database::models::User> for User {
    fn from(value: &database::models::User) -> Self {
        Self {
            id: value.id.clone(),
            name: value.id.clone(),
            studio_access: value.studio_access != 0,
        }
    }
}

impl From<&database::models::BookFilter> for BookFilters {
    fn from(value: &database::models::BookFilter) -> Self {
        Self {
            name: value.book_name.clone(),
            author_name: value.author_name.clone(),
            price_from: value.price_from,
            price_to: value.price_to,
            tag: value.tag.clone(),
        }
    }
}

impl From<&BookFilters> for database::models::BookFilter {
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

impl From<&database::models::Pagination> for Pagination {
    fn from(value: &database::models::Pagination) -> Self {
        Self {
            limit: value.limit,
            offset: value.offset,
        }
    }
}

impl From<&Pagination> for database::models::Pagination {
    fn from(value: &Pagination) -> Self {
        Self {
            limit: value.limit,
            offset: value.offset,
        }
    }
}
