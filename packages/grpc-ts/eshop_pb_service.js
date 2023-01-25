// package: eshop
// file: eshop.proto

var eshop_pb = require("./eshop_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var EshopService = (function () {
  function EshopService() {}
  EshopService.serviceName = "eshop.EshopService";
  return EshopService;
}());

EshopService.GetBook = {
  methodName: "GetBook",
  service: EshopService,
  requestStream: false,
  responseStream: false,
  requestType: eshop_pb.BookRequest,
  responseType: eshop_pb.Book
};

EshopService.GetAuthor = {
  methodName: "GetAuthor",
  service: EshopService,
  requestStream: false,
  responseStream: false,
  requestType: eshop_pb.AuthorRequest,
  responseType: eshop_pb.Author
};

EshopService.GetUser = {
  methodName: "GetUser",
  service: EshopService,
  requestStream: false,
  responseStream: false,
  requestType: eshop_pb.UserRequest,
  responseType: eshop_pb.User
};

exports.EshopService = EshopService;

function EshopServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

EshopServiceClient.prototype.getBook = function getBook(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(EshopService.GetBook, {
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

EshopServiceClient.prototype.getAuthor = function getAuthor(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(EshopService.GetAuthor, {
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

EshopServiceClient.prototype.getUser = function getUser(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(EshopService.GetUser, {
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

