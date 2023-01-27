import { GetBooksRequest } from "grpc-ts/eshop_pb";

const input = new URLSearchParams();

input.append("search", "test");
input.append("kokot", "on");

/// ->>>>>

export const searchFilters = (input: URLSearchParams): GetBooksRequest => {
  const res = new GetBooksRequest();

  [...input.values()]; //?

  return res;
};

searchFilters(input);
