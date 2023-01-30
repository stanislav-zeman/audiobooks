// package: eshop
// file: eshop.proto

import * as jspb from "google-protobuf";

export class Void extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Void.AsObject;
  static toObject(includeInstance: boolean, msg: Void): Void.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Void, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Void;
  static deserializeBinaryFromReader(message: Void, reader: jspb.BinaryReader): Void;
}

export namespace Void {
  export type AsObject = {
  }
}

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

export class Book extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getIsOwned(): boolean;
  setIsOwned(value: boolean): void;

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

  getTag(): string;
  setTag(value: string): void;

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
    authorsList: Array<Author.AsObject>,
    length: number,
    name: string,
    description: string,
    fileUrl: string,
    coverUrl: string,
    price: number,
    isbn: string,
    tag: string,
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

export class BookFilters extends jspb.Message {
  hasName(): boolean;
  clearName(): void;
  getName(): string;
  setName(value: string): void;

  hasAuthorName(): boolean;
  clearAuthorName(): void;
  getAuthorName(): string;
  setAuthorName(value: string): void;

  hasPricefrom(): boolean;
  clearPricefrom(): void;
  getPricefrom(): number;
  setPricefrom(value: number): void;

  hasPriceto(): boolean;
  clearPriceto(): void;
  getPriceto(): number;
  setPriceto(value: number): void;

  hasTag(): boolean;
  clearTag(): void;
  getTag(): string;
  setTag(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BookFilters.AsObject;
  static toObject(includeInstance: boolean, msg: BookFilters): BookFilters.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BookFilters, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BookFilters;
  static deserializeBinaryFromReader(message: BookFilters, reader: jspb.BinaryReader): BookFilters;
}

export namespace BookFilters {
  export type AsObject = {
    name: string,
    authorName: string,
    pricefrom: number,
    priceto: number,
    tag: string,
  }
}

export class AuthorFilters extends jspb.Message {
  hasName(): boolean;
  clearName(): void;
  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AuthorFilters.AsObject;
  static toObject(includeInstance: boolean, msg: AuthorFilters): AuthorFilters.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AuthorFilters, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AuthorFilters;
  static deserializeBinaryFromReader(message: AuthorFilters, reader: jspb.BinaryReader): AuthorFilters;
}

export namespace AuthorFilters {
  export type AsObject = {
    name: string,
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

  hasFilters(): boolean;
  clearFilters(): void;
  getFilters(): BookFilters | undefined;
  setFilters(value?: BookFilters): void;

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
    filters?: BookFilters.AsObject,
  }
}

export class GetAuthorsRequest extends jspb.Message {
  hasPagination(): boolean;
  clearPagination(): void;
  getPagination(): Pagination | undefined;
  setPagination(value?: Pagination): void;

  hasFilters(): boolean;
  clearFilters(): void;
  getFilters(): AuthorFilters | undefined;
  setFilters(value?: AuthorFilters): void;

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
    filters?: AuthorFilters.AsObject,
  }
}

export class GetMyBooksRequest extends jspb.Message {
  hasPagination(): boolean;
  clearPagination(): void;
  getPagination(): Pagination | undefined;
  setPagination(value?: Pagination): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetMyBooksRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetMyBooksRequest): GetMyBooksRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetMyBooksRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetMyBooksRequest;
  static deserializeBinaryFromReader(message: GetMyBooksRequest, reader: jspb.BinaryReader): GetMyBooksRequest;
}

export namespace GetMyBooksRequest {
  export type AsObject = {
    pagination?: Pagination.AsObject,
  }
}

export class Tags extends jspb.Message {
  clearTagsList(): void;
  getTagsList(): Array<string>;
  setTagsList(value: Array<string>): void;
  addTags(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Tags.AsObject;
  static toObject(includeInstance: boolean, msg: Tags): Tags.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Tags, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Tags;
  static deserializeBinaryFromReader(message: Tags, reader: jspb.BinaryReader): Tags;
}

export namespace Tags {
  export type AsObject = {
    tagsList: Array<string>,
  }
}

export class BuyBookRequest extends jspb.Message {
  getBookId(): string;
  setBookId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BuyBookRequest.AsObject;
  static toObject(includeInstance: boolean, msg: BuyBookRequest): BuyBookRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BuyBookRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BuyBookRequest;
  static deserializeBinaryFromReader(message: BuyBookRequest, reader: jspb.BinaryReader): BuyBookRequest;
}

export namespace BuyBookRequest {
  export type AsObject = {
    bookId: string,
  }
}

