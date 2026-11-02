export function safeNextPath(path: unknown, fallback = "/", origin?: string) {
  if (
    typeof path !== "string" ||
    !path.startsWith("/") ||
    path.startsWith("//") ||
    /[\\\s]/.test(path)
  ) {
    return fallback;
  }

  const currentOrigin = origin ?? window.location.origin;

  try {
    const url = new URL(path, currentOrigin);
    if (url.origin !== currentOrigin) return fallback;

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}
