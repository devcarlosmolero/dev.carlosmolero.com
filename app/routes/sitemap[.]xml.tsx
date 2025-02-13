import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { getContentfulAuthEnvVariables } from "~/actions/contentful";
import Posts from "~/actions/posts";
import Resources from "~/actions/resources";
import { SITE_BASE_URL, SITE_STATIC_PATHS } from "~/consts";
import { IBlogPost, IResource } from "~/types/contentful";

export const loader: LoaderFunction = async ({
  context,
}: LoaderFunctionArgs) => {
  const [posts, resources] = await Promise.all([
    Posts.all(500, 0, getContentfulAuthEnvVariables(context)).get() as Promise<
      IBlogPost[]
    >,
    Resources.all(
      500,
      0,
      getContentfulAuthEnvVariables(context)
    ).get() as Promise<IResource[]>,
  ]);

  let entries = [...posts].map((entry) => ({
    slug: `blog/${entry.slug!}`,
    updatedAt: entry.updatedAt!,
  }));

  entries = entries.concat(
    [...resources].map((entry) => ({
      slug: `resources/${entry.slug!}`,
      updatedAt: entry.updatedAt!,
    }))
  );

  return new Response(renderXML(entries), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "x-content-type-options": "nosniff",
    },
  });
};

const renderXML = (entries: { slug: string; updatedAt: string }[]) => {
  const sourceXML = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${entries.map(
      (entry) => `<url>
      <loc>${SITE_BASE_URL}/${entry.slug}</loc>
      <lastmod>${entry.updatedAt}</lastmod>
    </url>`
    )}
    ${SITE_STATIC_PATHS.map(
      (path) => `<url>
      <loc>${SITE_BASE_URL}${path === "" ? "" : "/"}${path}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>`
    )}
  </urlset>`;

  return sourceXML;
};
