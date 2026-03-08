import Link from "next/link";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";

interface Post {
  slug: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  readTime: string;
  image?: string;
}

interface FeaturedPostsProps {
  posts: Post[];
}

export default function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            精选文章
          </h2>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            查看全部
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative overflow-hidden rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex flex-col sm:flex-row h-full">
                {/* Image */}
                {post.image && (
                  <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden bg-muted">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <div className="text-6xl">📝</div>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        <Tag className="h-3 w-3" />
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        阅读时长 {post.readTime}
                      </span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-bold leading-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {post.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
