import type { APIRoute } from "astro";
import { Upload } from "@aws-sdk/lib-storage";
import { validateJwt } from "@utils/auth/validateJwt";
import { client } from "@utils/s3/client";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl, getSignedCookies } from "@aws-sdk/cloudfront-signer";
import env from "@utils/env";

export const post: APIRoute = async ({ cookies, params, request }) => {
  const token = cookies.get("token").value;
  const book_id = params.book_id;
  const chapter_id = params.chapter_id;

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
    const parallelUploads3 = new Upload({
      client,
      params: {
        Bucket: "audiobook-development",
        Key: `books/${book_id}/${chapter_id}`,
        Body: request.body,
      },

      tags: [],
      queueSize: 4,
      partSize: 1024 * 1024 * 5,
      leavePartsOnError: false,
    });

    const res = await parallelUploads3.done();
    if (res.$metadata.httpStatusCode !== 200) {
      throw new Error("Upload failed");
    }
  } catch (e: unknown) {
    console.error(e);
    return new Response("Upload failed", {
      status: 500,
    });
  }

  return new Response("Upload successful", {
    status: 200,
  });
};
