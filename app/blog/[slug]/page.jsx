import { notFound } from "next/navigation"
import connectDB from "@/lib/mongodb"
import Blog from "@/models/Blog"
import BlogPostPageClient from "./client"

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

async function getBlogPost(slug) {
  try {
    await connectDB()
    const post = await Blog.findOne({ slug, published: true }).lean()
    if (post) {
      return JSON.parse(JSON.stringify(post))
    }
  } catch (error) {
    console.error("Error fetching blog post:", error)
  }

  return samplePosts[slug] || null
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return { title: "Post Not Found" }
  }

  return {
    title: `${post.title} | Jaydip Chauhan Blog`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return <BlogPostPageClient post={post} />
}
