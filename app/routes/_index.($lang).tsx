import { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Fragment } from "react/jsx-runtime";
import { getContentfulAuthEnvVariables } from "~/actions/contentful";
import Localization from "~/actions/localization";
import Posts from "~/actions/posts";
import Resources from "~/actions/resources";
import BlogPostsGroup from "~/components/organisms/BlogPostsGroup";
import Navbar from "~/components/organisms/Navbar";
import ResourcesLinkGroup from "~/components/organisms/ResourcesLinkGroup";
import ServicesButtonGroup from "~/components/organisms/ServicesButtonGroup";
import Container from "~/components/templates/Container";
import SidebarLayout from "~/components/templates/SidebarLayout";
import { IBlogPost, IResource } from "~/types/contentful";
import LocalizationUtils from "~/utils/localization";
import MetaUtils from "~/utils/metas";

export async function loader({ request, context }: LoaderFunctionArgs) {
  const locale = LocalizationUtils.getLocaleFromPathname(new URL(request.url).pathname)
  const translation = await Localization.get(locale, ["sidebar", "index"], context);

  const posts = await Posts.latest(4, getContentfulAuthEnvVariables(context))
    .appendHeaderImgUrls()
    .formatDates()
    .get();

  const resources = await Resources.latest(
    8,
    getContentfulAuthEnvVariables(context)
  )
    .formatDates()
    .get();

  return {
    posts,
    resources,
    translation
  };
}

//@ts-expect-error idk
export const meta: MetaFunction = (payload: { data: { translation: any } }) => {
  const { translation } = payload.data

  return [
    ...MetaUtils.getBasic({
      title: translation.index.metas.title,
      description: translation.index.metas.description,
    }),
    {
      "script:ld+json": [MetaUtils.getPersonJsonLd()],
    },
  ];
};

export default function IndexPage() {
  const { posts, resources, translation } = useLoaderData<typeof loader>();

  return (
    <Fragment>
      <Navbar translation={(translation as any).sidebar} />
      <SidebarLayout.Root>
        <SidebarLayout.Left translation={(translation as any).sidebar}>
          <Container className="space-y-8">
            <div className="w-full space-y-5">
              <h1 className="text-4xl font-bold tracking-tighter">
                {(translation as any).index.topHeader}
              </h1>
              <div className="space-y-5">
                {(translation as any).index.paragraphs.map((p: string, index: number) => <p key={index} dangerouslySetInnerHTML={{ __html: p }} />)}
              </div>
            </div>
            <div className="w-full space-y-5">
              <h2 className="text-3xl font-bold tracking-tighter">
                {(translation as any).index.servicesHeader}
              </h2>
              <ServicesButtonGroup
                labels={(translation as any).index.services}
              />
            </div>
            <div className="w-full space-y-5">
              <h2 className="text-3xl font-bold tracking-tighter">
                {(translation as any).index.resourcesHeader}
              </h2>
              <ResourcesLinkGroup translation={translation} resources={resources as IResource[]} />
            </div>
            <div className="w-full space-y-5">
              <h2 className="text-3xl font-bold tracking-tighter">
                {(translation as any).index.latestBlogPostsHeader}
              </h2>
              <BlogPostsGroup translation={translation}
                posts={
                  posts?.map((post) => {
                    return {
                      ...post,
                      slug: `/blog/${post.slug}`,
                    };
                  }) as IBlogPost[]
                }
              />
            </div>
          </Container>
        </SidebarLayout.Left>
        <SidebarLayout.Right>
          <SidebarLayout.UserPart translation={(translation as any).sidebar} />
        </SidebarLayout.Right>
      </SidebarLayout.Root>
    </Fragment>
  );
}
