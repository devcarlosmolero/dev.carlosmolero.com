import { SITE_DEFAULT_LOCALE, SITE_SUPPORTED_LOCALES } from "~/consts";

function getLocaleFromPathname(pathname:string){
    const locale = pathname.split("/")[1];

    if (SITE_SUPPORTED_LOCALES.indexOf(locale) > -1) {
        return locale;
        
      }

      return SITE_DEFAULT_LOCALE
}

const LocalizationUtils = {getLocaleFromPathname}

export default LocalizationUtils