use std::env;
use std::sync::Arc;
use sqlx::MySqlPool;

pub mod models;
pub mod repositories;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    dotenvy::dotenv()?;
    let url = env::var("DATABASE_URL").expect("DATABASE_URL not found");

    let pool = MySqlPool::connect(&url).await?;
    // sqlx::migrate!().run(&pool).await?;
    let pool = Arc::new(pool);
    let _conn = pool.acquire().await?;
    println!("Successfully connected to PlanetScale!");

    Ok(())
}
