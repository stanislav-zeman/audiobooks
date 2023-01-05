// package: eshop
// file: eshop.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as eshop_pb from "./eshop_pb";

interface IEshopServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    helloWorld: IEshopServiceService_IHelloWorld;
    helloWorld2: IEshopServiceService_IHelloWorld2;
}

interface IEshopServiceService_IHelloWorld extends grpc.MethodDefinition<eshop_pb.HelloWorldRequest, eshop_pb.HelloWorldResponse> {
    path: "/eshop.EshopService/HelloWorld";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<eshop_pb.HelloWorldRequest>;
    requestDeserialize: grpc.deserialize<eshop_pb.HelloWorldRequest>;
    responseSerialize: grpc.serialize<eshop_pb.HelloWorldResponse>;
    responseDeserialize: grpc.deserialize<eshop_pb.HelloWorldResponse>;
}
interface IEshopServiceService_IHelloWorld2 extends grpc.MethodDefinition<eshop_pb.HelloWorldRequest, eshop_pb.HelloWorldResponse> {
    path: "/eshop.EshopService/HelloWorld2";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<eshop_pb.HelloWorldRequest>;
    requestDeserialize: grpc.deserialize<eshop_pb.HelloWorldRequest>;
    responseSerialize: grpc.serialize<eshop_pb.HelloWorldResponse>;
    responseDeserialize: grpc.deserialize<eshop_pb.HelloWorldResponse>;
}

export const EshopServiceService: IEshopServiceService;

export interface IEshopServiceServer extends grpc.UntypedServiceImplementation {
    helloWorld: grpc.handleUnaryCall<eshop_pb.HelloWorldRequest, eshop_pb.HelloWorldResponse>;
    helloWorld2: grpc.handleUnaryCall<eshop_pb.HelloWorldRequest, eshop_pb.HelloWorldResponse>;
}

export interface IEshopServiceClient {
    helloWorld(request: eshop_pb.HelloWorldRequest, callback: (error: grpc.ServiceError | null, response: eshop_pb.HelloWorldResponse) => void): grpc.ClientUnaryCall;
    helloWorld(request: eshop_pb.HelloWorldRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: eshop_pb.HelloWorldResponse) => void): grpc.ClientUnaryCall;
    helloWorld(request: eshop_pb.HelloWorldRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: eshop_pb.HelloWorldResponse) => void): grpc.ClientUnaryCall;
    helloWorld2(request: eshop_pb.HelloWorldRequest, callback: (error: grpc.ServiceError | null, response: eshop_pb.HelloWorldResponse) => void): grpc.ClientUnaryCall;
    helloWorld2(request: eshop_pb.HelloWorldRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: eshop_pb.HelloWorldResponse) => void): grpc.ClientUnaryCall;
    helloWorld2(request: eshop_pb.HelloWorldRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: eshop_pb.HelloWorldResponse) => void): grpc.ClientUnaryCall;
}

export class EshopServiceClient extends grpc.Client implements IEshopServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public helloWorld(request: eshop_pb.HelloWorldRequest, callback: (error: grpc.ServiceError | null, response: eshop_pb.HelloWorldResponse) => void): grpc.ClientUnaryCall;
    public helloWorld(request: eshop_pb.HelloWorldRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: eshop_pb.HelloWorldResponse) => void): grpc.ClientUnaryCall;
    public helloWorld(request: eshop_pb.HelloWorldRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: eshop_pb.HelloWorldResponse) => void): grpc.ClientUnaryCall;
    public helloWorld2(request: eshop_pb.HelloWorldRequest, callback: (error: grpc.ServiceError | null, response: eshop_pb.HelloWorldResponse) => void): grpc.ClientUnaryCall;
    public helloWorld2(request: eshop_pb.HelloWorldRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: eshop_pb.HelloWorldResponse) => void): grpc.ClientUnaryCall;
    public helloWorld2(request: eshop_pb.HelloWorldRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: eshop_pb.HelloWorldResponse) => void): grpc.ClientUnaryCall;
}
