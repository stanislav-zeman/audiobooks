use std::env;
use std::sync::Arc;
use sqlx::{MySql, MySqlPool, Pool};
use crate::repositories::author_repository::AuthorRepository;
use crate::repositories::book_repository::BookRepository;
use crate::repositories::chapter_repository::ChapterRepository;
use crate::repositories::tag_repository::TagRepository;
use crate::repositories::user_repository::UserRepository;

pub mod repositories;
pub mod models;

pub struct Library {
    pub users: UserRepository,
    pub authors: AuthorRepository,
    pub books: BookRepository,
    pub tags: TagRepository,
    pub chapters: ChapterRepository,
}

impl Library {
    pub async fn new() -> Self {
        let pool = Arc::new(setup_pool().await.expect("Failed initializing connection"));
        Self {
            users: UserRepository::new(pool.clone()),
            authors: AuthorRepository::new(pool.clone()),
            books: BookRepository::new(pool.clone()),
            tags: TagRepository::new(pool.clone()),
            chapters: ChapterRepository::new(pool.clone()),
        }
    }
}

async fn setup_pool() -> anyhow::Result<Pool<MySql>> {
    dotenvy::dotenv().ok();
    let url = env::var("DATABASE_URL").expect("DATABASE_URL not found");
    let pool = MySqlPool::connect(&url).await?;

    Ok(pool)
}