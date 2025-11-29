"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function BlogFilters({ posts, allTags }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState(null)

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesTag = !selectedTag || post.tags?.includes(selectedTag)

      return matchesSearch && matchesTag
    })
  }, [posts, searchQuery, selectedTag])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedTag(null)
  }

  return (
    <div>
      {/* Search and Tags */}
      <div className="mb-8 flex flex-col gap-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant={!selectedTag ? "default" : "outline"} size="sm" onClick={() => setSelectedTag(null)}>
            All
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </Button>
          ))}
          {(searchQuery || selectedTag) && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="mr-1 h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Results count */}
      <p className="mb-6 text-sm text-muted-foreground">
        Showing {filteredPosts.length} of {posts.length} articles
      </p>

      {/* Featured Post */}
      {filteredPosts.length > 0 && !searchQuery && !selectedTag && (
        <Card className="mb-8 overflow-hidden border-border/50 hover:border-primary/50 transition-colors">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative aspect-video md:aspect-auto">
              <Image
                src={filteredPosts[0].coverImage || "/placeholder.svg?height=400&width=600&query=blog"}
                alt={filteredPosts[0].title}
                fill
                className="object-cover"
              />
              <Badge className="absolute top-4 left-4 bg-primary">Featured</Badge>
            </div>
            <div className="flex flex-col justify-center p-6 md:pr-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {filteredPosts[0].tags?.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <CardTitle className="text-2xl mb-3">
                <Link href={`/blog/${filteredPosts[0].slug}`} className="hover:text-primary transition-colors">
                  {filteredPosts[0].title}
                </Link>
              </CardTitle>
              <CardDescription className="text-base mb-4">{filteredPosts[0].summary}</CardDescription>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(filteredPosts[0].publishedAt)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {filteredPosts[0].readTime} min read
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Posts Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(searchQuery || selectedTag ? filteredPosts : filteredPosts.slice(1)).map((post) => (
          <Card
            key={post._id}
            className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={post.coverImage || "/placeholder.svg?height=300&width=500&query=blog post"}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <CardHeader className="pb-2">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {post.tags?.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <CardTitle className="text-lg line-clamp-2">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="line-clamp-2 mb-4">{post.summary}</CardDescription>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(post.publishedAt)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readTime} min
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No articles found matching your criteria.</p>
          <Button variant="link" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  )
}
