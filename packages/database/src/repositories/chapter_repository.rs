use crate::models::Chapter;
use async_trait::async_trait;
use sqlx;
use std::sync::Arc;
use sqlx::{MySql, Transaction};

#[async_trait]
pub trait ChapterRepo {
    async fn get_chapters_of_book(&self, book_id: String) -> anyhow::Result<Vec<Chapter>>;
    async fn add_chapter_to_book(&self, chapter: Chapter, transaction: &mut Transaction<MySql>) -> anyhow::Result<()>;
    async fn delete_chapters_from_book(&self, book_id: String, transaction: &mut Transaction<MySql>) -> anyhow::Result<()>;
}

pub struct ChapterRepository {
    mysql_pool: Arc<sqlx::MySqlPool>,
}

impl ChapterRepository {
    pub fn new(mysql_pool: Arc<sqlx::MySqlPool>) -> Self {
        Self { mysql_pool }
    }
}

#[async_trait]
impl ChapterRepo for ChapterRepository {
    async fn get_chapters_of_book(&self, book_id: String) -> anyhow::Result<Vec<Chapter>> {
        let chapters = sqlx::query_as!(Chapter, "SELECT * FROM chapter WHERE book_id = ?", book_id)
            .fetch_all(&*self.mysql_pool)
            .await?;

        Ok(chapters)
    }

    async fn add_chapter_to_book(&self, chapter: Chapter, transaction: &mut Transaction<MySql>) -> anyhow::Result<()> {
        sqlx::query!(
            "INSERT INTO chapter (id, book_id, name, start) VALUES (?, ?, ?, ?)",
            chapter.id,
            chapter.book_id,
            chapter.name,
            chapter.start
        )
        .execute(&mut *transaction)
        .await?;

        Ok(())
    }

    async fn delete_chapters_from_book(&self, book_id: String, transaction: &mut Transaction<MySql>) -> anyhow::Result<()> {
        sqlx::query!(
            "DELETE FROM chapter WHERE book_id = ?",
            book_id,
        )
            .execute(&mut *transaction)
            .await?;

        Ok(())
    }
}
