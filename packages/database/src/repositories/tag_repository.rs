use std::sync::Arc;
use sqlx;
use crate::models::Tag;
use async_trait::async_trait;
use nanoid::nanoid;

#[async_trait]
pub trait TagRepo {
    async fn get_tags_of_book(&self, book_id: nanoid) -> anyhow::Result<Vec<Tag>>;
    async fn add_tag_to_book(&self, tag: Tag, book_id: nanoid) -> anyhow::Result<()>;
    async fn remove_tag_from_book(&self, tag: Tag, book_id: nanoid) -> anyhow::Result<()>;
}

pub struct TagRepository {
    mysql_pool: Arc<sqlx::MySqlPool>,
}

#[async_trait]
impl TagRepo for TagRepository {
    async fn get_tags_of_book(&self, book_id: nanoid) -> anyhow::Result<Vec<Tag>> {
        let res = sqlx::query_as::<_, Tag>(
            "SELECT * FROM book_tag WHERE book_id = ?;"
        )
            .bind(book_id)
            .fetch_all(&*self.mysql_pool)
            .await?;

        Ok(res)
    }


    async fn add_tag_to_book(&self, tag: Tag, book_id: nanoid) -> anyhow::Result<()> {
        sqlx::query(
            "INSERT INTO book_tag (book_id, tag) VALUES (?, ?);"
        )
            .bind(book_id)
            .bind(tag.name)
            .execute(&*self.mysql_pool)
            .await?;

        Ok(())
    }

    async fn remove_tag_from_book(&self, tag: Tag, book_id: nanoid) -> anyhow::Result<()> {
        sqlx::query(
            "REMOVE FROM book_tag WHERE book_id = ? AND tag = ?;"
        )
            .bind(book_id)
            .bind(tag.name)
            .execute(&*self.mysql_pool)
            .await?;

        Ok(())
    }
}
