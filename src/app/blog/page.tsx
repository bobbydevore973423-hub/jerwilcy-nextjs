import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Calendar, Clock, Tag, ArrowLeft, ArrowRight } from "lucide-react";
import { getAllPosts, getCategories } from "@/lib/posts";

export const dynamic = 'force-static';

export default async function BlogPage() {
  const posts = await getAllPosts();
  const categories = ["全部", ...(await getCategories())];
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 md:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="max-w-3xl mb-12">
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              博客
            </h1>
            <p className="text-lg text-muted-foreground">
              关于机器学习、计算机视觉和创意技术的思考、教程和见解。({posts.length} 篇文章)
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-10 overflow-x-auto pb-2">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    category === "全部"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-card border border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <Tag className="h-3.5 w-3.5" />
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group rounded-xl bg-card border border-border p-6 sm:p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-md hover:-translate-y-1"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      <Tag className="h-3 w-3" />
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
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="block group-hover:text-primary transition-colors"
                >
                  <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
                    {post.frontmatter.title}
                  </h2>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {post.frontmatter.summary}
                  </p>
                </Link>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/50">
                  <div className="flex flex-wrap gap-2">
                    {post.frontmatter.tags.slice(0, 4).map((tag) => (
                      <Link
                        key={tag}
                        href={`/tags/${tag.toLowerCase()}`}
                        className="inline-block px-2.5 py-1 rounded-md bg-muted text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    阅读更多
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-3 mt-12 pt-8 border-t border-border/40">
            <button
              disabled
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground opacity-50 cursor-not-allowed"
            >
              <ArrowLeft className="h-4 w-4" />
              较新
            </button>
            <div className="flex items-center gap-2">
              <span className="h-10 w-10 inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-medium">
                1
              </span>
            </div>
            <button
              disabled
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground opacity-50 cursor-not-allowed"
            >
              较旧
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
