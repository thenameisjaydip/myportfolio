# Developer Portfolio

A modern, full-stack developer portfolio built with Next.js, React, Node.js, and MongoDB. This project demonstrates server-side rendering (SSR) concepts and is deployable to Vercel.

## Features

- **Server-Side Rendering**: Pages are rendered on the server for better SEO and performance
- **MongoDB Database**: Store projects, blog posts, messages, and analytics
- **Admin Dashboard**: Manage content without touching code
- **Dark/Light Mode**: System preference detection with manual toggle
- **Analytics Tracking**: Track page views, project clicks, and resume downloads
- **Contact Form**: Receive messages stored in the database
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Node.js, Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database (local or MongoDB Atlas)

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
pnpm install
\`\`\`

3. Create a \`.env.local\` file in the root directory:
\`\`\`env
MONGODB_URI=mongodb+srv://your-connection-string
ADMIN_SECRET=your-secret-key
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
# or
pnpm dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Seeding the Database

To populate the database with sample data:

\`\`\`bash
node scripts/seed-database.js
\`\`\`

## Project Structure

\`\`\`
├── app/                    # Next.js App Router pages
│   ├── admin/              # Admin dashboard
│   ├── about/              # About page
│   ├── blog/               # Blog pages
│   ├── contact/            # Contact page
│   ├── projects/           # Projects pages
│   └── api/                # API routes
├── components/             # React components
│   ├── admin/              # Admin-specific components
│   └── ui/                 # Shared UI components
├── lib/                    # Utility functions
├── models/                 # MongoDB models
└── scripts/                # Database scripts
\`\`\`

## Environment Variables

| Variable | Description |
|----------|-------------|
| \`MONGODB_URI\` | MongoDB connection string |
| \`ADMIN_SECRET\` | Secret key for admin authentication |

## Deployment to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## Learning Resources

This project is designed to help you learn:

- **Server-Side Rendering**: How Next.js renders pages on the server
- **API Routes**: Building backend APIs with Next.js
- **MongoDB**: Working with a document database
- **Authentication**: Basic admin authentication patterns
- **State Management**: Using React hooks and context
- **Styling**: Tailwind CSS and component libraries

## License

MIT
