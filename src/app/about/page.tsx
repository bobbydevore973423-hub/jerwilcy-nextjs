import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import { Mail, Github, Twitter, MapPin, GraduationCap, Briefcase, Heart } from "lucide-react";

export default function AboutPage() {
  const skills = {
    "机器学习": ["PyTorch", "TensorFlow", "Scikit-learn", "JAX"],
    "计算机视觉": ["OpenCV", "Detectron2", "Albumentations", "YOLO"],
    "Web 开发": ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    "工具与平台": ["Git", "Docker", "Linux", "AWS"],
  };

  const education = [
    {
      degree: "计算机科学博士",
      school: "大学名称",
      period: "2022 - 至今",
      description: "专注于医学影像中的深度学习和计算机视觉应用。",
    },
    {
      degree: "计算机科学硕士",
      school: "大学名称",
      period: "2020 - 2022",
      description: "专注于机器学习和计算机视觉。荣誉毕业。",
    },
  ];

  const experience = [
    {
      title: "研究助理",
      company: "大学实验室",
      period: "2022 - 至今",
      description: "从事计算机视觉任务的深度学习架构研究。",
    },
    {
      title: "机器学习实习生",
      company: "科技公司",
      period: "2021 - 2022",
      description: "为生产系统开发和部署机器学习模型。",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 md:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
              <div className="relative">
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 border-primary/20 overflow-hidden bg-card shadow-2xl">
                  <Image
                    src="/avatar.jpg"
                    alt="jerwilcy avatar"
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="text-center md:text-left">
                <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
                  Hi, I'm{" "}
                  <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    jerwilcy
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground mb-4">
                  研究者与开发者
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">中国</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none dark:prose-invert mb-12">
              <p className="text-xl leading-relaxed text-muted-foreground">
                我是一名研究者和开发者，热衷于{" "}
                <span className="text-foreground font-medium">
                  机器学习
                </span>
                、{" "}
                <span className="text-foreground font-medium">
                  计算机视觉
                </span>
                和{" "}
                <span className="text-foreground font-medium">
                  创意技术
                </span>
                。我构建将前沿研究与实际应用相结合的创新解决方案。
              </p>
              <p className="text-muted-foreground">
                目前正在攻读计算机科学博士学位，专注于计算机视觉任务的深度学习架构。我相信开源的力量，喜欢通过博客文章、教程和开源贡献来分享知识。
              </p>
              <p className="text-muted-foreground">
                当我不在编写代码或阅读论文时，你可以发现我在探索新技术、为开源项目做贡献，或者尝试创意编程和生成艺术。
              </p>
            </div>

            {/* Contact */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <a
                href="mailto:contact@jerwilcy.dev"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90 hover:scale-105"
              >
                <Mail className="h-4 w-4" />
                联系我
              </a>
              <a
                href="https://github.com/jerwilcy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-lg border border-border bg-card font-medium transition-all hover:bg-accent hover:scale-105"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://twitter.com/jerwilcy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-lg border border-border bg-card font-medium transition-all hover:bg-accent hover:scale-105"
              >
                <Twitter className="h-4 w-4" />
                Twitter
              </a>
            </div>
          </div>

          {/* Skills */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="font-display text-3xl font-bold mb-8">技能与技术</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {Object.entries(skills).map(([category, techs]) => (
                <div key={category} className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-semibold mb-3">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {techs.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-md bg-muted text-sm font-medium text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="font-display text-3xl font-bold mb-8">教育背景</h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-6 rounded-xl bg-card border border-border"
                >
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{edu.degree}</h3>
                    <p className="text-muted-foreground mb-2">{edu.school}</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      {edu.period}
                    </p>
                    <p className="text-muted-foreground">{edu.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="font-display text-3xl font-bold mb-8">工作经历</h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-6 rounded-xl bg-card border border-border"
                >
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{exp.title}</h3>
                    <p className="text-muted-foreground mb-2">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      {exp.period}
                    </p>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fun Fact */}
          <div className="max-w-4xl mx-auto">
            <div className="p-8 rounded-xl bg-muted/30 border border-border/40 text-center">
              <Heart className="h-8 w-8 text-primary mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">
                充满{" "}
                <span className="text-foreground font-medium">热情</span>和{" "}
                <span className="text-foreground font-medium">好奇心</span>，
                基于 Next.js 和 Tailwind CSS 构建。
                始终学习，持续创造。
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
