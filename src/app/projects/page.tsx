import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Github, ExternalLink, Calendar, FileText } from "lucide-react";
import { getAllProjects } from "@/lib/projects";

export const dynamic = 'force-static';

const statusConfig = {
  active: {
    label: "进行中",
    className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  },
  completed: {
    label: "已完成",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  },
  published: {
    label: "已发表",
    className: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  },
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 md:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="max-w-3xl mb-16">
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              项目
            </h1>
            <p className="text-lg text-muted-foreground">
              我正在进行的开源项目和研究工作。({projects.length} 个项目)
            </p>
          </div>

          {/* Featured Projects */}
          {featuredProjects.length > 0 && (
            <div className="mb-16">
              <h2 className="font-display text-2xl font-bold mb-8">精选项目</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {featuredProjects.map((project) => (
                  <article
                    key={project.slug}
                    className="group rounded-2xl bg-card border border-border p-6 sm:p-8 hover:border-primary/50 hover:shadow-xl transition-all duration-300"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-display text-xl sm:text-2xl font-bold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          statusConfig[project.status].className
                        }`}
                      >
                        {statusConfig[project.status].label}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="inline-block px-2.5 py-1 rounded-md bg-muted text-xs font-mono text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                      {project.github && (
                        <Link
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Github className="h-4 w-4" />
                          GitHub
                        </Link>
                      )}
                      {project.demo && (
                        <Link
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Demo
                        </Link>
                      )}
                      {project.paper && (
                        <Link
                          href={project.paper}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <FileText className="h-4 w-4" />
                          论文
                        </Link>
                      )}
                    </div>

                    {/* Date */}
                    {project.startDate && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-4">
                        <Calendar className="h-3.5 w-3.5" />
                        <time>
                          {project.startDate}
                          {project.endDate && ` - ${project.endDate}`}
                        </time>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* All Projects */}
          <div>
            <h2 className="font-display text-2xl font-bold mb-8">所有项目</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <article
                  key={project.slug}
                  className="group rounded-xl bg-card border border-border p-6 hover:border-primary/50 hover:shadow-lg transition-all"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display text-lg font-bold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        statusConfig[project.status].className
                      }`}
                    >
                      {statusConfig[project.status].label}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="inline-block px-2 py-0.5 rounded bg-muted text-xs font-mono text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="inline-block px-2 py-0.5 rounded bg-muted text-xs text-muted-foreground">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-2 text-sm">
                    {project.github && (
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Github className="h-4 w-4" />
                      </Link>
                    )}
                    {project.demo && (
                      <Link
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
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
