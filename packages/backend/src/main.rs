use std::env;

use tonic_web::GrpcWebLayer;

use crate::handlers::{grpc::eshop_service_server::EshopServiceServer, hello::EshopHandler};
use tower_http::trace::TraceLayer;

mod handlers;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let port = env::var("PORT").unwrap_or("9000".to_string());
    let addr = format!("0.0.0.0:{}", port);

    tracing_subscriber::fmt::init();
    println!("Listening on {}", addr);

    let service = EshopHandler::default();
    let service = EshopServiceServer::new(service);

    tonic::transport::Server::builder()
        // add a logger
        .accept_http1(true)
        .layer(TraceLayer::new_for_grpc())
        .layer(GrpcWebLayer::new())
        .add_service(service)
        .serve(addr.parse()?)
        .await?;

    Ok(())
}
