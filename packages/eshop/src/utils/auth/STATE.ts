import { b64UrlEncode } from "./b64UrlEncode";
import crypto from "crypto";

export const STATE = b64UrlEncode(crypto.randomBytes(4));
