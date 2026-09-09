#!/bin/bash
# Start both the API server and the Vite dev server
pkill -f "node server.mjs" 2>/dev/null
node server.mjs > /tmp/sgs-api.log 2>&1 &
echo "API server starting on :3001"
npm run dev
