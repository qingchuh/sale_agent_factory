import openai
import asyncio
from typing import Dict, List, Any, Optional
import logging
from datetime import datetime

from app.core.config import settings
from app.models.lead import Lead

logger = logging.getLogger(__name__)


class LeadGenerator:
    """潜在客户生成服务"""
    
    def __init__(self):
        self.openai_model = settings.OPENAI_MODEL
        self.max_tokens = settings.OPENAI_MAX_TOKENS
        self.temperature = settings.OPENAI_TEMPERATURE
    
    async def generate_leads(self, factory_id: int, market_analysis: Dict[str, Any]) -> List[Dict[str, Any]]:
        """基于市场分析生成潜在客户"""
        try:
            logger.info(f"开始为工厂 {factory_id} 生成潜在客户")
            
            # 1. 基于市场分析生成客户画像
            customer_profiles = await self._generate_customer_profiles(market_analysis)
            
            # 2. 为每个客户画像生成具体的潜在客户
            all_leads = []
            
            for profile in customer_profiles:
                profile_leads = await self._generate_leads_for_profile(factory_id, profile)
                all_leads.extend(profile_leads)
            
            logger.info(f"成功生成 {len(all_leads)} 个潜在客户")
            return all_leads
            
        except Exception as e:
            logger.error(f"生成潜在客户失败: {e}")
            return []
    
    async def _generate_customer_profiles(self, market_analysis: Dict[str, Any]) -> List[Dict[str, Any]]:
        """生成客户画像"""
        try:
            prompt = f"""
基于以下市场分析，请生成5-8个详细的客户画像：

市场分析：
{market_analysis}

请为每个客户画像提供以下信息：
1. 行业类型
2. 公司规模
3. 地理位置
4. 业务需求
5. 决策者角色
6. 预算范围
7. 采购时间线
8. 关键痛点

请确保客户画像多样化，覆盖不同的市场细分。
"""

            response = await openai.ChatCompletion.acreate(
                model=self.openai_model,
                messages=[
                    {"role": "system", "content": "你是一个专业的B2B客户画像分析师。"},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=self.max_tokens,
                temperature=self.temperature
            )
            
            profiles_text = response.choices[0].message.content
            
            # 解析客户画像
            customer_profiles = self._parse_customer_profiles(profiles_text)
            
            return customer_profiles
            
        except Exception as e:
            logger.error(f"生成客户画像失败: {e}")
            return self._get_default_customer_profiles()
    
    def _parse_customer_profiles(self, profiles_text: str) -> List[Dict[str, Any]]:
        """解析客户画像文本"""
        profiles = []
        
        # 简单的文本解析逻辑
        sections = profiles_text.split('\n\n')
        
        for section in sections:
            if not section.strip():
                continue
                
            profile = {}
            lines = section.split('\n')
            
            for line in lines:
                line = line.strip()
                if ':' in line:
                    key, value = line.split(':', 1)
                    key = key.strip()
                    value = value.strip()
                    
                    if key in ['行业类型', '公司规模', '地理位置', '业务需求', '决策者角色', '预算范围', '采购时间线', '关键痛点']:
                        profile[key] = value
            
            if profile:
                profiles.append(profile)
        
        return profiles[:8]  # 最多8个画像
    
    def _get_default_customer_profiles(self) -> List[Dict[str, Any]]:
        """获取默认客户画像"""
        return [
            {
                "行业类型": "消费电子",
                "公司规模": "100-500人",
                "地理位置": "北美",
                "业务需求": "高质量电子产品制造",
                "决策者角色": "采购经理",
                "预算范围": "中等",
                "采购时间线": "3-6个月",
                "关键痛点": "成本控制、质量保证"
            },
            {
                "行业类型": "家居用品",
                "公司规模": "50-200人",
                "地理位置": "欧洲",
                "业务需求": "环保材料家居产品",
                "决策者角色": "产品经理",
                "预算范围": "中高",
                "采购时间线": "6-12个月",
                "关键痛点": "可持续发展、设计创新"
            }
        ]
    
    async def _generate_leads_for_profile(self, factory_id: int, profile: Dict[str, Any]) -> List[Dict[str, Any]]:
        """为特定客户画像生成潜在客户"""
        try:
            prompt = f"""
基于以下客户画像，请生成3-5个具体的潜在客户公司：

客户画像：
{profile}

请为每个潜在客户提供：
1. 公司名称（虚构但合理的公司名）
2. 网站域名（虚构但合理的域名）
3. 具体业务描述
4. 联系人姓名和职位
5. 联系邮箱（虚构但合理的邮箱）
6. 公司地址（虚构但合理的地址）
7. 具体产品需求
8. 预期订单规模

请确保公司名称和域名在目标市场中是合理的。
"""

            response = await openai.ChatCompletion.acreate(
                model=self.openai_model,
                messages=[
                    {"role": "system", "content": "你是一个专业的B2B潜在客户生成专家。"},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=self.max_tokens,
                temperature=self.temperature
            )
            
            leads_text = response.choices[0].message.content
            
            # 解析潜在客户信息
            leads = self._parse_leads(leads_text, factory_id, profile)
            
            return leads
            
        except Exception as e:
            logger.error(f"为画像生成潜在客户失败: {e}")
            return []
    
    def _parse_leads(self, leads_text: str, factory_id: int, profile: Dict[str, Any]) -> List[Dict[str, Any]]:
        """解析潜在客户信息"""
        leads = []
        
        # 简单的文本解析逻辑
        sections = leads_text.split('\n\n')
        
        for section in sections:
            if not section.strip():
                continue
                
            lead_data = {
                "factory_id": factory_id,
                "industry": profile.get("行业类型", ""),
                "company_size": profile.get("公司规模", ""),
                "location": profile.get("地理位置", ""),
                "business_needs": profile.get("业务需求", ""),
                "budget_range": profile.get("预算范围", ""),
                "timeline": profile.get("采购时间线", ""),
                "lead_score": self._calculate_lead_score(profile),
                "qualification_status": "unqualified",
                "engagement_level": "cold",
                "lead_source": "ai_generated",
                "discovery_method": "market_analysis"
            }
            
            lines = section.split('\n')
            
            for line in lines:
                line = line.strip()
                if ':' in line:
                    key, value = line.split(':', 1)
                    key = key.strip()
                    value = value.strip()
                    
                    if key == "公司名称":
                        lead_data["company_name"] = value
                    elif key == "网站域名":
                        lead_data["website"] = f"https://{value}"
                    elif key == "具体业务描述":
                        lead_data["business_needs"] = value
                    elif key == "联系人姓名和职位":
                        # 尝试分离姓名和职位
                        if ' - ' in value:
                            name, title = value.split(' - ', 1)
                            lead_data["contact_name"] = name.strip()
                            lead_data["contact_title"] = title.strip()
                        else:
                            lead_data["contact_name"] = value
                    elif key == "联系邮箱":
                        lead_data["contact_email"] = value
                    elif key == "公司地址":
                        lead_data["location"] = value
                    elif key == "具体产品需求":
                        lead_data["product_requirements"] = [value]
                    elif key == "预期订单规模":
                        lead_data["budget_range"] = value
            
            if "company_name" in lead_data:
                leads.append(lead_data)
        
        return leads[:5]  # 最多5个潜在客户
    
    def _calculate_lead_score(self, profile: Dict[str, Any]) -> float:
        """计算潜在客户评分"""
        score = 50.0  # 基础分
        
        # 根据公司规模调整分数
        size = profile.get("公司规模", "")
        if "1000+" in size or "500+" in size:
            score += 20
        elif "100-500" in size or "200-500" in size:
            score += 15
        elif "50-200" in size or "100-200" in size:
            score += 10
        
        # 根据预算范围调整分数
        budget = profile.get("预算范围", "")
        if "高" in budget:
            score += 15
        elif "中高" in budget:
            score += 10
        elif "中等" in budget:
            score += 5
        
        # 根据采购时间线调整分数
        timeline = profile.get("采购时间线", "")
        if "3-6个月" in timeline:
            score += 15
        elif "6-12个月" in timeline:
            score += 10
        elif "12个月以上" in timeline:
            score += 5
        
        return min(score, 100.0)  # 最高100分
    
    async def qualify_leads(self, leads: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """资格认证潜在客户"""
        try:
            qualified_leads = []
            
            for lead in leads:
                # 基于评分和基本信息进行资格认证
                if self._is_qualified(lead):
                    lead["qualification_status"] = "qualified"
                    qualified_leads.append(lead)
                else:
                    lead["qualification_status"] = "unqualified"
            
            logger.info(f"资格认证完成，合格客户: {len(qualified_leads)}/{len(leads)}")
            return leads
            
        except Exception as e:
            logger.error(f"资格认证失败: {e}")
            return leads
    
    def _is_qualified(self, lead: Dict[str, Any]) -> bool:
        """判断潜在客户是否合格"""
        # 基本资格检查
        if not lead.get("company_name") or not lead.get("contact_email"):
            return False
        
        # 评分检查
        if lead.get("lead_score", 0) < 60:
            return False
        
        # 行业匹配检查（这里可以根据具体需求调整）
        valid_industries = ["消费电子", "家居用品", "汽车", "医疗设备", "工业设备"]
        if lead.get("industry") not in valid_industries:
            return False
        
        return True
    
    async def enrich_lead_data(self, lead: Dict[str, Any]) -> Dict[str, Any]:
        """丰富潜在客户数据"""
        try:
            # 这里可以集成第三方数据源来丰富客户信息
            # 例如：公司财务信息、员工数量、技术栈等
            
            enriched_lead = lead.copy()
            
            # 添加一些模拟的丰富数据
            enriched_lead["enriched_data"] = {
                "company_founded": "2010-2020",
                "revenue_range": "1M-100M",
                "technology_stack": ["ERP", "CRM", "Cloud Computing"],
                "recent_news": "公司正在寻求数字化转型",
                "competitors": ["竞争对手A", "竞争对手B"],
                "growth_rate": "15-25%"
            }
            
            return enriched_lead
            
        except Exception as e:
            logger.error(f"丰富客户数据失败: {e}")
            return lead
