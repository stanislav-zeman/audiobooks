// package: eshop
// file: eshop.proto

import * as eshop_pb from "./eshop_pb";
import {grpc} from "@improbable-eng/grpc-web";

type EshopServiceGetBook = {
  readonly methodName: string;
  readonly service: typeof EshopService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof eshop_pb.BookRequest;
  readonly responseType: typeof eshop_pb.Book;
};

type EshopServiceGetAuthor = {
  readonly methodName: string;
  readonly service: typeof EshopService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof eshop_pb.AuthorRequest;
  readonly responseType: typeof eshop_pb.Author;
};

type EshopServiceGetUser = {
  readonly methodName: string;
  readonly service: typeof EshopService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof eshop_pb.UserRequest;
  readonly responseType: typeof eshop_pb.User;
};

export class EshopService {
  static readonly serviceName: string;
  static readonly GetBook: EshopServiceGetBook;
  static readonly GetAuthor: EshopServiceGetAuthor;
  static readonly GetUser: EshopServiceGetUser;
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
  getBook(
    requestMessage: eshop_pb.BookRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: eshop_pb.Book|null) => void
  ): UnaryResponse;
  getBook(
    requestMessage: eshop_pb.BookRequest,
    callback: (error: ServiceError|null, responseMessage: eshop_pb.Book|null) => void
  ): UnaryResponse;
  getAuthor(
    requestMessage: eshop_pb.AuthorRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: eshop_pb.Author|null) => void
  ): UnaryResponse;
  getAuthor(
    requestMessage: eshop_pb.AuthorRequest,
    callback: (error: ServiceError|null, responseMessage: eshop_pb.Author|null) => void
  ): UnaryResponse;
  getUser(
    requestMessage: eshop_pb.UserRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: eshop_pb.User|null) => void
  ): UnaryResponse;
  getUser(
    requestMessage: eshop_pb.UserRequest,
    callback: (error: ServiceError|null, responseMessage: eshop_pb.User|null) => void
  ): UnaryResponse;
}

