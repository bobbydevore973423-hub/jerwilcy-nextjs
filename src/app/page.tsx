import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import FeaturedPosts from "@/components/featured-posts";
import RecentPosts from "@/components/recent-posts";
import ProjectsShowcase from "@/components/projects-showcase";
import Footer from "@/components/footer";

// Mock data - will be replaced with real data later
const mockFeaturedPosts = [
  {
    slug: "introduction-to-transformer-architecture",
    title: "深入理解 Transformer 架构",
    summary: "探索 Transformer 模型的内部工作原理，从自注意力机制到实际实现技巧。",
    date: "2024-12-15",
    category: "深度学习",
    readTime: "8 分钟",
    image: "/images/transformer.jpg",
  },
  {
    slug: "building-real-time-ml-pipeline",
    title: "使用现代工具构建实时机器学习流水线",
    summary: "学习如何为生产环境设计和构建可扩展的机器学习流水线。",
    date: "2024-12-10",
    category: "MLOps",
    readTime: "12 分钟",
    image: "/images/pipeline.jpg",
  },
];

const mockRecentPosts = [
  {
    slug: "computer-vision-basics",
    title: "计算机视觉入门：核心概念与应用",
    summary: "计算机视觉基础的综合指南，包括图像处理、特征检测和现代神经网络。",
    date: "2024-12-08",
    tags: ["计算机视觉", "教程", "Python"],
    readTime: "6 分钟",
  },
  {
    slug: "optimizing-neural-networks",
    title: "优化神经网络性能的十种技巧",
    summary: "在不牺牲质量的前提下提高模型速度和准确性的实用策略。",
    date: "2024-12-05",
    tags: ["深度学习", "优化", "最佳实践"],
    readTime: "5 分钟",
  },
  {
    slug: "ethical-ai-development",
    title: "AI 开发中的伦理考量",
    summary: "探索 AI 系统的伦理影响以及如何构建负责任的技术。",
    date: "2024-12-01",
    tags: ["AI 伦理", "哲学", "负责任 AI"],
    readTime: "7 分钟",
  },
  {
    slug: "generative-models-guide",
    title: "2024 年生成式模型实用指南",
    summary: "理解用于创意应用的 VAE、GAN 和扩散模型。",
    date: "2024-11-28",
    tags: ["生成式 AI", "教程", "创意"],
    readTime: "10 分钟",
  },
];

const mockProjects = [
  {
    slug: "image-segmentation-toolkit",
    title: "图像分割工具包",
    description: "一个开源的语义分割工具包，提供预训练模型和易于使用的 API。",
    status: "active" as const,
    tech: ["Python", "PyTorch", "FastAPI"],
    github: "https://github.com/jerwilcy/segmentation-toolkit",
  },
  {
    slug: "ml-dashboard",
    title: "机器学习实验仪表板",
    description: "一个基于 Web 的仪表板，用于实时跟踪和可视化机器学习实验。",
    status: "completed" as const,
    tech: ["Next.js", "TypeScript", "PostgreSQL"],
    github: "https://github.com/jerwilcy/ml-dashboard",
    demo: "https://demo.ml-dashboard.dev",
  },
  {
    slug: "neural-style-transfer",
    title: "神经风格迁移研究",
    description: "用于艺术应用的实时神经风格迁移研究实现。",
    status: "published" as const,
    tech: ["Python", "TensorFlow", "OpenCV"],
    github: "https://github.com/jerwilcy/style-transfer",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturedPosts posts={mockFeaturedPosts} />
        <RecentPosts posts={mockRecentPosts} />
        <ProjectsShowcase projects={mockProjects} />
      </main>
      <Footer />
    </div>
  );
}
