use crate::handlers::grpc::{Author, BookFilters, Chapter, Pagination, User};

// TODO: Convert to From traits
pub fn convert_chapter(chapter: &database::models::Chapter) -> Chapter {
    Chapter {
        id: chapter.id.clone(),
        chapter_name: chapter.name.clone(),
        start: chapter.start as u32,
    }
}

pub fn convert_author(author: &database::models::Author) -> Author {
    Author {
        id: author.id.clone(),
        name: author.name.clone(),
    }
}

pub fn convert_user(user: &database::models::User) -> User {
    User {
        id: user.id.clone(),
        name: user.id.clone(),
        studio_access: user.studio_access != 0,
    }
}

impl From<&database::models::BookFilter> for BookFilters {
    fn from(filters: &database::models::BookFilter) -> Self {
        BookFilters {
            name: filters.book_name.clone(),
            author_name: filters.author_name.clone(),
            price_from: filters.price_from,
            price_to: filters.price_to,
            tag: filters.tag.clone(),
        }
    }
}

impl From<&BookFilters> for database::models::BookFilter {
    fn from(value: &BookFilters) -> Self {
        database::models::BookFilter {
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
        Pagination {
            limit: value.limit,
            offset: value.offset,
        }
    }
}

impl From<&Pagination> for database::models::Pagination {
    fn from(value: &Pagination) -> Self {
        database::models::Pagination {
            limit: value.limit,
            offset: value.offset,
        }
    }
}
