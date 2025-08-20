#!/usr/bin/env python3
"""
AIBD-FactoryLink System Test Script
"""

import asyncio
import sys
from pathlib import Path

# Add project root directory to Python path
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

from app.services.ai_agent import AIAgentService
from app.services.web_analyzer import WebAnalyzer
from app.services.lead_generator import LeadGenerator
from app.services.content_creator import ContentCreator


async def test_web_analyzer():
    """Test website analysis service"""
    print("🔍 Testing website analysis service...")
    
    analyzer = WebAnalyzer()
    
    # Test with an example website (using a public website here)
    test_url = "https://httpbin.org/html"
    
    try:
        result = await analyzer.analyze_website(test_url)
        print(f"✅ Website analysis successful: {result.get('total_pages_analyzed', 0)} pages")
        return True
    except Exception as e:
        print(f"❌ Website analysis failed: {e}")
        return False


async def test_lead_generator():
    """Test lead generation service"""
    print("👥 Testing lead generation service...")
    
    generator = LeadGenerator()
    
    # Simulate market analysis data
    market_analysis = {
        "target_markets": ["North America", "Europe"],
        "opportunity_score": 85,
        "market_trends": ["Digital Transformation", "Sustainable Development"]
    }
    
    try:
        leads = await generator.generate_leads(factory_id=1, market_analysis=market_analysis)
        print(f"✅ Lead generation successful: {len(leads)} customers")
        return True
    except Exception as e:
        print(f"❌ Lead generation failed: {e}")
        return False


async def test_content_creator():
    """Test content creation service"""
    print("📝 Testing content creation service...")
    
    creator = ContentCreator()
    
    try:
        templates = await creator.create_content_templates(factory_id=1)
        print(f"✅ Content template creation successful: {len(templates)} templates")
        return True
    except Exception as e:
        print(f"❌ Content template creation failed: {e}")
        return False


async def test_ai_agent():
    """Test AI agent service"""
    print("🤖 Testing AI agent service...")
    
    agent = AIAgentService()
    
    try:
        # Test website analysis (using mock data)
        result = await agent.start_onboarding("https://example.com")
        print(f"✅ AI agent service test successful: {result.get('status', 'unknown')}")
        return True
    except Exception as e:
        print(f"❌ AI agent service test failed: {e}")
        return False


async def run_all_tests():
    """Run all tests"""
    print("🧪 Starting AIBD-FactoryLink system tests...\n")
    
    tests = [
        ("Website Analysis Service", test_web_analyzer),
        ("Lead Generation", test_lead_generator),
        ("Content Creation Service", test_content_creator),
        ("AI Agent Service", test_ai_agent)
    ]
    
    results = []
    
    for test_name, test_func in tests:
        print(f"📋 Test: {test_name}")
        try:
            result = await test_func()
            results.append((test_name, result))
            print()
        except Exception as e:
            print(f"❌ Test execution exception: {e}")
            results.append((test_name, False))
            print()
    
    # Output test result summary
    print("📊 Test Result Summary:")
    print("=" * 50)
    
    passed = 0
    total = len(results)
    
    for test_name, result in results:
        status = "✅ Passed" if result else "❌ Failed"
        print(f"{test_name}: {status}")
        if result:
            passed += 1
    
    print("=" * 50)
    print(f"Total: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! System is running normally.")
        return True
    else:
        print("⚠️  Some tests failed, please check system configuration.")
        return False


def main():
    """Main function"""
    print("🚀 AIBD-FactoryLink System Test")
    print("=" * 50)
    
    try:
        # Run async tests
        result = asyncio.run(run_all_tests())
        
        if result:
            print("\n✅ System test completed, service can be started!")
            print("💡 Run 'python start.py' to start the service")
        else:
            print("\n❌ System test failed, please check configuration")
            sys.exit(1)
            
    except KeyboardInterrupt:
        print("\n⏹️  Test interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n💥 Error occurred during testing: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
