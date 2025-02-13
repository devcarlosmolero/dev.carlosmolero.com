import { createCookie } from "@remix-run/cloudflare";

export const localeCookie = createCookie("locale", {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });