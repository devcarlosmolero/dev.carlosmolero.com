import { AppLoadContext } from "@remix-run/cloudflare";
import { SITE_BASE_URL, SITE_BASE_URL_DEV, SITE_FETCHING_BASE_URL, SITE_FETCHING_BASE_URL_DEV } from "~/consts";

function getSiteBaseUrl(context: AppLoadContext) {
  return context.cloudflare.env.NODE_ENV === "development"
    ? SITE_BASE_URL_DEV
    : SITE_BASE_URL;
}

function getSiteFetchingBaseUrl(context: AppLoadContext) {
  return context.cloudflare.env.NODE_ENV === "development"
    ? SITE_FETCHING_BASE_URL_DEV
    : SITE_FETCHING_BASE_URL;
}

const ServerUtils = {
    getSiteBaseUrl,
    getSiteFetchingBaseUrl
};

export default ServerUtils;
