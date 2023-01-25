// package: eshop
// file: eshop.proto

import * as eshop_pb from "./eshop_pb";
import {grpc} from "@improbable-eng/grpc-web";

type EshopServiceGetBookById = {
  readonly methodName: string;
  readonly service: typeof EshopService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof eshop_pb.GetBookByIdRequest;
  readonly responseType: typeof eshop_pb.Book;
};

type EshopServiceGetAuthorById = {
  readonly methodName: string;
  readonly service: typeof EshopService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof eshop_pb.GetAuthorByIdRequest;
  readonly responseType: typeof eshop_pb.Author;
};

type EshopServiceGetUserByID = {
  readonly methodName: string;
  readonly service: typeof EshopService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof eshop_pb.GetUserByIdRequest;
  readonly responseType: typeof eshop_pb.User;
};

type EshopServiceGetBooks = {
  readonly methodName: string;
  readonly service: typeof EshopService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof eshop_pb.GetBooksRequest;
  readonly responseType: typeof eshop_pb.Books;
};

type EshopServiceGetAuthors = {
  readonly methodName: string;
  readonly service: typeof EshopService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof eshop_pb.GetAuthorsRequest;
  readonly responseType: typeof eshop_pb.Authors;
};

export class EshopService {
  static readonly serviceName: string;
  static readonly GetBookById: EshopServiceGetBookById;
  static readonly GetAuthorById: EshopServiceGetAuthorById;
  static readonly GetUserByID: EshopServiceGetUserByID;
  static readonly GetBooks: EshopServiceGetBooks;
  static readonly GetAuthors: EshopServiceGetAuthors;
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
  getBookById(
    requestMessage: eshop_pb.GetBookByIdRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: eshop_pb.Book|null) => void
  ): UnaryResponse;
  getBookById(
    requestMessage: eshop_pb.GetBookByIdRequest,
    callback: (error: ServiceError|null, responseMessage: eshop_pb.Book|null) => void
  ): UnaryResponse;
  getAuthorById(
    requestMessage: eshop_pb.GetAuthorByIdRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: eshop_pb.Author|null) => void
  ): UnaryResponse;
  getAuthorById(
    requestMessage: eshop_pb.GetAuthorByIdRequest,
    callback: (error: ServiceError|null, responseMessage: eshop_pb.Author|null) => void
  ): UnaryResponse;
  getUserByID(
    requestMessage: eshop_pb.GetUserByIdRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: eshop_pb.User|null) => void
  ): UnaryResponse;
  getUserByID(
    requestMessage: eshop_pb.GetUserByIdRequest,
    callback: (error: ServiceError|null, responseMessage: eshop_pb.User|null) => void
  ): UnaryResponse;
  getBooks(
    requestMessage: eshop_pb.GetBooksRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: eshop_pb.Books|null) => void
  ): UnaryResponse;
  getBooks(
    requestMessage: eshop_pb.GetBooksRequest,
    callback: (error: ServiceError|null, responseMessage: eshop_pb.Books|null) => void
  ): UnaryResponse;
  getAuthors(
    requestMessage: eshop_pb.GetAuthorsRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: eshop_pb.Authors|null) => void
  ): UnaryResponse;
  getAuthors(
    requestMessage: eshop_pb.GetAuthorsRequest,
    callback: (error: ServiceError|null, responseMessage: eshop_pb.Authors|null) => void
  ): UnaryResponse;
}

