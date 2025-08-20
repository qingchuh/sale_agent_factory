# 🚀 Frontend Quick Start Guide

## 📋 Prerequisites

Ensure your system has installed:
- **Node.js** 16.0+ 
- **npm** 8.0+ or **yarn** 1.22+

## 🎯 One-Click Startup (Recommended)

### macOS/Linux Users
```bash
./start_frontend.sh
```

### Windows Users
```cmd
start_frontend.bat
```

## 🔧 Manual Startup

### 1. Enter Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Access Frontend Interface
Open browser and visit: **http://localhost:3000**

## 🌟 Main Features Preview

### 📊 Dashboard
- Key business metrics display
- Quick operation access
- System status monitoring

### 🚀 Onboarding Configuration
- Automatic website analysis
- AI information extraction
- Step-by-step configuration process

### 🌍 Business Development
- AI customer discovery
- Real-time progress tracking
- Result visualization

### 👥 Lead Management
- Customer list management
- Search and filtering
- Status tracking

### 📈 Data Analytics
- Business data statistics
- Trend analysis
- Optimization suggestions

### ⚙️ System Settings
- AI parameter configuration
- Business rule settings
- System preference management

## 🔗 Frontend-Backend Connection

Frontend is configured with proxy to automatically forward API requests to backend:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- WebSocket: ws://localhost:8000

## 🎨 Interface Features

- **Modern Design**: Uses Ant Design component library
- **Responsive Layout**: Supports various device sizes
- **Smooth Animations**: Elegant interaction experience
- **English Interface**: Fully English user interface

## 🚨 Common Issues

### Q: Dependency installation failed?
A: Try using domestic mirror:
```bash
npm config set registry https://registry.npmmirror.com
npm install
```

### Q: Port is occupied?
A: Modify port configuration in `vite.config.ts`

### Q: Backend connection failed?
A: Ensure backend service is running at http://localhost:8000

## 📱 Mobile Support

Frontend fully supports mobile access, including:
- Responsive layout
- Touch-friendly interactions
- Mobile-optimized components

## 🎯 Next Steps

After starting frontend, you can:
1. Experience complete user interface
2. Test AI onboarding process
3. View business development features
4. Configure system parameters

---

**🎉 Congratulations! Your frontend interface is ready!**
