"use client"

import { useEffect, useState } from "react"
import { Eye, MousePointer, Download, MessageSquare, TrendingUp, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState("30")

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/analytics?days=${period}`)
        const data = await response.json()
        setAnalytics(data)
      } catch (error) {
        console.error("Error fetching analytics:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [period])

  const stats = [
    {
      title: "Page Views",
      value: analytics?.summary?.pageViews || 0,
      icon: Eye,
      color: "text-blue-500",
      change: "+12%",
    },
    {
      title: "Project Clicks",
      value: analytics?.summary?.projectClicks || 0,
      icon: MousePointer,
      color: "text-green-500",
      change: "+8%",
    },
    {
      title: "Resume Downloads",
      value: analytics?.summary?.resumeDownloads || 0,
      icon: Download,
      color: "text-purple-500",
      change: "+5%",
    },
    {
      title: "Contact Forms",
      value: analytics?.summary?.contactSubmits || 0,
      icon: MessageSquare,
      color: "text-orange-500",
      change: "+15%",
    },
  ]

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Track your portfolio performance</p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-40">
            <Calendar className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{loading ? "..." : stat.value}</div>
                <Badge variant="secondary" className="text-green-500">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  {stat.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Daily Views Chart */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Page Views Over Time</CardTitle>
            <CardDescription>Daily page views for the selected period</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-64 flex items-center justify-center">
                <p className="text-muted-foreground">Loading...</p>
              </div>
            ) : analytics?.dailyViews?.length > 0 ? (
              <div className="h-64">
                <div className="flex items-end gap-1 h-full">
                  {analytics.dailyViews.map((day, i) => {
                    const maxViews = Math.max(...analytics.dailyViews.map((d) => d.views))
                    const height = maxViews > 0 ? (day.views / maxViews) * 100 : 0
                    return (
                      <div
                        key={i}
                        className="flex-1 bg-primary/20 hover:bg-primary/40 rounded-t transition-colors group relative"
                        style={{ height: `${Math.max(height, 5)}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover border rounded px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {day.views} views
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center">
                <p className="text-muted-foreground">No data available yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Pages */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>Most visited pages on your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : analytics?.topPages?.length > 0 ? (
              <div className="space-y-4">
                {analytics.topPages.map((page, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-muted-foreground w-6">{i + 1}.</span>
                      <span className="font-medium truncate max-w-[200px]">
                        {page.page === "/" ? "Home" : page.page}
                      </span>
                    </div>
                    <Badge variant="secondary">{page.views} views</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No data available yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Info Card */}
      <Card className="mt-6 border-border/50 bg-accent/50">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Analytics data is collected from page views and user interactions. For more detailed
            analytics, consider connecting Google Analytics or a similar service.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
