#!/usr/bin/env python3
"""
AIBD-FactoryLink 启动脚本
"""

import os
import sys
import uvicorn
from pathlib import Path

# 添加项目根目录到Python路径
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

# 加载环境变量
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    print("⚠️  警告: 未安装 python-dotenv，环境变量可能无法正确加载")

def main():
    """主启动函数"""
    print("🚀 启动 AIBD-FactoryLink 全自动外贸业务开发AI Agent...")
    
    # 检查环境变量文件
    env_file = project_root / ".env"
    if not env_file.exists():
        print("⚠️  警告: 未找到 .env 文件")
        print("📝 请复制 env.example 为 .env 并配置必要的环境变量")
        print("🔑 特别是 OPENAI_API_KEY 是必需的")
    
    # 检查OpenAI API密钥
    openai_key = os.getenv("OPENAI_API_KEY")
    if not openai_key:
        print("❌ 错误: 未设置 OPENAI_API_KEY 环境变量")
        print("🔑 请在 .env 文件中设置您的OpenAI API密钥")
        sys.exit(1)
    
    # 检查数据库配置
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        print("⚠️  警告: 未设置 DATABASE_URL 环境变量")
        print("🗄️  将使用默认的SQLite数据库")
        os.environ["DATABASE_URL"] = "sqlite:///./aibd_factorylink.db"
    
    # 创建日志目录
    log_dir = project_root / "logs"
    log_dir.mkdir(exist_ok=True)
    
    print("✅ 环境检查完成")
    print("🌐 启动Web服务器...")
    
    # 启动FastAPI应用
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info",
        access_log=True
    )

if __name__ == "__main__":
    main()
