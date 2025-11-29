// Database seeding script for MongoDB
// Run this script to populate your database with sample data

const mongoose = require("mongoose")

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.error("Please set MONGODB_URI environment variable")
  process.exit(1)
}

// Define schemas inline for the script
const ProjectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    coverImage: { type: String, default: "" },
    gallery: [{ type: String }],
    tags: [{ type: String }],
    tech: [{ type: String }],
    year: { type: Number },
    role: { type: String },
    repoUrl: { type: String },
    demoUrl: { type: String },
    featured: { type: Boolean, default: false },
    metrics: {
      views: { type: Number, default: 0 },
      clicks: { type: Number, default: 0 },
    },
    published: { type: Boolean, default: false },
  },
  { timestamps: true },
)

const BlogSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, default: "" },
    tags: [{ type: String }],
    author: { type: String, default: "Admin" },
    readTime: { type: Number, default: 5 },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date },
  },
  { timestamps: true },
)

const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema)
const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema)

// Sample data
const projects = [
  {
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    summary: "Full-stack e-commerce solution with real-time inventory management and payment processing.",
    description:
      "## Overview\n\nA comprehensive e-commerce platform built with modern technologies.\n\n## Features\n\n- Real-time inventory tracking\n- Secure payment processing with Stripe\n- Admin dashboard for order management\n- Mobile-responsive design",
    coverImage: "/modern-ecommerce-dashboard.png",
    tags: ["Full Stack", "E-Commerce"],
    tech: ["Next.js", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    year: 2024,
    role: "Full Stack Developer",
    repoUrl: "https://github.com",
    demoUrl: "https://demo.example.com",
    featured: true,
    published: true,
    metrics: { views: 1250, clicks: 340 },
  },
  {
    slug: "task-management",
    title: "Task Management App",
    summary: "Collaborative task management tool with real-time updates and team features.",
    description:
      "## Overview\n\nA modern task management application for teams.\n\n## Features\n\n- Kanban boards\n- Real-time collaboration\n- Team messaging\n- Due date reminders",
    coverImage: "/task-management-dashboard.png",
    tags: ["Full Stack", "Productivity"],
    tech: ["React", "Express", "MongoDB", "Socket.io", "Redux"],
    year: 2024,
    role: "Lead Developer",
    repoUrl: "https://github.com",
    demoUrl: "https://demo.example.com",
    featured: true,
    published: true,
    metrics: { views: 890, clicks: 245 },
  },
  {
    slug: "ai-chatbot",
    title: "AI Chat Assistant",
    summary: "Intelligent chatbot powered by machine learning for customer support automation.",
    description:
      "## Overview\n\nAn AI-powered chat assistant for businesses.\n\n## Features\n\n- Natural language processing\n- Multi-language support\n- Analytics dashboard\n- Easy integration",
    coverImage: "/ai-chatbot-interface.png",
    tags: ["AI/ML", "Full Stack"],
    tech: ["Next.js", "OpenAI", "MongoDB", "Vercel AI SDK"],
    year: 2025,
    role: "Solo Developer",
    repoUrl: "https://github.com",
    demoUrl: "https://demo.example.com",
    featured: true,
    published: true,
    metrics: { views: 2100, clicks: 580 },
  },
]

const blogPosts = [
  {
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js 15: A Complete Guide",
    summary: "Learn how to build modern web applications with Next.js 15.",
    content:
      "## Introduction\n\nNext.js 15 brings significant improvements to the developer experience.\n\n## Features\n\n- App Router\n- Server Components\n- Server Actions",
    coverImage: "/nextjs-logo.png",
    tags: ["Next.js", "React", "Tutorial"],
    author: "Jaydip Chauhan",
    readTime: 8,
    published: true,
    publishedAt: new Date("2025-01-15"),
  },
  {
    slug: "mongodb-best-practices",
    title: "MongoDB Best Practices for Node.js Applications",
    summary: "Explore the best practices for using MongoDB with Node.js.",
    content:
      "## Introduction\n\nMongoDB is a popular choice for Node.js applications.\n\n## Schema Design\n\n- Use embedded documents for related data\n- Reference for large collections",
    coverImage: "/mongodb-logo.png",
    tags: ["MongoDB", "Node.js", "Database"],
    author: "Jaydip Chauhan",
    readTime: 12,
    published: true,
    publishedAt: new Date("2025-01-10"),
  },
]

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log("Connected to MongoDB")

    // Clear existing data
    await Project.deleteMany({})
    await Blog.deleteMany({})
    console.log("Cleared existing data")

    // Insert new data
    await Project.insertMany(projects)
    console.log(`Inserted ${projects.length} projects`)

    await Blog.insertMany(blogPosts)
    console.log(`Inserted ${blogPosts.length} blog posts`)

    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await mongoose.disconnect()
  }
}

seed()
