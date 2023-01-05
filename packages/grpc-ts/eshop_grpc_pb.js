// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var eshop_pb = require('./eshop_pb.js');

function serialize_eshop_HelloWorldRequest(arg) {
  if (!(arg instanceof eshop_pb.HelloWorldRequest)) {
    throw new Error('Expected argument of type eshop.HelloWorldRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_eshop_HelloWorldRequest(buffer_arg) {
  return eshop_pb.HelloWorldRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_eshop_HelloWorldResponse(arg) {
  if (!(arg instanceof eshop_pb.HelloWorldResponse)) {
    throw new Error('Expected argument of type eshop.HelloWorldResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_eshop_HelloWorldResponse(buffer_arg) {
  return eshop_pb.HelloWorldResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var EshopServiceService = exports.EshopServiceService = {
  helloWorld: {
    path: '/eshop.EshopService/HelloWorld',
    requestStream: false,
    responseStream: false,
    requestType: eshop_pb.HelloWorldRequest,
    responseType: eshop_pb.HelloWorldResponse,
    requestSerialize: serialize_eshop_HelloWorldRequest,
    requestDeserialize: deserialize_eshop_HelloWorldRequest,
    responseSerialize: serialize_eshop_HelloWorldResponse,
    responseDeserialize: deserialize_eshop_HelloWorldResponse,
  },
  helloWorld2: {
    path: '/eshop.EshopService/HelloWorld2',
    requestStream: false,
    responseStream: false,
    requestType: eshop_pb.HelloWorldRequest,
    responseType: eshop_pb.HelloWorldResponse,
    requestSerialize: serialize_eshop_HelloWorldRequest,
    requestDeserialize: deserialize_eshop_HelloWorldRequest,
    responseSerialize: serialize_eshop_HelloWorldResponse,
    responseDeserialize: deserialize_eshop_HelloWorldResponse,
  },
};

exports.EshopServiceClient = grpc.makeGenericClientConstructor(EshopServiceService);
