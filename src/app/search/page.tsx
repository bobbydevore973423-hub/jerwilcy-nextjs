"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Search, Calendar, Clock, Tag, X } from "lucide-react";

interface SearchableItem {
  id: string;
  type: "blog" | "project";
  slug: string;
  title: string;
  summary: string;
  category?: string;
  tags?: string[];
  date?: string;
  readTime?: string;
  status?: string;
  tech?: string[];
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [allContent, setAllContent] = useState<SearchableItem[]>([]);
  const [searchResults, setSearchResults] = useState<SearchableItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load content on mount
  useEffect(() => {
    const loadContent = async () => {
      try {
        const res = await fetch("/api/search");
        const content = await res.json();
        setAllContent(content);
      } catch (error) {
        console.error("Failed to load search content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  // Simple search implementation
  const fuse = useMemo(() => {
    return (q: string) => {
      if (!q.trim()) return [];
      const lowerQ = q.toLowerCase();
      return allContent.filter((item) => {
        return (
          item.title.toLowerCase().includes(lowerQ) ||
          item.summary.toLowerCase().includes(lowerQ) ||
          (item.type === "blog" && item.tags?.some((tag) => tag.toLowerCase().includes(lowerQ))) ||
          (item.type === "blog" && item.category?.toLowerCase().includes(lowerQ)) ||
          (item.type === "project" && item.tech?.some((t) => t.toLowerCase().includes(lowerQ)))
        );
      });
    };
  }, [allContent]);

  useEffect(() => {
    const results = fuse(query);
    setSearchResults(results);
  }, [query, fuse]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 md:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Search Header */}
            <div className="mb-12">
              <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
                搜索
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                {isLoading ? "加载中..." : `搜索文章 (${allContent.length} 篇文章)`}
              </p>

              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="输入关键词搜索..."
                  className="w-full h-14 pl-12 pr-12 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  autoFocus
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Search Results */}
            {query && !isLoading && (
              <div>
                <div className="mb-6 text-sm text-muted-foreground">
                  找到 <span className="font-semibold text-foreground">{searchResults.length}</span> 个结果
                </div>

                {searchResults.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold mb-2">未找到结果</h3>
                    <p className="text-muted-foreground">
                      试试其他关键词或查看浏览所有页面
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {searchResults.map((item) => (
                      <Link
                        key={item.id}
                        href={`/${item.type === "blog" ? "blog" : "projects"}/${item.slug}`}
                        className="block p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all group"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                {item.type === "blog" ? "文章" : "项目"}
                              </span>
                              {item.type === "blog" && (
                                <>
                                  <span className="text-sm text-muted-foreground">
                                    {item.category}
                                  </span>
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3" />
                                    <span>{item.readTime}</span>
                                  </div>
                                </>
                              )}
                              {item.type === "project" && item.status && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                                  {item.status}
                                </span>
                              )}
                            </div>

                            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                              {item.title}
                            </h3>

                            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                              {item.summary}
                            </p>

                            {item.type === "blog" && item.tags && (
                              <div className="flex flex-wrap gap-2">
                                {item.tags.slice(0, 3).map((tag) => (
                                  <span
                                    key={tag}
                                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground"
                                  >
                                    <Tag className="h-3 w-3" />
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}

                            {item.type === "project" && item.tech && (
                              <div className="flex flex-wrap gap-2">
                                {item.tech.map((t) => (
                                  <span
                                    key={t}
                                    className="px-2 py-1 rounded-md bg-muted text-xs font-mono text-muted-foreground"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Quick Links (when no search) */}
            {!query && !isLoading && (
              <div>
                <h2 className="font-display text-2xl font-bold mb-6">快速链接</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Link
                    href="/blog"
                    className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all"
                  >
                    <h3 className="font-semibold mb-2">📝 博客</h3>
                    <p className="text-sm text-muted-foreground">
                      查看所有文章和教程
                    </p>
                  </Link>
                  <Link
                    href="/projects"
                    className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all"
                  >
                    <h3 className="font-semibold mb-2">🚀 项目</h3>
                    <p className="text-sm text-muted-foreground">
                      探索我的项目作品集
                    </p>
                  </Link>
                  <Link
                    href="/about"
                    className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all"
                  >
                    <h3 className="font-semibold mb-2">👤 关于</h3>
                    <p className="text-sm text-muted-foreground">
                      了解更多关于我的信息
                    </p>
                  </Link>
                  <Link
                    href="/tags"
                    className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all"
                  >
                    <h3 className="font-semibold mb-2">🏷️ 标签</h3>
                    <p className="text-sm text-muted-foreground">
                      按标签浏览内容
                    </p>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
