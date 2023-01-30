import type { APIRoute } from "astro";
import { grpcClient } from "@utils/grpc/client";
import { promise } from "@utils/grpc/promise";
import { BuyBookRequest } from "grpc-ts/eshop_pb";
import { includeToken } from "@utils/grpc/token";

export const get: APIRoute = async ({ params, redirect,cookies }) => {
  const buyBook = promise(grpcClient.buyBook.bind(grpcClient), includeToken(cookies.get("token").value));
  const request = new BuyBookRequest();

  request.setBookId(params.book_id as string);
  await buyBook(request);

  return redirect(`/products/${params.book_id}`);
};
