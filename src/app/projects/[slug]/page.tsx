import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Github, ExternalLink, FileText, Calendar, ArrowLeft, Users, Star } from "lucide-react";
import { notFound } from "next/navigation";

// Mock data
const mockProject = {
  slug: "image-segmentation-toolkit",
  title: "Image Segmentation Toolkit",
  tagline: "Open-source toolkit for semantic and instance segmentation",
  description: "An open-source toolkit for semantic and instance segmentation with pre-trained models and easy-to-use APIs. Built for researchers and practitioners who need quick, accurate segmentation results.",
  longDescription: `
A comprehensive toolkit supporting multiple architectures including DeepLabV3+, Mask R-CNN, and U-Net. Features include model zoo, training pipeline, and inference optimization.

## Key Features

- **Multiple Architectures**: Support for DeepLabV3+, Mask R-CNN, U-Net, and more
- **Pre-trained Models**: Zoo of models trained on COCO, Pascal VOC, and Cityscapes
- **Easy-to-use API**: Simple Python interface for quick integration
- **Training Pipeline**: Complete training workflow with distributed training support
- **Inference Optimization**: ONNX export and TensorRT acceleration
- **Active Community**: Regular updates and responsive maintainers

## Performance

| Architecture | Backbone | mAP (COCO) | FPS (RTX 3090) |
|--------------|----------|------------|----------------|
| Mask R-CNN | ResNet-50 | 37.2 | 45 |
| DeepLabV3+ | ResNet-101 | 43.1 | 38 |
| U-Net | ResNet-34 | 32.8 | 52 |

## Installation

\`\`\`bash
pip install segmentation-toolkit
\`\`\`

## Quick Start

\`\`\`python
from segmentation_toolkit import MaskRCNN

model = MaskRCNN.from_pretrained("maskrcnn-resnet50-coco")
result = model.predict("image.jpg")
result.save("output.jpg")
\`\`\`
  `,
  status: "active" as const,
  tech: ["Python", "PyTorch", "FastAPI", "Docker", "CUDA"],
  github: "https://github.com/jerwilcy/segmentation-toolkit",
  stars: 1234,
  forks: 234,
  startDate: "2024-06",
  endDate: null,
  collaborators: ["jerwilcy", "contributor1", "contributor2"],
  images: [
    "https://picsum.photos/800/450?random=1",
    "https://picsum.photos/800/450?random=2",
    "https://picsum.photos/800/450?random=3",
  ],
};

const relatedProjects = [
  {
    slug: "data-augmentation-pipeline",
    title: "Advanced Data Augmentation Pipeline",
  },
  {
    slug: "multi-modal-embedding",
    title: "Multi-Modal Embedding Space",
  },
];

const statusConfig = {
  active: {
    label: "In Progress",
    className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  },
  completed: {
    label: "Completed",
    className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  },
  published: {
    label: "Published",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  },
};

export default function ProjectPage({ params }: { params: { slug: string } }) {
  if (!mockProject) {
    notFound();
  }

  const status = statusConfig[mockProject.status];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 md:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>

            {/* Header */}
            <header className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${status.className}`}
                >
                  {status.label}
                </span>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {mockProject.startDate} - {mockProject.endDate || "Present"}
                  </span>
                </div>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
                {mockProject.title}
              </h1>

              <p className="text-xl text-muted-foreground mb-8">
                {mockProject.tagline}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-8">
                {mockProject.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-muted text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 mb-8">
                {mockProject.github && (
                  <>
                    <div className="flex items-center gap-1.5 text-sm">
                      <Star className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{mockProject.stars}</span>
                      <span className="text-muted-foreground">stars</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{mockProject.forks}</span>
                      <span className="text-muted-foreground">forks</span>
                    </div>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {mockProject.github && (
                  <a
                    href={mockProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90 hover:scale-105"
                  >
                    <Github className="h-4 w-4" />
                    View on GitHub
                  </a>
                )}
              </div>
            </header>

            {/* Images Gallery */}
            {mockProject.images && mockProject.images.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-4 mb-12">
                {mockProject.images.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-video rounded-lg overflow-hidden bg-muted"
                  >
                    <img
                      src={image}
                      alt={`${mockProject.title} screenshot ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-bold mb-4">About</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {mockProject.longDescription}
              </p>
            </section>

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
              <section className="pt-8 border-t border-border/40">
                <h2 className="font-display text-2xl font-bold mb-6">Related Projects</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {relatedProjects.map((project) => (
                    <Link
                      key={project.slug}
                      href={`/projects/${project.slug}`}
                      className="block p-4 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-accent transition-all"
                    >
                      <h3 className="font-medium group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
