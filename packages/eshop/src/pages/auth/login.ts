import type { APIRoute } from "astro";

export const get: APIRoute = async ({ redirect }) => {
  return redirect(
    "https://audiobooks-dev.eu.auth0.com/authorize?response_type=token&client_id=Jdr2hHjLKjN2as1BceKk5Y8UOqseFD4l&redirect_uri=http://localhost:3000/auth/callback"
  );
};
