import mongoose from "mongoose"

const BlogSchema = new mongoose.Schema(
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
    content: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      default: "",
    },
    tags: [
      {
        type: String,
      },
    ],
    author: {
      type: String,
      default: "Admin",
    },
    readTime: {
      type: Number,
      default: 5,
    },
    published: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema)
