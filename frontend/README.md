# AIBD-FactoryLink 前端

这是 AIBD-FactoryLink 全自动外贸业务开发AI Agent 的前端界面，使用 React + TypeScript + Ant Design 构建。

## 🚀 快速开始

### 安装依赖

```bash
npm install
# 或者
yarn install
```

### 启动开发服务器

```bash
npm run dev
# 或者
yarn dev
```

前端将在 http://localhost:3000 启动

### 构建生产版本

```bash
npm run build
# 或者
yarn build
```

## 🛠️ 技术栈

- **React 18** - 用户界面库
- **TypeScript** - 类型安全
- **Ant Design** - UI组件库
- **Tailwind CSS** - 样式框架
- **Vite** - 构建工具
- **React Router** - 路由管理
- **React Query** - 数据获取
- **Zustand** - 状态管理

## 📁 项目结构

```
src/
├── components/          # 可复用组件
│   └── Layout/         # 布局组件
├── pages/              # 页面组件
│   ├── Dashboard.tsx   # 仪表板
│   ├── Onboarding.tsx  # 引导配置
│   ├── BusinessDevelopment.tsx # 业务开发
│   ├── Leads.tsx       # 潜在客户
│   ├── Analytics.tsx   # 数据分析
│   └── Settings.tsx    # 系统设置
├── services/           # API服务
├── stores/             # 状态管理
├── types/              # TypeScript类型定义
├── utils/              # 工具函数
├── App.tsx             # 主应用组件
└── main.tsx            # 应用入口
```

## 🌟 主要功能

### 1. 仪表板
- 关键指标展示
- 快速操作入口
- 最近活动记录
- 系统状态监控

### 2. 引导配置
- 网站自动分析
- AI信息提取
- 工厂档案配置
- 分步骤引导流程

### 3. 业务开发
- AI客户发现
- 自动客户筛选
- 进度跟踪
- 结果展示

### 4. 潜在客户管理
- 客户列表展示
- 搜索和筛选
- 状态管理
- 操作记录

### 5. 数据分析
- 关键指标统计
- 趋势分析
- 客户画像
- 优化建议

### 6. 系统设置
- 基本信息配置
- AI参数设置
- 业务规则配置
- 系统偏好设置

## 🔧 开发配置

### 环境变量

创建 `.env.local` 文件：

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_WS_BASE_URL=ws://localhost:8000
```

### 代理配置

前端开发服务器已配置代理，将 `/api` 和 `/ws` 请求转发到后端服务器。

## 📱 响应式设计

- 支持桌面端、平板和移动端
- 使用 Ant Design 的响应式栅格系统
- 移动端友好的交互设计

## 🎨 设计特色

- 现代化的UI设计
- 渐变色和阴影效果
- 流畅的动画过渡
- 一致的设计语言

## 🚀 部署

### 构建

```bash
npm run build
```

### 部署到静态服务器

将 `dist` 目录部署到任何静态文件服务器，如：
- Nginx
- Apache
- Vercel
- Netlify
- GitHub Pages

## 🤝 贡献

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证。
