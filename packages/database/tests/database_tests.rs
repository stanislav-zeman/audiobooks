use time::{Date, OffsetDateTime};
use time::Weekday::Monday;
use database::Library;
use database::models::{Book, User};
use database::repositories::user_repository::UserRepo;
use database::repositories::book_repository::BookRepo;

#[tokio::test]
async fn test_user_repo() -> anyhow::Result<()> {
    let library = Library::new().await;
    let user_repo = library.users;

    let user = User {
        id: "péro".to_string(),
        name: "kokot".to_string(),
        studio_access: 69,
        created_at: OffsetDateTime::now_utc(),
    };

    assert!(user_repo.add_user(user.clone()).await.is_ok());

    let db_user = user_repo.get_user_by_id(user.id.clone()).await?;

    assert_eq!(user.id, db_user.id);
    assert_eq!(user.name, db_user.name);
    assert_eq!(user.studio_access, db_user.studio_access);
    // assert_eq!(user.created_at, db_user.created_at);

    let mut edited_user = user.clone();
    edited_user.name = "čurák".to_string();

    assert!(user_repo.edit_user(edited_user.clone()).await.is_ok());

    let edited_db_user = user_repo.get_user_by_id(user.id.clone()).await?;

    assert_eq!(edited_user.id, edited_db_user.id);
    assert_eq!(edited_user.name, edited_db_user.name);
    assert_eq!(edited_user.studio_access, edited_db_user.studio_access);
    // assert_eq!(user.created_at, edited_db_user.created_at);

    user_repo.delete_user(user).await?;
    assert!(user_repo.get_user_by_id(db_user.id).await.is_err());

    Ok(())
}

#[tokio::test]
async fn test_book_repo() -> anyhow::Result<()> {
    let library = Library::new().await;
    let book_repo = library.books;

    let date = Date::from_iso_week_date(2019, 1, Monday);
    assert!(date.is_ok());

    let book = Book {
        id: "Mein Kampf".to_string(),
        name: "Mein Kampf".to_string(),
        description: "Truly an amazing book - 10/10".to_string(),
        published_at: date.unwrap(),
        length: 0,
        file_url: "none".to_string(),
        cover_url: "none".to_string(),
        price: 0,
        isbn: "none".to_string(),
        created_at: OffsetDateTime::now_utc(),
    };

    assert!(book_repo.add_book(book.clone()).await.is_ok());

    let db_book = book_repo.get_book_by_id(book.id.clone()).await?;

    assert_eq!(book.id, db_book.id);
    assert_eq!(book.name, db_book.name);
    assert_eq!(book.description, db_book.description);
    assert_eq!(book.published_at, db_book.published_at);
    assert_eq!(book.length, db_book.length);
    assert_eq!(book.file_url, db_book.file_url);
    assert_eq!(book.cover_url, db_book.cover_url);
    assert_eq!(book.price, db_book.price);
    assert_eq!(book.isbn, db_book.isbn);
    // assert_eq!(book.created_at, db_book.created_at);

    let mut edited_book = book.clone();
    edited_book.name = "Mein Kampf 2".to_string();

    assert!(book_repo.edit_book(edited_book.clone()).await.is_ok());

    let edited_db_book = book_repo.get_book_by_id(book.id.clone()).await?;

    assert_eq!(edited_book.id, edited_db_book.id);
    assert_eq!(edited_book.name, edited_db_book.name);
    assert_eq!(edited_book.description, edited_db_book.description);
    assert_eq!(edited_book.published_at, edited_db_book.published_at);
    assert_eq!(edited_book.length, edited_db_book.length);
    assert_eq!(edited_book.file_url, edited_db_book.file_url);
    assert_eq!(edited_book.cover_url, edited_db_book.cover_url);
    assert_eq!(edited_book.price, edited_db_book.price);
    assert_eq!(edited_book.isbn, edited_db_book.isbn);
    // assert_eq!(user.created_at, edited_db_user.created_at);

    book_repo.delete_book(book).await?;
    assert!(book_repo.get_book_by_id(edited_book.id).await.is_err());

    Ok(())
}