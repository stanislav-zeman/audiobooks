mod adapters;
pub mod eshop;

pub mod grpc {
    tonic::include_proto!("eshop");
}
