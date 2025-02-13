import { LoaderFunctionArgs, redirect } from "@remix-run/cloudflare";
import { SITE_SUPPORTED_LOCALES } from "~/consts";
import { localeCookie } from "~/cookies";
import ServerUtils from "~/utils/server";

export async function loader({request, context}:LoaderFunctionArgs){
    
   const searchParams = new URL(request.url).searchParams
   const locale = searchParams.get("locale")
   let redirectBack = request.headers.get("Referer")!

   for(const supportedLocale of SITE_SUPPORTED_LOCALES){
    redirectBack = redirectBack.replace(`/${supportedLocale}`, "")
   }

   let redirectBackPathname = new URL(redirectBack).pathname

   if(redirectBackPathname.endsWith("/")){
    redirectBackPathname = redirectBackPathname.substring(0, redirectBackPathname.length - 1)
   }

     const localeCookieHeader = await localeCookie.serialize("", {
        expires: new Date(0)
     });

    
    return redirect(`${ServerUtils.getSiteBaseUrl(context)}${locale ? `/${locale}`:``}${redirectBackPathname}`,{headers: {
        "Set-Cookie": localeCookieHeader
    }})
}