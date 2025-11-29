import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Analytics from "@/models/Analytics"

// POST - Track analytics event
export async function POST(request) {
  try {
    await connectDB()

    const body = await request.json()

    const event = await Analytics.create({
      type: body.type,
      page: body.page,
      projectSlug: body.projectSlug,
      metadata: body.metadata || {},
    })

    return NextResponse.json({ status: "ok", id: event._id }, { status: 201 })
  } catch (error) {
    console.error("Error tracking analytics:", error)
    return NextResponse.json({ error: "Failed to track event" }, { status: 500 })
  }
}

// GET - Get analytics data
export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const days = Number.parseInt(searchParams.get("days")) || 30

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const events = await Analytics.find({
      createdAt: { $gte: startDate },
    }).lean()

    // Aggregate data
    const pageViews = events.filter((e) => e.type === "page_view").length
    const projectClicks = events.filter((e) => e.type === "project_click").length
    const resumeDownloads = events.filter((e) => e.type === "resume_download").length
    const contactSubmits = events.filter((e) => e.type === "contact_submit").length

    // Group by date for chart
    const dailyViews = {}
    events
      .filter((e) => e.type === "page_view")
      .forEach((e) => {
        const date = new Date(e.createdAt).toISOString().split("T")[0]
        dailyViews[date] = (dailyViews[date] || 0) + 1
      })

    // Top pages
    const pageViewCounts = {}
    events
      .filter((e) => e.type === "page_view" && e.page)
      .forEach((e) => {
        pageViewCounts[e.page] = (pageViewCounts[e.page] || 0) + 1
      })

    const topPages = Object.entries(pageViewCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([page, views]) => ({ page, views }))

    return NextResponse.json({
      summary: {
        pageViews,
        projectClicks,
        resumeDownloads,
        contactSubmits,
      },
      dailyViews: Object.entries(dailyViews)
        .map(([date, views]) => ({ date, views }))
        .sort((a, b) => a.date.localeCompare(b.date)),
      topPages,
    })
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
