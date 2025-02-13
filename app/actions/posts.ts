import { format } from 'date-fns'
import {
    ContentfulFilters,
    IBlogPost,
    IContentfulAuth,
} from '~/types/contentful'
import {
    createContentfulFilters,
    createContentfulUrl,
    getAssetUrl,
} from './contentful'

async function appendHeaderImgUrls(posts: IBlogPost[], auth: IContentfulAuth) {
    const result = await Promise.all(
        posts.map(async (post) => {
            const headerImgUrl = await getAssetUrl(post.headerImg.sys.id, auth)
            return {
                ...post,
                headerImgUrl,
            }
        })
    )

    return result || []
}

function createApi(filters: ContentfulFilters, auth: IContentfulAuth) {
    const state = {
        filters,
        appendHeaderImgUrls: false,
        formatDates: false,
    }

    const api = {
        appendHeaderImgUrls() {
            state.appendHeaderImgUrls = true
            return api
        },
        formatDates() {
            state.formatDates = true
            return api
        },
        async get() {
            const response = await fetch(
                createContentfulUrl(
                    createContentfulFilters(state.filters),
                    auth
                )
            )
            const { items } = (await response.json()) as any

            if (!items || items.length === 0) {
                return null
            }

            let posts = items.map((item: any) => ({
                ...item.fields,
                createdAt: item.sys.createdAt,
                updatedAt: item.sys.updatedAt,
            })) as IBlogPost[]

            if (state.appendHeaderImgUrls) {
                posts = await appendHeaderImgUrls(posts, auth)
            }

            if (state.formatDates) {
                posts = posts.map((post) => ({
                    ...post,
                    formattedCreatedAt: format(
                        new Date(post.createdAt!),
                        'dd/MM/yyyy'
                    ),
                    formattedUpdatedAt: format(
                        new Date(post.updatedAt!),
                        'dd/MM/yyyy'
                    ),
                }))
            }

            return posts
        },
    }

    return api
}

const Posts = {
    getBySlug(slug: string, auth: IContentfulAuth) {
        const filters = {
            contentType: 'post',
            where: `fields.slug=${slug}`,
        }

        return createApi(filters, auth)
    },
    getRelatedByCategory(
        categories: string[],
        slug: string,
        auth: IContentfulAuth
    ) {
        const filters = {
            contentType: 'post',
            select: [
                'fields.seoTitle',
                'fields.seoDescription',
                'fields.headerImg',
                'fields.slug',
                'sys',
            ],
            limit: 4,
            where: `fields.categories[in]=${categories.join(',')}&fields.slug[ne]=${slug}`,
        }

        return createApi(filters, auth)
    },
    async count(auth: IContentfulAuth, categories: string[] = []) {
        const filters = {
            contentType: 'post',
            where: '',
            select: ['sys'],
        }

        if (categories.length > 0) {
            filters.where = `fields.categories[in]=${categories.join(',')}`
        }

        const response = await fetch(
            createContentfulUrl(createContentfulFilters(filters), auth)
        )
        const { total } = (await response.json()) as any
        return total
    },
    all(limit = 9, skip = 0, auth: IContentfulAuth, categories: string[] = []) {
        const filters = {
            contentType: 'post',
            limit,
            skip,
            select: [
                'fields.seoTitle',
                'fields.seoDescription',
                'fields.slug',
                'fields.headerImg',
                'fields.categories',
                'sys',
            ],
            where: '',
            order: '-sys.createdAt',
        }

        if (categories.length > 0) {
            filters.where = `fields.categories[in]=${categories.join(',')}`
        }

        return createApi(filters, auth)
    },

    latest(limit = 6, auth: IContentfulAuth) {
        const filters = {
            contentType: 'post',
            limit,
            select: [
                'fields.seoTitle',
                'fields.seoDescription',
                'fields.slug',
                'fields.headerImg',
                'fields.categories',
                'sys',
            ],
            order: '-sys.createdAt',
        }

        return createApi(filters, auth)
    },
}
export default Posts
