import mongoose from "mongoose"

const ProjectSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      default: "",
    },
    gallery: [
      {
        type: String,
      },
    ],
    tags: [
      {
        type: String,
      },
    ],
    tech: [
      {
        type: String,
      },
    ],
    year: {
      type: Number,
    },
    role: {
      type: String,
    },
    repoUrl: {
      type: String,
    },
    demoUrl: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    metrics: {
      views: { type: Number, default: 0 },
      clicks: { type: Number, default: 0 },
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema)
