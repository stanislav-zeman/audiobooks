// package: eshop
// file: eshop.proto

import * as eshop_pb from "./eshop_pb";
import {grpc} from "@improbable-eng/grpc-web";

type EshopServiceHelloWorld = {
  readonly methodName: string;
  readonly service: typeof EshopService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof eshop_pb.HelloWorldRequest;
  readonly responseType: typeof eshop_pb.HelloWorldResponse;
};

type EshopServiceHelloWorld2 = {
  readonly methodName: string;
  readonly service: typeof EshopService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof eshop_pb.HelloWorldRequest;
  readonly responseType: typeof eshop_pb.HelloWorldResponse;
};

export class EshopService {
  static readonly serviceName: string;
  static readonly HelloWorld: EshopServiceHelloWorld;
  static readonly HelloWorld2: EshopServiceHelloWorld2;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class EshopServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  helloWorld(
    requestMessage: eshop_pb.HelloWorldRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: eshop_pb.HelloWorldResponse|null) => void
  ): UnaryResponse;
  helloWorld(
    requestMessage: eshop_pb.HelloWorldRequest,
    callback: (error: ServiceError|null, responseMessage: eshop_pb.HelloWorldResponse|null) => void
  ): UnaryResponse;
  helloWorld2(
    requestMessage: eshop_pb.HelloWorldRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: eshop_pb.HelloWorldResponse|null) => void
  ): UnaryResponse;
  helloWorld2(
    requestMessage: eshop_pb.HelloWorldRequest,
    callback: (error: ServiceError|null, responseMessage: eshop_pb.HelloWorldResponse|null) => void
  ): UnaryResponse;
}

