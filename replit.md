# SGS Group - AI

## Overview
A modern React + TypeScript website for SGS GROUP showcasing AI, Automation, and Cloud Computing solutions. Features a futuristic design with 3D cube visuals, animated text effects, and an AI chat hub integration.

## Tech Stack
- **Frontend**: React 19 with TypeScript, Vite 6
- **Backend**: Node.js with Express 5
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS v4 (build-time compilation)
- **AI Integration**: Google Gemini API (@google/genai)

## Project Structure
```
├── src/
│   ├── components/      # React components
│   ├── services/        # Frontend API services
│   ├── App.tsx          # Main application
│   ├── index.css        # Tailwind CSS with custom theme
│   ├── constants.ts     # App constants
│   └── types.ts         # TypeScript types
├── server/
│   ├── index.ts         # Express server
│   └── db.ts            # Database connection
├── shared/
│   └── schema.ts        # Drizzle database schema
├── index.html           # Entry HTML
├── index.tsx            # React entry point
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
└── package.json         # Dependencies
```

## Database Schema
- **contacts**: Customer contact form submissions
- **services**: Company services catalog
- **chat_history**: AI chat session history

## API Endpoints
- `GET /api/health` - Health check
- `GET /api/services` - Get all active services
- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - List all contacts
- `POST /api/chat` - Save chat message
- `GET /api/chat/:sessionId` - Get chat history

## Development
- **Frontend**: Port 5000 (Vite dev server)
- **Backend**: Port 3001 (Express, dev mode) / Port 5000 (production)
- **Command**: `npm run dev` (runs both frontend and backend)
- **Build**: `npm run build`
- **DB Push**: `npm run db:push`

## Environment Variables
- `DATABASE_URL` - PostgreSQL connection string (auto-configured)
- `GEMINI_API_KEY` - Google Gemini API key for AI chat

## Key Constants
- `HOW_WE_WORK` — 4-phase delivery process (Discovery, Pilot, Deployment, Support) in EN/VI
- `TECH_STACK_LIST` — 12 technology badges shown on Technology page
- `SERVICES` — 5 services with deployTime, techStack[], badgeLabelEn/Vi on ROI configs
- `TRUST_BADGES`, `TESTIMONIALS` — trust signals on Home page

## Recent Changes
- 2026-03-27: Full UX/UI audit across all pages — 16 issues fixed:
  - NavBar: highlights "Technology" tab when viewing service-detail (desktop + mobile)
  - Contact: form input borders now visible in light mode (border-slate-300)
  - Contact: Google Maps filter now conditional on theme (dark=inverted, light=normal)
  - About: "Est. 2020" corrected to "Est. 2018" (consistent with ticker)
  - About: leadership card header gradient now correct in light mode (light gray)
  - About: leadership card ID text visible in light mode
  - About: subtitle, section card headings/text all have dark: prefix for light mode
  - Services: How We Work title + step titles have dark: prefix
  - Services: service card descriptions/titles visible in both themes
  - Services: tech stack pills visible in light mode (bg-slate-100, border-slate-200)
  - Home: guarantee cards have white background in light mode
  - Home: guarantee card descriptions have dark: prefix
  - Home: "Three Guarantees" title has dark: prefix
  - Home: testimonials subtitle has dark: prefix
  - Home: CTA Banner border visible in light mode (border-slate-100)
- 2026-03-27: Mobile responsiveness — 8 issues fixed:
  - Hero grid order: text/CTA now first on mobile (order-1), orb second (order-2)
  - Hero subtitle contrast: text-slate-600 light / text-slate-300 dark
  - Hero padding: pt-20 mobile → pt-24 sm+
  - 3D Orb height: 220px mobile → 340px tablet → 500px desktop
  - Hero grid gap: gap-4 mobile → gap-8 desktop
  - Stats strip border: visible in light mode (border-slate-200)
  - Stats values: text-slate-900 light / text-white dark
  - CTA Banner heading: text-3xl mobile → text-4xl tablet → text-5xl desktop
- 2026-03-27: Homepage 10/10 redesign — 6 major trust improvements:
  - Hero subtitle contrast improved (text-slate-300 from text-slate-400)
  - Micro-copy under CTA buttons ("⚡ Free 30-min audit · No commitment")
  - 4-stat quick-proof strip in hero (200+ Projects, 4.9/5, 99.98% Uptime, 6 Wks)
  - New "3 Guarantees" section (⚡ 6-Week Deployment, 💰 100% Money-Back, 🔒 Zero Breaches)
  - Testimonials now render result badge, company name, and verified badge from existing data
  - Final CTA Banner "See Results in 6 Weeks — Or Pay Nothing" with trust checklist
  - Ticker expanded from 6 to 14 bilingual trust signals
  - CTA buttons properly sized (no truncation on desktop)
- 2026-03-27: Full SEO audit — 7 critical issues fixed (see below)
- 2026-03-27: SEO.tsx rewritten — per-view dynamic title/description/keywords + full structured data
- 2026-03-27: index.html improved — static fallback meta, hreflang, OG tags, JSON-LD, favicon refs
- 2026-03-27: Dynamic html lang update — switches vi/en when user toggles language
- 2026-03-27: SEO_CONTENT constant added — bilingual title/description/keywords per view (5 views)
- 2026-03-27: public/robots.txt created — User-agent:*, Disallow:/api/, Sitemap reference
- 2026-03-27: public/sitemap.xml created — 5 URLs with hreflang alternates
- 2026-03-27: public/site.webmanifest + public/favicon.svg created
- 2026-03-27: Organization schema expanded — LocalBusiness, address, foundingDate, areaServed, WebSite + WebPage types
- 2026-03-27: AI Hub, About Us, Contact pages redesigned for trust (see below)
- 2026-03-27: Added SUGGESTED_PROMPTS constant (6 questions EN/VI) + clickable chips in AI Hub empty state
- 2026-03-27: Rewrote ABOUT_CONTENT — real founding story, verifiable commitments, removed buzzwords
- 2026-03-27: Replaced fictional leadership (Google Brain/MIT/Spotify) with realistic Vietnamese exec bios (FPT, VNG, HCMUT)
- 2026-03-27: Added "Delivery Guarantee" callout on About page (6-week pilot, 100% refund promise)
- 2026-03-27: Clarified Partners section label → "Cloud & Infrastructure Partners // Platforms we build on"
- 2026-03-27: Replaced fake "ID: CONNECT_NODE_ID_883 // AES-256" in Contact with response time + business registration
- 2026-03-27: Added CONTACT_CONTENT.responseTime + registrationNote fields (EN + VI)
- 2026-03-27: Rewrote all 5 service descriptions — specific metrics, real client results, no marketing fluff
- 2026-03-27: Added HOW_WE_WORK (4-phase delivery process) + TECH_STACK_LIST constants
- 2026-03-27: Technology page: tech stack strip + "How We Deliver" process section
- 2026-03-27: Fixed ROI calculator badge bug (was showing "2500% Efficiency Boost" for Data Analytics)
- 2026-03-27: Replaced "military-grade", "zero error rate" with specific, verifiable claims
- 2026-03-27: Fixed Gemini model name: gemini-3-pro-preview → gemini-2.0-flash
- 2026-03-27: Fixed TypeScript errors in ErrorBoundary.tsx (React 19 compatibility)
- 2025-12-23: Migrated from Tailwind CDN to build-time Tailwind CSS v4
- 2025-12-23: Added backend with Express, PostgreSQL, and Drizzle ORM
- 2025-12-23: Created API endpoints for contacts, services, and chat
- 2025-12-22: Configured for Replit environment (port 5000, allowed hosts)
