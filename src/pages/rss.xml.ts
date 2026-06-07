import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    return new Response('Site not configured', { status: 500 });
  }

  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  const items = posts.map((post) => {
    const link = new URL(`/blog/${post.id}`, site).toString();
    const pubDate = new Date(post.data.pubDate).toUTCString();
    const lastBuildDate = new Date(
      post.data.updatedDate ?? post.data.pubDate,
    ).toUTCString();
    const description = post.data.description;
    const categories = (post.data.tags ?? [])
      .map((tag) => `<category>${escapeXml(tag)}</category>`)
      .join('');
    return `
    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <lastBuildDate>${lastBuildDate}</lastBuildDate>
      <dc:creator><![CDATA[Mohd Haroon]]></dc:creator>
      <description>${escapeXml(description)}</description>
      ${categories}
    </item>`;
  });

  const lastBuildDate = posts[0]
    ? new Date(posts[0].data.updatedDate ?? posts[0].data.pubDate).toUTCString()
    : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Mohd Haroon — Engineering Blog</title>
    <link>${site.toString()}</link>
    <description>Engineering blog by Mohd Haroon on full stack development, TypeScript, Angular, AI tooling, and modern developer workflows.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${new URL('/rss.xml', site).toString()}" rel="self" type="application/rss+xml" />
    <managingEditor>me@haroonsaifi.dev (Mohd Haroon)</managingEditor>
    <webMaster>me@haroonsaifi.dev (Mohd Haroon)</webMaster>
    <copyright>Copyright © ${new Date().getFullYear()} Mohd Haroon</copyright>
    <dc:creator>Mohd Haroon</dc:creator>
    ${items.join('\n')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
};

function escapeXml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
