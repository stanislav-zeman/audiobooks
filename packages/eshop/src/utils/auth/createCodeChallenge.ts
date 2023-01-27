import { b64UrlEncode } from "./b64UrlEncode";
import crypto from "crypto";

const createCodeChallenge = () => {
  const verifier = b64UrlEncode(crypto.randomBytes(32));

  const challenge = b64UrlEncode(
    crypto.createHash("sha256").update(verifier).digest()
  );

  return { challenge, verifier };
};

export class CodeChallenge {
  constructor(public challenge?: string, public verifier?: string) {}

  public create() {
    const { challenge, verifier } = createCodeChallenge();

    this.challenge = challenge;
    this.verifier = verifier;
  }

  public yeet() {
    this.challenge = undefined;
    this.verifier = undefined;
  }
}

export const codeChallenge = new CodeChallenge();
