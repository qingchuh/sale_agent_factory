from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, Float, JSON, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base
from typing import Optional, List, Dict, Any


class Lead(Base):
    """潜在客户模型"""
    __tablename__ = "leads"
    
    id = Column(Integer, primary_key=True, index=True)
    factory_id = Column(Integer, ForeignKey("factories.id"), nullable=False, index=True)
    
    # 基本信息
    company_name = Column(String(255), nullable=False, index=True)
    website = Column(String(500), nullable=True)
    industry = Column(String(255), nullable=True)
    company_size = Column(String(100), nullable=True)
    location = Column(String(255), nullable=True)
    
    # 联系信息
    contact_name = Column(String(255), nullable=True)
    contact_title = Column(String(255), nullable=True)
    contact_email = Column(String(255), nullable=True)
    contact_phone = Column(String(100), nullable=True)
    linkedin_profile = Column(String(500), nullable=True)
    
    # 业务信息
    business_needs = Column(Text, nullable=True)
    product_requirements = Column(JSON, nullable=True)
    budget_range = Column(String(100), nullable=True)
    timeline = Column(String(100), nullable=True)
    
    # 评分和状态
    lead_score = Column(Float, default=0.0)  # 0-100
    qualification_status = Column(String(50), default="unqualified")  # unqualified, qualified, hot
    engagement_level = Column(String(50), default="cold")  # cold, warm, hot
    
    # 沟通历史
    communication_history = Column(JSON, nullable=True)  # 沟通记录
    last_contact_date = Column(DateTime(timezone=True), nullable=True)
    next_follow_up_date = Column(DateTime(timezone=True), nullable=True)
    
    # 来源信息
    lead_source = Column(String(100), nullable=True)  # 客户来源
    discovery_method = Column(String(100), nullable=True)  # 发现方式
    
    # 状态信息
    is_active = Column(Boolean, default=True)
    is_converted = Column(Boolean, default=False)  # 是否已转化
    
    # 时间戳
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # 关系
    factory = relationship("Factory", back_populates="leads")
    interactions = relationship("LeadInteraction", back_populates="lead")
    
    def to_dict(self) -> Dict[str, Any]:
        """转换为字典"""
        return {
            "id": self.id,
            "factory_id": self.factory_id,
            "company_name": self.company_name,
            "website": self.website,
            "industry": self.industry,
            "company_size": self.company_size,
            "location": self.location,
            "contact_name": self.contact_name,
            "contact_title": self.contact_title,
            "contact_email": self.contact_email,
            "contact_phone": self.contact_phone,
            "linkedin_profile": self.linkedin_profile,
            "business_needs": self.business_needs,
            "product_requirements": self.product_requirements,
            "budget_range": self.budget_range,
            "timeline": self.timeline,
            "lead_score": self.lead_score,
            "qualification_status": self.qualification_status,
            "engagement_level": self.engagement_level,
            "communication_history": self.communication_history,
            "last_contact_date": self.last_contact_date.isoformat() if self.last_contact_date else None,
            "next_follow_up_date": self.next_follow_up_date.isoformat() if self.next_follow_up_date else None,
            "lead_source": self.lead_source,
            "discovery_method": self.discovery_method,
            "is_active": self.is_active,
            "is_converted": self.is_converted,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }


class LeadInteraction(Base):
    """客户互动记录模型"""
    __tablename__ = "lead_interactions"
    
    id = Column(Integer, primary_key=True, index=True)
    lead_id = Column(Integer, ForeignKey("leads.id"), nullable=False, index=True)
    
    # 互动信息
    interaction_type = Column(String(100), nullable=False)  # email, linkedin, phone, meeting
    interaction_method = Column(String(100), nullable=False)  # outbound, inbound
    subject = Column(String(255), nullable=True)
    content = Column(Text, nullable=True)
    
    # 结果
    response_received = Column(Boolean, default=False)
    response_content = Column(Text, nullable=True)
    response_sentiment = Column(String(50), nullable=True)  # positive, negative, neutral
    
    # 跟进
    follow_up_required = Column(Boolean, default=False)
    follow_up_date = Column(DateTime(timezone=True), nullable=True)
    follow_up_notes = Column(Text, nullable=True)
    
    # 时间戳
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # 关系
    lead = relationship("Lead", back_populates="interactions")
    
    def to_dict(self) -> Dict[str, Any]:
        """转换为字典"""
        return {
            "id": self.id,
            "lead_id": self.lead_id,
            "interaction_type": self.interaction_type,
            "interaction_method": self.interaction_method,
            "subject": self.subject,
            "content": self.content,
            "response_received": self.response_received,
            "response_content": self.response_content,
            "response_sentiment": self.response_sentiment,
            "follow_up_required": self.follow_up_required,
            "follow_up_date": self.follow_up_date.isoformat() if self.follow_up_date else None,
            "follow_up_notes": self.follow_up_notes,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }


class LeadSource(Base):
    """客户来源模型"""
    __tablename__ = "lead_sources"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, unique=True)
    description = Column(Text, nullable=True)
    source_type = Column(String(100), nullable=False)  # organic, paid, referral, event
    is_active = Column(Boolean, default=True)
    
    # 统计信息
    total_leads = Column(Integer, default=0)
    conversion_rate = Column(Float, default=0.0)
    
    # 时间戳
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
