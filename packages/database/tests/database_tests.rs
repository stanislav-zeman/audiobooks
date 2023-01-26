use database::models::{Author, Book, Chapter, User};
use database::repositories::author_repository::AuthorRepo;
use database::repositories::book_repository::BookRepo;
use database::repositories::chapter_repository::ChapterRepo;
use database::repositories::user_repository::UserRepo;
use database::Library;
use time::Weekday::Monday;
use time::{Date, OffsetDateTime};

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
        tag: "none".to_string(),
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
    assert_eq!(book.tag, db_book.tag);
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
    assert_eq!(edited_book.tag, edited_db_book.tag);
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

#[tokio::test]
async fn test_author_repo() {
    let repo = Library::new().await.authors;

    let test_author = Author {
        id: "test author id 3645w74668568".to_string(),
        name: "test author name".to_string(),
        created_at: OffsetDateTime::now_utc(),
    };

    // insert/get works
    repo.add_author(test_author.clone()).await.unwrap();
    let from_db = repo.get_author(test_author.id.clone()).await.unwrap();
    assert_eq!(from_db.id, test_author.id);
    assert_eq!(from_db.name, test_author.name);
    // do not compare created_at; db fucked

    // edit works
    let new_name = "new name".to_string();
    let author_with_new_name = Author {
        name: new_name.clone(),
        ..test_author.clone()
    };
    repo.edit_author(author_with_new_name).await.unwrap();
    let from_db = repo.get_author(test_author.id.clone()).await.unwrap();
    assert_eq!(from_db.name, new_name.clone());

    // delete works
    repo.delete_author(test_author.clone()).await.unwrap();
    assert!(repo.get_author(test_author.id.clone()).await.is_err());
}

#[tokio::test]
async fn test_chapter_repo() {
    let repo = Library::new().await.chapters;

    let test_chapter_id = "test chapter id 3q4635w5747".to_string();
    let test_chapter_book_id = "test chapter book is q34q5775fdh".to_string();
    let test_chapter_name = "test chapter name w46q35ee5w75".to_string();
    let test_chapter_start = 666_i32;

    let test_chapter = Chapter {
        id: test_chapter_id.clone(),
        book_id: test_chapter_book_id.clone(),
        name: test_chapter_name.clone(),
        start: test_chapter_start,
        created_at: OffsetDateTime::now_utc(),
    };

    // insert/get works
    repo.add_chapter_to_book(test_chapter.clone())
        .await
        .unwrap(); // this might fail cuz db not cleaned; fix: change id
    let mut from_db_vec = repo
        .get_chapters_of_book(test_chapter.book_id.clone())
        .await
        .unwrap();
    assert_eq!(1, from_db_vec.len());
    let from_db_item = from_db_vec.pop().unwrap();
    assert_eq!(from_db_item.id, test_chapter.id.clone());
    assert_eq!(from_db_item.book_id, test_chapter.book_id.clone());
    assert_eq!(from_db_item.name, test_chapter.name.clone());
    assert_eq!(from_db_item.start, test_chapter.start);
    // do not compare created_at; db fucked

    // delete works
    repo.delete_chapter(test_chapter.clone()).await.unwrap();
    assert_eq!(
        0,
        repo.get_chapters_of_book(test_chapter.book_id.clone())
            .await
            .unwrap()
            .len()
    );
}
