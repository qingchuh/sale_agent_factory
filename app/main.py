from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import uvicorn
from typing import Dict, Any

from app.core.config import settings
from app.core.database import init_db
from app.api.v1.api import api_router
from app.core.websocket import websocket_router
from app.services.ai_agent import AIAgentService


@asynccontextmanager
async def lifespan(app: FastAPI):
    """应用生命周期管理"""
    # 启动时初始化
    await init_db()
    print("🚀 AIBD-FactoryLink 启动成功!")
    yield
    # 关闭时清理
    print("👋 AIBD-FactoryLink 正在关闭...")


app = FastAPI(
    title="AIBD-FactoryLink",
    description="全自动外贸业务开发AI Agent系统",
    version="2.0.0",
    lifespan=lifespan
)

# CORS配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_HOSTS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由
app.include_router(api_router, prefix="/api/v1")
app.include_router(websocket_router, prefix="/ws")

# 健康检查
@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "AIBD-FactoryLink"}

# 根路径
@app.get("/")
async def root():
    return {
        "message": "欢迎使用 AIBD-FactoryLink 全自动外贸业务开发AI Agent",
        "version": "2.0.0",
        "status": "running"
    }

# 错误处理
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail, "status_code": exc.status_code}
    )


if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
