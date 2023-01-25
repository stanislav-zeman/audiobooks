use crate::models::Chapter;
use async_trait::async_trait;
use nanoid::nanoid;
use sqlx;
use std::sync::Arc;

#[async_trait]
pub trait ChapterRepo {
    async fn get_chapters_of_book(&self, book_id: String) -> anyhow::Result<Vec<Chapter>>;
    async fn add_chapter_to_book(&self, chapter: Chapter) -> anyhow::Result<()>;
    async fn remove_chapter(&self, chapter: Chapter) -> anyhow::Result<()>;
}

pub struct ChapterRepository {
    mysql_pool: Arc<sqlx::MySqlPool>,
}

#[async_trait]
impl ChapterRepo for ChapterRepository {
    async fn get_chapters_of_book(&self, book_id: String) -> anyhow::Result<Vec<Chapter>> {
        let res = sqlx::query_as::<_, Chapter>(
            "SELECT (id, name, start) FROM chapter WHERE book_id = ?;",
        )
        .bind(book_id)
        .fetch_all(&*self)
        .await?;

        Ok(res)
    }

    async fn add_chapter_to_book(&self, chapter: Chapter) -> anyhow::Result<()> {
        sqlx::query("INSERT INTO chapter (id, book_id, name, start) VALUES (?, ?, ?);")
            .bind(chapter.id)
            .bind(chapter.book_id)
            .bind(chapter.name)
            .bind(chapter.start)
            .execute(&*self.mysql_pool)
            .await?;

        Ok(())
    }

    async fn remove_chapter(&self, chapter: Chapter) -> anyhow::Result<()> {
        sqlx::query("REMOVE FROM chapter WHERE id = ?;")
            .bind(chapter.id)
            .execute(&*self.mysql_pool)
            .await?;

        Ok(())
    }
}
