"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Track page view
    const trackPageView = async () => {
      try {
        await fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "page_view",
            page: pathname,
          }),
        })
      } catch (error) {
        // Silently fail - analytics shouldn't break the app
        console.error("Analytics error:", error)
      }
    }

    trackPageView()
  }, [pathname])

  return null
}

// Helper function to track custom events
export async function trackEvent(type, data = {}) {
  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        ...data,
      }),
    })
  } catch (error) {
    console.error("Analytics error:", error)
  }
}
