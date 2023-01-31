import { AUTH0_META } from "@utils/auth/AUTH0_META";
import { codeChallenge } from "@utils/auth/createCodeChallenge";
import type { APIRoute } from "astro";
import type { Token as Tokens } from "@utils/auth/Token";

export const get: APIRoute = async ({ url, redirect, cookies }) => {
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code || !state || !codeChallenge.verifier) {
    // Retries login, it possibly failed
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
  body.append("redirect_uri", `${url.origin}${AUTH0_META.redirectPath}`);

  const reqInit: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  };

  // Clear the challenge, it is no longer needed
  codeChallenge.yeet();

  const req = await fetch(`https://${AUTH0_META.domain}/oauth/token`, reqInit);

  if (!req.ok) return redirect("/", 302);

  const res: Tokens = await req.json();

  cookies.set("token", res.id_token, { httpOnly: true, path: "/" });
  // cookies.set("refresh", res.refresh_token, { httpOnly: true, path: "/" });

  return redirect("/", 302);
};
