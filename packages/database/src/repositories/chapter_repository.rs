use crate::models::Chapter;
use async_trait::async_trait;
use sqlx;
use std::sync::Arc;

#[async_trait]
pub trait ChapterRepo {
    async fn get_chapters_of_book(&self, book_id: String) -> anyhow::Result<Vec<Chapter>>;
    async fn add_chapter_to_book(&self, chapter: Chapter) -> anyhow::Result<()>;
    async fn delete_chapter(&self, chapter: Chapter) -> anyhow::Result<()>;
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
        let res = sqlx::query_as!(Chapter, "SELECT * FROM chapter WHERE book_id = ?", book_id)
            .fetch_all(&*self.mysql_pool)
            .await?;

        Ok(res)
    }

    async fn add_chapter_to_book(&self, chapter: Chapter) -> anyhow::Result<()> {
        sqlx::query!(
            "INSERT INTO chapter (id, book_id, name, start) VALUES (?, ?, ?, ?)",
            chapter.id,
            chapter.book_id,
            chapter.name,
            chapter.start
        )
        .execute(&*self.mysql_pool)
        .await?;

        Ok(())
    }

    async fn delete_chapter(&self, chapter: Chapter) -> anyhow::Result<()> {
        sqlx::query!("DELETE FROM chapter WHERE id = ?;", chapter.id)
            .execute(&*self.mysql_pool)
            .await?;

        Ok(())
    }
}
