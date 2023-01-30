import type { ServiceError } from "grpc-ts/eshop_pb_service";
import type { grpc } from "@improbable-eng/grpc-web";

export function promise<R, S>(
  fn: (
    request: R,
    callback: (err: ServiceError | null, response: S) => void
  ) => void,
  metadata?: grpc.Metadata
): (request: R, metadata?: grpc.Metadata) => Promise<S> {
  type Fn = (
    request: R,
    metadata: grpc.Metadata | undefined,
    callback: (err: ServiceError | null, response: S) => void
  ) => void;

  const fn2 = fn as any as Fn;
  return (request: R, _metadata?: grpc.Metadata): Promise<S> =>
    new Promise((resolve, reject) =>
      fn2(request, _metadata || metadata, (err, response) => {
        if (err) reject(err);
        else resolve(response);
      })
    );
}
