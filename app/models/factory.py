from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, Float, JSON
from sqlalchemy.sql import func
from app.core.database import Base
from typing import Optional, List, Dict, Any


class Factory(Base):
    """工厂信息模型"""
    __tablename__ = "factories"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    website = Column(String(500), nullable=False, unique=True)
    
    # 基本信息
    description = Column(Text, nullable=True)
    location = Column(String(255), nullable=True)
    established_year = Column(Integer, nullable=True)
    employee_count = Column(String(100), nullable=True)
    
    # 产品信息
    main_products = Column(JSON, nullable=True)  # 主营产品列表
    product_categories = Column(JSON, nullable=True)  # 产品分类
    
    # 核心优势
    core_advantages = Column(JSON, nullable=True)  # 核心优势列表
    competitive_position = Column(String(100), nullable=True)  # 竞争定位 (成本/技术/质量/速度/环保)
    
    # 认证信息
    certifications = Column(JSON, nullable=True)  # 认证列表
    quality_system = Column(String(255), nullable=True)  # 质量体系
    
    # 目标客户画像
    ideal_customer_profile = Column(JSON, nullable=True)  # 理想客户画像
    target_markets = Column(JSON, nullable=True)  # 目标市场
    target_industries = Column(JSON, nullable=True)  # 目标行业
    
    # 沟通身份
    contact_person = Column(String(255), nullable=True)  # 联系人姓名
    contact_title = Column(String(255), nullable=True)  # 联系人职位
    
    # 禁止联系名单
    blacklisted_companies = Column(JSON, nullable=True)  # 禁止联系的公司
    
    # 状态信息
    is_active = Column(Boolean, default=True)
    profile_completed = Column(Boolean, default=False)  # 档案是否完整
    
    # 时间戳
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def to_dict(self) -> Dict[str, Any]:
        """转换为字典"""
        return {
            "id": self.id,
            "name": self.name,
            "website": self.website,
            "description": self.description,
            "location": self.location,
            "established_year": self.established_year,
            "employee_count": self.employee_count,
            "main_products": self.main_products,
            "product_categories": self.product_categories,
            "core_advantages": self.core_advantages,
            "competitive_position": self.competitive_position,
            "certifications": self.certifications,
            "quality_system": self.quality_system,
            "ideal_customer_profile": self.ideal_customer_profile,
            "target_markets": self.target_markets,
            "target_industries": self.target_industries,
            "contact_person": self.contact_person,
            "contact_title": self.contact_title,
            "blacklisted_companies": self.blacklisted_companies,
            "is_active": self.is_active,
            "profile_completed": self.profile_completed,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }


class FactoryProfile(Base):
    """工厂档案扩展信息"""
    __tablename__ = "factory_profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    factory_id = Column(Integer, nullable=False, index=True)
    
    # 技术能力
    technical_capabilities = Column(JSON, nullable=True)
    r_and_d_strength = Column(String(255), nullable=True)
    
    # 生产能力
    production_capacity = Column(JSON, nullable=True)
    lead_time = Column(String(100), nullable=True)
    
    # 质量控制
    quality_control_process = Column(Text, nullable=True)
    testing_equipment = Column(JSON, nullable=True)
    
    # 供应链
    supply_chain_strength = Column(Text, nullable=True)
    raw_material_sources = Column(JSON, nullable=True)
    
    # 客户案例
    case_studies = Column(JSON, nullable=True)
    client_references = Column(JSON, nullable=True)
    
    # 时间戳
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
