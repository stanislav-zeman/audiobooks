use tonic::{Request, Response, Status};

use super::grpc::*;
use serde::__private::de::IdentifierDeserializer;

#[derive(Default)]
pub struct EshopHandler {}

#[tonic::async_trait]
impl eshop_service_server::EshopService for EshopHandler {
    async fn hello_world(
        &self,
        request: Request<HelloWorldRequest>,
    ) -> Result<Response<HelloWorldResponse>, Status> {
        println!("Got a request from {:?}", request.remote_addr());

        let reply = HelloWorldResponse {
            message: format!("Hello {}!", request.into_inner().name),
        };

        Ok(Response::new(reply))
    }

    async fn hello_world2(
        &self,
        request: Request<HelloWorldRequest>,
    ) -> Result<Response<HelloWorldResponse>, Status> {
        let reply = HelloWorldResponse {
            message: format!("Hello2 {}!", request.into_inner().name),
        };

        Ok(Response::new(reply))
    }

    async fn book_service(
        &self,
        request: Request<BookRequest>
    ) -> Result<Response<Book>, Status> {
        Ok(
            Response::new(
                Book {
                    id: String::from("prdel"),
                    is_owned: true,
                    chapters: vec![],
                    author: vec![],
                    length: 420_u64,
                    name: String::from("epic book name"),
                    description: String::from("desc"),
                    file_url: String::from("file url"),
                    cover_url: String::from("cover url"),
                    price: 69_u64,
                    isbn: String::from("IIII I  II")
                }
            )
        )
    }
}
