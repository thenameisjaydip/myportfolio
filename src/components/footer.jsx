import Link from "next/link"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

const navigation = [
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

const socials = [
  { name: "GitHub", href: "https://github.com", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { name: "Twitter", href: "https://twitter.com", icon: Twitter },
  { name: "Email", href: "mailto:jaydipchauhan90707@gmail.com", icon: Mail },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div
          className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link href="/" className="text-xl font-bold tracking-tight">
              JC<span className="text-primary">.</span>
            </Link>
            <p
              className="text-sm text-muted-foreground text-center md:text-left max-w-xs">
              Full Stack Developer building modern web applications with React, Node.js, and MongoDB.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex gap-4">
            {socials.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={item.name}>
                <item.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Jaydip Chauhan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
