use tonic::{Request, Response, Status};

use super::grpc::*;

pub struct EshopHandler {}

#[tonic::async_trait]
impl eshop_service_server::EshopService for EshopHandler {
    async fn hello_world(
        &self,
        request: Request<HelloWorldRequest>,
    ) -> Result<Response<HelloWorldResponse>, Status> {
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
}
