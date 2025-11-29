import Image from "next/image"
import Link from "next/link"
import { Download, MapPin, Briefcase, GraduationCap, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "About | Jaydip Chauhan",
  description: "Learn more about Jaydip Chauhan, a Full Stack Developer specializing in React, Node.js, and MongoDB.",
}

const experience = [
  {
    role: "Senior Full Stack Developer",
    company: "TechCorp Inc.",
    location: "Ahmedabad, India",
    startDate: "2022",
    endDate: "Present",
    description:
      "Lead development of scalable web applications using React, Node.js, and MongoDB. Mentor junior developers and implement best practices.",
    tech: ["React", "Node.js", "MongoDB", "AWS", "Docker"],
    type: "work",
  },
  {
    role: "Full Stack Developer",
    company: "StartupXYZ",
    location: "Remote",
    startDate: "2020",
    endDate: "2022",
    description:
      "Built and maintained multiple client-facing applications. Implemented CI/CD pipelines and improved application performance by 40%.",
    tech: ["Next.js", "Express", "PostgreSQL", "Redis"],
    type: "work",
  },
  {
    role: "Junior Developer",
    company: "WebAgency Co.",
    location: "New York, NY",
    startDate: "2018",
    endDate: "2020",
    description:
      "Developed responsive websites and e-commerce solutions for clients. Collaborated with design team to implement pixel-perfect UIs.",
    tech: ["React", "Node.js", "MySQL", "Sass"],
    type: "work",
  },
  {
    role: "B.S. Computer Science",
    company: "University of Technology",
    location: "Boston, MA",
    startDate: "2014",
    endDate: "2018",
    description: "Graduated with honors. Focus on web development and database systems.",
    tech: ["Java", "Python", "SQL", "Data Structures"],
    type: "education",
  },
]

const skills = {
  frontend: ["React", "Next.js", "JavaScript", "HTML/CSS", "Tailwind CSS", "Redux"],
  backend: ["Node.js", "Express", "REST APIs", "GraphQL", "WebSocket"],
  database: ["MongoDB", "PostgreSQL", "Redis", "Mongoose"],
  tools: ["Git", "Docker", "AWS", "Vercel", "CI/CD", "Jest"],
}

export default function AboutPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center mb-24">
          <div className="order-2 lg:order-1">
            <p className="text-sm font-medium text-primary tracking-wide uppercase mb-2">About Me</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 text-balance">Hi, I&apos;m Jaydip Chauhan</h1>
            <p className="text-lg text-muted-foreground mb-4 text-pretty">
              I&apos;m a Full Stack Developer with over 6 years of experience building web applications. I specialize in
              the MERN stack and love creating intuitive, performant user experiences.
            </p>
            <p className="text-lg text-muted-foreground mb-6 text-pretty">
              Currently, I work at TechCorp Inc. where I lead development of scalable applications and mentor junior
              developers. I&apos;m passionate about clean code, accessibility, and continuous learning.
            </p>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Ahmedabad, India</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                <span>6+ years experience</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <a href="/resume.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl transform rotate-3" />
              <div className="relative aspect-square w-64 sm:w-80 rounded-2xl overflow-hidden border-4 border-background shadow-xl">
                <Image src="/professional-developer-portrait.png" alt="Jaydip Chauhan" fill className="object-cover" priority />
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-primary tracking-wide uppercase mb-2">Skills</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">Technical Expertise</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(skills).map(([category, items]) => (
              <Card key={category} className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg capitalize">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-primary tracking-wide uppercase mb-2">Experience</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">Work & Education</h2>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-1/2" />

            <div className="space-y-12">
              {experience.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background transform -translate-x-1/2 md:-translate-x-1/2 mt-6" />

                  {/* Content */}
                  <div className={`flex-1 ml-8 md:ml-0 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                    <Card className="border-border/50 hover:border-primary/50 transition-colors">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <CardTitle className="text-lg">{item.role}</CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-1">
                              {item.type === "work" ? (
                                <Briefcase className="h-4 w-4" />
                              ) : (
                                <GraduationCap className="h-4 w-4" />
                              )}
                              {item.company}
                            </CardDescription>
                          </div>
                          <Badge variant="outline" className="shrink-0">
                            {item.startDate} - {item.endDate}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                          <MapPin className="h-3 w-3" />
                          {item.location}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {item.tech.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-accent/50 rounded-2xl p-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-4 text-balance">
            Interested in working together?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-pretty">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">
              Start a Conversation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </section>
      </div>
    </div>
  )
}
