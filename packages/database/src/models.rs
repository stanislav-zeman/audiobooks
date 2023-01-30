use serde::{Deserialize, Serialize};
use time::OffsetDateTime;

#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct User {
    pub id: String,
    pub name: String,
    pub studio_access: i8, // but irl bool
    pub created_at: Option<OffsetDateTime>,
}

#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct Author {
    pub id: String,
    pub name: String,
    pub created_at: Option<OffsetDateTime>,
}

#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct Book {
    pub id: String,
    pub name: String,
    pub description: String,
    pub tag: String,
    pub length: i32,
    pub file_url: String,
    pub cover_url: String,
    pub price: i32,
    pub isbn: String,
    pub created_at: Option<OffsetDateTime>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BookFilter {
    pub book_name: Option<String>,
    pub author_name: Option<String>,
    pub price_from: Option<u64>,
    pub price_to: Option<u64>,
    pub tag: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Pagination {
    pub limit: u32,
    pub offset: u32,
}
