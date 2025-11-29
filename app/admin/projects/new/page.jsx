import ProjectForm from "@/components/admin/project-form"

export const metadata = {
  title: "Add Project | Admin",
}

export default function NewProjectPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Add New Project</h1>
        <p className="text-muted-foreground">Create a new portfolio project</p>
      </div>
      <ProjectForm />
    </div>
  )
}
