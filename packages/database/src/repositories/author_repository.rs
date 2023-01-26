use crate::models::Author;
use async_trait::async_trait;
use sqlx::MySqlPool;
use std::sync::Arc;

#[async_trait]
pub trait AuthorRepo {
    async fn get_author(&self, id: String) -> anyhow::Result<Author>;
    async fn get_authors_by_name(&self, id: String) -> anyhow::Result<Vec<Author>>;
    async fn get_book_authors(&self, id: String) -> anyhow::Result<Vec<Author>>;
    async fn add_author(&self, author: Author) -> anyhow::Result<()>;
    async fn edit_author(&self, author: Author) -> anyhow::Result<()>;
    async fn delete_author(&self, author: Author) -> anyhow::Result<()>;
}

pub struct AuthorRepository {
    mysql_pool: Arc<MySqlPool>,
}

impl AuthorRepository {
    pub fn new(mysql_pool: Arc<MySqlPool>) -> Self {
        Self { mysql_pool }
    }
}

#[async_trait]
impl AuthorRepo for AuthorRepository {
    async fn get_author(&self, id: String) -> anyhow::Result<Author> {
        let author = sqlx::query_as!(Author, "SELECT * FROM author WHERE id = ?", id)
            .fetch_one(&*self.mysql_pool)
            .await?;

        Ok(author)
    }

    async fn get_authors_by_name(&self, name: String) -> anyhow::Result<Vec<Author>> {
        let author = sqlx::query_as!(Author, "SELECT * FROM author WHERE name LIKE ?", name)
            .fetch_all(&*self.mysql_pool)
            .await?;

        Ok(author)
    }

    async fn get_book_authors(&self, book_id: String) -> anyhow::Result<Vec<Author>> {
        let authors = sqlx::query_as!(Author, "SELECT author.id, author.name, author.created_at
            FROM author
            INNER JOIN author_book
            ON author.id = author_book.author_id
            WHERE book_id = ?", book_id)
            .fetch_all(&*self.mysql_pool)
            .await?;

        Ok(authors)
    }

    async fn add_author(&self, author: Author) -> anyhow::Result<()> {
        sqlx::query!(
            "INSERT INTO author (id, name) VALUES(?, ?)",
            author.id,
            author.name
        )
        .execute(&*self.mysql_pool)
        .await?;

        Ok(())
    }

    async fn edit_author(&self, author: Author) -> anyhow::Result<()> {
        sqlx::query!(
            "UPDATE author SET name = ?
            WHERE id = ?",
            author.name,
            author.id
        )
        .execute(&*self.mysql_pool)
        .await?;

        Ok(())
    }

    async fn delete_author(&self, author: Author) -> anyhow::Result<()> {
        sqlx::query!("DELETE FROM author_book WHERE author_id = ?", author.id)
            .execute(&*self.mysql_pool)
            .await?;

        sqlx::query!("DELETE FROM author WHERE id = (?)", author.id,)
            .execute(&*self.mysql_pool)
            .await?;

        Ok(())
    }
}
