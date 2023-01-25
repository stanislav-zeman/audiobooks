use crate::models::Author;
use async_trait::async_trait;
use sqlx::MySqlPool;
use std::sync::Arc;

#[async_trait]
pub trait AuthorRepo {
    async fn get_author(&self, id: i32) -> anyhow::Result<Author>;
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
    async fn get_author(&self, id: i32) -> anyhow::Result<Author> {
        let author = sqlx::query_as!(
            Author,
            "SELECT * FROM author WHERE id = ?",
            author.id,
        )
            .fetch_one(&*self.mysql_pool)
            .await?;

        Ok(author)
    }

    async fn add_author(&self, author: Author) -> anyhow::Result<()> {
        sqlx::query!(
            "INSERT INTO author (id, name)
             VALUES (?, ?)",
            author.id,
            author.name
        )
        .execute(&*self.mysql_pool)
        .await?;

        Ok(())
    }

    async fn edit_author(&self, author: Author) -> anyhow::Result<()> {
        sqlx::query!(
            "UPDATE author SET (name)
             VALUES (?) WHERE id = (?)",
            author.name,
            author.id
        )
            .execute(&*self.mysql_pool)
            .await?;

        Ok(())
    }

    async fn delete_author(&self, author: Author) -> anyhow::Result<()> {
        sqlx::query!(
            "DELETE FROM author_book WHERE author_id = (?)",
            author.id,
        )
            .execute(&*self.mysql_pool)
            .await?;

        sqlx::query!(
            "DELETE FROM author WHERE id = (?)",
            author.id,
        )
            .execute(&*self.mysql_pool)
            .await?;

        Ok(())
    }
}
