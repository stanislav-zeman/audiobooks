use serde::{Deserialize, Serialize};
use time::{Date, OffsetDateTime};

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct User {
    pub id: String,
    pub name: String,
    pub studio_access: bool,
}

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct Author {
    pub id: String,
    pub name: String,
    pub created_at: OffsetDateTime,
}

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct Book {
    pub id: String,
    pub name: String,
    pub description: String,
    pub published_at: Date,
    pub length: i32,
    pub file_url: String,
    pub cover_url: String,
    pub price: i32,
    pub isbn: String,
    pub created_at: OffsetDateTime,
}

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct Tag {
    pub name: String,
}

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct Chapter {
    pub id: String,
    pub book_id: String,
    pub name: String,
    pub start: i32,
    pub created_at: OffsetDateTime,
}
