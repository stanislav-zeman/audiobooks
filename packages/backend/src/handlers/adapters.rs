use crate::handlers::grpc::{Author, Chapter, User};

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
