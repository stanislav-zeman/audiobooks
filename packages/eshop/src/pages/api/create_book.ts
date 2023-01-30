import { validateJwt } from "@utils/auth/validateJwt";
import { type BookView, fromBookView } from "@utils/bookView";
import { grpcClient } from "@utils/grpc/client";
import { promise } from "@utils/grpc/promise";
import { includeToken } from "@utils/grpc/token";
import type { APIRoute } from "astro";

export const post: APIRoute = async ({ cookies, request }) => {
  const token = cookies.get("token").value;
  const isAuthorized = await validateJwt(token);

  if (!isAuthorized) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  if (!request.body) {
    return new Response("No body provided", {
      status: 400,
    });
  }

  try {
    const body: BookView = await request.json();
    const createBookRequest = fromBookView(body);

    const createBook = promise(grpcClient.addBook.bind(grpcClient));

    const result = await createBook(createBookRequest, includeToken(token));

    return new Response(
      JSON.stringify({
        result,
      }),
      { status: 200 }
    );
  } catch (e: unknown) {
    return new Response(
      JSON.stringify({
        error: e,
      }),
      { status: 500 }
    );
  }
};
