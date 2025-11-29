import connectDB from "@/lib/mongodb"
import Blog from "@/models/Blog"
import BlogFilters from "@/components/blog-filters"

export const metadata = {
  title: "Blog | Jaydip Chauhan",
  description: "Articles and tutorials about web development, React, Node.js, and MongoDB.",
}

// Sample blog posts for demo
const samplePosts = [
  {
    _id: "1",
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js 15: A Complete Guide",
    summary:
      "Learn how to build modern web applications with Next.js 15, including the new App Router, Server Components, and Server Actions.",
    content: "Full content here...",
    coverImage: "/placeholder.svg?key=8y7e3",
    tags: ["Next.js", "React", "Tutorial"],
    author: "Jaydip Chauhan",
    readTime: 8,
    publishedAt: new Date("2025-01-15"),
    published: true,
  },
  {
    _id: "2",
    slug: "mongodb-best-practices",
    title: "MongoDB Best Practices for Node.js Applications",
    summary:
      "Explore the best practices for using MongoDB with Node.js, including schema design, indexing, and performance optimization.",
    content: "Full content here...",
    coverImage: "/placeholder.svg?key=dpd4p",
    tags: ["MongoDB", "Node.js", "Database"],
    author: "Jaydip Chauhan",
    readTime: 12,
    publishedAt: new Date("2025-01-10"),
    published: true,
  },
  {
    _id: "3",
    slug: "react-server-components",
    title: "Understanding React Server Components",
    summary:
      "Deep dive into React Server Components, their benefits, and how to use them effectively in your Next.js applications.",
    content: "Full content here...",
    coverImage: "/placeholder.svg?key=xp3yv",
    tags: ["React", "Next.js", "Performance"],
    author: "Jaydip Chauhan",
    readTime: 10,
    publishedAt: new Date("2025-01-05"),
    published: true,
  },
  {
    _id: "4",
    slug: "building-restful-apis",
    title: "Building RESTful APIs with Express and MongoDB",
    summary:
      "A comprehensive guide to building scalable RESTful APIs using Express.js and MongoDB with authentication and validation.",
    content: "Full content here...",
    coverImage: "/placeholder.svg?key=uljv3",
    tags: ["Node.js", "Express", "API"],
    author: "Jaydip Chauhan",
    readTime: 15,
    publishedAt: new Date("2024-12-20"),
    published: true,
  },
  {
    _id: "5",
    slug: "tailwind-css-tips",
    title: "10 Tailwind CSS Tips for Better Productivity",
    summary:
      "Boost your productivity with these practical Tailwind CSS tips and tricks for building beautiful interfaces faster.",
    content: "Full content here...",
    coverImage: "/placeholder.svg?key=1qmea",
    tags: ["CSS", "Tailwind", "Frontend"],
    author: "Jaydip Chauhan",
    readTime: 6,
    publishedAt: new Date("2024-12-15"),
    published: true,
  },
  {
    _id: "6",
    slug: "javascript-async-patterns",
    title: "Mastering Async JavaScript: Promises, Async/Await, and More",
    summary:
      "Learn the different patterns for handling asynchronous operations in JavaScript, from callbacks to modern async/await.",
    content: "Full content here...",
    coverImage: "/placeholder.svg?key=3mbdi",
    tags: ["JavaScript", "Tutorial", "Async"],
    author: "Jaydip Chauhan",
    readTime: 11,
    publishedAt: new Date("2024-12-10"),
    published: true,
  },
]

async function getBlogPosts() {
  try {
    await connectDB()
    const posts = await Blog.find({ published: true }).sort({ publishedAt: -1 }).lean()
    return JSON.parse(JSON.stringify(posts))
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

export default async function BlogPage() {
  const dbPosts = await getBlogPosts()
  const posts = dbPosts.length > 0 ? dbPosts : samplePosts

  // Extract unique tags
  const allTags = [...new Set(posts.flatMap((p) => p.tags || []))]

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-sm font-medium text-primary tracking-wide uppercase mb-2">Blog</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">Thoughts & Tutorials</h1>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Articles about web development, programming tips, and my journey as a developer.
          </p>
        </div>

        <BlogFilters posts={posts} allTags={allTags} />
      </div>
    </div>
  )
}
