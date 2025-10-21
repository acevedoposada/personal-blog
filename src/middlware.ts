import { defineMiddleware } from "astro:middleware";

const ASSET_EXT = [
  "css","map","js","mjs","cjs","ts","tsx","jsx",
  "jpg","jpeg","png","webp","avif","gif","svg","ico","bmp","tiff",
  "woff","woff2","ttf","otf",
  "mp3","wav","ogg","mp4","webm",
  "wasm","pdf","txt","json","xml","webmanifest"
];

export const onRequest = defineMiddleware((ctx, next) => {
  const url = new URL(ctx.request.url);
  const path = url.pathname;

  if (path.startsWith("/_astro/") || path.startsWith("/assets/")) return next();

  const last = path.split("/").filter(Boolean).pop() ?? "";
  const ext = last.split(".").pop()?.toLowerCase();

  if (ext && ASSET_EXT.includes(ext)) {
    if (path === `/${last}`) return next();

    const target = `/${last}`;
    return Response.redirect(target + url.search, 307);
  }

  return next();
});
