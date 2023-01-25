use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct User {
    pub id: i64,
    pub name: String,
    pub studio_access: bool,
    pub books: Vec<Book>,
}

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct Author {
    pub id: i64,
    pub name: String,
    pub books: Vec<Book>,
}

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct Book {
    pub id: i64,
    pub name: String,
    pub description: String,
    pub tags: Vec<Tag>,
    pub chapters: Vec<Chapter>,
    pub published_at: DateTime<Utc>,
    pub length: i32,
    pub file_url: String,
    pub cover_url: String,
    pub price: i32,
    pub isbn: String,
    pub studio_access: bool,
}

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct Tag {
    pub name: String,
}

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct Chapter {
    pub id: i64,
    pub name: String,
    pub start: i32,
}
