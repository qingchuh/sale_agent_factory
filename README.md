# AIBD-FactoryLink: 全自动外贸业务开发AI Agent

## 项目简介

AIBD-FactoryLink 是一个基于AI的智能外贸业务开发系统，专门为制造业工厂提供全自动化的海外客户开发服务。

## 核心功能

### 🚀 智能引导与配置
- **一键网站分析**: 只需提供公司官网，AI自动提取关键信息
- **智能档案建立**: 自动识别产品、优势、认证等信息
- **交互式确认**: 通过对话完善所有必要信息

### 🌍 全球业务开发
- **市场分析**: 智能分析目标市场机会
- **目标生成**: 基于ICP自动生成潜在客户列表
- **资格认证**: 多维度筛选高质量客户

### 📝 个性化内容创建
- **定制化营销材料**: 根据客户特点生成个性化内容
- **多语言支持**: 支持多种语言的商务沟通
- **品牌一致性**: 保持公司品牌形象统一

### 📧 多渠道执行
- **邮件营销**: 智能邮件序列和跟进
- **LinkedIn营销**: 专业的社交网络开发
- **电话跟进**: 语音识别和智能对话

### 📊 机会管理
- **销售漏斗**: 完整的客户生命周期管理
- **进度跟踪**: 实时监控开发进度
- **智能交接**: 自动生成客户档案和跟进建议

## 技术架构

- **后端**: FastAPI + SQLAlchemy + PostgreSQL
- **AI引擎**: OpenAI GPT + 自定义Prompt工程
- **任务队列**: Celery + Redis
- **前端**: 现代化Web界面 (计划中)
- **部署**: Docker + Kubernetes (计划中)

## 快速开始

### 环境要求
- Python 3.9+
- PostgreSQL 13+
- Redis 6+

### 安装步骤

1. 克隆项目
```bash
git clone <repository-url>
cd sale_agent_factory
```

2. 创建虚拟环境
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# 或
venv\Scripts\activate  # Windows
```

3. 安装依赖
```bash
pip install -r requirements.txt
```

4. 配置环境变量
```bash
cp .env.example .env
# 编辑 .env 文件，填入必要的配置信息
```

5. 初始化数据库
```bash
alembic upgrade head
```

6. 启动服务
```bash
uvicorn app.main:app --reload
```

## 使用流程

1. **初始配置**: 提供公司官网，AI自动分析并建立档案
2. **信息确认**: 确认和补充关键信息（ICP、核心优势等）
3. **启动开发**: AI开始全球业务开发工作
4. **监控进度**: 实时查看开发状态和结果
5. **客户交接**: 获得高质量的潜在客户列表

## 配置说明

### 环境变量
- `OPENAI_API_KEY`: OpenAI API密钥
- `DATABASE_URL`: 数据库连接字符串
- `REDIS_URL`: Redis连接字符串
- `SECRET_KEY`: 应用安全密钥

### AI配置
- 支持自定义Prompt模板
- 可配置的AI模型参数
- 多语言支持配置

## 开发计划

- [x] 核心AI引擎开发
- [x] 网站分析模块
- [x] 基础API框架
- [ ] Web管理界面
- [ ] 移动端应用
- [ ] 高级分析报告
- [ ] 多租户支持

## 贡献指南

欢迎提交Issue和Pull Request来帮助改进这个项目。

## 许可证

MIT License

## 联系方式

如有问题或建议，请通过以下方式联系：
- 项目Issues: [GitHub Issues]
- 邮箱: [联系邮箱]
