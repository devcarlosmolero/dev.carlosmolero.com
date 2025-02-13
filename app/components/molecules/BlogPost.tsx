import { Fragment } from 'react/jsx-runtime'
import { IBlogPost } from '~/types/contentful'
import { FakeBackgroundImagePrimitive } from '../atoms/FakeBackgroundImagePrimitive'

export default function BlogPost({
    post,
    showCategories = true,
}: {
    post: IBlogPost
    showCategories?: boolean
}) {
    return (
        <Fragment>
            <div className="grid gap-5 rounded-lg md:grid-cols-2">
                <FakeBackgroundImagePrimitive.Container className="aspect-h-9 aspect-w-16 rounded-md">
                    <a href={`${post.slug}`}>
                        <FakeBackgroundImagePrimitive.Image
                            alt={post.seoTitle}
                            src={post.headerImgUrl!}
                        />
                    </a>
                </FakeBackgroundImagePrimitive.Container>

                <div>
                    <a href={`${post.slug}`}>
                        <p className="mb-3 text-xs text-gray-600">
                            {post.formattedUpdatedAt}
                        </p>
                        <h3 className="text-xl">{post.seoTitle}</h3>
                        <p className="line-clamp-3 text-sm text-gray-600">
                            {post.seoDescription}
                        </p>
                    </a>
                    {showCategories && (
                        <div className="mt-3 flex flex-wrap gap-x-2">
                            {post.categories.map(
                                (category: string, index: number) => (
                                    <a
                                        href={`/blog?category=${category}`}
                                        className="text-sm underline"
                                        key={index}
                                    >
                                        {category}
                                    </a>
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    )
}
