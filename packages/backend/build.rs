use tonic_build::compile_protos;

fn main() {
    compile_protos("../proto/eshop.proto").unwrap();
}
