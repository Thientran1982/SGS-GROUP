# SGS Group - AI

## Overview
A modern React + TypeScript website for SGS GROUP showcasing AI, Automation, and Cloud Computing solutions. Features a futuristic design with 3D cube visuals, animated text effects, and an AI chat hub integration.

## Tech Stack
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS (via CDN in development)
- **AI Integration**: Google Gemini API (@google/genai)

## Project Structure
```
├── src/
│   ├── components/      # React components
│   ├── services/        # API services (Gemini AI)
│   ├── App.tsx          # Main application
│   ├── constants.ts     # App constants
│   └── types.ts         # TypeScript types
├── index.html           # Entry HTML
├── index.tsx            # React entry point
├── vite.config.ts       # Vite configuration
└── package.json         # Dependencies
```

## Development
- **Port**: 5000 (configured in vite.config.ts)
- **Command**: `npm run dev`
- **Build**: `npm run build`

## Environment Variables
- `GEMINI_API_KEY` - Google Gemini API key for AI chat functionality

## Recent Changes
- 2025-12-22: Configured for Replit environment (port 5000, allowed hosts)
