import type { APIRoute } from "astro";
import { Upload } from "@aws-sdk/lib-storage";
import { validateJwt } from "@utils/auth/validateJwt";
import { client } from "@utils/s3/client";

export const post: APIRoute = async ({ cookies, params, request }) => {
  const token = cookies.get("token").value;
  const book_id = params.book_id;
  const chapter_id = params.chapter_id;

  const isAuthorized = await validateJwt(token);

  if (!isAuthorized) {
    return {
      status: 401,
      body: "Unauthorized",
    };
  }
  if (!request.body) {
    return {
      status: 400,
      body: "No file",
    };
  }

  try {
    const parallelUploads3 = new Upload({
      client,
      params: {
        Bucket: "audiobooks-development",

        Key: `books/${book_id}/${chapter_id}.mp3`,
        Body: request.body,
      },

      tags: [],
      queueSize: 4,
      partSize: 1024 * 1024 * 5,
      leavePartsOnError: false,
    });

    await parallelUploads3.done();
  } catch (e: unknown) {
    console.error(e);
    return {
      status: 500,
      body: "Upload failed",
    };
  }

  return {
    status: 200,
    body: "Upload successful",
  };
};
