import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Project from "@/models/Project"

// GET all projects
export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured")
    const tag = searchParams.get("tag")
    const tech = searchParams.get("tech")

    const query = { published: true }

    if (featured === "true") {
      query.featured = true
    }
    if (tag) {
      query.tags = tag
    }
    if (tech) {
      query.tech = tech
    }

    const projects = await Project.find(query).sort({ year: -1, createdAt: -1 }).lean()

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

// POST create new project (for admin)
export async function POST(request) {
  try {
    await connectDB()

    const body = await request.json()

    // Generate slug from title if not provided
    if (!body.slug) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    }

    const project = await Project.create(body)

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
