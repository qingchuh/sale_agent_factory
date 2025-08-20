#!/usr/bin/env python3
"""
AIBD-FactoryLink Startup Script
"""

import os
import sys
import uvicorn
from pathlib import Path

# Add project root directory to Python path
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

# Load environment variables
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    print("⚠️  Warning: python-dotenv not installed, environment variables may not load correctly")

def main():
    """Main startup function"""
    print("🚀 Starting AIBD-FactoryLink Full-Automated Foreign Trade Business Development AI Agent...")
    
    # Check environment variable file
    env_file = project_root / ".env"
    if not env_file.exists():
        print("⚠️  Warning: .env file not found")
        print("📝 Please copy env.example to .env and configure necessary environment variables")
        print("🔑 OPENAI_API_KEY is particularly required")
    
    # Check OpenAI API key
    openai_key = os.getenv("OPENAI_API_KEY")
    if not openai_key:
        print("❌ Error: OPENAI_API_KEY environment variable not set")
        print("🔑 Please set your OpenAI API key in .env file")
        sys.exit(1)
    
    # Check database configuration
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        print("⚠️  Warning: DATABASE_URL environment variable not set")
        print("🗄️  Will use default SQLite database")
        os.environ["DATABASE_URL"] = "sqlite:///./aibd_factorylink.db"
    
    # Create logs directory
    log_dir = project_root / "logs"
    log_dir.mkdir(exist_ok=True)
    
    print("✅ Environment check completed")
    print("🌐 Starting web server...")
    
    # Start FastAPI application
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
