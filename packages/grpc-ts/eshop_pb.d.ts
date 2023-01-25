// package: eshop
// file: eshop.proto

import * as jspb from "google-protobuf";

export class Pagination extends jspb.Message {
  getLimit(): number;
  setLimit(value: number): void;

  getOffset(): number;
  setOffset(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Pagination.AsObject;
  static toObject(includeInstance: boolean, msg: Pagination): Pagination.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Pagination, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Pagination;
  static deserializeBinaryFromReader(message: Pagination, reader: jspb.BinaryReader): Pagination;
}

export namespace Pagination {
  export type AsObject = {
    limit: number,
    offset: number,
  }
}

export class GetBookByIdRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetBookByIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetBookByIdRequest): GetBookByIdRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetBookByIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetBookByIdRequest;
  static deserializeBinaryFromReader(message: GetBookByIdRequest, reader: jspb.BinaryReader): GetBookByIdRequest;
}

export namespace GetBookByIdRequest {
  export type AsObject = {
    id: string,
  }
}

export class Book extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getIsOwned(): boolean;
  setIsOwned(value: boolean): void;

  clearChaptersList(): void;
  getChaptersList(): Array<Chapter>;
  setChaptersList(value: Array<Chapter>): void;
  addChapters(value?: Chapter, index?: number): Chapter;

  clearAuthorsList(): void;
  getAuthorsList(): Array<Author>;
  setAuthorsList(value: Array<Author>): void;
  addAuthors(value?: Author, index?: number): Author;

  getLength(): number;
  setLength(value: number): void;

  getName(): string;
  setName(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getFileUrl(): string;
  setFileUrl(value: string): void;

  getCoverUrl(): string;
  setCoverUrl(value: string): void;

  getPrice(): number;
  setPrice(value: number): void;

  getIsbn(): string;
  setIsbn(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Book.AsObject;
  static toObject(includeInstance: boolean, msg: Book): Book.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Book, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Book;
  static deserializeBinaryFromReader(message: Book, reader: jspb.BinaryReader): Book;
}

export namespace Book {
  export type AsObject = {
    id: string,
    isOwned: boolean,
    chaptersList: Array<Chapter.AsObject>,
    authorsList: Array<Author.AsObject>,
    length: number,
    name: string,
    description: string,
    fileUrl: string,
    coverUrl: string,
    price: number,
    isbn: string,
  }
}

export class Author extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Author.AsObject;
  static toObject(includeInstance: boolean, msg: Author): Author.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Author, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Author;
  static deserializeBinaryFromReader(message: Author, reader: jspb.BinaryReader): Author;
}

export namespace Author {
  export type AsObject = {
    id: string,
    name: string,
  }
}

export class Chapter extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getChapterName(): string;
  setChapterName(value: string): void;

  getStart(): number;
  setStart(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Chapter.AsObject;
  static toObject(includeInstance: boolean, msg: Chapter): Chapter.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Chapter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Chapter;
  static deserializeBinaryFromReader(message: Chapter, reader: jspb.BinaryReader): Chapter;
}

export namespace Chapter {
  export type AsObject = {
    id: string,
    chapterName: string,
    start: number,
  }
}

export class User extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getStudioAccess(): boolean;
  setStudioAccess(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): User.AsObject;
  static toObject(includeInstance: boolean, msg: User): User.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): User;
  static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
  export type AsObject = {
    id: string,
    name: string,
    studioAccess: boolean,
  }
}

export class Books extends jspb.Message {
  getTotal(): number;
  setTotal(value: number): void;

  clearBooksList(): void;
  getBooksList(): Array<Book>;
  setBooksList(value: Array<Book>): void;
  addBooks(value?: Book, index?: number): Book;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Books.AsObject;
  static toObject(includeInstance: boolean, msg: Books): Books.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Books, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Books;
  static deserializeBinaryFromReader(message: Books, reader: jspb.BinaryReader): Books;
}

export namespace Books {
  export type AsObject = {
    total: number,
    booksList: Array<Book.AsObject>,
  }
}

export class Authors extends jspb.Message {
  getTotal(): number;
  setTotal(value: number): void;

  clearAuthorsList(): void;
  getAuthorsList(): Array<Author>;
  setAuthorsList(value: Array<Author>): void;
  addAuthors(value?: Author, index?: number): Author;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Authors.AsObject;
  static toObject(includeInstance: boolean, msg: Authors): Authors.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Authors, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Authors;
  static deserializeBinaryFromReader(message: Authors, reader: jspb.BinaryReader): Authors;
}

export namespace Authors {
  export type AsObject = {
    total: number,
    authorsList: Array<Author.AsObject>,
  }
}

export class GetAuthorByIdRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAuthorByIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetAuthorByIdRequest): GetAuthorByIdRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAuthorByIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAuthorByIdRequest;
  static deserializeBinaryFromReader(message: GetAuthorByIdRequest, reader: jspb.BinaryReader): GetAuthorByIdRequest;
}

export namespace GetAuthorByIdRequest {
  export type AsObject = {
    id: string,
  }
}

export class GetUserByIdRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserByIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserByIdRequest): GetUserByIdRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetUserByIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserByIdRequest;
  static deserializeBinaryFromReader(message: GetUserByIdRequest, reader: jspb.BinaryReader): GetUserByIdRequest;
}

export namespace GetUserByIdRequest {
  export type AsObject = {
    id: string,
  }
}

export class GetBooksRequest extends jspb.Message {
  hasPagination(): boolean;
  clearPagination(): void;
  getPagination(): Pagination | undefined;
  setPagination(value?: Pagination): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetBooksRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetBooksRequest): GetBooksRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetBooksRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetBooksRequest;
  static deserializeBinaryFromReader(message: GetBooksRequest, reader: jspb.BinaryReader): GetBooksRequest;
}

export namespace GetBooksRequest {
  export type AsObject = {
    pagination?: Pagination.AsObject,
  }
}

export class GetAuthorsRequest extends jspb.Message {
  hasPagination(): boolean;
  clearPagination(): void;
  getPagination(): Pagination | undefined;
  setPagination(value?: Pagination): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAuthorsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetAuthorsRequest): GetAuthorsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAuthorsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAuthorsRequest;
  static deserializeBinaryFromReader(message: GetAuthorsRequest, reader: jspb.BinaryReader): GetAuthorsRequest;
}

export namespace GetAuthorsRequest {
  export type AsObject = {
    pagination?: Pagination.AsObject,
  }
}

