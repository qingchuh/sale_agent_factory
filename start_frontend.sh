#!/bin/bash

echo "🚀 Starting AIBD-FactoryLink Frontend..."

# Check if in correct directory
if [ ! -f "frontend/package.json" ]; then
    echo "❌ Error: Please run this script from project root directory"
    exit 1
fi

# Enter frontend directory
cd frontend

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Dependency installation failed"
        exit 1
    fi
fi

# Start development server
echo "🌟 Starting development server..."
echo "📍 Frontend address: http://localhost:3000"
echo "🔗 Backend API: http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop server"
echo ""

npm run dev
