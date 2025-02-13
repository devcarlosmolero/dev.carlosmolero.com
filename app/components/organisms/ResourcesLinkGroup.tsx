import { ChevronRight } from 'lucide-react'
import { Fragment } from 'react/jsx-runtime'
import { IComponentWithTranslation } from '~/types/components'
import { IResource } from '~/types/contentful'

export default function ResourcesLinkGroup({
    resources,
    translation
}: IComponentWithTranslation & {
    resources: IResource[]
}) {
    return (
        <Fragment>
            {resources && resources.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                    {resources.map(
                        ({ seoTitle, slug }: IResource, index: number) => (
                            <a
                                className="flex items-center gap-x-1 font-bold text-primary hover:underline"
                                key={index}
                                href={`/resources/${slug}`}
                            >
                                <ChevronRight className="size-4" />
                                <p className="w-full">{seoTitle}</p>
                            </a>
                        )
                    )}
                </div>
            ) : (
                <p>{(translation as any).common.noResourcesMessage}</p>
            )}
        </Fragment>
    )
}
