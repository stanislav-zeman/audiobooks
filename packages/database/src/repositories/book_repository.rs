use crate::models::{Book, BookFilter, Pagination};
use async_trait::async_trait;
use sqlx::{MySql, MySqlPool, Transaction};
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
    async fn get_published_books(
        &self,
        user_id: String,
        pagination: Pagination,
    ) -> anyhow::Result<Vec<Book>>;
    async fn add_book(
        &self,
        book: Book,
        transaction: &mut Transaction<MySql>,
    ) -> anyhow::Result<()>;
    async fn edit_book(&self, book: Book) -> anyhow::Result<()>;
    async fn delete_book(&self, book: Book) -> anyhow::Result<()>;
    async fn get_tags(&self) -> anyhow::Result<Vec<String>>;
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
            "SELECT DISTINCT *
               FROM book
               WHERE (name LIKE ?
               OR author LIKE ?)
               AND tag LIKE ?
               AND price BETWEEN ? AND ?
               ORDER BY created_at DESC
               LIMIT ?, ?",
            book_name,
            author_name,
            tag,
            filter.price_from.unwrap_or(0),
            filter.price_to.unwrap_or(i64::MAX as u64),
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
            "SELECT bk.id, bk.name, bk.description, bk.tag, bk.cover_url, bk.price, bk.isbn, bk.author, bk.created_at
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

    async fn get_published_books(
        &self,
        user_id: String,
        pagination: Pagination,
    ) -> anyhow::Result<Vec<Book>> {
        let books = sqlx::query_as!(
            Book,
            "SELECT bk.id, bk.name, bk.description, bk.tag, bk.cover_url, bk.price, bk.isbn, bk.author, bk.created_at
               FROM book bk
               INNER JOIN upload ub
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

    async fn add_book(
        &self,
        book: Book,
        transaction: &mut Transaction<MySql>,
    ) -> anyhow::Result<()> {
        sqlx::query!(
            "INSERT INTO book (id, name, description, tag, cover_url, price, isbn, author)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            book.id,
            book.name,
            book.description,
            book.tag,
            book.cover_url,
            book.price,
            book.isbn,
            book.author
        )
        .execute(&mut *transaction)
        .await?;

        Ok(())
    }

    async fn edit_book(&self, book: Book) -> anyhow::Result<()> {
        sqlx::query!(
            "UPDATE book SET name = ?, description = ?, tag = ?, cover_url = ?, price = ?, isbn = ?, author = ?
             WHERE id = ?",
            book.name,
            book.description,
            book.tag,
            book.cover_url,
            book.price,
            book.isbn,
            book.author,
            book.id
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

    async fn get_tags(&self) -> anyhow::Result<Vec<String>> {
        Ok(sqlx::query!("SELECT DISTINCT tag FROM book ORDER BY tag ASC")
            .fetch_all(&*self.mysql_pool)
            .await?
            .iter()
            .map(|x| x.tag.clone())
            .collect())
    }
}
