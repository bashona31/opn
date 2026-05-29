# LaunchPilot AI

**Turn your startup ideas into execution-ready businesses.**

LaunchPilot AI is a modern AI-powered SaaS platform that helps founders, builders, students, and entrepreneurs transform raw ideas into complete startup plans using AI.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI + Radix UI
- **Animations:** Framer Motion
- **Auth & Database:** Supabase (PostgreSQL)
- **AI:** OpenAI API (GPT-4o)
- **Deployment:** Vercel

## Features

- AI Startup Plan Generator (12+ dimensions)
- Roadmap Generator (1-12 month timeline)
- Project Management (CRUD)
- Export to PDF, Markdown, Text
- User Dashboard with Analytics
- Authentication (Email, Google, GitHub)
- Responsive Design (Mobile-first)
- PWA Ready

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- Supabase account
- OpenAI API key

### Installation

```bash
# Clone the repository
git clone https://github.com/bashona31/opn.git
cd opn/launchpilot-ai

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Add your keys to .env.local
# NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
# OPENAI_API_KEY=your-openai-key

# Run the development server
npm run dev
```

### Database Setup

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Run the contents of `supabase/schema.sql`
4. Enable Email auth in Authentication > Providers
5. (Optional) Configure Google/GitHub OAuth providers

## Deployment to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `OPENAI_API_KEY`
4. Deploy

## Project Structure

```
launchpilot-ai/
├── public/              # Static assets & PWA manifest
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── (dashboard)/ # Protected dashboard pages
│   │   ├── api/         # API routes
│   │   └── auth/        # Auth pages
│   ├── components/      # React components
│   │   ├── dashboard/   # Dashboard-specific components
│   │   ├── landing/     # Landing page sections
│   │   ├── shared/      # Shared components (navbar, sidebar)
│   │   └── ui/          # Base UI components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities & integrations
│   │   └── supabase/    # Supabase client setup
│   ├── styles/          # Global CSS
│   └── types/           # TypeScript types
└── supabase/            # Database schema & migrations
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `OPENAI_API_KEY` | OpenAI API key |
| `NEXT_PUBLIC_APP_URL` | Your app URL (for auth callbacks) |

## License

MIT
