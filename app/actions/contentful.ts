import { AppLoadContext } from '@remix-run/cloudflare'
import { ContentfulFilters, IContentfulAuth } from '~/types/contentful'

const CONTENTFUL_CONFIG = ({
    spaceId,
    cdAccessToken,
    cmAccessToken,
}: IContentfulAuth) => {
    return {
        SPACE_ID: spaceId,
        CDA: {
            BASE_URL: 'https://cdn.contentful.com',
            ACCESS_TOKEN: cdAccessToken,
        },
        CMA: {
            BASE_URL: 'https://api.contentful.com',
            ACCESS_TOKEN: cmAccessToken,
        },
    }
}

export function getContentfulAuthEnvVariables(ctx: AppLoadContext) {
    return {
        spaceId: ctx.cloudflare.env.CONTENTFUL_SPACE_ID,
        cdAccessToken: ctx.cloudflare.env.CONTENTFUL_CDA_ACCESS_TOKEN,
        cmAccessToken: ctx.cloudflare.env.CONTENTFUL_CMA_ACCESS_TOKEN,
    } as IContentfulAuth
}

export function createContentfulFilters({
    contentType,
    where,
    skip,
    select,
    order,
    limit = 1,
}: ContentfulFilters) {
    let filtersQueryString = ''

    filtersQueryString += `&content_type=${contentType}`
    filtersQueryString += `&limit=${limit}`

    if (where && where.length > 0) {
        filtersQueryString += `&${where}`
    }

    if (select && select.length > 0) {
        filtersQueryString += `&select=${select?.join(',')}`
    }

    if (order && order.length > 0) {
        filtersQueryString += `&order=${order}`
    }

    if (skip && skip > 0) {
        filtersQueryString += `&skip=${skip}`
    }

    console.log('[contentful]:', {
        contentType,
        where,
        select,
        skip,
        order,
        limit,
    })

    return filtersQueryString
}

export function createContentfulUrl(filters: string, auth: IContentfulAuth) {
    const config = CONTENTFUL_CONFIG(auth)
    const url = `${config.CDA.BASE_URL}/spaces/${config.SPACE_ID}/entries?access_token=${config.CDA.ACCESS_TOKEN}${filters}`
    return url
}

export function createSingleContentfulUrl(
    entryId: string,
    auth: IContentfulAuth
) {
    const config = CONTENTFUL_CONFIG(auth)
    const url = `${config.CDA.BASE_URL}/spaces/${config.SPACE_ID}/environments/master/entries/${entryId}?access_token=${config.CDA.ACCESS_TOKEN}`
    return url
}

export function createContentfulAssetUrl(
    assetId: string,
    auth: IContentfulAuth
) {
    const config = CONTENTFUL_CONFIG(auth)
    const url = `${config.CDA.BASE_URL}/spaces/${config.SPACE_ID}/assets/${assetId}?access_token=${config.CDA.ACCESS_TOKEN}`
    return url
}

export async function getAssetUrl(assetId: string, auth: IContentfulAuth) {
    const response = await fetch(createContentfulAssetUrl(assetId, auth))
    const { fields } = (await response.json()) as any
    return fields.file.url as string
}

export async function getEntryById(entryId: string, auth: IContentfulAuth) {
    const response = await fetch(createSingleContentfulUrl(entryId, auth))
    const { fields } = (await response.json()) as any
    return fields
}
