import { AUTH0_META } from "@utils/auth/AUTH0_META";
import { codeChallenge } from "@utils/auth/createCodeChallenge";
import type { APIRoute } from "astro";

type TokenResponse = {
  access_token: string;
  refresh_token: string;
  id_token: string;
  token_type: string;
  expires_in: number;
};

export const get: APIRoute = async ({ url, redirect }) => {
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code || !state || !codeChallenge.verifier) {
    return redirect("/auth/login");
  }

  console.log("codeConfirm", code);
  console.log("stateConfirm", state);
  console.log("codeChallengeConfirm", codeChallenge);

  const body = new URLSearchParams();

  body.append("grant_type", "authorization_code");
  body.append("token_endpoint_auth_method", "none");
  body.append("client_id", AUTH0_META.clientId);
  body.append("code_verifier", codeChallenge.verifier);
  body.append("code", code);
  body.append("redirect_uri", AUTH0_META.redirectUri);

  const reqInit: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  };

  // Clear the code challenge, it is no longer needed

  const req = await fetch(`https://${AUTH0_META.domain}/oauth/token`, reqInit);

  codeChallenge.purge();
  const res: TokenResponse = await req.json();

  console.log(res);

  return new Response(JSON.stringify(res), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
};
