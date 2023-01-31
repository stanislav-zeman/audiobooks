import type { APIRoute } from "astro";
import { nanoid } from "nanoid";

export const get: APIRoute = async () => {
  const id = nanoid();
  return new Response(id, {
    headers: {
      "content-type": "text/plain",
    },
  });
};
