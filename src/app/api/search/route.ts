import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";

export async function GET() {
  const posts = await getAllPosts();

  const content = posts.map((post) => ({
    id: post.slug,
    type: "blog" as const,
    slug: post.slug,
    title: post.frontmatter.title,
    summary: post.frontmatter.summary,
    category: post.frontmatter.category,
    tags: post.frontmatter.tags,
    date: post.frontmatter.date,
    readTime: post.readTime,
  }));

  return NextResponse.json(content);
}
