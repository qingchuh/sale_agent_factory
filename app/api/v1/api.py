from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from typing import Dict, List, Any, Optional
import logging

from app.services.ai_agent import AIAgentService
from app.core.database import get_db
from app.models.factory import Factory
from app.models.lead import Lead

logger = logging.getLogger(__name__)

api_router = APIRouter()

# 创建AI代理服务实例
ai_agent = AIAgentService()


@api_router.post("/onboarding/start")
async def start_onboarding(website_url: str):
    """开始引导对话和网站分析"""
    try:
        logger.info(f"开始引导流程，网站: {website_url}")
        
        result = await ai_agent.start_onboarding(website_url)
        
        if result["status"] == "success":
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={
                    "message": "网站分析完成",
                    "data": result
                }
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=result["message"]
            )
            
    except Exception as e:
        logger.error(f"启动引导流程失败: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"启动引导流程失败: {str(e)}"
        )


@api_router.post("/onboarding/confirm-profile")
async def confirm_factory_profile(factory_data: Dict[str, Any]):
    """确认工厂档案信息"""
    try:
        logger.info("确认工厂档案信息")
        
        result = await ai_agent.confirm_factory_profile(factory_data)
        
        if result["status"] == "success":
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={
                    "message": "工厂档案确认成功",
                    "data": result
                }
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=result["message"]
            )
            
    except Exception as e:
        logger.error(f"确认工厂档案失败: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"确认工厂档案失败: {str(e)}"
        )


@api_router.post("/business-development/start")
async def start_business_development(factory_id: int):
    """启动全球业务开发"""
    try:
        logger.info(f"启动业务开发，工厂ID: {factory_id}")
        
        result = await ai_agent.start_business_development(factory_id)
        
        if result["status"] == "success":
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={
                    "message": "业务开发启动成功",
                    "data": result
                }
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=result["message"]
            )
            
    except Exception as e:
        logger.error(f"启动业务开发失败: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"启动业务开发失败: {str(e)}"
        )


@api_router.post("/outreach/execute")
async def execute_outreach(factory_id: int, lead_ids: List[int]):
    """执行客户开发活动"""
    try:
        logger.info(f"执行客户开发，工厂ID: {factory_id}，客户数量: {len(lead_ids)}")
        
        result = await ai_agent.execute_outreach(factory_id, lead_ids)
        
        if result["status"] == "success":
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={
                    "message": "客户开发执行成功",
                    "data": result
                }
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=result["message"]
            )
            
    except Exception as e:
        logger.error(f"执行客户开发失败: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"执行客户开发失败: {str(e)}"
        )


@api_router.get("/development/progress/{factory_id}")
async def get_development_progress(factory_id: int):
    """获取业务开发进度"""
    try:
        logger.info(f"获取开发进度，工厂ID: {factory_id}")
        
        result = await ai_agent.get_development_progress(factory_id)
        
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "message": "获取开发进度成功",
                "data": result
            }
        )
        
    except Exception as e:
        logger.error(f"获取开发进度失败: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"获取开发进度失败: {str(e)}"
        )


@api_router.get("/factories")
async def get_factories():
    """获取所有工厂列表"""
    try:
        # 这里应该从数据库获取工厂列表
        # 暂时返回模拟数据
        factories = [
            {
                "id": 1,
                "name": "优质制造工厂",
                "website": "https://example.com",
                "location": "中国深圳",
                "status": "active"
            }
        ]
        
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "message": "获取工厂列表成功",
                "data": factories
            }
        )
        
    except Exception as e:
        logger.error(f"获取工厂列表失败: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"获取工厂列表失败: {str(e)}"
        )


