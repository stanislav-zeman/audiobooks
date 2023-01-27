import type { APIRoute } from "astro";

import { AUTH0_META } from "@utils/auth/AUTH0_META";
import { codeChallenge } from "@utils/auth/createCodeChallenge";

export const get: APIRoute = async ({ redirect }) => {
  codeChallenge.create();

  const { challenge, verifier } = codeChallenge;

  if (!challenge || !verifier) {
    return redirect("/");
  }

  const url = new URL(`https://${AUTH0_META.domain}/authorize`);

  url.searchParams.set("response_type", "code");
  url.searchParams.set("code_challenge", challenge);
  url.searchParams.set("code_challenge_method", "S256");
  url.searchParams.set("client_id", AUTH0_META.clientId);
  url.searchParams.set("redirect_uri", AUTH0_META.redirectUri);
  url.searchParams.set("scope", AUTH0_META.scope);
  url.searchParams.set("state", AUTH0_META.state);

  console.log("verifier", verifier);
  console.log("challenge", challenge);
  console.log("url", url.toString());

  return redirect(url.toString());
};
