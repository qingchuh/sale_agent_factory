# 🚀 AIBD-FactoryLink Quick Start Guide

## Quick Start

### 1. Environment Preparation

Ensure your system has installed:
- Python 3.9+
- pip
- git

### 2. Clone Project

```bash
git clone <your-repository-url>
cd sale_agent_factory
```

### 3. Create Virtual Environment

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

### 5. Configure Environment Variables

```bash
# Copy environment variable template
cp env.example .env

# Edit .env file and set necessary configurations
# Especially OPENAI_API_KEY
```

### 6. Run System Test

```bash
python test_system.py
```

### 7. Start Services

```bash
python start.py
```

Service will start at http://localhost:8000

## 🐳 Docker Deployment

### Using Docker Compose

```bash
# Build and start all services
docker-compose up -d

# Check service status
docker-compose ps

# View logs
docker-compose logs -f aibd-factorylink
```

### Using Docker Only

```bash
# Build image
docker build -t aibd-factorylink .

# Run container
docker run -p 8000:8000 --env-file .env aibd-factorylink
```

## 📱 API Usage Examples

### Start Onboarding Process

```bash
curl -X POST "http://localhost:8000/api/v1/onboarding/start" \
  -H "Content-Type: application/json" \
  -d '{"website_url": "https://example.com"}'
```

### Confirm Factory Profile

```bash
curl -X POST "http://localhost:8000/api/v1/onboarding/confirm-profile" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Example Factory",
    "website": "https://example.com",
    "ideal_customer_profile": "North American Consumer Electronics Brands",
    "core_advantages": ["High Quality", "Fast Delivery"]
  }'
```

### Launch Business Development

```bash
curl -X POST "http://localhost:8000/api/v1/business-development/start" \
  -H "Content-Type: application/json" \
  -d '{"factory_id": 1}'
```

## 🔧 Configuration

### Required Configuration

- `OPENAI_API_KEY`: OpenAI API key
- `DATABASE_URL`: Database connection string
- `SECRET_KEY`: Application security key

### Optional Configuration

- `REDIS_URL`: Redis connection string
- `SMTP_*`: Email service configuration
- `LINKEDIN_*`: LinkedIn API configuration

## 📊 Monitoring and Logs

### Health Check

```bash
curl http://localhost:8000/health
```

### View Logs

```bash
# Application logs
tail -f logs/aibd_factorylink.log

# Docker logs
docker-compose logs -f aibd-factorylink
```

## 🆘 FAQ

### Q: OpenAI API key invalid
A: Please check if OPENAI_API_KEY is correctly set in .env file

### Q: Database connection failed
A: Check DATABASE_URL configuration and ensure database service is running

### Q: Website analysis failed
A: Check if target website is accessible and network connection is normal

## 📞 Get Help

- View project documentation: README.md
- Submit Issue: [GitHub Issues]
- Contact support: [Contact Email]

## 🎯 Next Steps

1. Familiarize with API interfaces
2. Integrate into existing systems
3. Customize business logic
4. Deploy to production environment

---

**Happy using!** 🎉
