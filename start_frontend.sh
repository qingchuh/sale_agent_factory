#!/bin/bash

echo "🚀 启动 AIBD-FactoryLink 前端..."

# 检查是否在正确的目录
if [ ! -f "frontend/package.json" ]; then
    echo "❌ 错误: 请在项目根目录运行此脚本"
    exit 1
fi

# 进入前端目录
cd frontend

# 检查是否已安装依赖
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 依赖安装失败"
        exit 1
    fi
fi

# 启动开发服务器
echo "🌟 启动开发服务器..."
echo "📍 前端地址: http://localhost:3000"
echo "🔗 后端API: http://localhost:8000"
echo ""
echo "按 Ctrl+C 停止服务器"
echo ""

npm run dev
