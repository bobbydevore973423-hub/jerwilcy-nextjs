import Link from "next/link";
import { Heart, Github, Twitter, Mail, Rss } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { name: "首页", href: "/" },
      { name: "博客", href: "/blog" },
      { name: "项目", href: "/projects" },
      { name: "关于", href: "/about" },
    ],
    social: [
      { name: "GitHub", href: "https://github.com/jerwilcy", icon: Github },
      { name: "Twitter", href: "https://twitter.com/jerwilcy", icon: Twitter },
      { name: "Email", href: "mailto:contact@jerwilcy.dev", icon: Mail },
    ],
  };

  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex">
              <span className="font-display text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                jerwilcy.dev
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Exploring the intersection of Machine Learning, Computer Vision, and
              Creative Technology.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">导航</h3>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-4">联系方式</h3>
            <div className="flex items-center gap-3">
              {footerLinks.social.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 inline-flex items-center justify-center rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
              <Link
                href="/rss.xml"
                className="h-10 w-10 inline-flex items-center justify-center rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="RSS Feed"
              >
                <Rss className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} jerwilcy. 版权所有。
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            基于
            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            Next.js 和 Tailwind CSS 构建
          </p>
        </div>
      </div>
    </footer>
  );
}
