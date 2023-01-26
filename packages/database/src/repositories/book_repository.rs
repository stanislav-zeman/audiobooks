use crate::models::{Author, Book, BookFilter};
use async_trait::async_trait;
use sqlx::MySqlPool;
use std::sync::Arc;

#[async_trait]
pub trait BookRepo {
    async fn get_book_by_id(&self, id: String) -> anyhow::Result<Book>;
    async fn get_filtered_books(&self, filter: BookFilter) -> anyhow::Result<Vec<Book>>;
    async fn add_book(&self, book: Book) -> anyhow::Result<()>;
    async fn add_author_to_book(&self, book: Book, author: Author) -> anyhow::Result<()>;
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
    async fn get_book_by_id(&self, id: String) -> anyhow::Result<Book> {
        let book = sqlx::query_as!(Book, "SELECT * FROM book WHERE id = ?", id,)
            .fetch_one(&*self.mysql_pool)
            .await?;

        Ok(book)
    }

    async fn get_filtered_books(&self, filter: BookFilter) -> anyhow::Result<Vec<Book>> {
        let books = sqlx::query_as!(Book, 
            "SELECT bk.id, bk.name, bk.description, bk.published_at, bk.length,
               bk.file_url, bk.cover_url, bk.price, bk.isbn, bk.created_at
               FROM author at
               INNER JOIN author_book ab on at.id = ab.author_id
               INNER JOIN book bk on ab.book_id = bk.id
               INNER JOIN book_tag bt on bk.id = bt.book_id
               WHERE at.name LIKE ?
               AND bk.name LIKE ?
               AND price BETWEEN ? AND ?
               AND bt.tag LIKE ?",
            filter.author_name.unwrap_or("%".to_string()),
            filter.book_name.unwrap_or("%".to_string()),
            filter.price_from.unwrap_or(u64::MIN),
            filter.price_to.unwrap_or(u64::MAX),
            filter.tag.unwrap_or("%".to_string())
            )
            .fetch_all(&*self.mysql_pool)
            .await?;
        
        Ok(books)
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

    async fn add_author_to_book(&self, book: Book, author: Author) -> anyhow::Result<()> {
        sqlx::query!(
            "INSERT INTO author_book (author_id, book_id)
             VALUES (?, ?)",
            author.id,
            book.id,
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
