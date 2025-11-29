"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Filter, X, ExternalLink, Github } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ProjectsGrid({ projects, allTags, allTech, allYears }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedTech, setSelectedTech] = useState([])
  const [selectedYear, setSelectedYear] = useState(null)

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Search filter
      const matchesSearch =
        !searchQuery ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))

      // Tag filter
      const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => project.tags?.includes(tag))

      // Tech filter
      const matchesTech = selectedTech.length === 0 || selectedTech.some((tech) => project.tech?.includes(tech))

      // Year filter
      const matchesYear = !selectedYear || project.year === selectedYear

      return matchesSearch && matchesTags && matchesTech && matchesYear
    })
  }, [projects, searchQuery, selectedTags, selectedTech, selectedYear])

  const toggleTag = (tag) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const toggleTech = (tech) => {
    setSelectedTech((prev) => (prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]))
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedTags([])
    setSelectedTech([])
    setSelectedYear(null)
  }

  const hasActiveFilters = searchQuery || selectedTags.length > 0 || selectedTech.length > 0 || selectedYear

  return (
    <div>
      {/* Filters */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Tags Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Tags
                {selectedTags.length > 0 && (
                  <Badge variant="secondary" className="ml-2 h-5 px-1.5">
                    {selectedTags.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {allTags.map((tag) => (
                <DropdownMenuCheckboxItem
                  key={tag}
                  checked={selectedTags.includes(tag)}
                  onCheckedChange={() => toggleTag(tag)}
                >
                  {tag}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Tech Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Tech
                {selectedTech.length > 0 && (
                  <Badge variant="secondary" className="ml-2 h-5 px-1.5">
                    {selectedTech.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48 max-h-64 overflow-y-auto">
              {allTech.map((tech) => (
                <DropdownMenuCheckboxItem
                  key={tech}
                  checked={selectedTech.includes(tech)}
                  onCheckedChange={() => toggleTech(tech)}
                >
                  {tech}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Year Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Year: {selectedYear || "All"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuCheckboxItem checked={!selectedYear} onCheckedChange={() => setSelectedYear(null)}>
                All Years
              </DropdownMenuCheckboxItem>
              {allYears.map((year) => (
                <DropdownMenuCheckboxItem
                  key={year}
                  checked={selectedYear === year}
                  onCheckedChange={() => setSelectedYear(year)}
                >
                  {year}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="mr-2 h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mb-6 flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => toggleTag(tag)}>
              {tag}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}
          {selectedTech.map((tech) => (
            <Badge key={tech} variant="secondary" className="cursor-pointer" onClick={() => toggleTech(tech)}>
              {tech}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}
        </div>
      )}

      {/* Results count */}
      <p className="mb-6 text-sm text-muted-foreground">
        Showing {filteredProjects.length} of {projects.length} projects
      </p>

      {/* Projects Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card
            key={project._id}
            className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={project.coverImage || "/placeholder.svg?height=400&width=600&query=project"}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {project.featured && <Badge className="absolute top-3 left-3 bg-primary">Featured</Badge>}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                {project.demoUrl && (
                  <Button size="sm" variant="secondary" asChild>
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-1 h-3 w-3" />
                      Demo
                    </a>
                  </Button>
                )}
                {project.repoUrl && (
                  <Button size="sm" variant="secondary" asChild>
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-1 h-3 w-3" />
                      Code
                    </a>
                  </Button>
                )}
              </div>
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-lg line-clamp-1">
                  <Link href={`/projects/${project.slug}`} className="hover:text-primary transition-colors">
                    {project.title}
                  </Link>
                </CardTitle>
                {project.year && <span className="text-sm text-muted-foreground shrink-0">{project.year}</span>}
              </div>
              {project.role && <p className="text-xs text-muted-foreground">{project.role}</p>}
            </CardHeader>
            <CardContent>
              <CardDescription className="line-clamp-2 mb-4">{project.summary}</CardDescription>
              <div className="flex flex-wrap gap-1.5">
                {project.tech?.slice(0, 4).map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {project.tech?.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.tech.length - 4}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No projects found matching your criteria.</p>
          <Button variant="link" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  )
}
