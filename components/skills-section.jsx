import { Database, Globe, Server, Zap } from "lucide-react"

const skills = [
  {
    name: "Frontend Development",
    icon: Globe,
    description: "Building responsive, accessible web interfaces",
    technologies: ["React", "Next.js", "JavaScript", "HTML/CSS", "Tailwind CSS"],
  },
  {
    name: "Backend Development",
    icon: Server,
    description: "Creating robust server-side applications",
    technologies: ["Node.js", "Express", "REST APIs", "GraphQL"],
  },
  {
    name: "Database",
    icon: Database,
    description: "Designing efficient data storage solutions",
    technologies: ["MongoDB", "Mongoose", "PostgreSQL", "Redis"],
  },
  {
    name: "DevOps & Tools",
    icon: Zap,
    description: "Deploying and maintaining applications",
    technologies: ["Git", "Vercel", "Docker", "CI/CD"],
  },
]

export default function SkillsSection() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-sm font-medium text-primary tracking-wide uppercase mb-2">Expertise</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">Skills & Technologies</h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            I specialize in the MERN stack with a focus on building scalable, performant applications.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="group relative rounded-2xl border border-border/50 bg-card p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <skill.icon className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{skill.description}</p>
              <div className="flex flex-wrap gap-2">
                {skill.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
