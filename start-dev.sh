#!/bin/bash

# Frontend Dev Script
# Quick start frontend with backend URL

set -e

echo "🚀 Starting fe-despametingan frontend..."

cd /home/smilarity/work/fe-despametingan

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "🔌 Frontend will connect to: http://localhost:8000/api/"
echo ""
echo "Make sure backend is running on port 8000!"
echo ""
echo "Starting dev server..."

npm run dev
