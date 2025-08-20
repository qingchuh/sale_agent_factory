# AIBD-FactoryLink: Full-Automated Foreign Trade Business Development AI Agent

## Project Overview

AIBD-FactoryLink is an AI-based intelligent foreign trade business development system, specifically designed to provide fully automated overseas customer development services for manufacturing factories.

## Core Features

### 🚀 Intelligent Onboarding & Configuration
- **One-Click Website Analysis**: Simply provide your company website, AI automatically extracts key information
- **Smart Profile Building**: Automatically identifies products, advantages, certifications, and other information
- **Interactive Confirmation**: Complete all necessary information through dialogue

### 🌍 Global Business Development
- **Market Analysis**: Intelligent analysis of target market opportunities
- **Lead Generation**: Automatically generates potential customer lists based on ICP
- **Qualification Screening**: Multi-dimensional filtering for high-quality customers

### 📝 Personalized Content Creation
- **Customized Marketing Materials**: Generates personalized content based on customer characteristics
- **Multi-language Support**: Supports business communication in multiple languages
- **Brand Consistency**: Maintains unified company brand image

### 📧 Multi-Channel Execution
- **Email Marketing**: Intelligent email sequences and follow-ups
- **LinkedIn Marketing**: Professional social network development
- **Phone Follow-up**: Voice recognition and intelligent dialogue

### 📊 Opportunity Management
- **Sales Funnel**: Complete customer lifecycle management
- **Progress Tracking**: Real-time monitoring of development progress
- **Smart Handover**: Automatically generates customer profiles and follow-up recommendations

## Technical Architecture

- **Backend**: FastAPI + SQLAlchemy + PostgreSQL
- **AI Engine**: OpenAI GPT + Custom Prompt Engineering
- **Task Queue**: Celery + Redis
- **Frontend**: Modern Web Interface (Planned)
- **Deployment**: Docker + Kubernetes (Planned)

## Quick Start

### Requirements
- Python 3.9+
- PostgreSQL 13+
- Redis 6+

### Installation Steps

1. Clone the project
```bash
git clone <repository-url>
cd sale_agent_factory
```

2. Create virtual environment
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate  # Windows
```

3. Install dependencies
```bash
pip install -r requirements.txt
```

4. Configure environment variables
```bash
cp .env.example .env
# Edit .env file and fill in necessary configuration information
```

5. Initialize database
```bash
alembic upgrade head
```

6. Start services
```bash
uvicorn app.main:app --reload
```

## Usage Workflow

1. **Initial Configuration**: Provide company website, AI automatically analyzes and builds profile
2. **Information Confirmation**: Confirm and supplement key information (ICP, core advantages, etc.)
3. **Launch Development**: AI begins global business development work
4. **Monitor Progress**: Real-time view of development status and results
5. **Customer Handover**: Obtain high-quality potential customer lists

## Configuration

### Environment Variables
- `OPENAI_API_KEY`: OpenAI API key
- `DATABASE_URL`: Database connection string
- `REDIS_URL`: Redis connection string
- `SECRET_KEY`: Application security key

### AI Configuration
- Support for custom Prompt templates
- Configurable AI model parameters
- Multi-language support configuration

## Development Roadmap

- [x] Core AI engine development
- [x] Website analysis module
- [x] Basic API framework
- [ ] Web management interface
- [ ] Mobile application
- [ ] Advanced analytics reports
- [ ] Multi-tenant support

## Contributing

Welcome to submit Issues and Pull Requests to help improve this project.

## License

MIT License

## Frontend Interface

### 🎨 Modern Web Interface

The project includes a complete frontend interface built with React + TypeScript + Ant Design.

#### Main Pages
- **Dashboard**: Key metrics display and quick operations
- **Onboarding**: Step-by-step AI-guided process
- **Business Development**: AI customer discovery and progress tracking
- **Leads**: Customer management and filtering
- **Analytics**: Business data analysis and reports
- **Settings**: Configuration management and preferences

#### Quick Start Frontend

1. **Enter frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Access frontend interface**
- Frontend address: http://localhost:3000
- Backend API: http://localhost:8000

#### Using Startup Scripts (Recommended)

**macOS/Linux:**
```bash
./start_frontend.sh
```

**Windows:**
```cmd
start_frontend.bat
```

### 🛠️ Frontend Tech Stack

- **React 18** - Modern user interface library
- **TypeScript** - Type-safe JavaScript
- **Ant Design** - Enterprise-grade UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool
- **React Router** - Client-side routing management
- **React Query** - Data fetching and caching

## Contact

For questions or suggestions, please contact us through:
- Project Issues: [GitHub Issues]
- Email: [Contact Email]
