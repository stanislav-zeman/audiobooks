// package: eshop
// file: eshop.proto

import * as jspb from "google-protobuf";

export class BookRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BookRequest.AsObject;
  static toObject(includeInstance: boolean, msg: BookRequest): BookRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BookRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BookRequest;
  static deserializeBinaryFromReader(message: BookRequest, reader: jspb.BinaryReader): BookRequest;
}

export namespace BookRequest {
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

export class AuthorRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AuthorRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AuthorRequest): AuthorRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AuthorRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AuthorRequest;
  static deserializeBinaryFromReader(message: AuthorRequest, reader: jspb.BinaryReader): AuthorRequest;
}

export namespace AuthorRequest {
  export type AsObject = {
    id: string,
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

export class UserRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserRequest): UserRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserRequest;
  static deserializeBinaryFromReader(message: UserRequest, reader: jspb.BinaryReader): UserRequest;
}

export namespace UserRequest {
  export type AsObject = {
    id: string,
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

