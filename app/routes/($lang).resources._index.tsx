import { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { Fragment } from 'react/jsx-runtime'
import { getContentfulAuthEnvVariables } from '~/actions/contentful'
import Localization from '~/actions/localization'
import Resources from '~/actions/resources'
import Navbar from '~/components/organisms/Navbar'
import ResourcesLinkGroup from '~/components/organisms/ResourcesLinkGroup'
import SelectableCategoriesGroup from '~/components/organisms/SelectableCategoriesGroup'
import Container from '~/components/templates/Container'
import SidebarLayout from '~/components/templates/SidebarLayout'
import { IResource } from '~/types/contentful'
import LocalizationUtils from '~/utils/localization'
import MetaUtils from '~/utils/metas'

export async function loader({ context, request }: LoaderFunctionArgs) {
    const locale = LocalizationUtils.getLocaleFromPathname(new URL(request.url).pathname)
    const translation = await Localization.get(locale, ["sidebar", "resources.index"], context);
    
    const searchParams = new URL(request.url).searchParams
    const category = searchParams.get('category')

    const resources = await Resources.all(
        20,
        0,
        getContentfulAuthEnvVariables(context),
        category ? [category!] : []
    )
        .formatDates()
        .get()

    const allResources = await Resources.all(
        200,
        0,
        getContentfulAuthEnvVariables(context)
    ).get()

    const allCategories = allResources
        ?.flatMap((resource) => resource.categories)
        .filter(Boolean)
    const categories = [...new Set(allCategories)]?.sort()

    return {
        resources,
        categories,
        category,
        translation
    }
}

//@ts-expect-error idk
export const meta: MetaFunction = (payload: { data: { translation: any } }) => {
    const { translation } = payload.data
  
    return [
      ...MetaUtils.getBasic({
        title: translation["resources.index"].metas.title,
        description: translation["resources.index"].metas.description,
      }),
    ];
  };

export default function ResourcesPage() {
    const { resources, categories, category, translation } = useLoaderData<typeof loader>()

    return (<Fragment>
        <Navbar translation={(translation as any).sidebar}/>
        <SidebarLayout.Root>
            <SidebarLayout.Left translation={(translation as any).sidebar}>
                <Container className="space-y-5">
                    <SelectableCategoriesGroup
                        categoryType="resources"
                        categories={categories}
                        selected={category as string}
                    />
                    <hr className="!border-[#E4E4E4]" />
                    <ResourcesLinkGroup        translation={translation} resources={resources as IResource[]} />
                </Container>
            </SidebarLayout.Left>
            <SidebarLayout.Right>
                <SidebarLayout.UserPart translation={(translation as any).sidebar} />
            </SidebarLayout.Right>
        </SidebarLayout.Root>
    </Fragment>
    )
}
