use crate::models::{Author, Book, BookFilter, Pagination};
use async_trait::async_trait;
use sqlx::MySqlPool;
use std::sync::Arc;

#[async_trait]
pub trait BookRepo {
    async fn get_book_by_id(&self, id: String) -> anyhow::Result<Book>;
    async fn get_filtered_books(
        &self,
        filter: BookFilter,
        pagination: Pagination,
    ) -> anyhow::Result<Vec<Book>>;
    async fn get_user_books(
        &self,
        user_id: String,
        pagination: Pagination,
    ) -> anyhow::Result<Vec<Book>>;
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

    async fn get_filtered_books(
        &self,
        filter: BookFilter,
        pagination: Pagination,
    ) -> anyhow::Result<Vec<Book>> {
        let author_name = format!("%{}%", filter.author_name.unwrap_or_default());
        let book_name = format!("%{}%", filter.book_name.unwrap_or_default());
        let tag = format!("%{}%", filter.tag.unwrap_or_default());

        let books = sqlx::query_as!(
            Book,
            "SELECT bk.id, bk.name, bk.description, bk.tag, bk.published_at, bk.length,
               bk.file_url, bk.cover_url, bk.price, bk.isbn, bk.created_at
               FROM author at
               INNER JOIN author_book ab on at.id = ab.author_id
               INNER JOIN book bk on ab.book_id = bk.id
               WHERE at.name LIKE ?
               AND bk.name LIKE ?
               AND bk.tag LIKE ?
               AND price BETWEEN ? AND ?
               ORDER BY bk.created_at DESC
               LIMIT ?, ?",
            author_name,
            book_name,
            tag,
            filter.price_from.unwrap_or(u64::MIN),
            filter.price_to.unwrap_or(u64::MAX),
            pagination.offset,
            pagination.limit
        )
        .fetch_all(&*self.mysql_pool)
        .await?;

        Ok(books)
    }

    async fn get_user_books(
        &self,
        user_id: String,
        pagination: Pagination,
    ) -> anyhow::Result<Vec<Book>> {
        let books = sqlx::query_as!(
            Book,
            "SELECT bk.id, bk.name, bk.description, bk.tag, bk.published_at, bk.length,
               bk.file_url, bk.cover_url, bk.price, bk.isbn, bk.created_at
               FROM book bk
               INNER JOIN user_book ub
               ON ub.book_id = bk.id
               WHERE ub.user_id = ?
               ORDER BY bk.created_at DESC
               LIMIT ?, ?",
            user_id,
            pagination.offset,
            pagination.limit
        )
        .fetch_all(&*self.mysql_pool)
        .await?;

        Ok(books)
    }

    async fn add_book(&self, book: Book) -> anyhow::Result<()> {
        sqlx::query!(
            "INSERT INTO book (id, name, description, tag, published_at, length, file_url, cover_url, price, isbn)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            book.id,
            book.name,
            book.description,
            book.tag,
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
            "UPDATE book SET name = ?, description = ?, tag = ?, published_at = ?, length = ?, file_url = ?, cover_url = ?, price = ?, isbn = ?
             WHERE id = ?",
            book.name,
            book.description,
            book.tag,
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
