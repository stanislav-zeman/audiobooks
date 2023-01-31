import type { APIRoute } from "astro";

import { AUTH0_META } from "@utils/auth/AUTH0_META";
import { codeChallenge } from "@utils/auth/createCodeChallenge";

export const get: APIRoute = async ({ redirect, url }) => {
  codeChallenge.create();

  const { challenge, verifier } = codeChallenge;

  if (!challenge || !verifier) {
    return redirect("/");
  }

  const loginUrl = new URL(`https://${AUTH0_META.domain}/authorize`);

  loginUrl.searchParams.set("response_type", "code");
  loginUrl.searchParams.set("code_challenge", challenge);
  loginUrl.searchParams.set("code_challenge_method", "S256");
  loginUrl.searchParams.set("client_id", AUTH0_META.clientId);
  loginUrl.searchParams.set(
    "redirect_uri",
    `${url.origin}${AUTH0_META.redirectPath}`
  );
  loginUrl.searchParams.set("scope", AUTH0_META.scope);
  loginUrl.searchParams.set("state", AUTH0_META.state);

  console.log("verifier", verifier);
  console.log("challenge", challenge);
  console.log("url", loginUrl.toString());

  return redirect(loginUrl.toString());
};
