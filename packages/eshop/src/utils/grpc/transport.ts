import type { grpc } from "@improbable-eng/grpc-web";
import grpcweb from "@improbable-eng/grpc-web";
const debug = console.debug;

export type FetchTransportInit = Omit<
  RequestInit,
  "headers" | "method" | "body" | "signal"
>;

export function FetchReadableStreamTransport(
  init: FetchTransportInit
): grpc.TransportFactory {
  return (opts: grpc.TransportOptions) => {
    return fetchRequest(opts, init);
  };
}

function fetchRequest(
  options: grpc.TransportOptions,
  init: FetchTransportInit
): grpc.Transport {
  options.debug && debug("fetchRequest", options);
  return new Fetch(options, init);
}

declare const Response: any;
declare const Headers: any;

class Fetch implements grpc.Transport {
  cancelled: boolean = false;
  options: grpc.TransportOptions;
  init: FetchTransportInit;
  reader: ReadableStreamReader<any>;
  metadata: grpc.Metadata = new grpcweb.grpc.Metadata();
  controller: AbortController = new AbortController();

  constructor(
    transportOptions: grpc.TransportOptions,
    init: FetchTransportInit
  ) {
    this.options = transportOptions;
    this.init = init;
    // this.metadata.set("Content-Type", "application/grpc-web+proto");
  }

  pump(readerArg: ReadableStreamReader<any>, res: Response) {
    this.reader = readerArg;
    if (this.cancelled) {
      // If the request was cancelled before the first pump then cancel it here
      this.options.debug && debug("Fetch.pump.cancel at first pump");
      this.reader.cancel().catch((e) => {
        // This can be ignored. It will likely throw an exception due to the request being aborted
        this.options.debug && debug("Fetch.pump.reader.cancel exception", e);
      });
      return;
    }
    this.reader
      .read()
      .then((result: { done: boolean; value: Uint8Array }) => {
        if (result.done) {
          this.options.onEnd();
          return res;
        }
        this.options.onChunk(result.value);
        this.pump(this.reader, res);
        return;
      })
      .catch((err) => {
        if (this.cancelled) {
          this.options.debug && debug("Fetch.catch - request cancelled");
          return;
        }
        this.cancelled = true;
        this.options.debug && debug("Fetch.catch", err.message);
        this.options.onEnd(err);
      });
  }

  send(msgBytes: Uint8Array) {
    fetch(this.options.url, {
      ...this.init,
      headers: this.metadata.toHeaders(),
      method: "POST",
      body: msgBytes,
      signal: this.controller && this.controller.signal,
    })
      .then((res: Response) => {
        this.options.debug && debug("Fetch.response", res);
        this.options.onHeaders(
          new grpcweb.grpc.Metadata(res.headers as any),
          res.status
        );
        if (res.body) {
          this.pump(res.body.getReader(), res);
          return;
        }
        return res;
      })
      .catch((err) => {
        console.error(err);
        if (this.cancelled) {
          this.options.debug && debug("Fetch.catch - request cancelled");
          return;
        }
        this.cancelled = true;
        this.options.debug && debug("Fetch.catch", err.message);
        this.options.onEnd(err);
      });
  }

  sendMessage(msgBytes: Uint8Array) {
    this.send(msgBytes);
  }

  finishSend() {}

  start(metadata: grpc.Metadata) {
    this.metadata = metadata;
  }

  cancel() {
    if (this.cancelled) {
      this.options.debug && debug("Fetch.cancel already cancelled");
      return;
    }
    this.cancelled = true;

    if (this.controller) {
      this.options.debug && debug("Fetch.cancel.controller.abort");
      this.controller.abort();
    } else {
      this.options.debug && debug("Fetch.cancel.missing abort controller");
    }

    if (this.reader) {
      // If the reader has already been received in the pump then it can be cancelled immediately
      this.options.debug && debug("Fetch.cancel.reader.cancel");
      this.reader.cancel().catch((e) => {
        // This can be ignored. It will likely throw an exception due to the request being aborted
        this.options.debug && debug("Fetch.cancel.reader.cancel exception", e);
      });
    } else {
      this.options.debug && debug("Fetch.cancel before reader");
    }
  }
}
