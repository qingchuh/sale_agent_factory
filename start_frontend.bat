@echo off
chcp 65001 >nul
echo 🚀 启动 AIBD-FactoryLink 前端...

REM 检查是否在正确的目录
if not exist "frontend\package.json" (
    echo ❌ 错误: 请在项目根目录运行此脚本
    pause
    exit /b 1
)

REM 进入前端目录
cd frontend

REM 检查是否已安装依赖
if not exist "node_modules" (
    echo 📦 安装依赖...
    npm install
    if errorlevel 1 (
        echo ❌ 依赖安装失败
        pause
        exit /b 1
    )
)

REM 启动开发服务器
echo 🌟 启动开发服务器...
echo 📍 前端地址: http://localhost:3000
echo 🔗 后端API: http://localhost:8000
echo.
echo 按 Ctrl+C 停止服务器
echo.

npm run dev
pause
