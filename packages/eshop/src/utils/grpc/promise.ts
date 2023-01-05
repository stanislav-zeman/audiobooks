import { CallOptions, Metadata, ServiceError } from "@grpc/grpc-js";

type RequestResponse<T> = T extends (
  request: infer R,
  metadata: Metadata,
  options: Partial<CallOptions>,
  callback: (err: ServiceError | null, response: infer S) => void
) => any
  ? [R, S]
  : never;

export const promise =
  <
    T extends (
      request: any,
      metadata: Metadata,
      options: Partial<CallOptions>,
      callback: (err: ServiceError | null, response: any) => void
    ) => any
  >(
    fn: T
  ): ((
    request: RequestResponse<T>[0],
    metadata?: Metadata,
    options?: Partial<CallOptions>
  ) => Promise<RequestResponse<T>[1]>) =>
  (request, metadata = new Metadata(), options = {}) =>
    new Promise((resolve, reject) => {
      fn(request, metadata, options, (err, response) => {
        if (err) reject(err);
        else resolve(response);
      });
    });
