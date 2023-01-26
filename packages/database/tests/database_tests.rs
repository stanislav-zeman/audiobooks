use time::OffsetDateTime;
use database::Library;
use database::models::User;
use database::repositories::user_repository::{UserRepo};

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