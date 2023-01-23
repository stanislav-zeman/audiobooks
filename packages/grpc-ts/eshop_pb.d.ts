// package: eshop
// file: eshop.proto

import * as jspb from "google-protobuf";

export class HelloWorldRequest extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HelloWorldRequest.AsObject;
  static toObject(includeInstance: boolean, msg: HelloWorldRequest): HelloWorldRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: HelloWorldRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HelloWorldRequest;
  static deserializeBinaryFromReader(message: HelloWorldRequest, reader: jspb.BinaryReader): HelloWorldRequest;
}

export namespace HelloWorldRequest {
  export type AsObject = {
    name: string,
  }
}

export class HelloWorldResponse extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HelloWorldResponse.AsObject;
  static toObject(includeInstance: boolean, msg: HelloWorldResponse): HelloWorldResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: HelloWorldResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HelloWorldResponse;
  static deserializeBinaryFromReader(message: HelloWorldResponse, reader: jspb.BinaryReader): HelloWorldResponse;
}

export namespace HelloWorldResponse {
  export type AsObject = {
    message: string,
  }
}

