import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Comments from "@/components/comments";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/lib/mdx";
import CopyLinkButton from "@/components/copy-link-button";

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    return {
      title: post.frontmatter.title,
      description: post.frontmatter.summary,
    };
  } catch {
    return {
      title: "Post Not Found",
    };
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post;
  try {
    post = await getPostBySlug(slug);
  } catch (error) {
    notFound();
  }

  // Get related posts (same category, exclude current post)
  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter(
      (p) =>
        p.frontmatter.category === post.frontmatter.category && p.slug !== post.slug
    )
    .slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 md:py-16 lg:py-24">
        <article className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Back Button */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              返回博客
            </Link>

            {/* Article Header */}
            <header className="mb-12 pb-8 border-b border-border/40">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {post.frontmatter.category}
                </span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <time dateTime={post.frontmatter.date}>
                    {new Date(post.frontmatter.date).toLocaleDateString("zh-CN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>阅读时长 {post.readTime}</span>
                </div>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 leading-tight">
                {post.frontmatter.title}
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                {post.frontmatter.summary}
              </p>

              <div className="flex flex-wrap items-center gap-2">
                {post.frontmatter.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag.toLowerCase()}`}
                    className="inline-block px-3 py-1.5 rounded-lg bg-muted text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </header>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none dark:prose-invert mb-16">
              <MDXRemote
                source={post.content}
                components={mdxComponents}
              />
            </div>

            {/* Share Section */}
            <div className="flex items-center justify-between p-6 rounded-xl bg-muted/30 border border-border/40 mb-12">
              <div className="font-medium">分享这篇文章</div>
              <div className="flex items-center gap-2">
                <CopyLinkButton />
              </div>
            </div>

            {/* Comments */}
            <Comments />

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="pt-8 border-t border-border/40 mt-12">
                <h2 className="font-display text-2xl font-bold mb-6">相关文章</h2>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      href={`/blog/${relatedPost.slug}`}
                      className="block p-4 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-accent transition-all"
                    >
                      <h3 className="font-medium group-hover:text-primary transition-colors">
                        {relatedPost.frontmatter.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="grid sm:grid-cols-2 gap-4 mt-12 pt-8 border-t border-border/40">
              <Link
                href="/blog"
                className="flex items-center gap-2 p-4 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-accent transition-all"
              >
                <ArrowLeft className="h-5 w-5 text-muted-foreground" />
                <div className="text-left">
                  <div className="text-xs text-muted-foreground mb-1">返回</div>
                  <div className="font-medium">博客列表</div>
                </div>
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
