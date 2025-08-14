from pydantic_settings import BaseSettings
from typing import List, Optional
import os


class Settings(BaseSettings):
    """应用配置类"""
    
    # 基础配置
    PROJECT_NAME: str = "AIBD-FactoryLink"
    VERSION: str = "2.0.0"
    API_V1_STR: str = "/api/v1"
    
    # 服务器配置
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    DEBUG: bool = True
    
    # 安全配置
    SECRET_KEY: str = "your-secret-key-here-change-in-production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    
    # CORS配置
    ALLOWED_HOSTS: List[str] = ["*"]
    
    # 数据库配置
    DATABASE_URL: str = "postgresql://user:password@localhost/aibd_factorylink"
    
    # Redis配置
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # OpenAI配置
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4"
    OPENAI_MAX_TOKENS: int = 4000
    OPENAI_TEMPERATURE: float = 0.7
    
    # 网站分析配置
    WEB_SCRAPING_TIMEOUT: int = 30
    MAX_PAGES_TO_SCRAPE: int = 20
    USER_AGENT: str = "Mozilla/5.0 (compatible; AIBD-FactoryLink/2.0)"
    
    # 邮件配置
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    
    # LinkedIn配置
    LINKEDIN_USERNAME: str = ""
    LINKEDIN_PASSWORD: str = ""
    
    # 任务队列配置
    CELERY_BROKER_URL: str = "redis://localhost:6379/0"
    CELERY_RESULT_BACKEND: str = "redis://localhost:6379/0"
    
    # 日志配置
    LOG_LEVEL: str = "INFO"
    LOG_FILE: str = "logs/aibd_factorylink.log"
    
    # 业务配置
    MAX_LEADS_PER_DAY: int = 100
    MIN_LEAD_SCORE: float = 0.7
    FOLLOW_UP_INTERVAL_DAYS: int = 3
    
    class Config:
        env_file = ".env"
        case_sensitive = True


# 创建全局设置实例
settings = Settings()

# 环境变量覆盖
if os.getenv("OPENAI_API_KEY"):
    settings.OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if os.getenv("DATABASE_URL"):
    settings.DATABASE_URL = os.getenv("DATABASE_URL")

if os.getenv("REDIS_URL"):
    settings.REDIS_URL = os.getenv("REDIS_URL")
