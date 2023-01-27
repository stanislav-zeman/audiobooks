import { EshopServiceClient } from "grpc-ts/eshop_pb_service";
import type { grpc } from "@improbable-eng/grpc-web";
import { FetchReadableStreamTransport } from "./transport";

const GRPC_URL = "http://0.0.0.0:9001";

const options: grpc.RpcOptions = {
  transport: FetchReadableStreamTransport({}),
};

export const grpcClient = new EshopServiceClient(GRPC_URL, options);
