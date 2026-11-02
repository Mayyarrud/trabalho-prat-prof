import { safeNextPath } from "../lib/safe-next-path.ts";

export function authRedirectUrl(
  href: string,
  flow: "signup" | "recovery",
  next = "/",
) {
  const url = new URL(href);
  url.search = "";
  url.hash = "";
  url.searchParams.set("flow", flow);
  url.searchParams.set("next", safeNextPath(next, "/", url.origin));
  return url.toString();
}

type ExchangeCode = (code: string) => Promise<{
  data: { session: unknown; redirectType?: string | null };
  error: unknown;
}>;

export async function resolveAuthCallback(
  href: string,
  exchangeCode: ExchangeCode,
) {
  const url = new URL(href);
  const params = url.searchParams;
  const hashParams = new URLSearchParams(url.hash.slice(1));
  const hasError =
    params.has("error") ||
    params.has("error_description") ||
    hashParams.has("error") ||
    hashParams.has("error_description");
  const isCallback =
    params.has("code") ||
    hasError ||
    params.get("flow") === "signup" ||
    params.get("flow") === "recovery";

  if (!isCallback) return null;

  const code = params.get("code");
  if (hasError || !code) return "/auth/error";

  try {
    const { data, error } = await exchangeCode(code);
    if (error || !data.session) return "/auth/error";

    if (data.redirectType === "recovery" || params.get("flow") === "recovery") {
      return "/update-password";
    }

    return safeNextPath(params.get("next"), "/", url.origin);
  } catch {
    return "/auth/error";
  }
}
