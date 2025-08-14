from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List, Dict, Any
import json
import logging

logger = logging.getLogger(__name__)

websocket_router = APIRouter()

# 存储活跃的WebSocket连接
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
    
    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        logger.info(f"WebSocket连接建立，当前连接数: {len(self.active_connections)}")
    
    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
        logger.info(f"WebSocket连接断开，当前连接数: {len(self.active_connections)}")
    
    async def send_personal_message(self, message: str, websocket: WebSocket):
        try:
            await websocket.send_text(message)
        except Exception as e:
            logger.error(f"发送个人消息失败: {e}")
            self.disconnect(websocket)
    
    async def broadcast(self, message: str):
        """广播消息给所有连接"""
        disconnected = []
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except Exception as e:
                logger.error(f"广播消息失败: {e}")
                disconnected.append(connection)
        
        # 移除断开的连接
        for connection in disconnected:
            self.disconnect(connection)

manager = ConnectionManager()


@websocket_router.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    """WebSocket端点"""
    await manager.connect(websocket)
    try:
        # 发送连接确认消息
        await manager.send_personal_message(
            json.dumps({
                "type": "connection_established",
                "client_id": client_id,
                "message": "WebSocket连接已建立"
            }),
            websocket
        )
        
        # 监听消息
        while True:
            try:
                data = await websocket.receive_text()
                message = json.loads(data)
                
                # 处理不同类型的消息
                await handle_websocket_message(websocket, message, client_id)
                
            except json.JSONDecodeError:
                await manager.send_personal_message(
                    json.dumps({
                        "type": "error",
                        "message": "无效的JSON格式"
                    }),
                    websocket
                )
            except Exception as e:
                logger.error(f"处理WebSocket消息失败: {e}")
                await manager.send_personal_message(
                    json.dumps({
                        "type": "error",
                        "message": f"处理消息失败: {str(e)}"
                    }),
                    websocket
                )
                
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        logger.info(f"客户端 {client_id} 断开连接")


async def handle_websocket_message(websocket: WebSocket, message: Dict[str, Any], client_id: str):
    """处理WebSocket消息"""
    message_type = message.get("type")
    
    if message_type == "ping":
        # 心跳检测
        await manager.send_personal_message(
            json.dumps({
                "type": "pong",
                "timestamp": message.get("timestamp")
            }),
            websocket
        )
    
    elif message_type == "start_onboarding":
        # 开始引导流程
        website_url = message.get("website_url")
        if website_url:
            # 这里应该调用AI代理服务
            response = {
                "type": "onboarding_started",
                "website_url": website_url,
                "status": "processing",
                "message": "正在分析网站，请稍候..."
            }
            await manager.send_personal_message(json.dumps(response), websocket)
            
            # 模拟网站分析过程
            await simulate_website_analysis(websocket, website_url)
        else:
            await manager.send_personal_message(
                json.dumps({
                    "type": "error",
                    "message": "缺少网站URL"
                }),
                websocket
            )
    
    elif message_type == "confirm_profile":
        # 确认工厂档案
        factory_data = message.get("factory_data")
        if factory_data:
            response = {
                "type": "profile_confirmed",
                "status": "success",
                "message": "工厂档案确认成功！"
            }
            await manager.send_personal_message(json.dumps(response), websocket)
        else:
            await manager.send_personal_message(
                json.dumps({
                    "type": "error",
                    "message": "缺少工厂档案数据"
                }),
                websocket
            )
    
    elif message_type == "start_business_development":
        # 启动业务开发
        factory_id = message.get("factory_id")
        if factory_id:
            response = {
                "type": "business_development_started",
                "factory_id": factory_id,
                "status": "processing",
                "message": "正在启动业务开发..."
            }
            await manager.send_personal_message(json.dumps(response), websocket)
            
            # 模拟业务开发过程
            await simulate_business_development(websocket, factory_id)
        else:
            await manager.send_personal_message(
                json.dumps({
                    "type": "error",
                    "message": "缺少工厂ID"
                }),
                websocket
            )
    
    else:
        # 未知消息类型
        await manager.send_personal_message(
            json.dumps({
                "type": "error",
                "message": f"未知的消息类型: {message_type}"
            }),
            websocket
        )


async def simulate_website_analysis(websocket: WebSocket, website_url: str):
    """模拟网站分析过程"""
    import asyncio
    
    # 模拟分析步骤
    steps = [
        ("正在访问网站...", 1),
        ("正在分析主页内容...", 2),
        ("正在提取公司信息...", 3),
        ("正在分析产品页面...", 4),
        ("正在识别核心优势...", 5),
        ("正在整理分析结果...", 6),
        ("网站分析完成！", 7)
    ]
    
    for message, step in steps:
        await asyncio.sleep(1)  # 模拟处理时间
        
        progress_data = {
            "type": "analysis_progress",
            "step": step,
            "total_steps": 7,
            "message": message,
            "progress_percentage": int((step / 7) * 100)
        }
        
        await manager.send_personal_message(json.dumps(progress_data), websocket)
    
    # 发送分析完成消息
    completion_data = {
        "type": "analysis_completed",
        "status": "success",
        "message": "网站分析完成！",
        "extracted_info": {
            "company_name": "示例制造公司",
            "main_products": ["电子产品", "家居用品"],
            "core_advantages": ["高质量", "快速交付"],
            "certifications": ["ISO9001", "CE认证"]
        },
        "next_step": "confirm_profile"
    }
    
    await manager.send_personal_message(json.dumps(completion_data), websocket)


async def simulate_business_development(websocket: WebSocket, factory_id: int):
    """模拟业务开发过程"""
    import asyncio
    
    # 模拟开发步骤
    steps = [
        ("正在分析市场机会...", 1),
        ("正在生成客户画像...", 2),
        ("正在筛选潜在客户...", 3),
        ("正在创建营销内容...", 4),
        ("正在准备执行计划...", 5),
        ("业务开发启动完成！", 6)
    ]
    
    for message, step in steps:
        await asyncio.sleep(1.5)  # 模拟处理时间
        
        progress_data = {
            "type": "development_progress",
            "step": step,
            "total_steps": 6,
            "message": message,
            "progress_percentage": int((step / 6) * 100)
        }
        
        await manager.send_personal_message(json.dumps(progress_data), websocket)
    
    # 发送开发完成消息
    completion_data = {
        "type": "development_completed",
        "status": "success",
        "message": "业务开发启动完成！",
        "results": {
            "market_analysis": "完成",
            "leads_generated": 25,
            "content_templates": 8,
            "next_step": "execute_outreach"
        }
    }
    
    await manager.send_personal_message(json.dumps(completion_data), websocket)


# 提供广播功能给其他服务使用
async def broadcast_notification(notification_type: str, data: Dict[str, Any]):
    """广播通知消息"""
    message = {
        "type": "notification",
        "notification_type": notification_type,
        "data": data,
        "timestamp": asyncio.get_event_loop().time()
    }
    
    await manager.broadcast(json.dumps(message))
