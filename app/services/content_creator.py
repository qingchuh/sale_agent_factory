import openai
import asyncio
from typing import Dict, List, Any, Optional
import logging
from datetime import datetime
import json

from app.core.config import settings

logger = logging.getLogger(__name__)


class ContentCreator:
    """内容创建服务"""
    
    def __init__(self):
        self.openai_model = settings.OPENAI_MODEL
        self.max_tokens = settings.OPENAI_MAX_TOKENS
        self.temperature = settings.OPENAI_TEMPERATURE
    
    async def create_content_templates(self, factory_id: int) -> List[Dict[str, Any]]:
        """为工厂创建内容模板"""
        try:
            logger.info(f"开始为工厂 {factory_id} 创建内容模板")
            
            # 这里应该从数据库获取工厂信息
            # 暂时使用模拟数据
            factory_info = self._get_mock_factory_info(factory_id)
            
            # 创建不同类型的内容模板
            templates = []
            
            # 1. 邮件模板
            email_templates = await self._create_email_templates(factory_info)
            templates.extend(email_templates)
            
            # 2. LinkedIn消息模板
            linkedin_templates = await self._create_linkedin_templates(factory_info)
            templates.extend(linkedin_templates)
            
            # 3. 产品介绍模板
            product_templates = await self._create_product_templates(factory_info)
            templates.extend(product_templates)
            
            # 4. 公司介绍模板
            company_templates = await self._create_company_templates(factory_info)
            templates.extend(company_templates)
            
            logger.info(f"成功创建 {len(templates)} 个内容模板")
            return templates
            
        except Exception as e:
            logger.error(f"创建内容模板失败: {e}")
            return []
    
    async def create_personalized_content(self, factory_id: int, lead_id: int) -> Dict[str, Any]:
        """为特定潜在客户创建个性化内容"""
        try:
            logger.info(f"为工厂 {factory_id} 的潜在客户 {lead_id} 创建个性化内容")
            
            # 这里应该从数据库获取工厂和潜在客户信息
            factory_info = self._get_mock_factory_info(factory_id)
            lead_info = self._get_mock_lead_info(lead_id)
            
            # 创建个性化内容
            personalized_content = {
                "lead_id": lead_id,
                "factory_id": factory_id,
                "email_content": await self._create_personalized_email(factory_info, lead_info),
                "linkedin_message": await self._create_personalized_linkedin_message(factory_info, lead_info),
                "product_recommendation": await self._create_product_recommendation(factory_info, lead_info),
                "follow_up_sequence": await self._create_follow_up_sequence(factory_info, lead_info)
            }
            
            return personalized_content
            
        except Exception as e:
            logger.error(f"创建个性化内容失败: {e}")
            return {"error": str(e)}
    
    async def _create_email_templates(self, factory_info: Dict[str, Any]) -> List[Dict[str, Any]]:
        """创建邮件模板"""
        try:
            templates = []
            
            # 1. 初次联系邮件
            initial_email = await self._generate_email_content(
                "initial_contact",
                factory_info,
                "初次联系，介绍公司和产品"
            )
            templates.append({
                "type": "email",
                "subtype": "initial_contact",
                "subject": "探索合作机会 - 高质量制造解决方案",
                "content": initial_email,
                "use_case": "初次联系潜在客户"
            })
            
            # 2. 产品介绍邮件
            product_email = await self._generate_email_content(
                "product_introduction",
                factory_info,
                "详细介绍产品特点和优势"
            )
            templates.append({
                "type": "email",
                "subtype": "product_introduction",
                "subject": "产品详情 - 为什么选择我们的制造服务",
                "content": product_email,
                "use_case": "跟进产品相关问题"
            })
            
            # 3. 案例分享邮件
            case_study_email = await self._generate_email_content(
                "case_study",
                factory_info,
                "分享成功案例和客户反馈"
            )
            templates.append({
                "type": "email",
                "subtype": "case_study",
                "subject": "成功案例分享 - 我们的客户如何受益",
                "content": case_study_email,
                "use_case": "展示公司实力和成功经验"
            })
            
            return templates
            
        except Exception as e:
            logger.error(f"创建邮件模板失败: {e}")
            return []
    
    async def _create_linkedin_templates(self, factory_info: Dict[str, Any]) -> List[Dict[str, Any]]:
        """创建LinkedIn消息模板"""
        try:
            templates = []
            
            # 1. 连接请求消息
            connection_message = await self._generate_linkedin_content(
                "connection_request",
                factory_info,
                "发送连接请求时的消息"
            )
            templates.append({
                "type": "linkedin",
                "subtype": "connection_request",
                "content": connection_message,
                "use_case": "发送LinkedIn连接请求"
            })
            
            # 2. 跟进消息
            follow_up_message = await self._generate_linkedin_content(
                "follow_up",
                factory_info,
                "连接后的跟进消息"
            )
            templates.append({
                "type": "linkedin",
                "subtype": "follow_up",
                "content": follow_up_message,
                "use_case": "连接后的业务开发"
            })
            
            return templates
            
        except Exception as e:
            logger.error(f"创建LinkedIn模板失败: {e}")
            return []
    
    async def _create_product_templates(self, factory_info: Dict[str, Any]) -> List[Dict[str, Any]]:
        """创建产品介绍模板"""
        try:
            templates = []
            
            # 1. 产品概述
            product_overview = await self._generate_product_content(
                "overview",
                factory_info,
                "产品概述和主要特点"
            )
            templates.append({
                "type": "product",
                "subtype": "overview",
                "title": "产品概述",
                "content": product_overview,
                "use_case": "产品介绍和推广"
            })
            
            # 2. 技术规格
            technical_specs = await self._generate_product_content(
                "technical_specs",
                factory_info,
                "技术规格和参数"
            )
            templates.append({
                "type": "product",
                "subtype": "technical_specs",
                "title": "技术规格",
                "content": technical_specs,
                "use_case": "技术细节说明"
            })
            
            return templates
            
        except Exception as e:
            logger.error(f"创建产品模板失败: {e}")
            return []
    
    async def _create_company_templates(self, factory_info: Dict[str, Any]) -> List[Dict[str, Any]]:
        """创建公司介绍模板"""
        try:
            templates = []
            
            # 1. 公司简介
            company_intro = await self._generate_company_content(
                "introduction",
                factory_info,
                "公司简介和核心优势"
            )
            templates.append({
                "type": "company",
                "subtype": "introduction",
                "title": "公司简介",
                "content": company_intro,
                "use_case": "公司介绍和品牌推广"
            })
            
            # 2. 质量体系
            quality_system = await self._generate_company_content(
                "quality_system",
                factory_info,
                "质量体系和认证"
            )
            templates.append({
                "type": "company",
                "subtype": "quality_system",
                "title": "质量体系",
                "content": quality_system,
                "use_case": "质量保证说明"
            })
            
            return templates
            
        except Exception as e:
            logger.error(f"创建公司模板失败: {e}")
            return []
    
    async def _generate_email_content(self, email_type: str, factory_info: Dict[str, Any], description: str) -> str:
        """生成邮件内容"""
        try:
            prompt = f"""
请为以下工厂创建一个{description}的邮件模板：

工厂信息：
{json.dumps(factory_info, ensure_ascii=False, indent=2)}

邮件类型：{email_type}

要求：
1. 专业、简洁、有吸引力
2. 突出工厂的核心优势
3. 包含明确的行动号召
4. 适合国际商务沟通
5. 长度控制在200-300字

请直接返回邮件正文内容，不需要包含邮件格式。
"""

            response = await openai.ChatCompletion.acreate(
                model=self.openai_model,
                messages=[
                    {"role": "system", "content": "你是一个专业的B2B营销文案专家。"},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=self.max_tokens,
                temperature=self.temperature
            )
            
            return response.choices[0].message.content.strip()
            
        except Exception as e:
            logger.error(f"生成邮件内容失败: {e}")
            return f"抱歉，生成{description}内容时出现错误。"
    
    async def _generate_linkedin_content(self, message_type: str, factory_info: Dict[str, Any], description: str) -> str:
        """生成LinkedIn消息内容"""
        try:
            prompt = f"""
请为以下工厂创建一个{description}的LinkedIn消息：

工厂信息：
{json.dumps(factory_info, ensure_ascii=False, indent=2)}

消息类型：{message_type}

要求：
1. 专业、友好、个性化
2. 突出价值主张
3. 包含明确的下一步行动
4. 适合LinkedIn平台特点
5. 长度控制在100-150字

请直接返回消息内容。
"""

            response = await openai.ChatCompletion.acreate(
                model=self.openai_model,
                messages=[
                    {"role": "system", "content": "你是一个专业的LinkedIn营销专家。"},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=self.max_tokens,
                temperature=self.temperature
            )
            
            return response.choices[0].message.content.strip()
            
        except Exception as e:
            logger.error(f"生成LinkedIn内容失败: {e}")
            return f"抱歉，生成{description}内容时出现错误。"
    
    async def _generate_product_content(self, content_type: str, factory_info: Dict[str, Any], description: str) -> str:
        """生成产品内容"""
        try:
            prompt = f"""
请为以下工厂创建一个{description}的产品介绍：

工厂信息：
{json.dumps(factory_info, ensure_ascii=False, indent=2)}

内容类型：{content_type}

要求：
1. 专业、详细、有说服力
2. 突出产品特点和优势
3. 包含技术参数和规格
4. 适合B2B客户阅读
5. 长度控制在300-400字

请直接返回内容。
"""

            response = await openai.ChatCompletion.acreate(
                model=self.openai_model,
                messages=[
                    {"role": "system", "content": "你是一个专业的产品文案专家。"},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=self.max_tokens,
                temperature=self.temperature
            )
            
            return response.choices[0].message.content.strip()
            
        except Exception as e:
            logger.error(f"生成产品内容失败: {e}")
            return f"抱歉，生成{description}内容时出现错误。"
    
    async def _generate_company_content(self, content_type: str, factory_info: Dict[str, Any], description: str) -> str:
        """生成公司内容"""
        try:
            prompt = f"""
请为以下工厂创建一个{description}的公司介绍：

工厂信息：
{json.dumps(factory_info, ensure_ascii=False, indent=2)}

内容类型：{content_type}

要求：
1. 专业、可信、有吸引力
2. 突出公司实力和优势
3. 包含具体数据和案例
4. 适合国际客户阅读
5. 长度控制在400-500字

请直接返回内容。
"""

            response = await openai.ChatCompletion.acreate(
                model=self.openai_model,
                messages=[
                    {"role": "system", "content": "你是一个专业的公司介绍文案专家。"},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=self.max_tokens,
                temperature=self.temperature
            )
            
            return response.choices[0].message.content.strip()
            
        except Exception as e:
            logger.error(f"生成公司内容失败: {e}")
            return f"抱歉，生成{description}内容时出现错误。"
    
    async def _create_personalized_email(self, factory_info: Dict[str, Any], lead_info: Dict[str, Any]) -> str:
        """创建个性化邮件"""
        try:
            prompt = f"""
请为以下工厂和潜在客户创建一个个性化的邮件：

工厂信息：
{json.dumps(factory_info, ensure_ascii=False, indent=2)}

潜在客户信息：
{json.dumps(lead_info, ensure_ascii=False, indent=2)}

要求：
1. 高度个性化，体现对客户的了解
2. 突出与客户需求的匹配点
3. 包含具体的价值主张
4. 专业的商务语调
5. 明确的下一步行动
6. 长度控制在250-350字

请直接返回邮件正文内容。
"""

            response = await openai.ChatCompletion.acreate(
                model=self.openai_model,
                messages=[
                    {"role": "system", "content": "你是一个专业的B2B个性化营销专家。"},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=self.max_tokens,
                temperature=self.temperature
            )
            
            return response.choices[0].message.content.strip()
            
        except Exception as e:
            logger.error(f"创建个性化邮件失败: {e}")
            return "抱歉，创建个性化邮件时出现错误。"
    
    async def _create_personalized_linkedin_message(self, factory_info: Dict[str, Any], lead_info: Dict[str, Any]) -> str:
        """创建个性化LinkedIn消息"""
        try:
            prompt = f"""
请为以下工厂和潜在客户创建一个个性化的LinkedIn消息：

工厂信息：
{json.dumps(factory_info, ensure_ascii=False, indent=2)}

潜在客户信息：
{json.dumps(lead_info, ensure_ascii=False, indent=2)}

要求：
1. 高度个性化，体现对客户的了解
2. 突出与客户需求的匹配点
3. 包含具体的价值主张
4. 友好的社交语调
5. 明确的下一步行动
6. 长度控制在120-180字

请直接返回消息内容。
"""

            response = await openai.ChatCompletion.acreate(
                model=self.openai_model,
                messages=[
                    {"role": "system", "content": "你是一个专业的LinkedIn个性化营销专家。"},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=self.max_tokens,
                temperature=self.temperature
            )
            
            return response.choices[0].message.content.strip()
            
        except Exception as e:
            logger.error(f"创建个性化LinkedIn消息失败: {e}")
            return "抱歉，创建个性化LinkedIn消息时出现错误。"
    
    async def _create_product_recommendation(self, factory_info: Dict[str, Any], lead_info: Dict[str, Any]) -> str:
        """创建产品推荐"""
        try:
            prompt = f"""
请为以下工厂和潜在客户创建一个产品推荐：

工厂信息：
{json.dumps(factory_info, ensure_ascii=False, indent=2)}

潜在客户信息：
{json.dumps(lead_info, ensure_ascii=False, indent=2)}

要求：
1. 基于客户需求推荐最合适的产品
2. 突出产品的核心优势
3. 包含技术规格和参数
4. 专业的推荐语调
5. 长度控制在200-300字

请直接返回推荐内容。
"""

            response = await openai.ChatCompletion.acreate(
                model=self.openai_model,
                messages=[
                    {"role": "system", "content": "你是一个专业的产品推荐专家。"},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=self.max_tokens,
                temperature=self.temperature
            )
            
            return response.choices[0].message.content.strip()
            
        except Exception as e:
            logger.error(f"创建产品推荐失败: {e}")
            return "抱歉，创建产品推荐时出现错误。"
    
    async def _create_follow_up_sequence(self, factory_info: Dict[str, Any], lead_info: Dict[str, Any]) -> List[Dict[str, Any]]:
        """创建跟进序列"""
        try:
            prompt = f"""
请为以下工厂和潜在客户创建一个跟进序列计划：

工厂信息：
{json.dumps(factory_info, ensure_ascii=False, indent=2)}

潜在客户信息：
{json.dumps(lead_info, ensure_ascii=False, indent=2)}

要求：
1. 创建3-5个跟进步骤
2. 每个步骤包含时间间隔、方式、内容要点
3. 逐步加深关系
4. 包含多种沟通方式
5. 每个步骤都要有明确的目标

请返回跟进序列的详细计划。
"""

            response = await openai.ChatCompletion.acreate(
                model=self.openai_model,
                messages=[
                    {"role": "system", "content": "你是一个专业的客户跟进专家。"},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=self.max_tokens,
                temperature=self.temperature
            )
            
            # 解析跟进序列
            follow_up_text = response.choices[0].message.content
            follow_up_sequence = self._parse_follow_up_sequence(follow_up_text)
            
            return follow_up_sequence
            
        except Exception as e:
            logger.error(f"创建跟进序列失败: {e}")
            return []
    
    def _parse_follow_up_sequence(self, follow_up_text: str) -> List[Dict[str, Any]]:
        """解析跟进序列文本"""
        sequence = []
        
        # 简单的文本解析逻辑
        sections = follow_up_text.split('\n\n')
        
        for i, section in enumerate(sections):
            if not section.strip():
                continue
            
            step = {
                "step_number": i + 1,
                "timing": "3-5天后",  # 默认时间
                "method": "email",  # 默认方式
                "content": section.strip(),
                "goal": "建立初步联系"  # 默认目标
            }
            
            # 尝试提取具体信息
            lines = section.split('\n')
            for line in lines:
                line = line.strip()
                if '时间' in line or '天' in line:
                    step["timing"] = line
                elif '邮件' in line or 'email' in line.lower():
                    step["method"] = "email"
                elif 'linkedin' in line.lower():
                    step["method"] = "linkedin"
                elif '电话' in line or 'phone' in line.lower():
                    step["method"] = "phone"
            
            sequence.append(step)
        
        return sequence[:5]  # 最多5个步骤
    
    def _get_mock_factory_info(self, factory_id: int) -> Dict[str, Any]:
        """获取模拟工厂信息"""
        return {
            "name": "优质制造工厂",
            "industry": "制造业",
            "main_products": ["电子产品", "家居用品", "工业设备"],
            "core_advantages": ["高质量", "快速交付", "成本优势"],
            "certifications": ["ISO9001", "ISO14001", "CE认证"],
            "location": "中国深圳",
            "established_year": "2010",
            "employee_count": "500+"
        }
    
    def _get_mock_lead_info(self, lead_id: int) -> Dict[str, Any]:
        """获取模拟潜在客户信息"""
        return {
            "company_name": "创新科技公司",
            "industry": "消费电子",
            "company_size": "100-500人",
            "location": "北美",
            "business_needs": "高质量电子产品制造",
            "contact_name": "John Smith",
            "contact_title": "采购经理",
            "product_requirements": ["智能手机外壳", "平板电脑配件"]
        }