@api_router.get("/factories/{factory_id}")
async def get_factory(factory_id: int):
    """获取特定工厂信息"""
    try:
        # 这里应该从数据库获取工厂信息
        # 暂时返回模拟数据
        factory = {
            "id": factory_id,
            "name": "优质制造工厂",
            "website": "https://example.com",
            "description": "专业的制造业工厂",
            "location": "中国深圳",
            "main_products": ["电子产品", "家居用品"],
            "core_advantages": ["高质量", "快速交付"],
            "status": "active"
        }
        
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "message": "获取工厂信息成功",
                "data": factory
            }
        )
        
    except Exception as e:
        logger.error(f"获取工厂信息失败: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"获取工厂信息失败: {str(e)}"
        )


@api_router.get("/leads")
async def get_leads(factory_id: Optional[int] = None, status: Optional[str] = None):
    """获取潜在客户列表"""
    try:
        # 这里应该从数据库获取潜在客户列表
        # 暂时返回模拟数据
        leads = [
            {
                "id": 1,
                "company_name": "创新科技公司",
                "industry": "消费电子",
                "location": "北美",
                "lead_score": 85,
                "status": "qualified"
            },
            {
                "id": 2,
                "company_name": "绿色家居公司",
                "industry": "家居用品",
                "location": "欧洲",
                "lead_score": 78,
                "status": "qualified"
            }
        ]
        
        # 应用筛选条件
        if factory_id:
            leads = [lead for lead in leads if lead.get("factory_id") == factory_id]
        
        if status:
            leads = [lead for lead in leads if lead.get("status") == status]
        
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "message": "获取潜在客户列表成功",
                "data": leads
            }
        )
        
    except Exception as e:
        logger.error(f"获取潜在客户列表失败: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"获取潜在客户列表失败: {str(e)}"
        )


@api_router.get("/leads/{lead_id}")
async def get_lead(lead_id: int):
    """获取特定潜在客户信息"""
    try:
        # 这里应该从数据库获取潜在客户信息
        # 暂时返回模拟数据
        lead = {
            "id": lead_id,
            "company_name": "创新科技公司",
            "industry": "消费电子",
            "company_size": "100-500人",
            "location": "北美",
            "contact_name": "John Smith",
            "contact_title": "采购经理",
            "contact_email": "john@example.com",
            "lead_score": 85,
            "status": "qualified"
        }
        
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "message": "获取潜在客户信息成功",
                "data": lead
            }
        )
        
    except Exception as e:
        logger.error(f"获取潜在客户信息失败: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"获取潜在客户信息失败: {str(e)}"
        )


@api_router.post("/leads/{lead_id}/interact")
async def create_lead_interaction(lead_id: int, interaction_data: Dict[str, Any]):
    """创建客户互动记录"""
    try:
        logger.info(f"创建客户互动记录，客户ID: {lead_id}")
        
        # 这里应该保存到数据库
        # 暂时返回成功响应
        
        return JSONResponse(
            status_code=status.HTTP_201_CREATED,
            content={
                "message": "客户互动记录创建成功",
                "data": {
                    "lead_id": lead_id,
                    "interaction_id": 1,
                    "interaction_type": interaction_data.get("type"),
                    "status": "created"
                }
            }
        )
        
    except Exception as e:
        logger.error(f"创建客户互动记录失败: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"创建客户互动记录失败: {str(e)}"
        )


@api_router.get("/analytics/summary")
async def get_analytics_summary(factory_id: Optional[int] = None):
    """获取分析摘要"""
    try:
        # 这里应该从数据库获取分析数据
        # 暂时返回模拟数据
        summary = {
            "total_factories": 1,
            "total_leads": 150,
            "qualified_leads": 45,
            "conversion_rate": 0.23,
            "total_interactions": 320,
            "response_rate": 0.18,
            "top_industries": ["消费电子", "家居用品", "汽车"],
            "top_markets": ["北美", "欧洲", "东南亚"]
        }
        
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "message": "获取分析摘要成功",
                "data": summary
            }
        )
        
    except Exception as e:
        logger.error(f"获取分析摘要失败: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"获取分析摘要失败: {str(e)}"
        )


@api_router.get("/health")
async def health_check():
    """健康检查"""
    return {"status": "healthy", "service": "AIBD-FactoryLink API"}
