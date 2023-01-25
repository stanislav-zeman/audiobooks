use crate::models::User;
use async_trait::async_trait;
use nanoid::nanoid;
use sqlx;
use std::sync::Arc;

#[async_trait]
pub trait UserRepo {
    async fn get_user_by_id(&self, id: String) -> anyhow::Result<User>;
    async fn add_user(&self, user: User) -> anyhow::Result<()>;
    async fn edit_user(&self, user: User) -> anyhow::Result<()>;
    async fn delete_user(&self, user: User) -> anyhow::Result<()>;
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
            sqlx::query_as::<_, User>("SELECT (id, name, studio_access) FROM user WHERE id = ?;")
                .bind(id)
                .fetch_one(&*self.mysql_pool)
                .await?,
        )
    }

    async fn add_user(&self, user: User) -> anyhow::Result<()> {
        sqlx::query("INSERT INTO user (id, name, studio_access) VALUES (?, ?);")
            .bind(user.id)
            .bind(user.name)
            .bind(user.studio_access)
            .execute(&*self.mysql_pool)
            .await?;

        Ok(())
    }

    async fn edit_user(&self, user: User) -> anyhow::Result<()> {
        sqlx::query("UPDATE TABLE user SET name = ?, studio_access = ? WHERE id = ?;")
            .bind(user.name)
            .bind(user.studio_access)
            .bind(user.id)
            .execute(&*self.mysql_pool)
            .await?;

        Ok(())
    }

    async fn delete_user(&self, user: User) -> anyhow::Result<()> {
        sqlx::query("DELETE FROM user WHERE id = ?;")
            .bind(user.id)
            .execute(&*self.mysql_pool)
            .await?;

        Ok(())
    }
}
