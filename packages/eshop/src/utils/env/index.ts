const isProduction = process.env.NODE_ENV === "production";
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:9000";
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_REGION = process.env.AWS_REGION || "eu-central-1";
export const AWS_BUCKET = process.env.AWS_BUCKET || "audiobook-development";

if (!AWS_ACCESS_KEY_ID) throw new Error("AWS_ACCESS_KEY_ID is not defined");
if (!AWS_SECRET_ACCESS_KEY)
  throw new Error("AWS_SECRET_ACCESS_KEY is not defined");

/**
 * # DO NOT USE THESE IN A CLIENT SIDE CONTEXT
 *
 * If you want to do that, pass is via `Astro.props`
 */
const env = {
  isProduction,
  BACKEND_URL,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  AWS_BUCKET,
};

export default env;
