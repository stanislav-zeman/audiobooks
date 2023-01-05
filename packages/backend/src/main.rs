use std::env;

use crate::handlers::grpc::eshop_service_server;

mod handlers;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let port = env::var("PORT").unwrap_or("9000".to_string());
    let addr = format!("0.0.0.0:{}", port);

    println!("Listening on {}", addr);

    tonic::transport::Server::builder()
        .add_service(eshop_service_server::EshopServiceServer::new(
            handlers::hello::EshopHandler {},
        ))
        .serve(addr.parse()?)
        .await?;

    Ok(())
}
