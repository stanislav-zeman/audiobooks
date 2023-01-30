import type { APIRoute } from "astro";
import { validateJwt } from "@utils/auth/validateJwt";
import { client } from "@utils/s3/client";
import { ListObjectsCommand } from "@aws-sdk/client-s3";
import grpc from "grpc-ts/eshop_pb";
import { grpcClient } from "@utils/grpc/client";
import { promise } from "@utils/grpc/promise";
import { includeToken } from "@utils/grpc/token";
import { getSignedCookies } from "@aws-sdk/cloudfront-signer";
import env from "@utils/env";

/**
 * Lists all the media in the uploads folder for a given book.
 *
 * @param {string} book_id - The book id
 */
export const get: APIRoute = async ({ cookies, params }) => {
  const token = cookies.get("token").value;
  const book_id = params.book_id;
  const isAuthorized = await validateJwt(token);

  if (!book_id) {
    return new Response("No book id provided", {
      status: 400,
    });
  }

  if (!isAuthorized) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const getBook = promise(
    grpcClient.getBookById.bind(grpcClient),
    includeToken(token)
  );

  const getBookRequest = new grpc.GetBookByIdRequest();
  getBookRequest.setId(book_id);

  try {
    const result = await getBook(getBookRequest);
    if (!result) return new Response("Book not found", { status: 404 });
    if (!result.getIsOwned())
      return new Response("You do not own this book", { status: 401 });

    const command = new ListObjectsCommand({
      Bucket: "audiobook-development",
      Prefix: `books/${book_id}`,
    });

    const res = await client.send(command);
    const keys = res.Contents?.map((c) => c.Key?.split("/").at(-1));
    if (!keys) return new Response("Audio files not found", { status: 404 });

    const cfCookies = getSignedCookies({
      keyPairId: env.AWS_CLOUDFRONT_KEYPAIR_ID!,
      privateKey: env.AWS_CLOUDFRONT_PRIVATE_KEY!,
      url: `https://${env.AWS_CLOUDFRONT_DISTRIBUTION_DOMAIN!}/books/${book_id}`,
      dateLessThan: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    });

    for (const [key, value] of Object.entries(cfCookies)) {
      cookies.set(key, value);
    }

    return new Response(JSON.stringify(keys), {
      status: 200,
    });
  } catch (e: unknown) {
    console.error(e);
    return new Response(undefined, {
      status: 500,
    });
  }
};
