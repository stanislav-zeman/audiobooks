use crate::models::{Author, Book};
use crate::repositories::author_repository::{AuthorRepo, AuthorRepository};
use crate::repositories::book_repository::{BookRepo, BookRepository};
use crate::repositories::user_repository::{UserRepo, UserRepository};
use anyhow::bail;
use sqlx::{MySql, MySqlPool, Pool};
use std::env;
use std::sync::Arc;

pub mod models;
pub mod repositories;

pub struct Library {
    pub users: UserRepository,
    pub authors: AuthorRepository,
    pub books: BookRepository,
    pool: Arc<Pool<MySql>>,
}

impl Library {
    pub async fn new() -> Self {
        let pool = Arc::new(setup_pool().await.expect("Failed initializing connection"));
        Self {
            users: UserRepository::new(pool.clone()),
            authors: AuthorRepository::new(pool.clone()),
            books: BookRepository::new(pool.clone()),
            pool,
        }
    }

    pub async fn edit_book(
        &self,
        book: Book,
        authors: Vec<Author>,
        user_id: String,
    ) -> anyhow::Result<()> {
        if !self
            .users
            .user_uploaded_book(user_id, book.id.clone())
            .await?
        {
            bail!("User didn't upload the book.");
        }

        let mut transaction = self.pool.begin().await?;

        self.authors
            .delete_authors_from_book(book.id.clone(), &mut transaction)
            .await?;
        self.books.edit_book(book.clone(), &mut transaction).await?;

        for author in authors {
            self.authors
                .add_author_to_book(book.id.clone(), author, &mut transaction)
                .await?;
        }

        transaction.commit().await?;

        Ok(())
    }

    pub async fn add_book(
        &self,
        book: Book,
        authors: Vec<Author>,
        user_id: String,
    ) -> anyhow::Result<()> {
        let mut transaction = self.pool.begin().await?;

        self.books.add_book(book.clone(), &mut transaction).await?;
        self.users
            .assign_upload_user(user_id, book.id.clone(), &mut transaction)
            .await?;

        for author in authors {
            self.authors
                .add_author_to_book(book.id.clone(), author, &mut transaction)
                .await?;
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
