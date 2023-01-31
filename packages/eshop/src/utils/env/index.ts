const BACKEND_URL = import.meta.env.BACKEND_URL || "http://localhost:9000";
const AWS_ACCESS_KEY_ID = import.meta.env.AWS_S3_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = import.meta.env.AWS_S3_SECRET_ACCESS_KEY;
const AWS_REGION = import.meta.env.AWS_S3_REGION || "eu-central-1";
const AWS_BUCKET = import.meta.env.AWS_BUCKET || "audiobook-development";
const AWS_CLOUDFRONT_DISTRIBUTION_DOMAIN = import.meta.env
  .AWS_CLOUDFRONT_DISTRIBUTION_DOMAIN;
const AWS_CLOUDFRONT_KEYPAIR_ID = import.meta.env.AWS_CLOUDFRONT_KEYPAIR_ID;
const AWS_CLOUDFRONT_PRIVATE_KEY = import.meta.env.AWS_CLOUDFRONT_PRIVATE_KEY;

if (typeof window !== "undefined") {
  if (!AWS_ACCESS_KEY_ID) throw new Error("AWS_ACCESS_KEY_ID is not defined");
  if (!AWS_SECRET_ACCESS_KEY)
    throw new Error("AWS_SECRET_ACCESS_KEY is not defined");
  if (!AWS_CLOUDFRONT_DISTRIBUTION_DOMAIN)
    throw new Error("AWS_CLOUDFRONT_DISTRIBUTION_DOMAIN is not defined");
  if (!AWS_CLOUDFRONT_KEYPAIR_ID)
    throw new Error("AWS_CLOUDFRONT_KEYPAIR_ID is not defined");
  if (!AWS_CLOUDFRONT_PRIVATE_KEY)
    throw new Error("AWS_CLOUDFRONT_PRIVATE_KEY is not defined");
}
/**
 * # DO NOT USE THESE IN A CLIENT SIDE CONTEXT
 *
 * If you want to do that, prefix with _PUBLIC
 */
const env = {
  BACKEND_URL,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  AWS_BUCKET,
  AWS_CLOUDFRONT_DISTRIBUTION_DOMAIN,
  AWS_CLOUDFRONT_KEYPAIR_ID,
  AWS_CLOUDFRONT_PRIVATE_KEY,
};

export const getCoverUrl = (book_id: string) =>
  `https://${env.AWS_CLOUDFRONT_DISTRIBUTION_DOMAIN!}/cover/${book_id}`;

export default env;
