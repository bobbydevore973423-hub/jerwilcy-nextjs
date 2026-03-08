import Link from "next/link";
import { Github, ExternalLink, Calendar } from "lucide-react";

interface Project {
  slug: string;
  title: string;
  description: string;
  status: "active" | "completed" | "published";
  tech: string[];
  github?: string;
  demo?: string;
}

interface ProjectsShowcaseProps {
  projects: Project[];
}

const statusConfig = {
  active: {
    label: "进行中",
    className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  },
  completed: {
    label: "已完成",
    className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  },
  published: {
    label: "已发表",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  },
};

export default function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  if (projects.length === 0) return null;

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2">
              项目
            </h2>
            <p className="text-muted-foreground">
              我构建和参与的项目
            </p>
          </div>
          <Link
            href="/projects"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            查看所有项目
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project) => {
            const status = statusConfig[project.status];

            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group flex flex-col h-full rounded-xl bg-card border border-border p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-md hover:-translate-y-1"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-display text-lg font-bold group-hover:text-primary transition-colors flex-1">
                    {project.title}
                  </h3>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.className}`}
                  >
                    {status.label}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded-md bg-muted text-xs font-mono text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/50">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github className="h-3.5 w-3.5" />
                      <span>代码</span>
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>演示</span>
                    </a>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile View All Link */}
        <div className="sm:hidden text-center mt-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            查看所有项目
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
