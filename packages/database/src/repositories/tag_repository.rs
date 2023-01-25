use crate::models::Tag;
use async_trait::async_trait;
use nanoid::nanoid;
use sqlx;
use std::sync::Arc;

#[async_trait]
pub trait TagRepo {
    async fn get_tags_of_book(&self, book_id: String) -> anyhow::Result<Vec<Tag>>;
    async fn add_tag_to_book(&self, tag: Tag, book_id: String) -> anyhow::Result<()>;
    async fn remove_tag_from_book(&self, tag: Tag, book_id: String) -> anyhow::Result<()>;
}

pub struct TagRepository {
    mysql_pool: Arc<sqlx::MySqlPool>,
}

#[async_trait]
impl TagRepo for TagRepository {
    async fn get_tags_of_book(&self, book_id: String) -> anyhow::Result<Vec<Tag>> {
        let res = sqlx::query_as::<_, Tag>("SELECT * FROM book_tag as bt WHERE bt.book_id = ?")
            .bind(book_id)
            .fetch_all(&*self.mysql_pool)
            .await?;

        Ok(res)
    }

    async fn add_tag_to_book(&self, tag: Tag, book_id: String) -> anyhow::Result<()> {
        sqlx::query("INSERT INTO book_tag (book_id, tag) VALUES (?, ?);")
            .bind(book_id)
            .bind(tag.name)
            .execute(&*self.mysql_pool)
            .await?;

        Ok(())
    }

    async fn remove_tag_from_book(&self, tag: Tag, book_id: String) -> anyhow::Result<()> {
        sqlx::query("REMOVE FROM book_tag WHERE book_id = ? AND tag = ?;")
            .bind(book_id)
            .bind(tag.name)
            .execute(&*self.mysql_pool)
            .await?;

        Ok(())
    }
}
