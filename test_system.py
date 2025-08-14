#!/usr/bin/env python3
"""
AIBD-FactoryLink 系统测试脚本
"""

import asyncio
import sys
from pathlib import Path

# 添加项目根目录到Python路径
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

from app.services.ai_agent import AIAgentService
from app.services.web_analyzer import WebAnalyzer
from app.services.lead_generator import LeadGenerator
from app.services.content_creator import ContentCreator


async def test_web_analyzer():
    """测试网站分析服务"""
    print("🔍 测试网站分析服务...")
    
    analyzer = WebAnalyzer()
    
    # 测试一个示例网站（这里使用一个公开的网站）
    test_url = "https://httpbin.org/html"
    
    try:
        result = await analyzer.analyze_website(test_url)
        print(f"✅ 网站分析成功: {result.get('total_pages_analyzed', 0)} 个页面")
        return True
    except Exception as e:
        print(f"❌ 网站分析失败: {e}")
        return False


async def test_lead_generator():
    """测试潜在客户生成服务"""
    print("👥 测试潜在客户生成服务...")
    
    generator = LeadGenerator()
    
    # 模拟市场分析数据
    market_analysis = {
        "target_markets": ["北美", "欧洲"],
        "opportunity_score": 85,
        "market_trends": ["数字化转型", "可持续发展"]
    }
    
    try:
        leads = await generator.generate_leads(factory_id=1, market_analysis=market_analysis)
        print(f"✅ 潜在客户生成成功: {len(leads)} 个客户")
        return True
    except Exception as e:
        print(f"❌ 潜在客户生成失败: {e}")
        return False


async def test_content_creator():
    """测试内容创建服务"""
    print("📝 测试内容创建服务...")
    
    creator = ContentCreator()
    
    try:
        templates = await creator.create_content_templates(factory_id=1)
        print(f"✅ 内容模板创建成功: {len(templates)} 个模板")
        return True
    except Exception as e:
        print(f"❌ 内容模板创建失败: {e}")
        return False


async def test_ai_agent():
    """测试AI代理服务"""
    print("🤖 测试AI代理服务...")
    
    agent = AIAgentService()
    
    try:
        # 测试网站分析（使用模拟数据）
        result = await agent.start_onboarding("https://example.com")
        print(f"✅ AI代理服务测试成功: {result.get('status', 'unknown')}")
        return True
    except Exception as e:
        print(f"❌ AI代理服务测试失败: {e}")
        return False


async def run_all_tests():
    """运行所有测试"""
    print("🧪 开始运行 AIBD-FactoryLink 系统测试...\n")
    
    tests = [
        ("网站分析服务", test_web_analyzer),
        ("潜在客户生成", test_lead_generator),
        ("内容创建服务", test_content_creator),
        ("AI代理服务", test_ai_agent)
    ]
    
    results = []
    
    for test_name, test_func in tests:
        print(f"📋 测试: {test_name}")
        try:
            result = await test_func()
            results.append((test_name, result))
            print()
        except Exception as e:
            print(f"❌ 测试执行异常: {e}")
            results.append((test_name, False))
            print()
    
    # 输出测试结果摘要
    print("📊 测试结果摘要:")
    print("=" * 50)
    
    passed = 0
    total = len(results)
    
    for test_name, result in results:
        status = "✅ 通过" if result else "❌ 失败"
        print(f"{test_name}: {status}")
        if result:
            passed += 1
    
    print("=" * 50)
    print(f"总计: {passed}/{total} 个测试通过")
    
    if passed == total:
        print("🎉 所有测试通过！系统运行正常。")
        return True
    else:
        print("⚠️  部分测试失败，请检查系统配置。")
        return False


def main():
    """主函数"""
    print("🚀 AIBD-FactoryLink 系统测试")
    print("=" * 50)
    
    try:
        # 运行异步测试
        result = asyncio.run(run_all_tests())
        
        if result:
            print("\n✅ 系统测试完成，可以启动服务了！")
            print("💡 运行 'python start.py' 启动服务")
        else:
            print("\n❌ 系统测试失败，请检查配置")
            sys.exit(1)
            
    except KeyboardInterrupt:
        print("\n⏹️  测试被用户中断")
        sys.exit(1)
    except Exception as e:
        print(f"\n💥 测试过程中发生错误: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
