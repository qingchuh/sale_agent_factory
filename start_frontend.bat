@echo off
chcp 65001 >nul
echo 🚀 Starting AIBD-FactoryLink Frontend...

REM Check if in correct directory
if not exist "frontend\package.json" (
    echo ❌ Error: Please run this script from project root directory
    pause
    exit /b 1
)

REM Enter frontend directory
cd frontend

REM Check if dependencies are installed
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
    if errorlevel 1 (
        echo ❌ Dependency installation failed
        pause
        exit /b 1
    )
)

REM Start development server
echo 🌟 Starting development server...
echo 📍 Frontend address: http://localhost:3000
echo 🔗 Backend API: http://localhost:8000
echo.
echo Press Ctrl+C to stop server
echo.

npm run dev
pause
