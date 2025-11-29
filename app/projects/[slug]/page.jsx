import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, Calendar, User, Eye } from "lucide-react"
import connectDB from "@/lib/mongodb"
import Project from "@/models/Project"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Sample projects for demo
const sampleProjects = {
  "ecommerce-platform": {
    _id: "1",
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    summary: "Full-stack e-commerce solution with real-time inventory management and payment processing.",
    description: `
## Overview

This e-commerce platform is a comprehensive solution built to handle modern online retail needs. It features a complete shopping experience from product browsing to checkout, with an admin dashboard for inventory and order management.

## The Challenge

The client needed a scalable e-commerce solution that could handle thousands of products, real-time inventory updates, and secure payment processing. The existing system was outdated and couldn't keep up with growing demand.

## Solution

I built a modern, full-stack application using Next.js for server-side rendering and optimal SEO, Node.js for the backend API, and MongoDB for flexible data storage. Key features include:

- **Real-time Inventory**: WebSocket integration for live stock updates
- **Secure Payments**: Stripe integration with PCI compliance
- **Admin Dashboard**: Complete control over products, orders, and customers
- **Performance Optimized**: Server-side rendering and image optimization

## Results

- 40% increase in page load speed
- 25% improvement in conversion rate
- 99.9% uptime since launch
- Handles 10,000+ concurrent users
    `,
    coverImage: "/modern-ecommerce-dashboard.png",
    gallery: ["/ecommerce-product-page.png", "/shopping-cart-checkout.jpg", "/admin-dashboard-analytics.jpg"],
    tech: ["Next.js", "Node.js", "MongoDB", "Stripe", "Tailwind CSS", "WebSocket"],
    tags: ["Full Stack", "E-Commerce"],
    demoUrl: "https://demo.example.com",
    repoUrl: "https://github.com",
    year: 2024,
    role: "Full Stack Developer",
    metrics: { views: 1250, clicks: 340 },
  },
  "task-management": {
    _id: "2",
    slug: "task-management",
    title: "Task Management App",
    summary: "Collaborative task management tool with real-time updates and team features.",
    description: `
## Overview

A modern task management application designed for teams who need to collaborate in real-time. Features include Kanban boards, task assignments, due dates, and team messaging.

## Key Features

- **Kanban Boards**: Drag-and-drop task organization
- **Real-time Updates**: Socket.io for live collaboration
- **Team Management**: Role-based access control
- **Notifications**: Email and push notifications

## Technical Implementation

Built with React for the frontend, Express.js for the API, and MongoDB for data persistence. Real-time features powered by Socket.io enable instant updates across all connected clients.
    `,
    coverImage: "/task-management-dashboard.png",
    gallery: [],
    tech: ["React", "Express", "MongoDB", "Socket.io", "Redux"],
    tags: ["Full Stack", "Productivity"],
    demoUrl: "https://demo.example.com",
    repoUrl: "https://github.com",
    year: 2024,
    role: "Lead Developer",
    metrics: { views: 890, clicks: 245 },
  },
  "ai-chatbot": {
    _id: "3",
    slug: "ai-chatbot",
    title: "AI Chat Assistant",
    summary: "Intelligent chatbot powered by machine learning for customer support automation.",
    description: `
## Overview

An AI-powered chat assistant that helps businesses automate customer support. The chatbot can handle common queries, escalate complex issues, and learn from interactions.

## Features

- **Natural Language Processing**: Understands context and intent
- **Multi-language Support**: Supports 10+ languages
- **Integration Ready**: API for easy integration with existing systems
- **Analytics Dashboard**: Track performance and improve responses

## Technology

Built with Next.js and the Vercel AI SDK, integrating with OpenAI's GPT models for natural language understanding. MongoDB stores conversation history for continuous learning.
    `,
    coverImage: "/ai-chatbot-interface.png",
    gallery: [],
    tech: ["Next.js", "OpenAI", "MongoDB", "Vercel AI SDK"],
    tags: ["AI/ML", "Full Stack"],
    demoUrl: "https://demo.example.com",
    repoUrl: "https://github.com",
    year: 2025,
    role: "Solo Developer",
    metrics: { views: 2100, clicks: 580 },
  },
}

async function getProject(slug) {
  try {
    await connectDB()
    const project = await Project.findOne({ slug, published: true }).lean()
    if (project) {
      return JSON.parse(JSON.stringify(project))
    }
  } catch (error) {
    console.error("Error fetching project:", error)
  }

  // Return sample project if not found in DB
  return sampleProjects[slug] || null
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    return { title: "Project Not Found" }
  }

  return {
    title: `${project.title} | Jaydip Chauhan`,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [project.coverImage],
    },
  }
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Back button */}
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags?.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 text-balance">{project.title}</h1>
          <p className="text-xl text-muted-foreground text-pretty">{project.summary}</p>

          {/* Meta info */}
          <div className="flex flex-wrap gap-6 mt-6 text-sm text-muted-foreground">
            {project.year && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{project.year}</span>
              </div>
            )}
            {project.role && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{project.role}</span>
              </div>
            )}
            {project.metrics?.views && (
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{project.metrics.views} views</span>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            {project.demoUrl && (
              <Button asChild>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
            {project.repoUrl && (
              <Button variant="outline" asChild>
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative aspect-video rounded-xl overflow-hidden mb-12 border border-border">
          <Image
            src={project.coverImage || "/placeholder.svg?height=600&width=1000&query=project"}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Tech Stack */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold mb-4">Technologies Used</h2>
          <div className="flex flex-wrap gap-2">
            {project.tech?.map((tech) => (
              <Badge key={tech} variant="outline" className="text-sm px-3 py-1">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {project.description?.split("\n").map((paragraph, index) => {
            if (paragraph.startsWith("## ")) {
              return (
                <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                  {paragraph.replace("## ", "")}
                </h2>
              )
            }
            if (paragraph.startsWith("- **")) {
              const match = paragraph.match(/- \*\*(.+?)\*\*: (.+)/)
              if (match) {
                return (
                  <div key={index} className="flex gap-2 mb-2">
                    <span className="font-semibold">{match[1]}:</span>
                    <span className="text-muted-foreground">{match[2]}</span>
                  </div>
                )
              }
            }
            if (paragraph.trim()) {
              return (
                <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                  {paragraph}
                </p>
              )
            }
            return null
          })}
        </div>

        {/* Gallery */}
        {project.gallery?.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-semibold mb-4">Gallery</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.gallery.map((image, index) => (
                <div key={index} className="relative aspect-video rounded-lg overflow-hidden border border-border">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
