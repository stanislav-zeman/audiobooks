const BACKEND_URL = import.meta.env.BACKEND_URL || "http://localhost:9000";
const AWS_ACCESS_KEY_ID = import.meta.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = import.meta.env.AWS_SECRET_ACCESS_KEY;
const AWS_REGION = import.meta.env.AWS_REGION || "eu-central-1";
export const AWS_BUCKET = import.meta.env.AWS_BUCKET || "audiobook-development";

if (!AWS_ACCESS_KEY_ID) throw new Error("AWS_ACCESS_KEY_ID is not defined");
if (!AWS_SECRET_ACCESS_KEY)
  throw new Error("AWS_SECRET_ACCESS_KEY is not defined");

/**
 * # DO NOT USE THESE IN A CLIENT SIDE CONTEXT
 *
 * If you want to do that, prefix with _PUBLIC
 */
const env: Record<string, string> = {
  BACKEND_URL,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  AWS_BUCKET,
};

export default env;
