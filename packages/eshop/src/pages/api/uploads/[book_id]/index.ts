import type { APIRoute } from "astro";
import { validateJwt } from "@utils/auth/validateJwt";
import { client } from "@utils/s3/client";

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
  if (!request.body) {
    return new Response("No file provided", {
      status: 400,
    });
  }

  try {
  } catch (e: unknown) {}

  return new Response(
    // TODO: result
    {},
    {
      status: 200,
    }
  );
};
