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

type EshopServiceGetMyBooks = {
  readonly methodName: string;
  readonly service: typeof EshopService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof eshop_pb.GetMyBooksRequest;
  readonly responseType: typeof eshop_pb.Books;
};

type EshopServiceGetPublishedBooks = {
  readonly methodName: string;
  readonly service: typeof EshopService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof eshop_pb.GetMyBooksRequest;
  readonly responseType: typeof eshop_pb.Books;
};

type EshopServiceGetTags = {
  readonly methodName: string;
  readonly service: typeof EshopService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof eshop_pb.Void;
  readonly responseType: typeof eshop_pb.Tags;
};

type EshopServiceAddBook = {
  readonly methodName: string;
  readonly service: typeof EshopService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof eshop_pb.Book;
  readonly responseType: typeof eshop_pb.Void;
};

type EshopServiceUpdateBook = {
  readonly methodName: string;
  readonly service: typeof EshopService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof eshop_pb.Book;
  readonly responseType: typeof eshop_pb.Void;
};

type EshopServiceBuyBook = {
  readonly methodName: string;
  readonly service: typeof EshopService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof eshop_pb.BuyBookRequest;
  readonly responseType: typeof eshop_pb.Void;
};

export class EshopService {
  static readonly serviceName: string;
  static readonly GetBookById: EshopServiceGetBookById;
  static readonly GetUserByID: EshopServiceGetUserByID;
  static readonly GetBooks: EshopServiceGetBooks;
  static readonly GetMyBooks: EshopServiceGetMyBooks;
  static readonly GetPublishedBooks: EshopServiceGetPublishedBooks;
  static readonly GetTags: EshopServiceGetTags;
  static readonly AddBook: EshopServiceAddBook;
  static readonly UpdateBook: EshopServiceUpdateBook;
  static readonly BuyBook: EshopServiceBuyBook;
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
  getMyBooks(
    requestMessage: eshop_pb.GetMyBooksRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: eshop_pb.Books|null) => void
  ): UnaryResponse;
  getMyBooks(
    requestMessage: eshop_pb.GetMyBooksRequest,
    callback: (error: ServiceError|null, responseMessage: eshop_pb.Books|null) => void
  ): UnaryResponse;
  getPublishedBooks(
    requestMessage: eshop_pb.GetMyBooksRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: eshop_pb.Books|null) => void
  ): UnaryResponse;
  getPublishedBooks(
    requestMessage: eshop_pb.GetMyBooksRequest,
    callback: (error: ServiceError|null, responseMessage: eshop_pb.Books|null) => void
  ): UnaryResponse;
  getTags(
    requestMessage: eshop_pb.Void,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: eshop_pb.Tags|null) => void
  ): UnaryResponse;
  getTags(
    requestMessage: eshop_pb.Void,
    callback: (error: ServiceError|null, responseMessage: eshop_pb.Tags|null) => void
  ): UnaryResponse;
  addBook(
    requestMessage: eshop_pb.Book,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: eshop_pb.Void|null) => void
  ): UnaryResponse;
  addBook(
    requestMessage: eshop_pb.Book,
    callback: (error: ServiceError|null, responseMessage: eshop_pb.Void|null) => void
  ): UnaryResponse;
  updateBook(
    requestMessage: eshop_pb.Book,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: eshop_pb.Void|null) => void
  ): UnaryResponse;
  updateBook(
    requestMessage: eshop_pb.Book,
    callback: (error: ServiceError|null, responseMessage: eshop_pb.Void|null) => void
  ): UnaryResponse;
  buyBook(
    requestMessage: eshop_pb.BuyBookRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: eshop_pb.Void|null) => void
  ): UnaryResponse;
  buyBook(
    requestMessage: eshop_pb.BuyBookRequest,
    callback: (error: ServiceError|null, responseMessage: eshop_pb.Void|null) => void
  ): UnaryResponse;
}

