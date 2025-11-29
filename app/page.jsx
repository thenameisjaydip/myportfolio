import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import HeroSection from "@/components/hero-section"
import FeaturedProjects from "@/components/featured-projects"
import SkillsSection from "@/components/skills-section"
import connectDB from "@/lib/mongodb"
import Project from "@/models/Project"

async function getFeaturedProjects() {
  try {
    await connectDB()
    const projects = await Project.find({ featured: true, published: true }).sort({ createdAt: -1 }).limit(3).lean()
    return JSON.parse(JSON.stringify(projects))
  } catch (error) {
    console.error("Error fetching projects:", error)
    return []
  }
}

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects()

  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturedProjects projects={featuredProjects} />
      <SkillsSection />

      {/* CTA Section */}
      <section className="py-24 bg-accent/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">Let&apos;s work together</h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Have a project in mind? I&apos;d love to hear about it. Let&apos;s discuss how we can bring your ideas to
              life.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact">
                  Get in touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/projects">View all projects</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
