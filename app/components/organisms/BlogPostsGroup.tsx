import { Fragment } from 'react/jsx-runtime'
import { IComponentWithTranslation } from '~/types/components'
import { IBlogPost } from '~/types/contentful'
import BlogPost from '../molecules/BlogPost'

export interface IBlogPostsGroupProps extends IComponentWithTranslation {
    posts: IBlogPost[]
    showCategories?: boolean
}

export default function BlogPostsGroup({
    posts,
    showCategories = true,
    translation
}: IBlogPostsGroupProps) {
    return (
        <Fragment>
            {posts && posts.length > 0 ? (
                <div className="grid gap-5 lg:grid-cols-2">
                    {posts.map((post) => (
                        <BlogPost
                            key={post.seoTitle}
                            showCategories={showCategories}
                            post={post}
                        />
                    ))}
                </div>
            ) : (
                <p>{(translation as any).common.noBlogPostsMessage}</p>
            )}
        </Fragment>
    )
}
