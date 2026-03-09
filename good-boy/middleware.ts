import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "./lib/i18n/settings";

function getPreferredLocale(request: NextRequest): string {
  const acceptLang = request.headers.get("accept-language") ?? "";
  for (const entry of acceptLang.split(",")) {
    const lang = entry.split(";")[0].trim().toLowerCase();
    for (const locale of locales) {
      if (lang === locale || lang.startsWith(`${locale}-`)) return locale;
    }
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if path already starts with a supported locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  // Redirect to default/preferred locale
  const locale = getPreferredLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|icons|images|logo\\.svg|favicon\\.ico|api).*)"],
};
