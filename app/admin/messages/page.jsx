import { Mail, MailOpen, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import connectDB from "@/lib/mongodb"
import Contact from "@/models/Contact"
import MessageActions from "@/components/admin/message-actions"

async function getMessages() {
  try {
    await connectDB()
    const messages = await Contact.find().sort({ createdAt: -1 }).lean()
    return JSON.parse(JSON.stringify(messages))
  } catch (error) {
    console.error("Error fetching messages:", error)
    return []
  }
}

export default async function AdminMessagesPage() {
  const messages = await getMessages()
  const unreadCount = messages.filter((m) => !m.read).length

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground">
            Contact form submissions
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {unreadCount} unread
              </Badge>
            )}
          </p>
        </div>
      </div>

      {messages.length > 0 ? (
        <div className="space-y-4">
          {messages.map((message) => (
            <Card
              key={message._id}
              className={`border-border/50 ${!message.read ? "border-l-4 border-l-primary" : ""}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${message.read ? "bg-muted" : "bg-primary/10"}`}>
                      {message.read ? (
                        <MailOpen className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Mail className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{message.name}</CardTitle>
                      <CardDescription>{message.email}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(message.createdAt).toLocaleDateString()}
                    </span>
                    <MessageActions id={message._id} read={message.read} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {message.subject && <p className="font-medium mb-2">{message.subject}</p>}
                <p className="text-muted-foreground whitespace-pre-wrap">{message.message}</p>
                <div className="mt-4">
                  <Button variant="outline" size="sm" asChild>
                    <a href={`mailto:${message.email}`}>Reply via Email</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-border rounded-lg">
          <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No messages yet</h3>
          <p className="text-muted-foreground">Messages from your contact form will appear here</p>
        </div>
      )}
    </div>
  )
}
