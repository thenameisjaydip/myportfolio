import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Contact from "@/models/Contact"

export async function POST(request) {
  try {
    await connectDB()

    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // Create contact message
    const contact = await Contact.create({
      name: body.name,
      email: body.email,
      subject: body.subject || "",
      message: body.message,
    })

    // Here you would typically send an email notification
    // Using a service like SendGrid, Mailgun, etc.
    // For now, we just store it in the database

    return NextResponse.json({ status: "ok", message: "Message received", id: contact._id }, { status: 201 })
  } catch (error) {
    console.error("Error creating contact:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}

export async function GET(request) {
  try {
    await connectDB()

    // This would typically be protected by auth
    const messages = await Contact.find().sort({ createdAt: -1 }).lean()

    return NextResponse.json(messages)
  } catch (error) {
    console.error("Error fetching contacts:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}
