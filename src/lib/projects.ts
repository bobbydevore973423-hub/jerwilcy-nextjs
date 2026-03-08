import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Project } from "@/types";

const projectsDirectory = path.join(process.cwd(), "content/projects");

export interface ProjectFrontmatter {
  title: string;
  description: string;
  longDescription?: string;
  status: "active" | "completed" | "published";
  tech: string[];
  github?: string;
  demo?: string;
  paper?: string;
  images?: string[];
  startDate?: string;
  endDate?: string;
  featured?: boolean;
  draft?: boolean;
}

export interface ProjectWithSlug extends Project {
  slug: string;
  featured?: boolean;
  draft?: boolean;
}

export async function getProjectBySlug(slug: string): Promise<ProjectWithSlug> {
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`);

  // Check if file exists
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Project not found: ${slug}`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);

  return {
    slug,
    ...data,
  } as ProjectWithSlug;
}

export async function getAllProjects(): Promise<ProjectWithSlug[]> {
  // Check if directory exists
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  const slugs = fileNames
    .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.(mdx|md)$/, ""));

  const projects = await Promise.all(
    slugs.map(async (slug) => {
      try {
        return await getProjectBySlug(slug);
      } catch (error) {
        console.error(`Error loading project ${slug}:`, error);
        return null;
      }
    })
  );

  // Filter out nulls and drafts
  const validProjects = projects
    .filter((project): project is ProjectWithSlug => project !== null && !project.draft)
    .sort((a, b) => {
      // Sort by featured first, then by end date (most recent first)
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;

      if (a.endDate && b.endDate) {
        return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
      }
      if (a.endDate && !b.endDate) return -1;
      if (!a.endDate && b.endDate) return 1;
      return 0;
    });

  return validProjects;
}

export async function getFeaturedProjects(): Promise<ProjectWithSlug[]> {
  const allProjects = await getAllProjects();
  return allProjects.filter((project) => project.featured);
}

export async function getProjectsByStatus(
  status: "active" | "completed" | "published"
): Promise<ProjectWithSlug[]> {
  const allProjects = await getAllProjects();
  return allProjects.filter((project) => project.status === status);
}

export async function getAllTech(): Promise<string[]> {
  const allProjects = await getAllProjects();
  const tech = new Set(allProjects.flatMap((project) => project.tech));
  return Array.from(tech).sort();
}
