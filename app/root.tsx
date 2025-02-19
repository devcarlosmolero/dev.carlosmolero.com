import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  redirect,
  useLoaderData,
} from "@remix-run/react";
//@ts-expect-error idk
import stylesheet from "~/tailwind.css?url";
import { SITE_BASE_URL, SITE_BASE_URL_DOMAIN_DEV, SITE_DEFAULT_LOCALE } from "./consts";
import { localeCookie } from "./cookies";
import LocalizationUtils from "./utils/localization";
import ServerUtils from "./utils/server";

export async function loader({ request, context }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const hostname = url.hostname;
  const hasWWW = hostname.includes("www");
  const isLocal = hostname.includes(SITE_BASE_URL_DOMAIN_DEV);
  const searchString = url.search;


  if (!hasWWW && !isLocal) {
    return redirect(`${SITE_BASE_URL}${pathname}${searchString}`, { status: 301 });
  }

  const localeCookieHeader = request.headers.get("Cookie");
  const localeCookieValue = await localeCookie.parse(localeCookieHeader);

  const localeFromPathname = LocalizationUtils.getLocaleFromPathname(pathname);

  if (localeCookieValue?.locale && localeCookieValue.locale !== localeFromPathname) {
    const newPathname = pathname.replace(`/${localeFromPathname}`, "") || "/";
    const newUrl = `${ServerUtils.getSiteBaseUrl(context)}/${localeCookieValue.locale}${newPathname}${searchString}`;
    return redirect(newUrl, { status: 301 });
  }

  if (!localeFromPathname) {
    const newUrl = `${ServerUtils.getSiteBaseUrl(context)}/${SITE_DEFAULT_LOCALE}${pathname}${searchString}`;
    return redirect(newUrl, { status: 301 });
  }

  const newLocaleCookieHeader = await localeCookie.serialize({ locale: localeFromPathname });

  return json({ url: request.url, localeFromPathname }, {
    headers: {
      "Set-Cookie": newLocaleCookieHeader,
    },
  });
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export default function App() {
  const { url, localeFromPathname } = useLoaderData<typeof loader>();

  return (
    <html lang={localeFromPathname}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href={`/carlos-molero.png`} />
        <link rel="canonical" href={url} />
        <meta property="og:url" content={url} />
        <meta property="og:locale" content={localeFromPathname} />
        <Meta />
        <Links />
      </head>
      <body>
        <main>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
        </main>
      </body>
    </html>
  );
}
