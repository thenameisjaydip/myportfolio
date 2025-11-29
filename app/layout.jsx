import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AnalyticsTracker from "@/components/analytics-tracker"
import "./globals.css"

const geistSans = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata = {
  title: "Jaydip Chauhan | Full Stack Developer",
  description: "Full Stack Developer specializing in React, Node.js, and MongoDB. Building modern web applications.",
  keywords: ["developer", "portfolio", "react", "node.js", "mongodb", "next.js"],
  authors: [{ name: "Jaydip Chauhan" }],
  openGraph: {
    title: "Jaydip Chauhan | Full Stack Developer",
    description: "Full Stack Developer specializing in React, Node.js, and MongoDB.",
    type: "website",
  },
    generator: 'v0.app'
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
          >
            Skip to content
          </a>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <AnalyticsTracker />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
