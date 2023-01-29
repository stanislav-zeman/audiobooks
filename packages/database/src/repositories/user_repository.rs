use crate::models::User;
use async_trait::async_trait;
use sqlx;
use std::sync::Arc;

#[async_trait]
pub trait UserRepo {
    async fn get_user_by_id(&self, id: String) -> anyhow::Result<User>;
    async fn add_user(&self, user: User) -> anyhow::Result<()>;
    async fn edit_user(&self, user: User) -> anyhow::Result<()>;
    async fn delete_user(&self, user: User) -> anyhow::Result<()>;
    async fn user_owns_book(&self, user_id: String, book_id: String) -> anyhow::Result<bool>;
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
            "INSERT INTO user (id, name, studio_access) VALUES (?, ?, ?);",
            user.id,
            user.name,
            user.studio_access
        )
        .execute(&*self.mysql_pool)
        .await?;

        Ok(())
    }

    async fn edit_user(&self, user: User) -> anyhow::Result<()> {
        sqlx::query!(
            "UPDATE user SET name = ?, studio_access = ? WHERE id = ?;",
            user.name,
            user.studio_access,
            user.id
        )
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
}
