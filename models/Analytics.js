import mongoose from "mongoose"

const AnalyticsSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["page_view", "project_click", "resume_download", "contact_submit", "demo_click"],
    },
    page: {
      type: String,
    },
    projectSlug: {
      type: String,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Analytics || mongoose.model("Analytics", AnalyticsSchema)
