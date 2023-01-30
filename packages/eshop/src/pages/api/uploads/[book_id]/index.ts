import type { APIRoute } from "astro";
import { validateJwt } from "@utils/auth/validateJwt";
import { client } from "@utils/s3/client";
import { ListObjectsCommand } from "@aws-sdk/client-s3";
// import { bucket } from "@utils/s3 "

/**
 * Lists all the media in the uploads folder for a given book.
 *
 * @param {string} book_id - The book id
 */
export const get: APIRoute = async ({ cookies, params, request }) => {
  const token = cookies.get("token").value;
  const book_id = params.book_id;

  const isAuthorized = await validateJwt(token);

  if (!isAuthorized) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const command = new ListObjectsCommand({
    Bucket: "audiobook-development",
    Prefix: `books/${book_id}`,
  });

  try {
    const res = await client.send(command);

    const keys = res.Contents?.map((c) => c.Key);
    if (!keys) return new Response(undefined, { status: 404 });

    return new Response(JSON.stringify(keys), {
      status: 200,
    });
  } catch (e: unknown) {
    return new Response(undefined, {
      status: 500,
    });
  }
};
