import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Project from "@/models/Project"

// GET single project
export async function GET(request, { params }) {
  try {
    await connectDB()
    const { slug } = await params

    const project = await Project.findOne({ slug }).lean()

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error fetching project:", error)
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}

// PUT update project
export async function PUT(request, { params }) {
  try {
    await connectDB()
    const { slug } = await params
    const body = await request.json()

    const project = await Project.findOneAndUpdate({ slug }, body, { new: true }).lean()

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

// DELETE project
export async function DELETE(request, { params }) {
  try {
    await connectDB()
    const { slug } = await params

    const project = await Project.findOneAndDelete({ slug })

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Project deleted successfully" })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
