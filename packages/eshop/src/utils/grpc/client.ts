import pb from "grpc-ts/eshop_pb_service";
import type { grpc } from "@improbable-eng/grpc-web";
import { FetchReadableStreamTransport } from "./transport";
import env from "@utils/env";

const options: grpc.RpcOptions = {
  transport: FetchReadableStreamTransport({}),
};

export const grpcClient = new pb.EshopServiceClient(env.BACKEND_URL, options);
