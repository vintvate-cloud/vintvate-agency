# Vintvate Agency

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Prerequisites

1.  **Vercel Account:** Create an account on [Vercel](https://vercel.com/signup).
2.  **GitHub Repository:** Push your code to a GitHub repository.

### Steps

1.  **Import Project:**
    *   Go to your Vercel dashboard.
    *   Click "Add New..." -> "Project".
    *   Import your GitHub repository used for this project.

2.  **Configure Project:**
    *   **Framework Preset:** Next.js (should be auto-detected).
    *   **Root Directory:** `./` (default).
    *   **Build Command:** `next build` (default).
    *   **Output Directory:** `.next` (default).
    *   **Install Command:** `npm install` (default).

3.  **Environment Variables:**
    *   Expand the "Environment Variables" section.
    *   Add the following variables (copy values from your local `.env` or set up production services):
        *   `DATABASE_URL`: Your production PostgreSQL database URL (e.g., from Vercel Postgres, Supabase, Neon).
        *   `GMAIL_USER`: The Gmail address used for sending emails.
        *   `GMAIL_PASS`: The specific app password for the Gmail account.
        *   `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name.
        *   `CLOUDINARY_API_KEY`: Your Cloudinary API key.
        *   `CLOUDINARY_API_SECRET`: Your Cloudinary API secret.
        *   `NEXTAUTH_SECRET`: A random string for NextAuth.js encryption (can be generated with `openssl rand -base64 32`).
        *   `NEXTAUTH_URL`: The URL of your deployed site (e.g., `https://your-project.vercel.app`).

4.  **Deploy:**
    *   Click "Deploy".

### specific notes for this project

*   **Database:** This project uses Prisma with PostgreSQL. You must provide a valid `DATABASE_URL` pointing to a PostgreSQL database. During the build process, `prisma generate` will be run automatically.
*   **Images:** We use Cloudinary for image management. Ensure your Cloudinary credentials are correct to enable image uploads and optimized delivery.
