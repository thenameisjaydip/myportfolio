import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Contact from "@/models/Contact"

// PATCH - Update message (mark as read/unread)
export async function PATCH(request, { params }) {
  try {
    await connectDB()
    const { id } = await params
    const body = await request.json()

    const message = await Contact.findByIdAndUpdate(id, { read: body.read }, { new: true })

    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 })
    }

    return NextResponse.json(message)
  } catch (error) {
    console.error("Error updating message:", error)
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 })
  }
}

// DELETE - Delete message
export async function DELETE(request, { params }) {
  try {
    await connectDB()
    const { id } = await params

    const message = await Contact.findByIdAndDelete(id)

    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Message deleted" })
  } catch (error) {
    console.error("Error deleting message:", error)
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 })
  }
}
