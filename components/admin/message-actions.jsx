"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MoreHorizontal, Mail, MailOpen, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function MessageActions({ id, read }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const toggleRead = async () => {
    setIsLoading(true)
    try {
      await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !read }),
      })
      router.refresh()
    } catch (error) {
      console.error("Error updating message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteMessage = async () => {
    if (!confirm("Are you sure you want to delete this message?")) return

    setIsLoading(true)
    try {
      await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      })
      router.refresh()
    } catch (error) {
      console.error("Error deleting message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" disabled={isLoading}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={toggleRead}>
          {read ? (
            <>
              <Mail className="mr-2 h-4 w-4" />
              Mark as unread
            </>
          ) : (
            <>
              <MailOpen className="mr-2 h-4 w-4" />
              Mark as read
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={deleteMessage} className="text-destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
