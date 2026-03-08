import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { readingTime } from "reading-time-estimator";
import { Post } from "@/types";

const postsDirectory = path.join(process.cwd(), "content/posts");

export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  // Check if file exists
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${slug}`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data as any,
    content,
    readTime: readingTime(content).text,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const slugs = fileNames
    .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.(mdx|md)$/, ""));

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      try {
        return await getPostBySlug(slug);
      } catch (error) {
        console.error(`Error loading post ${slug}:`, error);
        return null;
      }
    })
  );

  // Filter out nulls and drafts
  const validPosts = posts
    .filter((post): post is Post => post !== null && !post.frontmatter.draft)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date);
      const dateB = new Date(b.frontmatter.date);
      return dateB.getTime() - dateA.getTime();
    });

  return validPosts;
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(
    (post) => post.frontmatter.category.toLowerCase() === category.toLowerCase()
  );
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) =>
    post.frontmatter.tags.some(
      (t) => t.toLowerCase() === tag.toLowerCase()
    )
  );
}

export async function getCategories(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const categories = new Set(allPosts.map((post) => post.frontmatter.category));
  return Array.from(categories).sort();
}

export async function getTags(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const tags = new Set(allPosts.flatMap((post) => post.frontmatter.tags));
  return Array.from(tags).sort();
}

export async function getSeries(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const series = new Set(
    allPosts
      .map((post) => post.frontmatter.series)
      .filter((s): s is string => !!s)
  );
  return Array.from(series).sort();
}

export async function getPostsBySeries(series: string): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts
    .filter((post) => post.frontmatter.series === series)
    .sort((a, b) => {
      const orderA = a.frontmatter.seriesOrder || 0;
      const orderB = b.frontmatter.seriesOrder || 0;
      return orderA - orderB;
    });
}
