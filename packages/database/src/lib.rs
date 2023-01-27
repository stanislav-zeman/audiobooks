use crate::repositories::author_repository::{AuthorRepo, AuthorRepository};
use crate::repositories::book_repository::{BookRepo, BookRepository};
use crate::repositories::chapter_repository::{ChapterRepo, ChapterRepository};
use crate::repositories::user_repository::UserRepository;
use sqlx::{MySql, MySqlPool, Pool};
use std::env;
use std::sync::Arc;
use crate::models::{Author, Book, Chapter};

pub mod models;
pub mod repositories;

pub struct Library {
    pub users: UserRepository,
    pub authors: AuthorRepository,
    pub books: BookRepository,
    pub chapters: ChapterRepository,
    pool: Arc<Pool<MySql>>
}

impl Library {
    pub async fn new() -> Self {
        let pool = Arc::new(setup_pool().await.expect("Failed initializing connection"));
        Self {
            users: UserRepository::new(pool.clone()),
            authors: AuthorRepository::new(pool.clone()),
            books: BookRepository::new(pool.clone()),
            chapters: ChapterRepository::new(pool.clone()),
            pool
        }
    }

    pub async fn edit_book(&self, book: Book, chapters: Vec<Chapter>, authors: Vec<Author>) -> anyhow::Result<()> {
        let mut transaction = self.pool.begin().await?;

        self.chapters.delete_chapters_from_book(book.id.clone(), &mut transaction).await?;
        self.authors.delete_authors_from_book(book.id.clone(), &mut transaction).await?;
        self.books.edit_book(book.clone(), &mut transaction).await?;

        for chapter in chapters {
            self.chapters.add_chapter_to_book(chapter, &mut  transaction).await?;
        }

        for author in authors {
            self.authors.add_author_to_book(book.id.clone(), author, &mut transaction).await?;
        }

        transaction.commit().await?;

        Ok(())
    }
}

async fn setup_pool() -> anyhow::Result<Pool<MySql>> {
    dotenvy::dotenv().ok();
    let url = env::var("DATABASE_URL").expect("DATABASE_URL not found");
    let pool = MySqlPool::connect(&url).await?;

    Ok(pool)
}
