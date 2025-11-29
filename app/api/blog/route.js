import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Blog from "@/models/Blog"

// GET all blog posts
export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const tag = searchParams.get("tag")

    const query = { published: true }

    if (tag) {
      query.tags = tag
    }

    const posts = await Blog.find(query).sort({ publishedAt: -1 }).lean()

    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}

// POST create new blog post (for admin)
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

    // Calculate read time (rough estimate: 200 words per minute)
    if (body.content && !body.readTime) {
      const wordCount = body.content.split(/\s+/).length
      body.readTime = Math.ceil(wordCount / 200)
    }

    const post = await Blog.create(body)

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}
