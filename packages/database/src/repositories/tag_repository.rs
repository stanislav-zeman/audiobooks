use crate::models::Tag;
use async_trait::async_trait;
use sqlx;
use std::sync::Arc;

#[async_trait]
pub trait TagRepo {
    async fn get_tags_of_book(&self, book_id: String) -> anyhow::Result<Vec<Tag>>;
    async fn add_tag_to_book(&self, tag: Tag, book_id: String) -> anyhow::Result<()>;
    async fn remove_tag_from_book(&self, tag: Tag) -> anyhow::Result<()>;
}

pub struct TagRepository {
    mysql_pool: Arc<sqlx::MySqlPool>,
}

impl TagRepository {
    pub fn new(mysql_pool: Arc<sqlx::MySqlPool>) -> Self {
        Self { mysql_pool }
    }
}

#[async_trait]
impl TagRepo for TagRepository {
    async fn get_tags_of_book(&self, book_id: String) -> anyhow::Result<Vec<Tag>> {
        let res = sqlx::query_as!(
            Tag,
            "SELECT * FROM book_tag as bt WHERE bt.book_id = ?",
            book_id
        )
        .fetch_all(&*self.mysql_pool)
        .await?;

        Ok(res)
    }

    async fn add_tag_to_book(&self, tag: Tag, book_id: String) -> anyhow::Result<()> {
        sqlx::query!(
            "INSERT INTO book_tag (book_id, tag) VALUES (?, ?)",
            book_id,
            tag.tag
        )
        .execute(&*self.mysql_pool)
        .await?;

        Ok(())
    }

    async fn remove_tag_from_book(&self, tag: Tag) -> anyhow::Result<()> {
        sqlx::query!(
            "DELETE FROM book_tag WHERE book_id = ? AND tag = ?;",
            tag.book_id,
            tag.tag
        )
        .execute(&*self.mysql_pool)
        .await?;

        Ok(())
    }
}
