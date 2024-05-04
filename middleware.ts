import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { LocaleOptionsType, localeOptions } from "./constants/locales";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api
     * - _next/static
     * - _next/image
     * - images
     * - favicon.ico
     * - fonts
     */
    "/",
    "/((?!api|_next/static|_next/image|images|favicon.ico|fonts|activate-account)(?!/[a-z]{2}/activate-account).*)",
    "/(hu|en)/:path*",
  ],
};

export function middleware(req: NextRequest) {
  const authCookie =
    req.cookies.get("next-auth.session-token") ||
    req.cookies.get("__Secure-next-auth.session-token");
  const defaultLocale =
    (req.headers.get("x-default-locale") as LocaleOptionsType) ||
    (localeOptions[0] as LocaleOptionsType);

  const url = req.nextUrl.clone();

  const path = req.nextUrl.pathname;

  if (
    !authCookie &&
    !path.includes("/activate-account") &&
    ![`/${defaultLocale}`, `/hu`].includes(req.nextUrl.pathname)
  ) {
    url.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(url);
  }
  if (
    authCookie &&
    [`/${defaultLocale}`, "/hu"].includes(req.nextUrl.pathname)
  ) {
    url.pathname = "dashboard";
    return NextResponse.redirect(url);
  }

  // Internationalization middleware logic
  const handleI18nRouting = createIntlMiddleware({
    locales: localeOptions,
    defaultLocale: defaultLocale as LocaleOptionsType,
  });
  const i18nResponse = handleI18nRouting(req);
  i18nResponse.headers.set("x-default-locale", defaultLocale);

  return i18nResponse;
}
