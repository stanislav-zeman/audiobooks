pub mod eshop;
mod helpers;

pub mod grpc {
    tonic::include_proto!("eshop");
}
