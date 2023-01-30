// package: eshop
// file: eshop.proto

var eshop_pb = require("./eshop_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var EshopService = (function () {
  function EshopService() {}
  EshopService.serviceName = "eshop.EshopService";
  return EshopService;
}());

EshopService.GetBookById = {
  methodName: "GetBookById",
  service: EshopService,
  requestStream: false,
  responseStream: false,
  requestType: eshop_pb.GetBookByIdRequest,
  responseType: eshop_pb.Book
};

EshopService.GetUserByID = {
  methodName: "GetUserByID",
  service: EshopService,
  requestStream: false,
  responseStream: false,
  requestType: eshop_pb.GetUserByIdRequest,
  responseType: eshop_pb.User
};

EshopService.GetBooks = {
  methodName: "GetBooks",
  service: EshopService,
  requestStream: false,
  responseStream: false,
  requestType: eshop_pb.GetBooksRequest,
  responseType: eshop_pb.Books
};

EshopService.GetMyBooks = {
  methodName: "GetMyBooks",
  service: EshopService,
  requestStream: false,
  responseStream: false,
  requestType: eshop_pb.GetMyBooksRequest,
  responseType: eshop_pb.Books
};

EshopService.GetPublishedBooks = {
  methodName: "GetPublishedBooks",
  service: EshopService,
  requestStream: false,
  responseStream: false,
  requestType: eshop_pb.GetMyBooksRequest,
  responseType: eshop_pb.Books
};

EshopService.GetTags = {
  methodName: "GetTags",
  service: EshopService,
  requestStream: false,
  responseStream: false,
  requestType: eshop_pb.Void,
  responseType: eshop_pb.Tags
};

EshopService.AddBook = {
  methodName: "AddBook",
  service: EshopService,
  requestStream: false,
  responseStream: false,
  requestType: eshop_pb.Book,
  responseType: eshop_pb.Void
};

EshopService.UpdateBook = {
  methodName: "UpdateBook",
  service: EshopService,
  requestStream: false,
  responseStream: false,
  requestType: eshop_pb.Book,
  responseType: eshop_pb.Void
};

EshopService.BuyBook = {
  methodName: "BuyBook",
  service: EshopService,
  requestStream: false,
  responseStream: false,
  requestType: eshop_pb.BuyBookRequest,
  responseType: eshop_pb.Void
};

exports.EshopService = EshopService;

function EshopServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

EshopServiceClient.prototype.getBookById = function getBookById(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(EshopService.GetBookById, {
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

EshopServiceClient.prototype.getUserByID = function getUserByID(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(EshopService.GetUserByID, {
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

EshopServiceClient.prototype.getBooks = function getBooks(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(EshopService.GetBooks, {
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

EshopServiceClient.prototype.getMyBooks = function getMyBooks(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(EshopService.GetMyBooks, {
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

EshopServiceClient.prototype.getPublishedBooks = function getPublishedBooks(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(EshopService.GetPublishedBooks, {
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

EshopServiceClient.prototype.getTags = function getTags(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(EshopService.GetTags, {
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

EshopServiceClient.prototype.addBook = function addBook(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(EshopService.AddBook, {
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

EshopServiceClient.prototype.updateBook = function updateBook(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(EshopService.UpdateBook, {
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

EshopServiceClient.prototype.buyBook = function buyBook(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(EshopService.BuyBook, {
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

