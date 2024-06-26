use crate::models::User;
use async_trait::async_trait;
use sqlx;
use sqlx::{MySql, Transaction};
use std::sync::Arc;

#[async_trait]
pub trait UserRepo {
    async fn get_user_by_id(&self, id: String) -> anyhow::Result<User>;
    async fn add_user(&self, user: User) -> anyhow::Result<()>;
    async fn edit_user(&self, user: User) -> anyhow::Result<()>;
    async fn delete_user(&self, user: User) -> anyhow::Result<()>;
    async fn user_owns_book(&self, user_id: String, book_id: String) -> anyhow::Result<bool>;
    async fn add_book_to_user(&self, user_id: String, book_id: String) -> anyhow::Result<()>;
    async fn assign_upload_user(
        &self,
        user_id: String,
        book_id: String,
        transaction: &mut Transaction<MySql>,
    ) -> anyhow::Result<()>;
    async fn user_uploaded_book(&self, user_id: String, book_id: String) -> anyhow::Result<bool>;
}

pub struct UserRepository {
    mysql_pool: Arc<sqlx::MySqlPool>,
}

impl UserRepository {
    pub fn new(mysql_pool: Arc<sqlx::MySqlPool>) -> Self {
        Self { mysql_pool }
    }
}

#[async_trait]
impl UserRepo for UserRepository {
    async fn get_user_by_id(&self, id: String) -> anyhow::Result<User> {
        Ok(
            sqlx::query_as!(User, "SELECT * FROM user WHERE id = ?;", id)
                .fetch_one(&*self.mysql_pool)
                .await?,
        )
    }

    async fn add_user(&self, user: User) -> anyhow::Result<()> {
        sqlx::query!(
            "INSERT INTO user (id, name) VALUES (?, ?);",
            user.id,
            user.name,
        )
        .execute(&*self.mysql_pool)
        .await?;

        Ok(())
    }

    async fn edit_user(&self, user: User) -> anyhow::Result<()> {
        sqlx::query!("UPDATE user SET name = ? WHERE id = ?;", user.name, user.id)
            .execute(&*self.mysql_pool)
            .await?;

        Ok(())
    }

    async fn delete_user(&self, user: User) -> anyhow::Result<()> {
        sqlx::query!("DELETE FROM user WHERE id = ?;", user.id)
            .execute(&*self.mysql_pool)
            .await?;

        Ok(())
    }

    async fn user_owns_book(&self, user_id: String, book_id: String) -> anyhow::Result<bool> {
        let x = sqlx::query!(
            "SELECT * FROM user_book WHERE user_id = ? AND book_id = ?",
            user_id,
            book_id
        )
        .fetch_optional(&*self.mysql_pool)
        .await?;

        Ok(x.is_some())
    }

    async fn add_book_to_user(&self, user_id: String, book_id: String) -> anyhow::Result<()> {
        sqlx::query!(
            "INSERT INTO user_book (user_id, book_id) VALUES (?, ?)",
            user_id,
            book_id
        )
        .execute(&*self.mysql_pool)
        .await?;

        Ok(())
    }

    async fn assign_upload_user(
        &self,
        user_id: String,
        book_id: String,
        transaction: &mut Transaction<MySql>,
    ) -> anyhow::Result<()> {
        sqlx::query!(
            "INSERT INTO upload (user_id, book_id) VALUES (?, ?)",
            user_id,
            book_id
        )
        .execute(transaction)
        .await?;

        Ok(())
    }

    async fn user_uploaded_book(&self, user_id: String, book_id: String) -> anyhow::Result<bool> {
        let x = sqlx::query!(
            "SELECT * FROM upload WHERE user_id = ? AND book_id = ?",
            user_id,
            book_id
        )
        .fetch_optional(&*self.mysql_pool)
        .await?;

        Ok(x.is_some())
    }
}
