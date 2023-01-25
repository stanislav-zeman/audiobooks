use crate::models::Book;
use async_trait::async_trait;
use sqlx::MySqlPool;
use std::sync::Arc;

#[async_trait]
pub trait BookRepo {
    async fn get_book_by_id(&self, id: i32) -> anyhow::Result<Book>;
    async fn add_book(&self, book: Book) -> anyhow::Result<()>;
    async fn edit_book(&self, book: Book) -> anyhow::Result<()>;
    async fn delete_book(&self, book: Book) -> anyhow::Result<()>;
}

pub struct BookRepository {
    mysql_pool: Arc<MySqlPool>,
}

impl BookRepository {
    pub fn new(mysql_pool: Arc<MySqlPool>) -> Self {
        Self { mysql_pool }
    }
}

#[async_trait]
impl BookRepo for BookRepository {
    async fn get_book_by_id(&self, id: i32) -> anyhow::Result<Book> {
        let book = sqlx::query_as!(Book, "SELECT * FROM book WHERE id = ?", id,)
            .fetch_one(&*self.mysql_pool)
            .await?;

        Ok(book)
    }

    async fn add_book(&self, book: Book) -> anyhow::Result<()> {
        sqlx::query!(
            "INSERT INTO book (id, name, description, published_at, length, file_url, cover_url, price, isbn)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            book.id,
            book.name,
            book.description,
            book.published_at,
            book.length,
            book.file_url,
            book.cover_url,
            book.price,
            book.isbn
        )
            .execute(&*self.mysql_pool)
            .await?;

        Ok(())
    }

    async fn edit_book(&self, book: Book) -> anyhow::Result<()> {
        sqlx::query!(
            "UPDATE book SET name = ?, description = ?, published_at = ?, length = ?, file_url = ?, cover_url = ?, price = ?, isbn = ?
             WHERE id = ?",
            book.name,
            book.description,
            book.published_at,
            book.length,
            book.file_url,
            book.cover_url,
            book.price,
            book.isbn,
            book.id,
        )
            .execute(&*self.mysql_pool)
            .await?;

        Ok(())
    }

    async fn delete_book(&self, book: Book) -> anyhow::Result<()> {
        sqlx::query!("DELETE FROM author_book WHERE book_id = ?", book.id)
            .execute(&*self.mysql_pool)
            .await?;

        sqlx::query!("DELETE FROM book WHERE id = ?", book.id)
            .execute(&*self.mysql_pool)
            .await?;

        Ok(())
    }
}
