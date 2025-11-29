import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import AdminSidebar from "@/components/admin/sidebar"

export const metadata = {
  title: "Admin Dashboard | Jaydip Chauhan Portfolio",
  description: "Admin dashboard for managing portfolio content",
}

// Simple auth check - in production use NextAuth or similar
async function checkAuth() {
  const cookieStore = await cookies()
  const authToken = cookieStore.get("admin_token")
  return authToken?.value === process.env.ADMIN_SECRET || process.env.NODE_ENV === "development"
}

export default async function AdminLayout({ children }) {
  const isAuthenticated = await checkAuth()

  // For development, we allow access. In production, redirect to login
  if (!isAuthenticated && process.env.NODE_ENV === "production") {
    redirect("/admin/login")
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
