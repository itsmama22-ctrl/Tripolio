const DEFAULT_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export function absoluteUrl(path = "/") {
  if (!path.startsWith("/")) {
    return path;
  }
  const base = DEFAULT_SITE_URL.replace(/\/$/, "");
  return `${base}${path}`;
}

