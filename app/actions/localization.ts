import { AppLoadContext } from "@remix-run/cloudflare";
import ServerUtils from "~/utils/server";

async function get(locale:string, fileNames:string[], context:AppLoadContext){
    const json = {};

    fileNames = fileNames.concat("common")

    for(const fileName of fileNames){
        const resp = await fetch(`${ServerUtils.getSiteFetchingBaseUrl(context)}/locales/${locale}/${fileName}.json`)
        const respJSON = await resp.json();
        //@ts-expect-error idk
        json[fileName] = respJSON
    }

    return json
}

const Localization = {get};

export default Localization;
