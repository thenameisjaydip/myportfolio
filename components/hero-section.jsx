"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Download, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const roles = ["Full Stack Developer", "React Specialist", "Node.js Expert", "MongoDB Developer"]

export default function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight - 80,
      behavior: "smooth",
    })
  }

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <div
          className={cn(
            "mx-auto max-w-3xl text-center transition-all duration-1000 transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <p className="text-sm font-medium text-primary tracking-wide uppercase mb-4">Hello, I&apos;m</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-balance">Jaydip Chauhan</h1>
          <div className="mt-4 h-12 flex items-center justify-center">
            <p className="text-xl sm:text-2xl text-muted-foreground font-medium">
              <span className="inline-block transition-all duration-500">{roles[currentRole]}</span>
            </p>
          </div>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto text-pretty">
            I build accessible, pixel-perfect digital experiences for the web. Currently focused on building scalable
            applications with React, Node.js, and MongoDB.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/projects">
                View my work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/resume.pdf" download>
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </a>
            </Button>
          </div>

          {/* Tech stack badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-3">
            {["React", "Next.js", "Node.js", "MongoDB", "JavaScript"].map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors animate-bounce"
        aria-label="Scroll to content"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  )
}
