import Link from "next/link"
import { FolderKanban, FileText, MessageSquare, Eye, ArrowUpRight, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import connectDB from "@/lib/mongodb"
import Project from "@/models/Project"
import Blog from "@/models/Blog"
import Contact from "@/models/Contact"

async function getStats() {
  try {
    await connectDB()

    const [projectCount, blogCount, messageCount, unreadCount] = await Promise.all([
      Project.countDocuments(),
      Blog.countDocuments(),
      Contact.countDocuments(),
      Contact.countDocuments({ read: false }),
    ])

    return {
      projects: projectCount,
      blogs: blogCount,
      messages: messageCount,
      unread: unreadCount,
    }
  } catch (error) {
    console.error("Error fetching stats:", error)
    return { projects: 0, blogs: 0, messages: 0, unread: 0 }
  }
}

async function getRecentMessages() {
  try {
    await connectDB()
    const messages = await Contact.find().sort({ createdAt: -1 }).limit(5).lean()
    return JSON.parse(JSON.stringify(messages))
  } catch (error) {
    console.error("Error fetching messages:", error)
    return []
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()
  const recentMessages = await getRecentMessages()

  const statCards = [
    {
      title: "Total Projects",
      value: stats.projects,
      icon: FolderKanban,
      href: "/admin/projects",
      color: "text-blue-500",
    },
    {
      title: "Blog Posts",
      value: stats.blogs,
      icon: FileText,
      href: "/admin/blog",
      color: "text-green-500",
    },
    {
      title: "Messages",
      value: stats.messages,
      icon: MessageSquare,
      href: "/admin/messages",
      color: "text-orange-500",
      badge: stats.unread > 0 ? `${stats.unread} new` : null,
    },
    {
      title: "Page Views",
      value: "2.4k",
      icon: Eye,
      href: "/admin/analytics",
      color: "text-purple-500",
      trend: "+12%",
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s an overview of your portfolio.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {statCards.map((stat) => (
          <Card key={stat.title} className="border-border/50 hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-2">
                  {stat.badge && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{stat.badge}</span>
                  )}
                  {stat.trend && (
                    <span className="text-xs text-green-500 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.trend}
                    </span>
                  )}
                </div>
              </div>
              <Link
                href={stat.href}
                className="text-xs text-muted-foreground hover:text-primary mt-2 inline-flex items-center"
              >
                View all <ArrowUpRight className="h-3 w-3 ml-1" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you can do quickly</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <Button asChild>
              <Link href="/admin/projects/new">
                <FolderKanban className="mr-2 h-4 w-4" />
                New Project
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/blog/new">
                <FileText className="mr-2 h-4 w-4" />
                New Blog Post
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/messages">
                <MessageSquare className="mr-2 h-4 w-4" />
                View Messages
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/" target="_blank">
                <Eye className="mr-2 h-4 w-4" />
                View Site
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Messages</CardTitle>
              <CardDescription>Latest contact form submissions</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/messages">View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {recentMessages.length > 0 ? (
              <div className="space-y-4">
                {recentMessages.map((message) => (
                  <div key={message._id} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${message.read ? "bg-muted" : "bg-primary"}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{message.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{message.subject || message.message}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                No messages yet. They will appear here when visitors contact you.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
