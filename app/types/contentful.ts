export interface ContentfulFilters {
    contentType: string
    where?: string
    select?: string[]
    skip?: number
    order?: string
    limit?: number
}

export interface IBlogPost {
    seoTitle: string
    seoDescription: string
    content: string
    headerImg: any
    headerImgUrl?: string
    categories: string[]
    createdAt?: string
    updatedAt?: string
    formattedCreatedAt?: string
    formattedUpdatedAt?: string
    slug?: string
}

export interface IResource {
    seoTitle: string
    seoDescription: string
    content: string
    categories: string[]
    createdAt?: string
    updatedAt?: string
    formattedCreatedAt?: string
    formattedUpdatedAt?: string
    slug?: string
    url?: string
}

export interface IContentfulAuth {
    spaceId: string
    cdAccessToken: string
    cmAccessToken: string
}
