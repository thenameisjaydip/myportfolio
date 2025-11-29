import BlogForm from "@/components/admin/blog-form"

export const metadata = {
  title: "New Blog Post | Admin",
}

export default function NewBlogPostPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">New Blog Post</h1>
        <p className="text-muted-foreground">Write a new article for your blog</p>
      </div>
      <BlogForm />
    </div>
  )
}
