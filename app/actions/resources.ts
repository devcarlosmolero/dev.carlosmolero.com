import { format } from 'date-fns'
import {
    ContentfulFilters,
    IContentfulAuth,
    IResource,
} from '~/types/contentful'
import { createContentfulFilters, createContentfulUrl } from './contentful'

function createApi(filters: ContentfulFilters, auth: IContentfulAuth) {
    const state = {
        filters,
        formatDates: false,
    }

    const api = {
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

            let resources = items.map((item: any) => ({
                ...item.fields,
                createdAt: item.sys.createdAt,
                updatedAt: item.sys.updatedAt,
            })) as IResource[]

            if (state.formatDates) {
                resources = resources.map((resource) => ({
                    ...resource,
                    formattedCreatedAt: format(
                        new Date(resource.createdAt!),
                        'dd/MM/yyyy'
                    ),
                    formattedUpdatedAt: format(
                        new Date(resource.updatedAt!),
                        'dd/MM/yyyy'
                    ),
                }))
            }

            return resources
        },
    }

    return api
}

const Resources = {
    getBySlug(slug: string, auth: IContentfulAuth) {
        const filters = {
            contentType: 'resource',
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
            contentType: 'resource',
            select: [
                'fields.seoTitle',
                'fields.seoDescription',
                'fields.slug',
                'sys',
            ],
            limit: 5,
            where: `fields.categories[in]=${categories.join(',')}&fields.slug[ne]=${slug}`,
        }

        return createApi(filters, auth)
    },
    async count(auth: IContentfulAuth) {
        const filters = {
            contentType: 'resource',
            select: ['sys'],
        }

        const response = await fetch(
            createContentfulUrl(createContentfulFilters(filters), auth)
        )
        const { total } = (await response.json()) as any
        return total
    },
    all(limit = 9, skip = 0, auth: IContentfulAuth, categories: string[] = []) {
        const filters = {
            contentType: 'resource',
            limit,
            skip,
            select: [
                'fields.seoTitle',
                'fields.seoDescription',
                'fields.slug',
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
            contentType: 'resource',
            limit,
            select: [
                'fields.seoTitle',
                'fields.seoDescription',
                'fields.slug',
                'fields.categories',
                'sys',
            ],
            order: '-sys.createdAt',
        }

        return createApi(filters, auth)
    },
}
export default Resources
