# SGS Group - AI

## Overview
A modern React + TypeScript website for SGS GROUP showcasing AI, Automation, and Cloud Computing solutions. Features a futuristic design with 3D cube visuals, animated text effects, and an AI chat hub integration.

## Tech Stack
- **Frontend**: React 19 with TypeScript, Vite 6
- **Backend**: Node.js with Express
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS (via CDN)
- **AI Integration**: Google Gemini API (@google/genai)

## Project Structure
```
├── src/
│   ├── components/      # React components
│   ├── services/        # Frontend API services
│   ├── App.tsx          # Main application
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
- **Backend**: Port 3001 (Express)
- **Command**: `npm run dev` (runs both)
- **Build**: `npm run build`
- **DB Push**: `npm run db:push`

## Environment Variables
- `DATABASE_URL` - PostgreSQL connection string (auto-configured)
- `GEMINI_API_KEY` - Google Gemini API key for AI chat

## Recent Changes
- 2025-12-23: Added backend with Express, PostgreSQL, and Drizzle ORM
- 2025-12-23: Created API endpoints for contacts, services, and chat
- 2025-12-22: Configured for Replit environment (port 5000, allowed hosts)
