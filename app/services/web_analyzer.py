import requests
from bs4 import BeautifulSoup
import asyncio
import aiohttp
from typing import Dict, List, Any, Optional
import logging
import re
from urllib.parse import urljoin, urlparse
import time

from app.core.config import settings

logger = logging.getLogger(__name__)


class WebAnalyzer:
    """网站分析服务"""
    
    def __init__(self):
        self.session = None
        self.visited_urls = set()
        self.max_pages = settings.MAX_PAGES_TO_SCRAPE
        self.timeout = settings.WEB_SCRAPING_TIMEOUT
        self.headers = {
            'User-Agent': settings.USER_AGENT,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
        }
    
    async def analyze_website(self, website_url: str) -> Dict[str, Any]:
        """分析网站并提取关键信息"""
        try:
            logger.info(f"开始分析网站: {website_url}")
            
            # 标准化URL
            base_url = self._normalize_url(website_url)
            
            # 创建异步会话
            async with aiohttp.ClientSession(headers=self.headers, timeout=aiohttp.ClientTimeout(total=self.timeout)) as session:
                self.session = session
                
                # 1. 获取主页内容
                main_page_info = await self._analyze_main_page(base_url)
                
                # 2. 发现和爬取其他页面
                other_pages_info = await self._discover_and_analyze_pages(base_url)
                
                # 3. 综合分析结果
                analysis_result = self._synthesize_analysis(main_page_info, other_pages_info)
                
                logger.info(f"网站分析完成，共分析 {len(self.visited_urls)} 个页面")
                
                return analysis_result
                
        except Exception as e:
            logger.error(f"网站分析失败: {e}")
            return {
                "error": str(e),
                "website_url": website_url,
                "pages_analyzed": 0
            }
    
    def _normalize_url(self, url: str) -> str:
        """标准化URL"""
        if not url.startswith(('http://', 'https://')):
            url = 'https://' + url
        
        # 移除URL末尾的斜杠
        url = url.rstrip('/')
        
        return url
    
    async def _analyze_main_page(self, base_url: str) -> Dict[str, Any]:
        """分析主页"""
        try:
            async with self.session.get(base_url) as response:
                if response.status != 200:
                    raise Exception(f"无法访问主页，状态码: {response.status}")
                
                html_content = await response.text()
                soup = BeautifulSoup(html_content, 'html.parser')
                
                # 提取基本信息
                page_info = {
                    "url": base_url,
                    "title": self._extract_title(soup),
                    "meta_description": self._extract_meta_description(soup),
                    "company_name": self._extract_company_name(soup, base_url),
                    "main_content": self._extract_main_content(soup),
                    "navigation_links": self._extract_navigation_links(soup, base_url),
                    "contact_info": self._extract_contact_info(soup),
                    "social_links": self._extract_social_links(soup),
                    "page_type": "main_page"
                }
                
                self.visited_urls.add(base_url)
                return page_info
                
        except Exception as e:
            logger.error(f"分析主页失败: {e}")
            return {"error": str(e), "url": base_url}
    
    async def _discover_and_analyze_pages(self, base_url: str) -> List[Dict[str, Any]]:
        """发现和分析其他页面"""
        pages_info = []
        urls_to_analyze = [base_url]
        
        while urls_to_analyze and len(self.visited_urls) < self.max_pages:
            current_url = urls_to_analyze.pop(0)
            
            if current_url in self.visited_urls:
                continue
            
            try:
                page_info = await self._analyze_single_page(current_url)
                if page_info and "error" not in page_info:
                    pages_info.append(page_info)
                    
                    # 发现新的链接
                    if "navigation_links" in page_info:
                        new_urls = [link for link in page_info["navigation_links"] 
                                  if link not in self.visited_urls and self._is_valid_internal_url(link, base_url)]
                        urls_to_analyze.extend(new_urls[:5])  # 限制每页最多5个新链接
                
                # 避免过于频繁的请求
                await asyncio.sleep(0.5)
                
            except Exception as e:
                logger.error(f"分析页面失败 {current_url}: {e}")
        
        return pages_info
    
    async def _analyze_single_page(self, url: str) -> Optional[Dict[str, Any]]:
        """分析单个页面"""
        try:
            async with self.session.get(url) as response:
                if response.status != 200:
                    return None
                
                html_content = await response.text()
                soup = BeautifulSoup(html_content, 'html.parser')
                
                # 判断页面类型
                page_type = self._determine_page_type(url, soup)
                
                page_info = {
                    "url": url,
                    "title": self._extract_title(soup),
                    "page_type": page_type,
                    "main_content": self._extract_main_content(soup),
                    "navigation_links": self._extract_navigation_links(soup, url),
                    "contact_info": self._extract_contact_info(soup),
                    "page_specific_info": self._extract_page_specific_info(soup, page_type)
                }
                
                self.visited_urls.add(url)
                return page_info
                
        except Exception as e:
            logger.error(f"分析页面失败 {url}: {e}")
            return None
    
    def _determine_page_type(self, url: str, soup: BeautifulSoup) -> str:
        """判断页面类型"""
        url_lower = url.lower()
        title_lower = soup.get_text().lower()
        
        if any(keyword in url_lower or keyword in title_lower for keyword in ['about', 'about-us', 'company']):
            return "about_page"
        elif any(keyword in url_lower or keyword in title_lower for keyword in ['product', 'products', 'solutions']):
            return "product_page"
        elif any(keyword in url_lower or keyword in title_lower for keyword in ['contact', 'contact-us']):
            return "contact_page"
        elif any(keyword in url_lower or keyword in title_lower for keyword in ['service', 'services']):
            return "service_page"
        elif any(keyword in url_lower or keyword in title_lower for keyword in ['news', 'blog', 'article']):
            return "news_page"
        else:
            return "other_page"
    
    def _extract_title(self, soup: BeautifulSoup) -> str:
        """提取页面标题"""
        title_tag = soup.find('title')
        if title_tag:
            return title_tag.get_text().strip()
        
        h1_tag = soup.find('h1')
        if h1_tag:
            return h1_tag.get_text().strip()
        
        return ""
    
    def _extract_meta_description(self, soup: BeautifulSoup) -> str:
        """提取meta描述"""
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        if meta_desc and meta_desc.get('content'):
            return meta_desc['content'].strip()
        return ""
    
    def _extract_company_name(self, soup: BeautifulSoup, base_url: str) -> str:
        """提取公司名称"""
        # 从标题中提取
        title = self._extract_title(soup)
        if title:
            # 移除常见的后缀
            suffixes = [' - Home', ' - Welcome', ' | Home', ' | Welcome', ' - Official Website']
            for suffix in suffixes:
                if title.endswith(suffix):
                    title = title[:-len(suffix)]
            return title
        
        # 从域名中提取
        domain = urlparse(base_url).netloc
        if domain.startswith('www.'):
            domain = domain[4:]
        return domain.split('.')[0].title()
    
    def _extract_main_content(self, soup: BeautifulSoup) -> str:
        """提取主要内容"""
        # 尝试找到主要内容区域
        main_content_selectors = [
            'main',
            '[role="main"]',
            '.main-content',
            '.content',
            '#content',
            '.container',
            '.wrapper'
        ]
        
        for selector in main_content_selectors:
            content = soup.select_one(selector)
            if content:
                return self._clean_text(content.get_text())
        
        # 如果没有找到明确的主内容区域，提取所有文本
        return self._clean_text(soup.get_text())
    
    def _extract_navigation_links(self, soup: BeautifulSoup, current_url: str) -> List[str]:
        """提取导航链接"""
        links = []
        
        # 查找导航菜单
        nav_selectors = ['nav', '.nav', '.navigation', '.menu', '.navbar']
        
        for selector in nav_selectors:
            nav_elements = soup.select(selector)
            for nav in nav_elements:
                for link in nav.find_all('a', href=True):
                    href = link['href']
                    full_url = urljoin(current_url, href)
                    if self._is_valid_internal_url(full_url, current_url):
                        links.append(full_url)
        
        return list(set(links))  # 去重
    
    def _extract_contact_info(self, soup: BeautifulSoup) -> Dict[str, Any]:
        """提取联系信息"""
        contact_info = {}
        
        # 查找邮箱
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        text = soup.get_text()
        emails = re.findall(email_pattern, text)
        if emails:
            contact_info['emails'] = list(set(emails))
        
        # 查找电话号码
        phone_pattern = r'[\+]?[1-9][\d]{0,15}'
        phones = re.findall(phone_pattern, text)
        if phones:
            contact_info['phones'] = list(set(phones))
        
        # 查找地址
        address_keywords = ['地址', 'address', 'location', '地址']
        for keyword in address_keywords:
            elements = soup.find_all(text=re.compile(keyword, re.IGNORECASE))
            if elements:
                for element in elements:
                    parent = element.parent
                    if parent:
                        address_text = parent.get_text().strip()
                        if len(address_text) > 10:  # 确保地址有足够长度
                            contact_info['address'] = address_text
                            break
        
        return contact_info
    
    def _extract_social_links(self, soup: BeautifulSoup) -> List[str]:
        """提取社交媒体链接"""
        social_links = []
        social_platforms = ['facebook', 'twitter', 'linkedin', 'instagram', 'youtube']
        
        for link in soup.find_all('a', href=True):
            href = link['href'].lower()
            for platform in social_platforms:
                if platform in href:
                    social_links.append(link['href'])
                    break
        
        return social_links
    
    def _extract_page_specific_info(self, soup: BeautifulSoup, page_type: str) -> Dict[str, Any]:
        """根据页面类型提取特定信息"""
        info = {}
        
        if page_type == "about_page":
            info.update(self._extract_about_page_info(soup))
        elif page_type == "product_page":
            info.update(self._extract_product_page_info(soup))
        elif page_type == "contact_page":
            info.update(self._extract_contact_page_info(soup))
        
        return info
    
    def _extract_about_page_info(self, soup: BeautifulSoup) -> Dict[str, Any]:
        """提取关于我们页面的信息"""
        info = {}
        
        # 查找公司历史、规模等信息
        text = soup.get_text()
        
        # 成立年份
        year_pattern = r'成立于\s*(\d{4})|founded\s+in\s+(\d{4})|established\s+in\s+(\d{4})'
        year_match = re.search(year_pattern, text, re.IGNORECASE)
        if year_match:
            info['established_year'] = year_match.group(1) or year_match.group(2) or year_match.group(3)
        
        # 员工规模
        employee_patterns = [
            r'(\d+)\s*名员工',
            r'(\d+)\s*employees',
            r'员工(\d+)\s*人'
        ]
        for pattern in employee_patterns:
            match = re.search(pattern, text)
            if match:
                info['employee_count'] = match.group(1)
                break
        
        return info
    
    def _extract_product_page_info(self, soup: BeautifulSoup) -> Dict[str, Any]:
        """提取产品页面的信息"""
        info = {}
        
        # 查找产品列表
        products = []
        product_selectors = ['.product', '.item', '.product-item', '.product-card']
        
        for selector in product_selectors:
            product_elements = soup.select(selector)
            for element in product_elements:
                product_name = element.get_text().strip()
                if product_name and len(product_name) > 2:
                    products.append(product_name)
        
        if products:
            info['products'] = products[:10]  # 限制最多10个产品
        
        return info
    
    def _extract_contact_page_info(self, soup: BeautifulSoup) -> Dict[str, Any]:
        """提取联系页面的信息"""
        info = {}
        
        # 查找详细联系信息
        contact_text = soup.get_text()
        
        # 地址
        address_patterns = [
            r'地址[：:]\s*(.+)',
            r'address[：:]\s*(.+)',
            r'location[：:]\s*(.+)'
        ]
        
        for pattern in address_patterns:
            match = re.search(pattern, contact_text, re.IGNORECASE)
            if match:
                info['detailed_address'] = match.group(1).strip()
                break
        
        return info
    
    def _is_valid_internal_url(self, url: str, base_url: str) -> bool:
        """判断是否为有效的内部链接"""
        try:
            parsed_url = urlparse(url)
            parsed_base = urlparse(base_url)
            
            # 检查是否为同一域名
            if parsed_url.netloc and parsed_url.netloc != parsed_base.netloc:
                return False
            
            # 排除一些无效链接
            invalid_extensions = ['.pdf', '.doc', '.docx', '.jpg', '.png', '.gif', '.css', '.js']
            if any(url.lower().endswith(ext) for ext in invalid_extensions):
                return False
            
            # 排除锚点链接
            if url.startswith('#'):
                return False
            
            return True
            
        except Exception:
            return False
    
    def _clean_text(self, text: str) -> str:
        """清理文本内容"""
        if not text:
            return ""
        
        # 移除多余的空白字符
        text = re.sub(r'\s+', ' ', text)
        
        # 移除特殊字符
        text = re.sub(r'[^\w\s\u4e00-\u9fff]', ' ', text)
        
        return text.strip()
    
    def _synthesize_analysis(self, main_page_info: Dict[str, Any], other_pages_info: List[Dict[str, Any]]) -> Dict[str, Any]:
        """综合分析结果"""
        synthesis = {
            "website_url": main_page_info.get("url", ""),
            "company_name": main_page_info.get("company_name", ""),
            "main_page": main_page_info,
            "other_pages": other_pages_info,
            "total_pages_analyzed": len(self.visited_urls),
            "analysis_summary": self._generate_analysis_summary(main_page_info, other_pages_info)
        }
        
        return synthesis
    
    def _generate_analysis_summary(self, main_page_info: Dict[str, Any], other_pages_info: List[Dict[str, Any]]) -> Dict[str, Any]:
        """生成分析摘要"""
        summary = {
            "company_info": {
                "name": main_page_info.get("company_name", ""),
                "title": main_page_info.get("title", ""),
                "description": main_page_info.get("meta_description", "")
            },
            "content_overview": {
                "main_content_length": len(main_page_info.get("main_content", "")),
                "total_pages": len(other_pages_info) + 1,
                "page_types": list(set(page.get("page_type", "") for page in other_pages_info))
            },
            "contact_information": main_page_info.get("contact_info", {}),
            "navigation_structure": {
                "total_links": len(main_page_info.get("navigation_links", [])),
                "internal_pages": len(other_pages_info)
            }
        }
        
        return summary
