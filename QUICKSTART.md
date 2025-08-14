# 🚀 AIBD-FactoryLink 快速启动指南

## 快速开始

### 1. 环境准备

确保您的系统已安装：
- Python 3.9+
- pip
- git

### 2. 克隆项目

```bash
git clone <your-repository-url>
cd sale_agent_factory
```

### 3. 创建虚拟环境

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

### 4. 安装依赖

```bash
pip install -r requirements.txt
```

### 5. 配置环境变量

```bash
# 复制环境变量模板
cp env.example .env

# 编辑 .env 文件，设置必要的配置
# 特别是 OPENAI_API_KEY
```

### 6. 运行系统测试

```bash
python test_system.py
```

### 7. 启动服务

```bash
python start.py
```

服务将在 http://localhost:8000 启动

## 🐳 Docker 部署

### 使用 Docker Compose

```bash
# 构建并启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f aibd-factorylink
```

### 仅使用 Docker

```bash
# 构建镜像
docker build -t aibd-factorylink .

# 运行容器
docker run -p 8000:8000 --env-file .env aibd-factorylink
```

## 📱 API 使用示例

### 开始引导流程

```bash
curl -X POST "http://localhost:8000/api/v1/onboarding/start" \
  -H "Content-Type: application/json" \
  -d '{"website_url": "https://example.com"}'
```

### 确认工厂档案

```bash
curl -X POST "http://localhost:8000/api/v1/onboarding/confirm-profile" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "示例工厂",
    "website": "https://example.com",
    "ideal_customer_profile": "北美消费电子品牌",
    "core_advantages": ["高质量", "快速交付"]
  }'
```

### 启动业务开发

```bash
curl -X POST "http://localhost:8000/api/v1/business-development/start" \
  -H "Content-Type: application/json" \
  -d '{"factory_id": 1}'
```

## 🔧 配置说明

### 必需配置

- `OPENAI_API_KEY`: OpenAI API密钥
- `DATABASE_URL`: 数据库连接字符串
- `SECRET_KEY`: 应用安全密钥

### 可选配置

- `REDIS_URL`: Redis连接字符串
- `SMTP_*`: 邮件服务配置
- `LINKEDIN_*`: LinkedIn API配置

## 📊 监控和日志

### 健康检查

```bash
curl http://localhost:8000/health
```

### 查看日志

```bash
# 应用日志
tail -f logs/aibd_factorylink.log

# Docker 日志
docker-compose logs -f aibd-factorylink
```

## 🆘 常见问题

### Q: OpenAI API 密钥无效
A: 请检查 .env 文件中的 OPENAI_API_KEY 是否正确设置

### Q: 数据库连接失败
A: 检查 DATABASE_URL 配置，确保数据库服务正在运行

### Q: 网站分析失败
A: 检查目标网站是否可访问，网络连接是否正常

## 📞 获取帮助

- 查看项目文档: README.md
- 提交 Issue: [GitHub Issues]
- 联系支持: [联系邮箱]

## 🎯 下一步

1. 熟悉 API 接口
2. 集成到现有系统
3. 自定义业务逻辑
4. 部署到生产环境

---

**祝您使用愉快！** 🎉
