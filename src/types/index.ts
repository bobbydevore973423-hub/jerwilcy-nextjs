export interface PostFrontmatter {
  title: string;
  date: string;
  category: string;
  tags: string[];
  summary: string;
  image?: string;
  series?: string;
  seriesOrder?: number;
  draft?: boolean;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readTime: string;
}

// Legacy post interface for backward compatibility
export interface LegacyPost {
  slug: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  category: string;
  tags: string[];
  readTime: string;
  image?: string;
  author?: {
    name: string;
    avatar: string;
  };
}

export interface Project {
  slug: string;
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
}

export interface Tag {
  name: string;
  count: number;
}

export interface Category {
  name: string;
  count: number;
}
