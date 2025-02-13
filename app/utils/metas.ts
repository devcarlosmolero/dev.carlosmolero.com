import {
    SITE_BASE_URL,
    SITE_EMAIL,
    SITE_LINKEDIN_URL,
    SITE_PHONE_NUMBER,
    SITE_SUPPORTED_LOCALES,
    SITE_X_HANDLE,
    SITE_X_URL,
} from '~/consts'

function getBasic({
    title,
    description,
    image,
    robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
}: {
    title: string
    description: string
    image?: string
    robots?: string
}) {
    return [
        { title: title },
        {
            property: 'og:title',
            content: title,
        },
        {
            name: 'description',
            content: description,
        },
        {
            property: 'og:description',
            content: description,
        },
        {
            name: 'robots',
            content: robots,
        },
        {
            property: 'og:type',
            content: 'website',
        },
        {
            property: 'og:image',
            content: image,
        },
        {
            property: 'og:image:type',
            content: 'image/webp',
        },
        {
            name: 'twitter:card',
            content: 'summary_large_image',
        },
        {
            name: 'twitter:title',
            content: title,
        },
        {
            name: 'twitter:name',
            content: SITE_X_HANDLE,
        },
    ]
}

function getPersonJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'http://schema.org/Person',
        url: SITE_BASE_URL,
        logo: `/carlos-molero.png`,
        sameAs: [SITE_X_URL, SITE_LINKEDIN_URL],
        contactPoint: [
            {
                '@type': 'ContactPoint',
                telephone: SITE_PHONE_NUMBER,
                contactType: 'customer service',
                email: SITE_EMAIL,
                availableLanguage: JSON.stringify(SITE_SUPPORTED_LOCALES),
            },
        ],
    }
}

const MetaUtils = { 
    getBasic,
    getPersonJsonLd
}

export default MetaUtils;
