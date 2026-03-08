import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Tag } from "lucide-react";
import { getAllPosts, getTags, getCategories } from "@/lib/posts";

export const dynamic = 'force-static';

export default async function TagsPage() {
  const allPosts = await getAllPosts();
  const allTags = await getTags();
  const allCategories = await getCategories();

  // Count posts per tag
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = allPosts.filter(post => post.frontmatter.tags.includes(tag)).length;
    return acc;
  }, {} as Record<string, number>);

  // Count posts per category
  const categoryCounts = allCategories.reduce((acc, category) => {
    acc[category] = allPosts.filter(post => post.frontmatter.category === category).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 md:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-12">
              <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
                标签
              </h1>
              <p className="text-lg text-muted-foreground">
                浏览所有标签，按主题探索内容 ({allTags.length} 个标签)
              </p>
            </div>

            {/* Categories */}
            <div className="mb-12">
              <h2 className="font-display text-2xl font-bold mb-6">分类</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {allCategories.map((category) => (
                  <Link
                    key={category}
                    href={`/blog?category=${category}`}
                    className="group flex items-center justify-between p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Tag className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium group-hover:text-primary transition-colors">
                          {category}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {categoryCounts[category]} 篇文章
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="mb-12">
              <h2 className="font-display text-2xl font-bold mb-6">所有标签</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {allTags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag.toLowerCase()}`}
                    className="group flex items-center justify-between p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Tag className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium group-hover:text-primary transition-colors">
                          {tag}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {tagCounts[tag]} 篇文章
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
