import type { ServiceError } from "grpc-ts/eshop_pb_service";

type RequestResponse<T> = T extends (
  request: infer R,
  callback: (err: ServiceError | null, response: infer S) => void
) => any
  ? [R, S]
  : never;

export const promise =
  <
    T extends (
      request: any,
      callback: (err: ServiceError | null, response: any) => void
    ) => any
  >(
    fn: T
  ): ((request: RequestResponse<T>[0]) => Promise<RequestResponse<T>[1]>) =>
  (request) =>
    new Promise((resolve, reject) => {
      fn(request, (err, response) => {
        if (err) reject(err);
        else resolve(response);
      });
    });
