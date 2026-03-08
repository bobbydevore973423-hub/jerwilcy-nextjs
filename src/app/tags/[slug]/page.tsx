import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import { getPostsByTag, getPostsByCategory, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const allPosts = await getAllPosts();
  const allTags = new Set(allPosts.flatMap(post => post.frontmatter.tags));
  return Array.from(allTags).map((tag) => ({
    slug: tag.toLowerCase(),
  }));
}

export default async function TagPage({ params }: { params: { slug: string } }) {
  const allPosts = await getAllPosts();

  // Try to find posts by tag or category
  const postsByTag = await getPostsByTag(params.slug).catch(() => []);
  const postsByCategory = await getPostsByCategory(params.slug).catch(() => []);

  const posts = postsByTag.length > 0 ? postsByTag : postsByCategory;
  const tagName = params.slug;

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 md:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Back Button */}
            <Link
              href="/tags"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              返回标签列表
            </Link>

            {/* Header */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Tag className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="font-display text-4xl font-bold capitalize">
                    {tagName}
                  </h1>
                  <p className="text-muted-foreground">
                    {posts.length} 篇相关文章
                  </p>
                </div>
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <time>{new Date(post.frontmatter.date).toLocaleDateString("zh-CN")}</time>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>阅读时长 {post.readTime}</span>
                      </div>
                    </div>

                    <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {post.frontmatter.title}
                    </h3>

                    <p className="text-muted-foreground line-clamp-2">
                      {post.frontmatter.summary}
                    </p>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
