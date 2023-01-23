// package: eshop
// file: eshop.proto

var eshop_pb = require("./eshop_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var EshopService = (function () {
  function EshopService() {}
  EshopService.serviceName = "eshop.EshopService";
  return EshopService;
}());

EshopService.HelloWorld = {
  methodName: "HelloWorld",
  service: EshopService,
  requestStream: false,
  responseStream: false,
  requestType: eshop_pb.HelloWorldRequest,
  responseType: eshop_pb.HelloWorldResponse
};

EshopService.HelloWorld2 = {
  methodName: "HelloWorld2",
  service: EshopService,
  requestStream: false,
  responseStream: false,
  requestType: eshop_pb.HelloWorldRequest,
  responseType: eshop_pb.HelloWorldResponse
};

exports.EshopService = EshopService;

function EshopServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

EshopServiceClient.prototype.helloWorld = function helloWorld(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(EshopService.HelloWorld, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

EshopServiceClient.prototype.helloWorld2 = function helloWorld2(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(EshopService.HelloWorld2, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.EshopServiceClient = EshopServiceClient;

