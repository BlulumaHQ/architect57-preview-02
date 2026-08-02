import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";

export type Lang = "en" | "zh";

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

// ── Translation dictionary ──────────────────────────────
const translations: Record<string, Record<Lang, string>> = {
  // Brand (always bilingual)
  "brand.name": { en: "Architect 57 無極建築", zh: "Architect 57 無極建築" },
  "brand.inc": { en: "Architect 57 Inc.", zh: "Architect 57 無極建築" },

  // Navigation
  "nav.home": { en: "Home", zh: "首頁" },
  "nav.projects": { en: "Projects", zh: "項目" },
  "nav.about": { en: "About", zh: "關於" },
  "nav.contact": { en: "Contact", zh: "聯絡" },

  // Homepage Hero
  "hero.location": { en: "Richmond, BC — Design Build", zh: "列治文, BC — 設計建造" },
  "hero.title1": { en: "Architecture that", zh: "建築改變" },
  "hero.title2": { en: "transforms space", zh: "空間格局" },
  "hero.desc": {
    en: "Integrated building design, code consultation, and sustainable architecture — from concept to completion.",
    zh: "整合式建築設計、法規諮詢及永續建築 — 從概念到完成。",
  },
  "hero.cta1": { en: "Start a Project", zh: "開始項目" },
  "hero.cta2": { en: "View Work", zh: "查看作品" },

  // Services
  "services.label": { en: "What We Do", zh: "我們的專業" },
  "services.title1": { en: "Integrated expertise,", zh: "整合專業，" },
  "services.title2": { en: "from concept to delivery.", zh: "從概念到完整交付。" },
  "services.desc": {
    en: "Architect 57 brings architectural design, technical coordination, code knowledge, and project delivery into one integrated process.",
    zh: "Architect 57 將建築設計、技術協調、建築法規專業與專案交付整合於同一個完整流程之中。",
  },
  "services.sustainability": {
    en: "Sustainable design principles are embedded throughout every project.",
    zh: "永續設計原則貫穿每一個專案階段。",
  },
  "services.cta": { en: "Discuss Your Project", zh: "討論您的專案" },
  "services.s1.title": { en: "Integrated Building Design", zh: "整合建築設計" },
  "services.s1.desc": {
    en: "Coordinated architectural design from early concept through approvals, documentation, and project delivery.",
    zh: "從初步概念、審批及施工文件，到專案交付的完整協調建築設計。",
  },
  "services.s2.title": { en: "Integrated Project Delivery (IPD)", zh: "整合專案交付（IPD）" },
  "services.s2.desc": {
    en: "A collaborative delivery approach that aligns owners, consultants, and contractors from the outset.",
    zh: "從專案初期整合業主、顧問與承包商的協作式交付方式。",
  },
  "services.s3.title": { en: "Code Consultation", zh: "建築法規顧問" },
  "services.s3.desc": {
    en: "Clear building-code analysis and compliance guidance through design, permitting, and construction.",
    zh: "在設計、申請許可及施工階段提供清楚的建築法規分析與合規指導。",
  },
  "services.s4.title": { en: "Building Information Modelling (BIM)", zh: "建築資訊模型（BIM）" },
  "services.s4.desc": {
    en: "Model-based coordination that improves accuracy, communication, constructability, and project clarity.",
    zh: "透過模型協調提升準確性、溝通效率、施工可行性與專案清晰度。",
  },
  "services.s5.title": { en: "Project Management", zh: "專案管理" },
  "services.s5.desc": {
    en: "Structured oversight of scope, schedule, consultants, coordination, and project delivery.",
    zh: "對專案範圍、時程、顧問團隊、協調工作與交付流程進行系統化管理。",
  },
  "services.sectorLabel": { en: "Sector Expertise", zh: "專案領域專長" },
  "services.sector1": { en: "Mixed-Use Development", zh: "綜合用途開發" },
  "services.sector2": { en: "High-Rise Residential", zh: "高層住宅" },
  "services.sector3": { en: "Specialized Industrial", zh: "專業工業設施" },

  // About section (homepage)
  "about.label": { en: "About", zh: "關於我們" },
  "about.title1": { en: "Building a better,", zh: "構建更美好、" },
  "about.title2": { en: "healthier world", zh: "更健康的世界" },
  "about.desc": {
    en: "Architect 57 Inc. specializes in integrated building design, complex building code consultation, specialized industrial, research and technology, mix-use, commercial, residential, and sustainable architecture.",
    zh: "Architect 57 無極建築專精於整合式建築設計、複雜建築法規諮詢、特殊工業、研究與技術、綜合用途、商業、住宅及永續建築。",
  },
  "about.quote": {
    en: '"We believe that it is our responsibility making this world a better and healthier place for living."',
    zh: '「我們相信，讓這個世界變得更美好、更健康，是我們的責任。」',
  },
  "about.cp": { en: "Certified Professional", zh: "認證專業人員" },
  "about.chba": { en: "Awards Finalist", zh: "獎項入圍" },
  "about.bim": { en: "Integrated Design", zh: "整合設計" },
  "about.cta": { en: "Learn More", zh: "瞭解更多" },

  // Featured Projects
  "featured.label": { en: "Our Work", zh: "精選作品" },
  "featured.title1": { en: "Featured", zh: "精選" },
  "featured.title2": { en: "Projects", zh: "項目" },
  "featured.viewAll": { en: "View All", zh: "查看全部" },
  "featured.viewAllProjects": { en: "View All Projects", zh: "查看所有項目" },

  // Category showcase
  "categories.title": { en: "Explore by Category", zh: "依類別瀏覽" },
  "category.viewProjects": { en: "View Projects", zh: "查看專案" },

  // CTA
  "cta.label": { en: "Let's Collaborate", zh: "合作洽談" },
  "cta.title1": { en: "Ready to start your", zh: "準備開始您的" },
  "cta.title2": { en: "next project?", zh: "下一個項目？" },
  "cta.desc": {
    en: "Contact Architect 57 Inc. for integrated building design, code consultation, and project management in Richmond, BC.",
    zh: "聯絡 Architect 57 無極建築，提供列治文的整合式建築設計、法規諮詢及項目管理服務。",
  },
  "cta.btn1": { en: "Get a Free Consultation", zh: "免費諮詢" },

  // About Page
  "aboutPage.label": { en: "About Us", zh: "關於我們" },
  "aboutPage.subtitle": { en: "Design Build — Richmond, BC", zh: "設計建造 — 列治文, BC" },
  "aboutPage.storyLabel": { en: "Our Story", zh: "我們的故事" },
  "aboutPage.storyTitle1": { en: "Decades of", zh: "數十年的" },
  "aboutPage.storyTitle2": { en: "expertise", zh: "專業經驗" },
  "aboutPage.p1": {
    en: "Architect 57 Inc. specializes in integrated building design, complex building code consultation, specialized industrial, research and technology, mix-use, commercial, residential, industrial, institutional, sustainable architecture, project planning, and many more.",
    zh: "Architect 57 無極建築專精於整合式建築設計、複雜建築法規諮詢、特殊工業、研究與技術、綜合用途、商業、住宅、工業、機構、永續建築、項目規劃等。",
  },
  "aboutPage.p2": {
    en: "Architect 57 Inc. is a proud finalist of the Canadian Home Builder's Association Sam Awards (now called CHBA National Awards for Housing Excellence).",
    zh: "Architect 57 無極建築為加拿大住宅建築協會 Sam 大獎（現稱 CHBA 全國住宅卓越獎）的驕傲入圍者。",
  },
  "aboutPage.p3": {
    en: 'Principal Ching-yeh (Cary) Tsai devotes his energy towards the formation of the U.S. Green Building Council — Las Vegas Regional Chapter as part of his way of giving back to the community and help to build a better, healthier, and sustainable living environment.',
    zh: "主持建築師蔡慶曄 (Cary) 致力於美國綠色建築委員會拉斯維加斯分會的成立，作為回饋社會的方式，協助建造更美好、更健康、更永續的生活環境。",
  },
  "aboutPage.servicesLabel": { en: "Expertise", zh: "專業領域" },
  "aboutPage.servicesTitle1": { en: "Our", zh: "我們的" },
  "aboutPage.servicesTitle2": { en: "Services", zh: "服務" },
  "aboutPage.ctaTitle1": { en: "Let's Work", zh: "一起" },
  "aboutPage.ctaTitle2": { en: "Together", zh: "合作" },
  "aboutPage.ctaDesc": {
    en: "Contact us to discuss your next architectural project in Richmond, BC.",
    zh: "聯絡我們，討論您在列治文的下一個建築項目。",
  },
  "aboutPage.ctaBtn": { en: "Contact Us", zh: "聯絡我們" },

  // About page services list
  "svc.1": { en: "Integrated Building Design", zh: "整合式建築設計" },
  "svc.2": { en: "Complex Building Code Consultation", zh: "複雜建築法規諮詢" },
  "svc.3": { en: "Integrated Project Delivery (IPD)", zh: "整合項目交付 (IPD)" },
  "svc.4": { en: "Code Consultation (CP)", zh: "法規諮詢 (CP)" },
  "svc.5": { en: "Building Info Modelling (BIM)", zh: "建築資訊模型 (BIM)" },
  "svc.6": { en: "Project Management", zh: "項目管理" },
  "svc.7": { en: "Mix-Use Development", zh: "綜合用途開發" },
  "svc.8": { en: "High-Rise Residential", zh: "高層住宅" },
  "svc.9": { en: "Specialized Industrial", zh: "特殊工業" },
  "svc.10": { en: "Research and Technology", zh: "研究與技術" },
  "svc.11": { en: "Commercial Architecture", zh: "商業建築" },
  "svc.12": { en: "Residential Architecture", zh: "住宅建築" },
  "svc.13": { en: "Industrial Architecture", zh: "工業建築" },
  "svc.14": { en: "Institutional Architecture", zh: "機構建築" },
  "svc.15": { en: "Sustainable Architecture", zh: "永續建築" },
  "svc.16": { en: "Project Planning", zh: "項目規劃" },

  // Projects Page
  "projects.label": { en: "Our Portfolio", zh: "作品集" },
  "projects.title": { en: "Projects", zh: "項目" },
  "projects.desc": {
    en: "A curated selection of residential, commercial, industrial, institutional, and community work across British Columbia and beyond.",
    zh: "精選列治文及大溫哥華地區的住宅、商業、工業、機構及社區建築作品。",
  },
  "projects.featuredLabel": { en: "Featured Work", zh: "精選作品" },
  "projects.featuredTitle": { en: "Signature Projects", zh: "代表項目" },
  "projects.allProjects": { en: "All Projects", zh: "所有項目" },
  "projects.tags": { en: "Tags", zh: "標籤" },
  "projects.seeDetails": { en: "See Details", zh: "查看詳情" },
  "projects.noResults": { en: "No projects found in this category.", zh: "此分類中無項目。" },
  "projects.viewAll": { en: "View All Projects", zh: "查看所有項目" },
  "projects.ctaTitle": { en: "Have a Project in Mind?", zh: "有項目構想嗎？" },
  "projects.ctaDesc": {
    en: "Let's discuss how Architect 57 can bring your vision to life.",
    zh: "讓我們討論 Architect 57 無極建築如何實現您的願景。",
  },
  "projects.ctaBtn": { en: "Start Your Project", zh: "開始您的項目" },
  "projects.project": { en: "project", zh: "個項目" },
  "projects.projects": { en: "projects", zh: "個項目" },

  // Category labels
  "cat.all": { en: "All", zh: "全部" },
  "cat.residential": { en: "Residential", zh: "住宅" },
  "cat.commercial": { en: "Commercial", zh: "商業" },
  "cat.industrial": { en: "Industrial", zh: "工業" },
  "cat.institutional": { en: "Institutional", zh: "機構" },
  "cat.community-cultural": { en: "Community & Cultural", zh: "社區與文化" },
  "cat.interior-projects": { en: "Interior Projects", zh: "室內項目" },
  "cat.master-planning": { en: "Master Planning", zh: "總體規劃" },

  // Project Detail
  "detail.back": { en: "Back to Projects", zh: "返回項目" },
  "detail.overview": { en: "Project Overview", zh: "項目概述" },
  "detail.gallery": { en: "Project Gallery", zh: "項目圖庫" },
  "detail.previous": { en: "Previous", zh: "上一個" },
  "detail.next": { en: "Next", zh: "下一個" },
  "detail.category": { en: "Category", zh: "分類" },
  "detail.tags": { en: "Tags", zh: "標籤" },
  "detail.location": { en: "Location", zh: "地點" },
  "detail.area": { en: "Area", zh: "面積" },
  "detail.budget": { en: "Budget", zh: "預算" },
  "detail.details": { en: "Details", zh: "詳情" },
  "detail.tag1": { en: "Tag 1", zh: "第一標籤" },
  "detail.tag2": { en: "Tag 2", zh: "第二標籤" },
  "detail.projectStatus": { en: "Project Status", zh: "專案狀態" },
  "detail.projectYear": { en: "Project Year", zh: "專案年份" },
  "detail.yearStarted": { en: "Year Started", zh: "開始年份" },
  "detail.yearCompleted": { en: "Year Completed", zh: "完成年份" },
  "detail.floorArea": { en: "Floor Area", zh: "樓面面積" },
  "detail.siteArea": { en: "Site Area", zh: "基地面積" },
  "detail.units": { en: "Units", zh: "單位數" },
  "detail.storeys": { en: "Storeys", zh: "樓層數" },
  "detail.parking": { en: "Parking Spaces", zh: "停車位" },
  "detail.services": { en: "Services", zh: "服務" },
  "detail.role": { en: "Role", zh: "角色" },
  "detail.designArchitect": { en: "Design Architect", zh: "設計建築師" },
  "detail.architectOfRecord": { en: "Architect of Record", zh: "註冊建築師" },
  "detail.interiorDesigner": { en: "Interior Designer", zh: "室內設計師" },
  "detail.landscapeArchitect": { en: "Landscape Architect", zh: "景觀建築師" },
  "detail.structuralEngineer": { en: "Structural Engineer", zh: "結構工程師" },
  "detail.mechanicalEngineer": { en: "Mechanical Engineer", zh: "機械工程師" },
  "detail.electricalEngineer": { en: "Electrical Engineer", zh: "電氣工程師" },
  "detail.civilEngineer": { en: "Civil Engineer", zh: "土木工程師" },
  "detail.otherConsultants": { en: "Other Consultants", zh: "其他顧問" },
  "detail.generalContractor": { en: "General Contractor", zh: "總承包商" },
  "detail.developer": { en: "Developer / Owner / Client", zh: "開發商 / 業主 / 客戶" },
  "detail.photographer": { en: "Photographer", zh: "攝影師" },
  "detail.otherCredits": { en: "Other Credits", zh: "其他致謝" },
  "detail.awards": { en: "Awards", zh: "獎項" },
  "detail.publications": { en: "Publications", zh: "刊物報導" },

  // Data states
  "state.loading": { en: "Loading projects…", zh: "正在載入專案…" },
  "state.error": { en: "Projects are temporarily unavailable.", zh: "專案資料目前暫時無法載入。" },
  "state.retry": { en: "Try Again", zh: "重新載入" },
  "state.empty": { en: "No published projects are currently available.", zh: "目前沒有已發布的專案。" },
  "projects.tag1": { en: "Tag 1", zh: "第一標籤" },
  "projects.tag2": { en: "Tag 2", zh: "第二標籤" },


  // Contact Page
  "contact.label": { en: "Get in Touch", zh: "聯絡我們" },
  "contact.title": { en: "Contact Us", zh: "聯絡我們" },
  "contact.formLabel": { en: "Send a Message", zh: "發送訊息" },
  "contact.formTitle1": { en: "Tell us about your", zh: "告訴我們您的" },
  "contact.formTitle2": { en: "project", zh: "項目" },
  "contact.name": { en: "Name", zh: "姓名" },
  "contact.namePlaceholder": { en: "Your full name", zh: "您的全名" },
  "contact.email": { en: "Email", zh: "電郵" },
  "contact.emailPlaceholder": { en: "you@email.com", zh: "you@email.com" },
  "contact.phone": { en: "Phone", zh: "電話" },
  "contact.phonePlaceholder": { en: "604-XXX-XXXX", zh: "604-XXX-XXXX" },
  "contact.message": { en: "Message", zh: "留言" },
  "contact.messagePlaceholder": { en: "Tell us about your project...", zh: "告訴我們您的項目..." },
  "contact.send": { en: "Send Message", zh: "發送訊息" },
  "contact.sent": { en: "Message Sent", zh: "訊息已發送" },
  "contact.sentDesc": { en: "Thank you for reaching out. We'll get back to you shortly.", zh: "感謝您的聯繫，我們會盡快回覆您。" },
  "contact.infoLabel": { en: "Details", zh: "聯繫方式" },
  "contact.infoTitle1": { en: "Contact", zh: "聯絡" },
  "contact.infoTitle2": { en: "Info", zh: "資訊" },
  "contact.phoneLabel": { en: "Phone", zh: "電話" },
  "contact.companyLabel": { en: "Company", zh: "公司" },
  "contact.emailLabel": { en: "Email", zh: "電郵" },
  "contact.addressLabel": { en: "Address", zh: "地址" },

  // Footer
  "footer.desc": {
    en: "Integrated building design, code consultation, and sustainable architecture in Richmond, BC.",
    zh: "列治文的整合式建築設計、法規諮詢及永續建築服務。",
  },
  "footer.navigation": { en: "Navigation", zh: "導覽" },
  "footer.services": { en: "Services", zh: "服務" },
  "footer.contact": { en: "Contact", zh: "聯絡" },
  "footer.buildingDesign": { en: "Building Design", zh: "建築設計" },
  "footer.codeConsultation": { en: "Code Consultation", zh: "法規諮詢" },
  "footer.projectManagement": { en: "Project Management", zh: "項目管理" },
  "footer.bimServices": { en: "BIM Services", zh: "BIM 服務" },

  // Sticky CTA
  "cta.callNow": { en: "Call Now", zh: "立即致電" },
  "cta.getQuote": { en: "Get a Quote", zh: "取得報價" },

  // 404
  "notFound.title": { en: "404", zh: "404" },
  "notFound.desc": { en: "Oops! Page not found", zh: "頁面不存在" },
  "notFound.link": { en: "Return to Home", zh: "返回首頁" },
};

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";
  }, [lang]);

  const t = useCallback(
    (key: string): string => {
      const entry = translations[key];
      if (!entry) return key;
      return entry[lang] || entry.en || key;
    },
    [lang]
  );

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
