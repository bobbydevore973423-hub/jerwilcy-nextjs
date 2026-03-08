import RSS from "rss";
import { getAllPosts } from "@/lib/posts";

export async function GET() {
  const posts = await getAllPosts();

  const feed = new RSS({
    title: "jerwilcy",
    description: "研究者与开发者，探索机器学习、计算机视觉和创意技术的交叉领域",
    feed_url: "https://jerwilcy.dev/rss.xml",
    site_url: "https://jerwilcy.dev",
    language: "zh-CN",
    copyright: `© ${new Date().getFullYear()} jerwilcy`,
  });

  posts.forEach((post) => {
    feed.item({
      title: post.frontmatter.title,
      description: post.frontmatter.summary,
      url: `https://jerwilcy.dev/blog/${post.slug}`,
      date: post.frontmatter.date,
      categories: [post.frontmatter.category, ...post.frontmatter.tags],
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
