import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample projects for demo when DB is empty
const sampleProjects = [
  {
    _id: "1",
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    summary: "Full-stack e-commerce solution with real-time inventory management and payment processing.",
    coverImage: "/modern-ecommerce-dashboard.png",
    tech: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    demoUrl: "https://demo.example.com",
    repoUrl: "https://github.com",
    year: 2024,
  },
  {
    _id: "2",
    slug: "task-management",
    title: "Task Management App",
    summary: "Collaborative task management tool with real-time updates and team features.",
    coverImage: "/task-management-dashboard.png",
    tech: ["React", "Express", "MongoDB", "Socket.io"],
    demoUrl: "https://demo.example.com",
    repoUrl: "https://github.com",
    year: 2024,
  },
  {
    _id: "3",
    slug: "ai-chatbot",
    title: "AI Chat Assistant",
    summary: "Intelligent chatbot powered by machine learning for customer support automation.",
    coverImage: "/ai-chatbot-interface.png",
    tech: ["Next.js", "OpenAI", "MongoDB", "Vercel"],
    demoUrl: "https://demo.example.com",
    repoUrl: "https://github.com",
    year: 2025,
  },
]

export default function FeaturedProjects({ projects = [] }) {
  const displayProjects = projects.length > 0 ? projects : sampleProjects

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-sm font-medium text-primary tracking-wide uppercase mb-2">Selected Work</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">Featured Projects</h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Here are some of my recent projects that showcase my skills in full-stack development.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayProjects.map((project) => (
            <Card
              key={project._id}
              className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.coverImage || "/placeholder.svg?height=400&width=600&query=project screenshot"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                  {project.demoUrl && (
                    <Button size="sm" variant="secondary" asChild>
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-1 h-3 w-3" />
                        Demo
                      </a>
                    </Button>
                  )}
                  {project.repoUrl && (
                    <Button size="sm" variant="secondary" asChild>
                      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-1 h-3 w-3" />
                        Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    <Link href={`/projects/${project.slug}`} className="hover:text-primary transition-colors">
                      {project.title}
                    </Link>
                  </CardTitle>
                  {project.year && <span className="text-sm text-muted-foreground">{project.year}</span>}
                </div>
                <CardDescription className="line-clamp-2">{project.summary}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tech?.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" asChild>
            <Link href="/projects">
              View all projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
