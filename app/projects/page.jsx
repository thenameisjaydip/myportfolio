import connectDB from "@/lib/mongodb"
import Project from "@/models/Project"
import ProjectsGrid from "@/components/projects-grid"

export const metadata = {
  title: "Projects | Jaydip Chauhan",
  description: "Explore my portfolio of web development projects built with React, Node.js, and MongoDB.",
}

// Sample projects for demo when DB is empty
const sampleProjects = [
  {
    _id: "1",
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    summary:
      "Full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.",
    coverImage: "/modern-ecommerce-dashboard.png",
    tech: ["Next.js", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    tags: ["Full Stack", "E-Commerce"],
    demoUrl: "https://demo.example.com",
    repoUrl: "https://github.com",
    year: 2024,
    role: "Full Stack Developer",
    featured: true,
  },
  {
    _id: "2",
    slug: "task-management",
    title: "Task Management App",
    summary: "Collaborative task management tool with real-time updates, team features, and Kanban boards.",
    coverImage: "/task-management-dashboard.png",
    tech: ["React", "Express", "MongoDB", "Socket.io", "Redux"],
    tags: ["Full Stack", "Productivity"],
    demoUrl: "https://demo.example.com",
    repoUrl: "https://github.com",
    year: 2024,
    role: "Lead Developer",
    featured: true,
  },
  {
    _id: "3",
    slug: "ai-chatbot",
    title: "AI Chat Assistant",
    summary: "Intelligent chatbot powered by machine learning for customer support automation and engagement.",
    coverImage: "/ai-chatbot-interface.png",
    tech: ["Next.js", "OpenAI", "MongoDB", "Vercel AI SDK"],
    tags: ["AI/ML", "Full Stack"],
    demoUrl: "https://demo.example.com",
    repoUrl: "https://github.com",
    year: 2025,
    role: "Solo Developer",
    featured: true,
  },
  {
    _id: "4",
    slug: "portfolio-cms",
    title: "Portfolio CMS",
    summary: "Content management system for developers to showcase their work with built-in analytics.",
    coverImage: "/portfolio-cms-dashboard.jpg",
    tech: ["Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
    tags: ["Full Stack", "CMS"],
    demoUrl: "https://demo.example.com",
    repoUrl: "https://github.com",
    year: 2024,
    role: "Full Stack Developer",
    featured: false,
  },
  {
    _id: "5",
    slug: "real-time-dashboard",
    title: "Real-Time Analytics Dashboard",
    summary: "Live analytics dashboard with real-time data visualization and customizable widgets.",
    coverImage: "/analytics-dashboard-dark-mode.jpg",
    tech: ["React", "D3.js", "Node.js", "WebSocket", "MongoDB"],
    tags: ["Frontend", "Data Visualization"],
    demoUrl: "https://demo.example.com",
    repoUrl: "https://github.com",
    year: 2023,
    role: "Frontend Developer",
    featured: false,
  },
  {
    _id: "6",
    slug: "social-media-api",
    title: "Social Media API",
    summary: "RESTful API for a social media platform with authentication, posts, comments, and likes.",
    coverImage: "/api-documentation-interface.png",
    tech: ["Node.js", "Express", "MongoDB", "JWT", "Redis"],
    tags: ["Backend", "API"],
    demoUrl: "https://demo.example.com",
    repoUrl: "https://github.com",
    year: 2023,
    role: "Backend Developer",
    featured: false,
  },
]

async function getProjects() {
  try {
    await connectDB()
    const projects = await Project.find({ published: true }).sort({ year: -1, createdAt: -1 }).lean()
    return JSON.parse(JSON.stringify(projects))
  } catch (error) {
    console.error("Error fetching projects:", error)
    return []
  }
}

export default async function ProjectsPage() {
  const dbProjects = await getProjects()
  const projects = dbProjects.length > 0 ? dbProjects : sampleProjects

  // Extract unique tags and tech for filters
  const allTags = [...new Set(projects.flatMap((p) => p.tags || []))]
  const allTech = [...new Set(projects.flatMap((p) => p.tech || []))]
  const allYears = [...new Set(projects.map((p) => p.year).filter(Boolean))].sort((a, b) => b - a)

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-sm font-medium text-primary tracking-wide uppercase mb-2">Portfolio</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">My Projects</h1>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            A collection of projects I&apos;ve worked on, from full-stack applications to API development.
          </p>
        </div>

        <ProjectsGrid projects={projects} allTags={allTags} allTech={allTech} allYears={allYears} />
      </div>
    </div>
  )
}
