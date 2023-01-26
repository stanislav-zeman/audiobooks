use crate::handlers::grpc::{Author, Chapter};
use grpc_backend::handlers::grpc::{Author, Chapter};

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
