"use client"

import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ShareButtons from "@/components/share-buttons"

// Sample blog posts with full content
const samplePosts = {
  "getting-started-with-nextjs": {
    _id: "1",
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js 15: A Complete Guide",
    summary:
      "Learn how to build modern web applications with Next.js 15, including the new App Router, Server Components, and Server Actions.",
    content: `
## Introduction

Next.js 15 brings significant improvements to the developer experience and application performance. In this guide, we'll explore the key features and how to get started with building modern web applications.

## What's New in Next.js 15

Next.js 15 introduces several exciting features:

### App Router Improvements

The App Router has received significant updates, making it more intuitive and powerful. Key improvements include:

- **Parallel Routes**: Load multiple pages simultaneously for complex layouts
- **Intercepting Routes**: Create modal-like experiences without losing context
- **Route Groups**: Organize routes without affecting URL structure

### Server Components

React Server Components are now the default, enabling:

- Reduced JavaScript bundle size
- Direct database access in components
- Improved SEO with server-rendered content

### Server Actions

Server Actions simplify data mutations:

\`\`\`javascript
async function createPost(formData) {
  'use server'
  const title = formData.get('title')
  await db.posts.create({ title })
}
\`\`\`

## Getting Started

To create a new Next.js 15 project:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Project Structure

A typical Next.js 15 project looks like this:

\`\`\`
my-app/
├── app/
│   ├── layout.js
│   ├── page.js
│   └── globals.css
├── components/
├── lib/
└── public/
\`\`\`

## Conclusion

Next.js 15 is a powerful framework for building modern web applications. With its focus on developer experience and performance, it's an excellent choice for your next project.
    `,
    coverImage: "/placeholder.svg?key=next15",
    tags: ["Next.js", "React", "Tutorial"],
    author: "Jaydip Chauhan",
    readTime: 8,
    publishedAt: new Date("2025-01-15"),
    published: true,
  },
  "mongodb-best-practices": {
    _id: "2",
    slug: "mongodb-best-practices",
    title: "MongoDB Best Practices for Node.js Applications",
    summary:
      "Explore the best practices for using MongoDB with Node.js, including schema design, indexing, and performance optimization.",
    content: `
## Introduction

MongoDB is a popular choice for Node.js applications due to its flexibility and scalability. This guide covers best practices for optimal performance.

## Schema Design

### Use Embedded Documents

For one-to-few relationships, embed documents directly:

\`\`\`javascript
const userSchema = {
  name: String,
  addresses: [{
    street: String,
    city: String,
    country: String
  }]
}
\`\`\`

### Reference for Large Collections

For one-to-many relationships with large collections, use references:

\`\`\`javascript
const postSchema = {
  title: String,
  author: { type: ObjectId, ref: 'User' }
}
\`\`\`

## Indexing Strategies

Create indexes for frequently queried fields:

\`\`\`javascript
// Single field index
db.users.createIndex({ email: 1 })

// Compound index
db.posts.createIndex({ author: 1, createdAt: -1 })
\`\`\`

## Connection Management

Use connection pooling for better performance:

\`\`\`javascript
const mongoose = require('mongoose')

mongoose.connect(uri, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000
})
\`\`\`

## Error Handling

Always handle database errors gracefully:

\`\`\`javascript
try {
  await User.create(userData)
} catch (error) {
  if (error.code === 11000) {
    // Handle duplicate key error
  }
  throw error
}
\`\`\`

## Conclusion

Following these best practices will help you build performant and scalable MongoDB applications.
    `,
    coverImage: "/placeholder.svg?key=mongodb",
    tags: ["MongoDB", "Node.js", "Database"],
    author: "Jaydip Chauhan",
    readTime: 12,
    publishedAt: new Date("2025-01-10"),
    published: true,
  },
  "react-server-components": {
    _id: "3",
    slug: "react-server-components",
    title: "Understanding React Server Components",
    summary:
      "Deep dive into React Server Components, their benefits, and how to use them effectively in your Next.js applications.",
    content: `
## What are Server Components?

React Server Components (RSC) allow you to render components on the server, reducing the JavaScript sent to the client.

## Benefits

- **Smaller Bundle Size**: Server components don't add to your JavaScript bundle
- **Direct Backend Access**: Query databases without API routes
- **Improved Performance**: Faster initial page loads

## Server vs Client Components

### Server Components (default)

\`\`\`javascript
// This runs on the server
async function Posts() {
  const posts = await db.posts.findMany()
  return (
    <ul>
      {posts.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  )
}
\`\`\`

### Client Components

\`\`\`javascript
'use client'

import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
\`\`\`

## When to Use Each

Use **Server Components** when:
- Fetching data
- Accessing backend resources
- Keeping sensitive information secure

Use **Client Components** when:
- Adding interactivity
- Using browser APIs
- Managing state

## Conclusion

Server Components are a powerful tool for building performant React applications. Use them strategically for the best results.
    `,
    coverImage: "/placeholder.svg?key=rsc",
    tags: ["React", "Next.js", "Performance"],
    author: "Jaydip Chauhan",
    readTime: 10,
    publishedAt: new Date("2025-01-05"),
    published: true,
  },
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Simple markdown-like content renderer
const renderContent = (content) => {
  const lines = content.split("\n")
  const elements = []
  let inCodeBlock = false
  let codeContent = []
  let codeLanguage = ""

  lines.forEach((line, index) => {
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <pre key={index} className="bg-secondary rounded-lg p-4 overflow-x-auto my-4">
            <code className="text-sm font-mono">{codeContent.join("\n")}</code>
          </pre>,
        )
        codeContent = []
        inCodeBlock = false
      } else {
        inCodeBlock = true
        codeLanguage = line.replace("```", "")
      }
      return
    }

    if (inCodeBlock) {
      codeContent.push(line)
      return
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={index} className="text-2xl font-bold mt-10 mb-4">
          {line.replace("## ", "")}
        </h2>,
      )
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={index} className="text-xl font-semibold mt-8 mb-3">
          {line.replace("### ", "")}
        </h3>,
      )
    } else if (line.startsWith("- **")) {
      const match = line.match(/- \*\*(.+?)\*\*: (.+)/)
      if (match) {
        elements.push(
          <li key={index} className="ml-4 mb-2 list-disc">
            <strong>{match[1]}:</strong> {match[2]}
          </li>,
        )
      } else {
        const boldMatch = line.match(/- \*\*(.+?)\*\*/)
        if (boldMatch) {
          elements.push(
            <li key={index} className="ml-4 mb-2 list-disc">
              <strong>{boldMatch[1]}</strong>
            </li>,
          )
        }
      }
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={index} className="ml-4 mb-2 list-disc text-muted-foreground">
          {line.replace("- ", "")}
        </li>,
      )
    } else if (line.trim()) {
      elements.push(
        <p key={index} className="text-muted-foreground leading-relaxed mb-4">
          {line}
        </p>,
      )
    }
  })

  return elements
}

export default function BlogPostPageClient({ post }) {
  if (!post) {
    notFound()
  }

  return (
    <div className="py-16">
      <article className="mx-auto max-w-3xl px-6 lg:px-8">
        {/* Back button */}
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags?.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-balance">{post.title}</h1>
          <p className="text-xl text-muted-foreground mb-6 text-pretty">{post.summary}</p>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pb-6 border-b border-border">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative aspect-video rounded-xl overflow-hidden mb-10 border border-border">
            <Image
              src={post.coverImage || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">{renderContent(post.content)}</div>

        {/* Share */}
        <div className="mt-12 pt-8 border-t border-border">
          <ShareButtons title={post.title} slug={post.slug} />
        </div>
      </article>
    </div>
  )
}
