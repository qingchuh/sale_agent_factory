import openai
import asyncio
import json
from typing import Dict, List, Any, Optional
from datetime import datetime
import logging

from app.core.config import settings
from app.services.web_analyzer import WebAnalyzer
from app.services.lead_generator import LeadGenerator
from app.services.content_creator import ContentCreator
from app.models.factory import Factory
from app.models.lead import Lead

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# 配置OpenAI
openai.api_key = settings.OPENAI_API_KEY


class AIAgentService:
    """AI业务开发代理服务"""
    
    def __init__(self):
        self.web_analyzer = WebAnalyzer()
        self.lead_generator = LeadGenerator()
        self.content_creator = ContentCreator()
        self.system_prompt = self._load_system_prompt()
    
    def _load_system_prompt(self) -> str:
        """加载系统级Prompt"""
        return """你是一个名为 "AIBD-FactoryLink" 的世界顶尖级AI业务发展专家 (AI Business Development Expert)。

你的核心使命是为指定的工厂创造高质量的商业机会，通过智能化的市场分析、精准的目标客户筛选、个性化的内容创建和多渠道的执行策略，实现从0到1的客户开发。

你的工作流程包括：
1. 网站分析与信息提取
2. 市场分析与目标生成
3. 筛选与资格认证
4. 个性化内容创建
5. 多渠道执行与跟进
6. 机会交接

请始终保持专业、诚实、以用户为中心的工作态度。"""
    
    async def start_onboarding(self, website_url: str) -> Dict[str, Any]:
        """开始引导对话和网站分析"""
        try:
            logger.info(f"开始分析网站: {website_url}")
            
            # 1. 网站分析
            website_info = await self.web_analyzer.analyze_website(website_url)
            
            # 2. AI信息提取和整理
            extracted_info = await self._extract_factory_info(website_info)
            
            # 3. 生成引导对话
            onboarding_conversation = await self._generate_onboarding_conversation(extracted_info)
            
            return {
                "status": "success",
                "website_analyzed": True,
                "extracted_info": extracted_info,
                "onboarding_conversation": onboarding_conversation,
                "next_step": "confirm_info"
            }
            
        except Exception as e:
            logger.error(f"网站分析失败: {e}")
            return {
                "status": "error",
                "message": f"网站分析失败: {str(e)}"
            }
    
    async def _extract_factory_info(self, website_info: Dict[str, Any]) -> Dict[str, Any]:
        """使用AI提取工厂信息"""
        try:
            prompt = f"""
基于以下网站信息，请提取并整理工厂的关键信息：

网站内容：
{json.dumps(website_info, ensure_ascii=False, indent=2)}

请按照以下格式提取信息：

工厂名称: [从网站中提取的公司名称]
主营产品: [列出主要产品线和产品类别]
核心优势: [分析并列出公司的核心竞争优势]
已发现的认证: [列出找到的认证信息]
公司描述: [简要描述公司概况]
地理位置: [公司所在地]
成立年份: [如果找到]
员工规模: [如果找到]

请确保信息准确，如果某项信息无法从网站获取，请标记为"未找到"。
"""

            response = await openai.ChatCompletion.acreate(
                model=settings.OPENAI_MODEL,
                messages=[
                    {"role": "system", "content": self.system_prompt},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=settings.OPENAI_MAX_TOKENS,
                temperature=settings.OPENAI_TEMPERATURE
            )
            
            extracted_text = response.choices[0].message.content
            
            # 解析AI返回的信息
            parsed_info = self._parse_extracted_info(extracted_text)
            
            return {
                "raw_extraction": extracted_text,
                "parsed_info": parsed_info,
                "website_data": website_info
            }
            
        except Exception as e:
            logger.error(f"AI信息提取失败: {e}")
            return {
                "error": str(e),
                "website_data": website_info
            }
    
    def _parse_extracted_info(self, extracted_text: str) -> Dict[str, Any]:
        """解析AI提取的信息"""
        parsed_info = {}
        
        # 简单的文本解析逻辑
        lines = extracted_text.split('\n')
        current_key = None
        
        for line in lines:
            line = line.strip()
            if ':' in line:
                key, value = line.split(':', 1)
                key = key.strip()
                value = value.strip()
                
                if key in ['工厂名称', '主营产品', '核心优势', '已发现的认证', '公司描述', '地理位置', '成立年份', '员工规模']:
                    parsed_info[key] = value
        
        return parsed_info
    
    async def _generate_onboarding_conversation(self, extracted_info: Dict[str, Any]) -> Dict[str, Any]:
        """生成引导对话内容"""
        try:
            prompt = f"""
基于已提取的工厂信息，请生成一个引导对话来帮助用户确认和补充信息：

已提取的信息：
{json.dumps(extracted_info.get('parsed_info', {}), ensure_ascii=False, indent=2)}

请生成以下内容：
1. 信息确认部分：以友好的方式展示提取的信息
2. 需要补充的关键信息：列出需要用户确认或补充的重要信息
3. 引导问题：生成3-5个关键问题来完善工厂档案

请确保对话自然、专业，并突出需要用户确认的关键点。
"""

            response = await openai.ChatCompletion.acreate(
                model=settings.OPENAI_MODEL,
                messages=[
                    {"role": "system", "content": self.system_prompt},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=settings.OPENAI_MAX_TOKENS,
                temperature=settings.OPENAI_TEMPERATURE
            )
            
            conversation_text = response.choices[0].message.content
            
            return {
                "conversation": conversation_text,
                "extracted_info": extracted_info.get('parsed_info', {}),
                "questions_to_ask": self._extract_questions(conversation_text)
            }
            
        except Exception as e:
            logger.error(f"生成引导对话失败: {e}")
            return {
                "error": str(e),
                "conversation": "抱歉，生成引导对话时出现错误。"
            }
    
    def _extract_questions(self, conversation_text: str) -> List[str]:
        """从对话中提取需要回答的问题"""
        questions = []
        lines = conversation_text.split('\n')
        
        for line in lines:
            line = line.strip()
            if line.endswith('?') or '?' in line:
                questions.append(line)
        
        return questions[:5]  # 最多返回5个问题
    
    async def confirm_factory_profile(self, factory_data: Dict[str, Any]) -> Dict[str, Any]:
        """确认工厂档案信息"""
        try:
            # 验证必要字段
            required_fields = ['name', 'website', 'ideal_customer_profile', 'core_advantages']
            missing_fields = [field for field in required_fields if not factory_data.get(field)]
            
            if missing_fields:
                return {
                    "status": "error",
                    "message": f"缺少必要信息: {', '.join(missing_fields)}",
                    "missing_fields": missing_fields
                }
            
            # 创建工厂档案
            factory = Factory(
                name=factory_data['name'],
                website=factory_data['website'],
                description=factory_data.get('description'),
                location=factory_data.get('location'),
                main_products=factory_data.get('main_products'),
                core_advantages=factory_data.get('core_advantages'),
                competitive_position=factory_data.get('competitive_position'),
                certifications=factory_data.get('certifications'),
                ideal_customer_profile=factory_data.get('ideal_customer_profile'),
                target_markets=factory_data.get('target_markets'),
                target_industries=factory_data.get('target_industries'),
                contact_person=factory_data.get('contact_person'),
                contact_title=factory_data.get('contact_title'),
                blacklisted_companies=factory_data.get('blacklisted_companies'),
                profile_completed=True
            )
            
            return {
                "status": "success",
                "message": "工厂档案创建成功！",
                "factory": factory.to_dict(),
                "next_step": "start_business_development"
            }
            
        except Exception as e:
            logger.error(f"确认工厂档案失败: {e}")
            return {
                "status": "error",
                "message": f"确认工厂档案失败: {str(e)}"
            }
    
    async def start_business_development(self, factory_id: int) -> Dict[str, Any]:
        """启动全球业务开发"""
        try:
            logger.info(f"启动业务开发，工厂ID: {factory_id}")
            
            # 1. 市场分析
            market_analysis = await self._analyze_market_opportunities(factory_id)
            
            # 2. 生成潜在客户
            leads = await self.lead_generator.generate_leads(factory_id, market_analysis)
            
            # 3. 创建个性化内容
            content_templates = await self.content_creator.create_content_templates(factory_id)
            
            return {
                "status": "success",
                "message": "业务开发启动成功！",
                "market_analysis": market_analysis,
                "leads_generated": len(leads),
                "content_templates": len(content_templates),
                "next_step": "execute_outreach"
            }
            
        except Exception as e:
            logger.error(f"启动业务开发失败: {e}")
            return {
                "status": "error",
                "message": f"启动业务开发失败: {str(e)}"
            }
    
    async def _analyze_market_opportunities(self, factory_id: int) -> Dict[str, Any]:
        """分析市场机会"""
        # 这里应该实现具体的市场分析逻辑
        return {
            "target_markets": ["北美", "欧洲", "东南亚"],
            "opportunity_score": 85,
            "market_trends": ["数字化转型", "可持续发展", "本地化生产"],
            "competitive_landscape": "中等竞争强度"
        }
    
    async def execute_outreach(self, factory_id: int, lead_ids: List[int]) -> Dict[str, Any]:
        """执行客户开发活动"""
        try:
            results = []
            
            for lead_id in lead_ids:
                # 为每个潜在客户创建个性化内容
                personalized_content = await self.content_creator.create_personalized_content(
                    factory_id, lead_id
                )
                
                # 执行多渠道开发
                outreach_result = await self._execute_multi_channel_outreach(
                    lead_id, personalized_content
                )
                
                results.append({
                    "lead_id": lead_id,
                    "content": personalized_content,
                    "outreach_result": outreach_result
                })
            
            return {
                "status": "success",
                "message": f"成功执行 {len(results)} 个客户开发活动",
                "results": results
            }
            
        except Exception as e:
            logger.error(f"执行客户开发失败: {e}")
            return {
                "status": "error",
                "message": f"执行客户开发失败: {str(e)}"
            }
    
    async def _execute_multi_channel_outreach(self, lead_id: int, content: Dict[str, Any]) -> Dict[str, Any]:
        """执行多渠道客户开发"""
        # 这里应该实现具体的多渠道执行逻辑
        return {
            "email_sent": True,
            "linkedin_connection_requested": True,
            "phone_call_scheduled": False,
            "status": "in_progress"
        }
    
    async def get_development_progress(self, factory_id: int) -> Dict[str, Any]:
        """获取业务开发进度"""
        try:
            # 这里应该实现进度查询逻辑
            return {
                "factory_id": factory_id,
                "total_leads": 150,
                "qualified_leads": 45,
                "hot_leads": 12,
                "conversions": 3,
                "outreach_campaigns": 8,
                "response_rate": 0.23,
                "next_actions": [
                    "跟进高价值潜在客户",
                    "优化邮件模板",
                    "扩展LinkedIn网络"
                ]
            }
            
        except Exception as e:
            logger.error(f"获取开发进度失败: {e}")
            return {
                "status": "error",
                "message": f"获取开发进度失败: {str(e)}"
            }
