import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Mail, ArrowRight } from "lucide-react";

export default function Hero() {
  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/jerwilcy",
      icon: Github,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/jerwilcy",
      icon: Twitter,
    },
    {
      name: "邮箱",
      href: "mailto:contact@jerwilcy.dev",
      icon: Mail,
    },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                你好，我是{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  jerwilcy
                </span>
                <span className="inline-block animate-wave">👋</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                研究者与开发者，探索{" "}
                <span className="text-foreground font-medium">机器学习</span>
、{" "}
                <span className="text-foreground font-medium">计算机视觉</span>
                和{" "}
                <span className="text-foreground font-medium">创意技术</span>
                的交叉领域。
              </p>
              <p className="text-muted-foreground max-w-2xl">
                构建创新解决方案，将前沿研究与实际应用相结合。
                热爱开源，乐于分享知识。
              </p>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium transition-all hover:bg-accent hover:scale-105"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{social.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/projects"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105 shadow-sm hover:shadow-md"
              >
                查看项目
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-card px-6 text-sm font-medium transition-all hover:bg-accent hover:scale-105"
              >
                关于我
              </Link>
            </div>
          </div>

          {/* Right Avatar */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-full blur-3xl"></div>

              {/* Avatar */}
              <div className="relative">
                <div className="w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 rounded-full border-4 border-primary/20 overflow-hidden bg-card shadow-2xl">
                  <Image
                    src="/avatar.jpg"
                    alt="jerwilcy 头像"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>

                {/* Floating badges */}
                <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full shadow-lg">
                  欢迎合作
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-12 sm:h-16 fill-background"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            className="text-primary/10"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}
