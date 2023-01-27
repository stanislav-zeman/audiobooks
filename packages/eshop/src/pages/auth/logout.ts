import type { APIRoute } from "astro";

export const get: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete("token", { path: "/" });
  cookies.delete("refresh", { path: "/" });

  return redirect("/");
};
