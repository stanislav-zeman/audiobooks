use tonic::{Request, Response, Status};

use super::grpc::*;

#[derive(Default)]
pub struct EshopHandler {}

#[tonic::async_trait]
impl eshop_service_server::EshopService for EshopHandler {
    async fn get_book(&self, _: Request<BookRequest>) -> Result<Response<Book>, Status> {
        Ok(Response::new(Book {
            id: String::from("prdel"),
            is_owned: false,
            chapters: vec![],
            author: vec![],
            length: 420_u64,
            name: String::from("epic book name"),
            description: String::from("desc"),
            file_url: String::from("file url"),
            cover_url: String::from("cover url"),
            price: 69_u64,
            isbn: String::from("IIII I  II"),
        }))
    }

    async fn get_author(&self, _: Request<AuthorRequest>) -> Result<Response<Author>, Status> {
        Ok(Response::new(Author {
            id: String::from("mock id"),
            name: String::from("mock name"),
        }))
    }

    async fn get_user(&self, _: Request<UserRequest>) -> Result<Response<User>, Status> {
        Ok(Response::new(User {
            id: String::from("mock id"),
            name: String::from("this mock user"),
            studio_access: true,
        }))
    }
}
