import { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { Eye } from 'lucide-react'
import Markdown from 'react-markdown'
import { Fragment } from 'react/jsx-runtime'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { getContentfulAuthEnvVariables } from '~/actions/contentful'
import Localization from '~/actions/localization'
import Resources from '~/actions/resources'
import Button from '~/components/atoms/Button'
import Navbar from '~/components/organisms/Navbar'
import ResourcesLinkGroup from '~/components/organisms/ResourcesLinkGroup'
import SelectableCategoriesGroup from '~/components/organisms/SelectableCategoriesGroup'
import Container from '~/components/templates/Container'
import SidebarLayout from '~/components/templates/SidebarLayout'
import useHighlight from '~/hooks/useHighlight'
import { IResource } from '~/types/contentful'
import LocalizationUtils from '~/utils/localization'
import MetaUtils from '~/utils/metas'

export async function loader({ request, context }: LoaderFunctionArgs) {
    const locale = LocalizationUtils.getLocaleFromPathname(new URL(request.url).pathname)
    const translation = await Localization.get(locale, ["sidebar", "resources.index"], context);

    const slug = new URL(request.url).pathname.split('/').pop()

    const resource = (
        (await Resources.getBySlug(
            slug!,
            getContentfulAuthEnvVariables(context)
        )
            .formatDates()
            .get()) as IResource[]
    )[0]

    const resourcesRelatedByCategory = await Resources.getRelatedByCategory(
        resource.categories,
        resource.slug!,
        getContentfulAuthEnvVariables(context)
    ).get()

    return { resource, resourcesRelatedByCategory, translation }
}

//@ts-expect-error idk
export const meta: MetaFunction = (payload: {
    data: { resource: IResource }
}) => {
    const { resource } = payload.data

    return [
        ...MetaUtils.getBasic({
            title: resource.seoTitle,
            description: resource.seoDescription,
        }),
    ]
}

export default function ResourcePage() {
    useHighlight()
    const { resource, resourcesRelatedByCategory, translation } =
        useLoaderData<typeof loader>()

    return (
        <Fragment>
            <Navbar translation={(translation as any).sidebar} />
            <SidebarLayout.Root>
                <SidebarLayout.Left translation={(translation as any).sidebar}>
                    <Container className="space-y-5">
                        <div>
                            <Button
                                variant="primary"
                                className="flex !w-fit !items-center !gap-x-1"
                                url={resource.url!}
                                target={
                                    resource.url?.includes('test')
                                        ? '_self'
                                        : '_blank'
                                }
                            >
                                <p className="w-full text-start">
                                    {(translation as any).common.see}
                                </p>
                                <Eye className='size-6' />
                            </Button>
                            <h1 className="mt-3 text-4xl font-bold tracking-tighter">
                                {resource.seoTitle}
                            </h1>
                            <p className="mt-2 text-gray-600">
                                {resource.seoDescription}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-x-2">
                                <SelectableCategoriesGroup
                                    categories={resource.categories}
                                    categoryType="resources"
                                />
                            </div>
                        </div>
                        <hr className="!border-[#E4E4E4]" />
                        <article className="prose-dark prose-pre:!p-0 prose-pre:bg-[#22272e] prose-pre:break-words prose-pre:whitespace-pre-wrap prose-pre:overflow-x-auto prose w-full !max-w-none prose-img:w-full prose-img:rounded-xl [&_h2:first-of-type]:mt-0">
                            <Markdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeSlug, rehypeRaw]}
                            >
                                {(resource as unknown as IResource).content}
                            </Markdown>
                        </article>
                        {resourcesRelatedByCategory &&
                            resourcesRelatedByCategory.length > 0 && (
                                <div className="space-y-5">
                                    <hr className="!border-[#E4E4E4]" />
                                    <h4 className="text-xl font-bold tracking-tighter">
                                        {(translation as any).common.alsoInThisCategory}
                                    </h4>
                                    <ResourcesLinkGroup translation={translation}
                                        resources={resourcesRelatedByCategory}
                                    />
                                </div>
                            )}
                    </Container>
                </SidebarLayout.Left>
                <SidebarLayout.Right>
                    <SidebarLayout.UserPart translation={(translation as any).sidebar} />
                </SidebarLayout.Right>
            </SidebarLayout.Root>
        </Fragment>
    )
}
