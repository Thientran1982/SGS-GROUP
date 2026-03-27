
import { NavItem, ServiceItem } from './types';

// --- GEMINI NEURAL VOICES (v2.5) ---
export const GEMINI_VOICES = [
    { id: 'Puck', name: 'Puck (Male - Neutral)', gender: 'Male' },
    { id: 'Charon', name: 'Charon (Male - Deep)', gender: 'Male' },
    { id: 'Kore', name: 'Kore (Female - Calm)', gender: 'Female' },
    { id: 'Fenrir', name: 'Fenrir (Male - Deep)', gender: 'Male' },
    { id: 'Aoede', name: 'Aoede (Female - Professional)', gender: 'Female' },
    { id: 'Zephyr', name: 'Zephyr (Female - Warm)', gender: 'Female' },
];

// --- ADVANCED PHONETIC DICTIONARY FOR TTS (V5.1 - NATIVE SPEAKING ENHANCED) ---
// Dictionary to translate "Vietalish" & Abbreviations into phonetic Vietnamese.
export const PHONETIC_MAP: Record<string, string> = {
    // --- 1. CORE BRANDING (PRIORITY) ---
    // Ensure exact mapping for Welcome Message
    'SGS AI Hub': 'ét gờ ét ây ai hắp', 
    'SGS AI Core': 'ét gờ ét ây ai co',
    'SGS GROUP': 'ét gờ ét gờ rúp',
    'SGS': 'ét gờ ét',

    // --- 2. VIETNAMESE ABBREVIATIONS ---
    'ko': 'không', 'k': 'không', 'kh': 'không',
    'dc': 'được', 'đc': 'được',
    'hok': 'không',
    'bit': 'biết', 'bik': 'biết',
    'vs': 'với',
    'j': 'gì', 'gì z': 'gì vậy',
    'uk': 'ừ', 'uhm': 'ừm', 'uh': 'ừ',
    'rùi': 'rồi', 'r': 'rồi',
    'nv': 'nhân viên', 'sp': 'sản phẩm',
    'dt': 'điện thoại', 'đt': 'điện thoại', 'sdt': 'số điện thoại',
    'hn': 'hà nội', 'hcm': 'hồ chí minh', 'sg': 'sài gòn', 'vn': 'việt nam',
    'mn': 'mọi người', 'ng': 'người',
    'cx': 'cũng',
    'qá': 'quá',
    'iu': 'yêu',
    'thik': 'thích', 'thich': 'thích',
    'bjo': 'bao giờ',
    'h': 'giờ', 'p': 'phút', 's': 'giây',
    'v': 'vậy', 'z': 'vậy',
    'ad': 'át min', 'add': 'thêm', 'rep': 'trả lời', 'ib': 'in bốc', 'cmt': 'bình luận',
    'check': 'kiểm tra',
    'tks': 'cảm ơn', 'thanks': 'cảm ơn',
    'pls': 'làm ơn', 'plz': 'làm ơn',
    'sr': 'xin lỗi',
    
    // --- 3. DEV STACK & LANGUAGES ---
    'Python': 'pai thơn',
    'Java': 'gia va',
    'JavaScript': 'gia va sờ cờ ríp',
    'JS': 'giây ét',
    'TypeScript': 'tai sờ cờ ríp',
    'TS': 'tê ét',
    'C#': 'xi thăng',
    'C++': 'xi cọng cọng',
    'Golang': 'gô lang',
    'Go': 'gô',
    'Swift': 'suýt',
    'Kotlin': 'cốt lin',
    'PHP': 'pi hắt pi',
    'Ruby': 'ru bi',
    'HTML': 'hắt tê mờ lờ',
    'CSS': 'xi ét ét',
    'SQL': 'ét quy eo',
    'NoSQL': 'nâu ét quy eo',
    'MySQL': 'mai ét quy eo',
    'React': 'ri ác',
    'Vue': 'viu',
    'Angular': 'an gu la',
    'NextJS': 'nếc giây ét',
    'NodeJS': 'nốt giây ét',
    'Docker': 'đốc cơ',
    'Kubernetes': 'cu bơ nét',
    'K8s': 'cu bơ nét',
    'Git': 'gít',
    'GitHub': 'gít hắp',
    'AWS': 'a vê kép ét',
    'GCP': 'gi xi pi',
    'API': 'ây pi ai',
    'HTTP': 'hắt tê tê pi',
    'HTTPS': 'hắt tê tê pi ét',
    'JSON': 'gây sơn',
    
    // --- 4. COMMON TECH TERMS ---
    'AI Hub': 'ây ai hắp',
    'Code': 'cốt',
    'Coder': 'cốt đơ',
    'Dev': 'đép',
    'Developer': 'đì ve lớp pơ',
    'Bug': 'bấc',
    'Fix': 'phích',
    'Frontend': 'phờ ron en',
    'Backend': 'bách en',
    'Fullstack': 'phun sờ tắc',
    'Server': 'sơ vơ',
    'Client': 'cờ lai ần',
    'Database': 'đa ta bây',
    'Cache': 'cát',
    'Cookie': 'cúc ki',
    'Token': 'tô cần',
    'Header': 'hét đơ',
    'Footer': 'phút tơ',
    'Menu': 'me nu',
    'Button': 'bắt tần',
    'Icon': 'ai cờn',
    'Image': 'im mịt',
    'Video': 'vi đê ô',
    'Audio': 'ao đi ô',
    'File': 'phai',
    'Folder': 'phô đơ',
    'Link': 'linh',
    'URL': 'u rờ lờ',
    'Web': 'uép',
    'Website': 'uép sai',
    'App': 'áp',
    'Mobile': 'mô bai',
    'Desktop': 'đét tóp',
    'Online': 'on lai',
    'Offline': 'óp lai',
    'Internet': 'in tơ nét',
    'Wifi': 'oai phai',
    'Email': 'i meo',
    'Gmail': 'gờ meo',
    'Facebook': 'phây búc',
    'Google': 'gù gồ',
    'Youtube': 'iu túp',
    'Tiktok': 'tíc tóc',
    'Zalo': 'da lô',
    'Laptop': 'láp tóp',
    'PC': 'pi xi',
    'Smartphone': 'xì mát phôn',
    'Camera': 'ca mê ra',
    'Pro': 'pờ rô',
    'Max': 'mắc',
    'Plus': 'pờ lớt',
    'Ultra': 'un tra',
    'Review': 'ri viu',
    'Demo': 'đê mô',
    'Test': 'tét',
    'Sale': 'seo',
    'Marketing': 'ma két tinh',
    'Digital': 'đi gi tồ',
    'Content': 'con ten',
    'Design': 'đi zai',
    'Media': 'mê đi a',
    'Viral': 'vai rồ',
    'Trend': 'tờ ren',
    'Top': 'tóp',
    'Hot': 'hót',
    'Ship': 'xíp',
    'Shipper': 'xíp pơ',
    'Order': 'o đơ',
    'Bill': 'bin',
    'Deal': 'điu',
    'Job': 'gióp',
    'Team': 'tim',
    'Group': 'gờ rúp',
    'Meeting': 'mít tinh',
    'Deadline': 'đét lai',
    'Office': 'óp phít',
    'Staff': 'sờ táp',
    'Manager': 'ma na gơ',
    'Boss': 'bót',
    'CEO': 'xi i ô',
    'Startup': 'sờ tát ắp',
    'Project': 'pờ rô giéc',
    'Idea': 'ai đi a',
    'Concept': 'con sép',
    'System': 'xít tầm',
    'Data': 'đa ta',
    'Big Data': 'bích đa ta',
    'Cloud': 'cờ lao',
    'AI': 'ây ai',
    'IoT': 'ai ô ti',
    'Blockchain': 'bờ lốc chen',
    'Bitcoin': 'bít coi',
    'Crypto': 'cờ ríp tô',
    'NFT': 'en ép ti',
    'Game': 'ghêm',
    'Gamer': 'ghêm thủ',
    'Stream': 'chim',
    'Live': 'lai',
    'Ok': 'ô kê',
    'Okay': 'ô kê',
    'Yes': 'yét',
    'No': 'nâu',
    'Bye': 'bai',
    'Hi': 'hai',
    'Hello': 'hê lô',
    'Sorry': 'so ri',
    'Free': 'phờ ri',
    'Update': 'ắp đết',
    'Version': 'vơ sần',
    'Download': 'đao loát',
    'Upload': 'ắp loát',
    'Error': 'e rro',
    'Lag': 'lác',
    'Ping': 'ping',
    'V8.0': 'phiên bản tám chấm không',
};

export const TEXTS = {
  en: {
    heroTitle: "AI That Delivers.\nNot Just Promises.",
    heroSubtitle: "We help businesses in Vietnam & Southeast Asia cut process costs by 30–78% using production-grade AI — 200+ projects delivered, 6-week deployment, 100% money-back pilot guarantee.",
    cta: "Book Free Technical Audit",
    learnMore: "See Our Work",
    aiHubWelcome: "Welcome to SGS AI Hub. How can I assist you today?",
    placeholder: "Ask anything about technology...",
    features: "Our Technologies",
    coreModules: "CORE_MODULES",
    footer: "© 2026 SGS GROUP. All rights reserved.",
    toggleTheme: "Switch Theme",
    loading: "Thinking...",
    error: "Connection interrupted. Please try again.",
    // New Footer Texts
    footerTagline: "Trusted by 50+ businesses across Vietnam & Southeast Asia. Delivering measurable AI impact since 2020.",
    quickLinks: "Navigation",
    legal: "Legal",
    stayUpdated: "Newsletter",
    subscribePlaceholder: "your@email.com",
    subscribeBtn: "Subscribe",
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
    // Security Badge
    securityBadge: "AES-256 ENCRYPTED",
    securityMsg: "Data transmission secured",
    // System Status
    systemStatus: {
        operational: "System Operational",
        degraded: "System Degraded",
        maintenance: "Maintenance Mode",
        initializing: "Initializing..."
    },
    // AI Hub UI
    aiCoreTitle: "SGS AI_CORE",
    aiCoreStatus: "Neural Link Established",
    memoryLogs: "Memory_Logs",
    systemReady: "SYSTEM_READY",
    processingData: "PROCESSING_DATA...",
    sendBtn: "SEND",
    history: "History",
    newChat: "New Chat",
    save: "Save",
    saveSession: "Save Session",
    sessionSaved: "Session Saved",
    rename: "Rename",
    deleteChat: "Delete Conversation?",
    deleteConfirmation: "This action cannot be undone. Are you sure?",
    cancel: "Cancel",
    delete: "Delete",
    defaultChatTitle: "New Conversation",
    copy: "Copy",
    copied: "Copied",
    share: "Share",
    listening: "Listening...",
    readAloud: "Read Aloud",
    stopReading: "Stop Reading",
    speechNotSupported: "Speech recognition is not supported in this browser.",
    // Chat Metadata (Headers)
    chatMetadata: {
        user: "[USER_COMMAND]",
        model: "[MODEL_RESPONSE]",
        module: "MODULE"
    },
    // Services UI
    backToServices: "Back to Services",
    keyFeatures: "Key Features",
    whyChooseUs: "Why Choose SGS?",
    contactSales: "Contact Sales",
    techSpecs: "// TECH_SPECS",
    efficiency: "Efficiency",
    latency: "Latency",
    encryptedConnection: "ENCRYPTED CONNECTION ESTABLISHED",
    demoSimulation: "Live Simulation",
    initDemo: "INITIATE DEMO",
    demoRunning: "RUNNING PROCESS...",
    useCases: "Real-world Applications",
    deploySolution: "Deploy Solution",
    // Voice Settings
    voiceSettings: "Voice Settings",
    voiceSpeed: "Speed",
    voicePitch: "Pitch",
    selectVoice: "Select Voice",
    reset: "Reset",
    close: "Close",
    audioConfig: "Audio_Config",
    outputFreq: "Output Frequency",
    autoDetect: "[AUTO_DETECT]",
    tempo: "Tempo",
    modulation: "Modulation",
    resetDefaults: "[RESET_DEFAULTS]",
    geminiVoices: "Neural Voices (Cloud)",
    deviceVoices: "Device Voices (Local)",
    // Contact & About
    sendMessage: "Send Message",
    sendMessageTitle: "Send us a message", 
    name: "Name",
    namePlaceholder: "Ex: John Doe", 
    email: "Email",
    message: "Message",
    sending: "Sending...",
    sent: "Message Sent!",
    office: "Headquarters",
    followUs: "Follow Us",
    getDirections: "Get Directions",
    aboutTitle: "About SGS", 
    joinNetworkTitle: "Join Our Network", 
    joinNetworkDesc: "Partner with us to redefine the future.", 
    trustedPartners: "Trusted by Industry Leaders", 
    // Menu
    menu: "Menu",
    corporateProfile: "SGS_CORPORATE_PROFILE",
    systemOnline: "SYSTEM ONLINE",
    tapToInit: "TAP TO INITIALIZE",
    // Ticker
    ticker: ["200+ PROJECTS DELIVERED", "UPTIME: 99.98%", "CLIENTS IN 12+ COUNTRIES", "RESPONSE TIME: <24H", "ISO 27001 COMPLIANT", "4.9/5 CLIENT SATISFACTION"],
    // ROI
    roiTitle: "Advanced ROI Projection",
    roiSubtitle: "Estimate annual impact based on your metrics",
    estimatedSavings: "PROJECTED ANNUAL SAVINGS",
    calculate: "Calculate",
    projectionChart: "5-Year Growth Projection",
    downloadReport: "Download Report",
    // Missing Keys
    techStack: "TECH_STACK",
    profile: "PROFILE",
    commLink: "COMM_LINK",
    neuralCoreOnline: "NEURAL CORE ONLINE",
  },
  vi: {
    heroTitle: "AI Thực Chiến.\nKhông Chỉ Lời Hứa.",
    heroSubtitle: "Chúng tôi giúp doanh nghiệp Việt Nam & Đông Nam Á cắt giảm 30–78% chi phí quy trình bằng AI cấp sản xuất — 200+ dự án đã triển khai, 6 tuần ra mắt, bảo đảm hoàn tiền 100% trong giai đoạn pilot.",
    cta: "Đặt Lịch Tư Vấn Miễn Phí",
    learnMore: "Xem Dự Án Thực",
    aiHubWelcome: "Chào mừng đến với SGS AI Hub. Tôi có thể giúp gì cho bạn?",
    placeholder: "Hỏi bất cứ điều gì về công nghệ...",
    features: "Công Nghệ Tiên Tiến",
    coreModules: "MÔ_ĐUN_CỐT_LÕI",
    footer: "© 2026 SGS GROUP. Bảo lưu mọi quyền.",
    toggleTheme: "Đổi Giao Diện",
    loading: "Đang suy nghĩ...",
    error: "Kết nối bị gián đoạn. Vui lòng thử lại.",
    // New Footer Texts
    footerTagline: "Được tin dùng bởi 50+ doanh nghiệp tại Việt Nam & Đông Nam Á. Tạo ra tác động AI thực sự từ năm 2020.",
    quickLinks: "Điều Hướng",
    legal: "Pháp Lý",
    stayUpdated: "Bản Tin Công Nghệ",
    subscribePlaceholder: "email@cuaban.com",
    subscribeBtn: "Đăng Ký",
    privacy: "Chính Sách Bảo Mật",
    terms: "Điều Khoản Dịch Vụ",
    // Security Badge
    securityBadge: "MÃ HÓA AES-256",
    securityMsg: "Truyền tải dữ liệu an toàn",
    // System Status
    systemStatus: {
        operational: "Hệ Thống Hoạt Động",
        degraded: "Hệ Thống Suy Giảm",
        maintenance: "Đang Bảo Trì",
        initializing: "Đang Khởi Tạo..."
    },
    // AI Hub UI
    aiCoreTitle: "SGS TRỢ LÝ AI",
    aiCoreStatus: "KẾT NỐI THẦN KINH ỔN ĐỊNH",
    memoryLogs: "NHẬT_KÝ_BỘ_NHỚ",
    systemReady: "HỆ THỐNG SẴN SÀNG",
    processingData: "ĐANG XỬ LÝ DỮ LIỆU...",
    sendBtn: "GỬI",
    history: "Lịch sử trò chuyện",
    newChat: "Chat Mới",
    save: "Lưu",
    saveSession: "Lưu phiên",
    sessionSaved: "Đã lưu phiên",
    rename: "Đổi tên",
    deleteChat: "Xóa cuộc hội thoại?",
    deleteConfirmation: "Hành động này không thể hoàn tác. Bạn chắc chắn chứ?",
    cancel: "Hủy",
    delete: "Xóa",
    defaultChatTitle: "Cuộc trò chuyện mới",
    copy: "Sao chép",
    copied: "Đã sao chép",
    share: "Chia sẻ",
    listening: "Đang nghe...",
    readAloud: "Đọc to",
    stopReading: "Dừng đọc",
    speechNotSupported: "Trình duyệt của bạn không hỗ trợ nhận dạng giọng nói.",
    // Chat Metadata (Headers)
    chatMetadata: {
        user: "[LỆNH_NGƯỜI_DÙNG]",
        model: "[PHẢN_HỒI_MÔ_HÌNH]",
        module: "MÔ-ĐUN"
    },
    // Services UI
    backToServices: "Quay lại Dịch vụ",
    keyFeatures: "Tính Năng Nổi Bật",
    whyChooseUs: "Tại sao chọn SGS?",
    contactSales: "Liên Hệ Tư Vấn",
    techSpecs: "// THÔNG_SỐ_KT",
    efficiency: "Hiệu Suất",
    latency: "Độ Trễ",
    encryptedConnection: "ĐÃ THIẾT LẬP KẾT NỐI MÃ HÓA",
    demoSimulation: "Mô Phỏng Trực Tiếp",
    initDemo: "CHẠY DEMO",
    demoRunning: "ĐANG XỬ LÝ...",
    useCases: "Ứng Dụng Thực Tế",
    deploySolution: "Triển Khai Ngay",
    // Voice Settings
    voiceSettings: "Cài đặt giọng nói",
    voiceSpeed: "Tốc độ",
    voicePitch: "Cao độ",
    selectVoice: "Chọn giọng đọc",
    reset: "Đặt lại",
    close: "Đóng",
    audioConfig: "CẤU_HÌNH_ÂM_THANH", 
    outputFreq: "Tần Số Đầu Ra",
    autoDetect: "[TỰ_ĐỘNG]",
    tempo: "Nhịp độ",
    modulation: "Điều chế",
    resetDefaults: "[ĐẶT_LẠI_MẶC_ĐỊNH]",
    geminiVoices: "Giọng Neural (Cloud)",
    deviceVoices: "Giọng Thiết Bị (Local)",
    // Contact & About
    sendMessage: "Gửi Tin Nhắn",
    sendMessageTitle: "Gửi tin nhắn cho chúng tôi", 
    name: "Họ tên",
    namePlaceholder: "Vd: Nguyễn Văn A", 
    email: "Email",
    message: "Nội dung",
    sending: "Đang gửi...",
    sent: "Đã gửi thành công!",
    office: "Trụ Sở Chính",
    followUs: "Kết Nối Với Chúng Tôi",
    getDirections: "Chỉ Đường",
    aboutTitle: "Về SGS", 
    joinNetworkTitle: "Tham Gia Mạng Lưới", 
    joinNetworkDesc: "Hợp tác cùng chúng tôi để định nghĩa lại tương lai.", 
    trustedPartners: "Đối Tác Chiến Lược", 
    // Menu
    menu: "Danh Mục",
    corporateProfile: "SGS_HỒ_SƠ_DOANH_NGHIỆP",
    systemOnline: "HỆ THỐNG ONLINE",
    tapToInit: "CHẠM ĐỂ KHỞI ĐỘNG",
    // Ticker
    ticker: ["200+ DỰ ÁN HOÀN THÀNH", "UPTIME: 99.98%", "KHÁCH HÀNG TẠI 12+ QUỐC GIA", "PHẢN HỒI: <24H", "CHUẨN ISO 27001", "4.9/5 HÀI LÒNG KHÁCH HÀNG"],
    // ROI
    roiTitle: "Dự Báo Hiệu Quả Đầu Tư",
    roiSubtitle: "Ước tính tác động dựa trên chỉ số của bạn",
    estimatedSavings: "TIẾT KIỆM HÀNG NĂM DỰ KIẾN",
    calculate: "Tính Toán",
    projectionChart: "Biểu Đồ Tăng Trưởng 5 Năm",
    downloadReport: "Tải Báo Cáo",
    // Missing Keys Filled
    techStack: "HỆ_THỐNG_CÔNG_NGHỆ",
    profile: "HỒ_SƠ_NĂNG_LỰC",
    commLink: "CỔNG_GIAO_TIẾP",
    neuralCoreOnline: "LÕI THẦN KINH TRỰC TUYẾN",
  }
};

// LOGICAL ORDER: Home -> Services (Core) -> AI Hub (Interactive Demo) -> About (Trust) -> Contact (Action)
export const NAV_ITEMS: NavItem[] = [
  { id: 'home', labelEn: 'Home', labelVi: 'Trang Chủ' },
  { id: 'services', labelEn: 'Technology', labelVi: 'Công Nghệ' },
  { id: 'ai-hub', labelEn: 'AI Hub', labelVi: 'Trợ Lý AI' },
  { id: 'about', labelEn: 'About Us', labelVi: 'Về Chúng Tôi' },
  { id: 'contact', labelEn: 'Contact', labelVi: 'Liên Hệ' },
];

export const SEO_CONTENT: Record<string, { titleEn: string; titleVi: string; descriptionEn: string; descriptionVi: string; keywords: string }> = {
    home: {
        titleEn: "SGS GROUP — Enterprise AI & Automation for Vietnam & Southeast Asia",
        titleVi: "SGS GROUP — AI Doanh Nghiệp & Tự Động Hóa cho Việt Nam & Đông Nam Á",
        descriptionEn: "SGS GROUP delivers production-grade AI, process automation, and data analytics to enterprises in Vietnam, Thailand, Indonesia, and Singapore. 200+ projects since 2020. Free technical audit. Results in 6 weeks or your money back.",
        descriptionVi: "SGS GROUP cung cấp AI cấp sản xuất, tự động hóa quy trình và phân tích dữ liệu cho doanh nghiệp tại Việt Nam, Thái Lan, Indonesia và Singapore. 200+ dự án từ 2020. Kiểm tra kỹ thuật miễn phí. Kết quả trong 6 tuần hoặc hoàn tiền.",
        keywords: "AI doanh nghiệp, tự động hóa, phân tích dữ liệu, machine learning, SGS GROUP, Việt Nam, Đông Nam Á, enterprise AI, automation Vietnam"
    },
    services: {
        titleEn: "AI & Automation Services — Document AI, RPA, Data Analytics | SGS GROUP",
        titleVi: "Dịch Vụ AI & Tự Động Hóa — Document AI, RPA, Phân Tích Dữ Liệu | SGS GROUP",
        descriptionEn: "Explore SGS GROUP's 5 core AI services: Intelligent Document Processing, Robotic Process Automation, Conversational AI, Data Analytics, and Cloud Infrastructure. Real client results with measurable ROI.",
        descriptionVi: "Khám phá 5 dịch vụ AI cốt lõi của SGS GROUP: Xử lý Tài liệu Thông minh, Tự động hóa Quy trình, AI Hội thoại, Phân tích Dữ liệu và Hạ tầng Cloud. Kết quả thực tế từ khách hàng với ROI có thể đo được.",
        keywords: "Document AI Vietnam, RPA automation, chatbot AI, data analytics, cloud infrastructure, AI services Vietnam"
    },
    "ai-hub": {
        titleEn: "AI Hub — Chat with SGS GROUP's Business Intelligence Assistant",
        titleVi: "AI Hub — Trò Chuyện với Trợ Lý Thông Minh Doanh Nghiệp của SGS GROUP",
        descriptionEn: "Ask our AI assistant about AI implementation, ROI projections, automation feasibility, and enterprise solutions for your industry. Available in English and Vietnamese.",
        descriptionVi: "Hỏi trợ lý AI của chúng tôi về triển khai AI, dự báo ROI, khả năng tự động hóa và giải pháp doanh nghiệp cho ngành của bạn. Hỗ trợ tiếng Anh và tiếng Việt.",
        keywords: "AI assistant Vietnam, business intelligence chatbot, AI consultation, tư vấn AI, trợ lý AI doanh nghiệp"
    },
    about: {
        titleEn: "About SGS GROUP — Vietnamese AI Engineering Company Since 2020",
        titleVi: "Về Chúng Tôi — Công ty Kỹ Thuật AI Việt Nam từ 2020 | SGS GROUP",
        descriptionEn: "Learn about SGS GROUP: 40+ AI engineers, headquartered in Ho Chi Minh City, serving clients across Vietnam and Southeast Asia. Delivery guarantee: results in 6 weeks or 100% refund.",
        descriptionVi: "Tìm hiểu về SGS GROUP: 40+ kỹ sư AI, trụ sở tại TP.HCM, phục vụ khách hàng tại Việt Nam và Đông Nam Á. Cam kết giao hàng: kết quả trong 6 tuần hoặc hoàn tiền 100%.",
        keywords: "SGS GROUP về chúng tôi, công ty AI Việt Nam, kỹ sư AI TPHCM, enterprise AI Vietnam company"
    },
    contact: {
        titleEn: "Contact SGS GROUP — Get a Free AI Technical Audit",
        titleVi: "Liên Hệ SGS GROUP — Nhận Kiểm Tra Kỹ Thuật AI Miễn Phí",
        descriptionEn: "Contact SGS GROUP for a free AI technical audit, pilot project consultation, or enterprise solution inquiry. Office in Sala, Thu Duc City, HCMC. Response within 1 business day.",
        descriptionVi: "Liên hệ SGS GROUP để nhận kiểm tra kỹ thuật AI miễn phí, tư vấn dự án pilot hoặc yêu cầu giải pháp doanh nghiệp. Văn phòng tại Sala, Thủ Đức, TP.HCM. Phản hồi trong 1 ngày làm việc.",
        keywords: "liên hệ SGS GROUP, tư vấn AI miễn phí, contact AI company Vietnam, AI consultation HCMC"
    }
};

export const SUGGESTED_PROMPTS = {
    en: [
        "What makes SGS GROUP different from other AI vendors in Vietnam?",
        "How long does it take to automate a business process end-to-end?",
        "What ROI can I expect from a document automation project?",
        "Does SGS work with companies outside of Vietnam?",
        "What does a pilot project look like and how much does it cost?",
        "How do you ensure data privacy and compliance with Vietnamese law?",
    ],
    vi: [
        "SGS GROUP khác gì so với các nhà cung cấp AI khác tại Việt Nam?",
        "Mất bao lâu để tự động hóa một quy trình kinh doanh từ đầu đến cuối?",
        "Tôi có thể kỳ vọng ROI như thế nào từ một dự án tự động hóa tài liệu?",
        "SGS có làm việc với các công ty ngoài Việt Nam không?",
        "Một dự án pilot trông như thế nào và chi phí là bao nhiêu?",
        "Làm sao để đảm bảo quyền riêng tư dữ liệu và tuân thủ luật Việt Nam?",
    ]
};

export const SOCIAL_LINKS = [
    { 
        id: 'facebook', 
        url: 'https://facebook.com', 
        label: 'Facebook',
        icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
    },
    { 
        id: 'twitter', 
        url: 'https://twitter.com', 
        label: 'X (Twitter)',
        icon: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z'
    },
    { 
        id: 'linkedin', 
        url: 'https://linkedin.com', 
        label: 'LinkedIn',
        icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 23.222 0h.003z'
    },
    { 
        id: 'instagram', 
        url: 'https://instagram.com', 
        label: 'Instagram',
        icon: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.336 1.347 20.667.935 19.879.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 5.838a6.162 6.162 0 1 1 0 12.324 6.162 6.162 0 0 1 0-12.324zm0 10.162a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm6.406-11.845a1.44 1.44 0 1 1 0 2.881 1.44 1.44 0 0 1 0-2.881z'
    }
];

export const ABOUT_CONTENT = {
    en: {
        title: "Built in Vietnam. Trusted Across Southeast Asia.",
        subtitle: "Founded in 2020 by a team of engineers who spent a decade solving real operational problems inside Vietnamese enterprises — before building the tools they wished they had.",
        sections: [
            {
                heading: "Who We Are",
                text: "SGS GROUP is an AI engineering company headquartered in Ho Chi Minh City. We build custom automation, data analytics, and AI systems for mid-to-large enterprises across Vietnam, Thailand, Indonesia, and Singapore. Our 40+ engineers have delivered over 200 projects since 2020 — every engagement starts with a free technical audit and ends with measurable ROI."
            },
            {
                heading: "Our Commitment",
                text: "We do not sell promises. Every project comes with a signed SLA, a pilot phase on real data before full deployment, and a 12-month support contract with 24/7 P1 response. If our pilot does not show measurable improvement within 6 weeks, you pay nothing."
            },
            {
                heading: "What We Stand For",
                items: ["Results, not decks", "Fixed-scope pilots before commitment", "Vietnamese engineers, local expertise", "Compliance with Cybersecurity Law 24/2018"]
            }
        ],
        stats: [
            { value: "200+", label: "Projects delivered since 2020" },
            { value: "40+", label: "Engineers on staff" },
            { value: "4.9/5", label: "Average client satisfaction" }
        ]
    },
    vi: {
        title: "Xây Dựng Tại Việt Nam. Được Tin Dùng Khắp Đông Nam Á.",
        subtitle: "Thành lập năm 2020 bởi những kỹ sư đã dành một thập kỷ giải quyết bài toán vận hành thực tế trong các doanh nghiệp Việt — trước khi xây dựng những công cụ họ từng ước có.",
        sections: [
            {
                heading: "Chúng Tôi Là Ai",
                text: "SGS GROUP là công ty kỹ thuật AI có trụ sở tại TP.HCM. Chúng tôi xây dựng hệ thống tự động hóa, phân tích dữ liệu và AI tùy chỉnh cho doanh nghiệp vừa và lớn tại Việt Nam, Thái Lan, Indonesia và Singapore. Đội ngũ 40+ kỹ sư đã thực hiện hơn 200 dự án từ năm 2020 — mỗi hợp đồng bắt đầu bằng kiểm tra kỹ thuật miễn phí và kết thúc bằng ROI đo được."
            },
            {
                heading: "Cam Kết Của Chúng Tôi",
                text: "Chúng tôi không bán lời hứa. Mỗi dự án đi kèm SLA ký kết, giai đoạn pilot trên dữ liệu thực trước khi triển khai toàn diện, và hợp đồng hỗ trợ 12 tháng với phản hồi P1 24/7. Nếu pilot không cho thấy cải thiện đo được trong 6 tuần, bạn không phải trả tiền."
            },
            {
                heading: "Chúng Tôi Đại Diện Cho",
                items: ["Kết quả, không phải slide", "Pilot có phạm vi cố định trước cam kết", "Kỹ sư Việt Nam, chuyên môn địa phương", "Tuân thủ Luật An Ninh Mạng 24/2018"]
            }
        ],
        stats: [
            { value: "200+", label: "Dự án hoàn thành từ 2020" },
            { value: "40+", label: "Kỹ sư trong đội ngũ" },
            { value: "4.9/5", label: "Mức độ hài lòng trung bình" }
        ]
    }
};

export const CONTACT_CONTENT = {
    en: {
        title: "Get In Touch",
        subtitle: "Ready to transform your business? Our team is here to help.",
        connectNodeId: "CONNECT_NODE_ID_883",
        responseTime: "We respond to all enquiries within 1 business day (Mon–Fri, 9 AM–6 PM GMT+7)",
        registrationNote: "Sai Gon Sun Co., Ltd — Business Reg. No. 0312960439 — Issued by HCM City Dept. of Planning & Investment",
        info: [
            { 
                label: "Address", 
                value: "122 -124 B2, Sala Urban Area, Thu Duc City, HCMC",
                icon: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" 
            },
            { 
                label: "Email", 
                value: "info@sgsgroup.vn",
                icon: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" 
            },
            { 
                label: "Phone", 
                value: "(+84)9 7113 2378",
                icon: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" 
            },
            { 
                label: "Hours", 
                value: "Mon-Fri: 9:00 AM - 6:00 PM (GMT+7)",
                icon: "M11.99 2C6.47 2 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" 
            }
        ]
    },
    vi: {
        title: "Liên Hệ Với Chúng Tôi",
        subtitle: "Sẵn sàng chuyển đổi doanh nghiệp của bạn? Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ.",
        connectNodeId: "MÃ_KẾT_NỐI_NÚT_883",
        responseTime: "Chúng tôi phản hồi mọi liên hệ trong vòng 1 ngày làm việc (Thứ 2–6, 9:00–18:00 GMT+7)",
        registrationNote: "Công ty TNHH Sai Gon Sun — MST: 0312960439 — Cấp bởi Sở KH&ĐT TP.HCM",
        info: [
            { 
                label: "Địa chỉ", 
                value: "122 -124 B2, Khu đô thị Sala, Thủ Đức, HCM",
                icon: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" 
            },
            { 
                label: "Email", 
                value: "info@sgsgroup.vn",
                icon: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" 
            },
            { 
                label: "Điện thoại", 
                value: "(+84)9 7113 2378",
                icon: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" 
            },
            { 
                label: "Giờ làm việc", 
                value: "Thứ 2 - Thứ 6: 9:00 - 18:00",
                icon: "M11.99 2C6.47 2 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" 
            }
        ]
    }
};

export const LEGAL_CONTENT = {
    privacy: {
        en: {
            title: "Data Privacy & Protection Policy",
            updated: "Effective Date: June 20, 2024",
            sections: [
                {
                    heading: "1. Institutional Commitment",
                    content: "SGS GROUP ('we', 'us', or 'our') is fundamentally committed to safeguarding the privacy and digital sovereignty of our partners, clients, and users. This comprehensive policy outlines our protocols for data collection, encryption, processing, and erasure in compliance with international standards and Vietnamese Law on Cybersecurity (No. 24/2018/QH14)."
                },
                {
                    heading: "2. Information Collection Protocol",
                    content: "We collect identifiable information only when explicitly provided by you via secure channels (e.g., 'Contact Us' forms, AI Hub interactions). This includes: Full Name, Official Email Address, and Contact Number. Passive collection involves anonymized telemetry data (IP address, device fingerprint, browser version) strictly for system optimization and security monitoring."
                },
                {
                    heading: "3. Artificial Intelligence & Data Processing",
                    content: "Our services leverage advanced Generative AI models (including Google Gemini). By utilizing the AI Hub, you acknowledge that input data may be processed by third-party neural networks to generate responses. SGS GROUP employs strict data sanitization layers to prevent leakage of Personally Identifiable Information (PII). DO NOT input sensitive financial data, passwords, or classified trade secrets into the public AI interface."
                },
                {
                    heading: "4. Purpose of Utilization",
                    content: "Collected data is utilized solely for: (a) Service delivery and account management; (b) AI model fine-tuning (anonymized); (c) Legal compliance and fraud prevention; (d) Communication regarding critical system updates. We strictly prohibit the sale of user data to third-party advertisers."
                },
                {
                    heading: "5. Security Infrastructure",
                    content: "Data at rest and in transit is protected using AES-256 military-grade encryption. Our servers are located in secure facilities with 24/7 physical and digital surveillance. We conduct regular penetration testing to identify and patch vulnerabilities."
                },
                {
                    heading: "6. User Sovereignty & Rights",
                    content: "You retain full ownership of your personal data. You have the right to request access, rectification, or permanent deletion of your records from our databases. All requests should be directed to our Data Protection Officer at info@sgsgroup.vn. We will respond within 72 hours."
                }
            ]
        },
        vi: {
            title: "Chính Sách Bảo Mật Dữ Liệu",
            updated: "Ngày hiệu lực: 20/06/2024",
            sections: [
                {
                    heading: "1. Cam Kết Tổ Chức",
                    content: "SGS GROUP ('chúng tôi') cam kết bảo vệ quyền riêng tư và chủ quyền kỹ thuật số của đối tác, khách hàng và người dùng. Chính sách toàn diện này phác thảo các giao thức thu thập, mã hóa, xử lý và xóa dữ liệu tuân thủ các tiêu chuẩn quốc tế và Luật An ninh mạng Việt Nam (Số 24/2018/QH14)."
                },
                {
                    heading: "2. Giao Thức Thu Thập Thông Tin",
                    content: "Chúng tôi chỉ thu thập thông tin định danh khi được bạn cung cấp rõ ràng qua các kênh an toàn (ví dụ: biểu mẫu 'Liên hệ', tương tác AI Hub). Bao gồm: Họ tên, Email chính thức và Số điện thoại. Thu thập thụ động bao gồm dữ liệu đo lường từ xa ẩn danh (địa chỉ IP, dấu vân tay thiết bị, phiên bản trình duyệt) nghiêm ngặt cho mục đích tối ưu hóa hệ thống và giám sát bảo mật."
                },
                {
                    heading: "3. Trí Tuệ Nhân Tạo & Xử Lý Dữ Liệu",
                    content: "Dịch vụ của chúng tôi tận dụng các mô hình AI Tạo sinh tiên tiến (bao gồm Google Gemini). Bằng việc sử dụng AI Hub, bạn thừa nhận rằng dữ liệu đầu vào có thể được xử lý bởi mạng nơ-ron của bên thứ ba để tạo phản hồi. SGS GROUP áp dụng các lớp làm sạch dữ liệu nghiêm ngặt để ngăn chặn rò rỉ Thông tin Định danh Cá nhân (PII). KHÔNG nhập dữ liệu tài chính nhạy cảm, mật khẩu hoặc bí mật thương mại vào giao diện AI công cộng."
                },
                {
                    heading: "4. Mục Đích Sử Dụng",
                    content: "Dữ liệu thu thập chỉ được sử dụng cho: (a) Cung cấp dịch vụ và quản lý tài khoản; (b) Tinh chỉnh mô hình AI (ẩn danh); (c) Tuân thủ pháp luật và ngăn chặn gian lận; (d) Thông báo về các cập nhật hệ thống quan trọng. Chúng tôi nghiêm cấm việc bán dữ liệu người dùng cho các nhà quảng cáo bên thứ ba."
                },
                {
                    heading: "5. Cơ Sở Hạ Tầng Bảo Mật",
                    content: "Dữ liệu lưu trữ và truyền tải được bảo vệ bằng mã hóa cấp quân sự AES-256. Máy chủ của chúng tôi được đặt tại các cơ sở an toàn với sự giám sát vật lý và kỹ thuật số 24/7. Chúng tôi thực hiện kiểm tra thâm nhập thường xuyên để xác định và vá các lỗ hổng."
                },
                {
                    heading: "6. Quyền Chủ Quyền Người Dùng",
                    content: "Bạn giữ toàn quyền sở hữu đối với dữ liệu cá nhân của mình. Bạn có quyền yêu cầu truy cập, chỉnh sửa hoặc xóa vĩnh viễn hồ sơ của mình khỏi cơ sở dữ liệu của chúng tôi. Mọi yêu cầu vui lòng gửi đến Cán bộ Bảo vệ Dữ liệu tại info@sgsgroup.vn. Chúng tôi sẽ phản hồi trong vòng 72 giờ."
                }
            ]
        }
    },
    terms: {
        en: {
            title: "Terms of Service & Usage Agreement",
            updated: "Effective Date: June 20, 2024",
            sections: [
                {
                    heading: "1. Acceptance of Protocol",
                    content: "By accessing SGS GROUP's digital ecosystem, website, or AI services, you constitute a binding legal agreement to these Terms. If you represent an entity, you verify that you have the authority to bind that entity. Disagreement with any clause necessitates immediate discontinuation of service use."
                },
                {
                    heading: "2. Nature of AI Services & Limitation",
                    content: "Our AI Hub utilizes probabilistic generative models. While engineered for precision, AI can produce 'hallucinations' (factually incorrect or biased outputs). SGS GROUP makes NO WARRANTIES, express or implied, regarding the accuracy, reliability, or suitability of AI-generated content for critical decision-making (medical, legal, financial). Users must independently verify all AI outputs."
                },
                {
                    heading: "3. Intellectual Property Rights",
                    content: "All architecture, source code, 3D assets, branding, and proprietary algorithms on this platform are the exclusive intellectual property of SGS GROUP. Users retain rights to their specific input data but grant SGS GROUP a worldwide, royalty-free license to process said data for service delivery. Unauthorized scraping, reverse engineering, or redistribution of our assets is a violation of copyright law."
                },
                {
                    heading: "4. Prohibited Conduct",
                    content: "You agree strictly NOT to: (a) Use the service for illegal activities, hate speech generation, or harassment; (b) Attempt to breach our security firewalls or encryption; (c) Launch Denial of Service (DoS) attacks; (d) Automate interactions without API authorization. Violation results in immediate IP bans and potential legal action."
                },
                {
                    heading: "5. Limitation of Liability",
                    content: "TO THE MAXIMUM EXTENT PERMITTED BY LAW, SGS GROUP SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES (INCLUDING LOSS OF DATA, REVENUE, OR PROFIT) ARISING FROM YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU, IF ANY, FOR ACCESSING THE SERVICE."
                },
                {
                    heading: "6. Governing Law & Dispute Resolution",
                    content: "These Terms are governed by the laws of the Socialist Republic of Vietnam. Any dispute arising from these terms that cannot be resolved through amicable negotiation (within 30 days) shall be submitted to the competent People's Court in Ho Chi Minh City, Vietnam. Official legal correspondence must be sent to info@sgsgroup.vn."
                }
            ]
        },
        vi: {
            title: "Điều Khoản Dịch Vụ & Thỏa Thuận Sử Dụng",
            updated: "Ngày hiệu lực: 20/06/2024",
            sections: [
                {
                    heading: "1. Chấp Nhận Giao Thức",
                    content: "Bằng việc truy cập vào hệ sinh thái kỹ thuật số, trang web hoặc dịch vụ AI của SGS GROUP, bạn xác lập một thỏa thuận pháp lý ràng buộc với các Điều khoản này. Nếu bạn đại diện cho một tổ chức, bạn xác nhận rằng bạn có thẩm quyền để ràng buộc tổ chức đó. Việc không đồng ý với bất kỳ điều khoản nào đòi hỏi việc ngưng sử dụng dịch vụ ngay lập tức."
                },
                {
                    heading: "2. Bản Chất Dịch Vụ AI & Giới Hạn",
                    content: "AI Hub của chúng tôi sử dụng các mô hình tạo sinh xác suất. Mặc dù được thiết kế cho sự chính xác, AI có thể tạo ra 'ảo giác' (thông tin sai lệch hoặc thiên kiến). SGS GROUP KHÔNG BẢO ĐẢM, rõ ràng hay ngụ ý, về tính chính xác, độ tin cậy hoặc sự phù hợp của nội dung do AI tạo ra cho các quyết định quan trọng (y tế, pháp lý, tài chính). Người dùng phải xác minh độc lập mọi đầu ra của AI."
                },
                {
                    heading: "3. Quyền Sở Hữu Trí Tuệ",
                    content: "Mọi kiến trúc, mã nguồn, tài sản 3D, thương hiệu và thuật toán độc quyền trên nền tảng này là tài sản trí tuệ độc quyền của SGS GROUP. Người dùng giữ quyền đối với dữ liệu đầu vào cụ thể của họ nhưng cấp cho SGS GROUP giấy phép toàn cầu, miễn phí bản quyền để xử lý dữ liệu đó nhằm cung cấp dịch vụ. Việc sao chép, kỹ thuật đảo ngược hoặc phân phối lại tài sản của chúng tôi khi chưa được phép là vi phạm luật bản quyền."
                },
                {
                    heading: "4. Hành Vi Bị Cấm",
                    content: "Bạn đồng ý nghiêm túc KHÔNG: (a) Sử dụng dịch vụ cho các hoạt động bất hợp pháp, tạo ngôn từ kích động thù địch hoặc quấy rối; (b) Cố gắng xâm phạm tường lửa bảo mật hoặc mã hóa của chúng tôi; (c) Thực hiện tấn công Từ chối Dịch vụ (DoS); (d) Tự động hóa tương tác mà không có sự cho phép qua API. Vi phạm sẽ dẫn đến việc cấm IP ngay lập tức và các hành động pháp lý tiềm năng."
                },
                {
                    heading: "5. Giới Hạn Trách Nhiệm",
                    content: "TRONG PHẠM VI TỐI ĐA MÀ PHÁP LUẬT CHO PHÉP, SGS GROUP SẼ KHÔNG CHỊU TRÁCH NHIỆM VỀ BẤT KỲ THIỆT HẠI GIÁN TIẾP, NGẪU NHIÊN, TRỪNG PHẠT HOẶC HẬU QUẢ NÀO (BAO GỒM MẤT DỮ LIỆU, DOANH THU HOẶC LỢI NHUẬN) PHÁT SINH TỪ VIỆC BẠN SỬ DỤNG DỊCH VỤ. TỔNG TRÁCH NHIỆM CỦA CHÚNG TÔI SẼ KHÔNG VƯỢT QUÁ SỐ TIỀN BẠN ĐÃ TRẢ, NẾU CÓ, ĐỂ TRUY CẬP DỊCH VỤ."
                },
                {
                    heading: "6. Luật Áp Dụng & Giải Quyết Tranh Chấp",
                    content: "Các Điều khoản này được điều chỉnh bởi luật pháp nước Cộng hòa Xã hội Chủ nghĩa Việt Nam. Mọi tranh chấp phát sinh từ các điều khoản này mà không thể giải quyết thông qua thương lượng hòa giải (trong vòng 30 ngày) sẽ được đưa ra Tòa án Nhân dân có thẩm quyền tại Thành phố Hồ Chí Minh, Việt Nam. Thư từ pháp lý chính thức phải được gửi đến info@sgsgroup.vn."
                }
            ]
        }
    }
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'data-analytics',
    titleEn: 'Data Analytics',
    titleVi: 'Phân Tích Dữ Liệu',
    descEn: 'ML-powered analytics processing 50M+ data points daily for retail, finance & logistics.',
    descVi: 'Phân tích dữ liệu ML xử lý 50M+ điểm dữ liệu/ngày cho bán lẻ, tài chính & logistics.',
    icon: 'M3 13.125C3 12.5037 3.50368 12 4.125 12h2.25c.62132 0 1.125.5037 1.125 1.125v6.75C7.5 20.4963 6.99632 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.62132.5037-1.125 1.125-1.125h2.25c.6213 0 1.125.5037 1.125 1.125v11.25c0 .6213-.5037 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.62132.5037-1.125 1.125-1.125h2.25C20.4963 3 21 3.50368 21 4.125v15.75c0 .6213-.5037 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z',
    deployTimeEn: "2–4 weeks to first insights",
    deployTimeVi: "2–4 tuần đến kết quả đầu tiên",
    techStack: ["Python", "TensorFlow", "Apache Spark", "dbt", "PostgreSQL", "Grafana"],
    longDescEn: "SGS Data Analytics connects to your existing data sources — MySQL, PostgreSQL, MongoDB, Google Sheets, or Vietnamese ERP systems — and deploys ML models trained specifically on Southeast Asian market patterns. Clients across retail, logistics, and banking typically see their first measurable insights within 2 weeks. Our platform has processed over 50M data points daily across 30+ production deployments in Vietnam and the region.",
    longDescVi: "SGS Data Analytics kết nối với nguồn dữ liệu hiện tại của bạn — MySQL, PostgreSQL, MongoDB, Google Sheets hay hệ thống ERP Việt Nam — và triển khai các mô hình ML được huấn luyện riêng cho thị trường Đông Nam Á. Khách hàng trong bán lẻ, logistics và ngân hàng thường thấy kết quả đo lường đầu tiên trong vòng 2 tuần. Nền tảng của chúng tôi đã xử lý hơn 50M điểm dữ liệu mỗi ngày trên 30+ triển khai production tại Việt Nam và khu vực.",
    featuresEn: [
      "Real-time Predictive Modeling (demand, churn, fraud)",
      "Customer Behavior Segmentation & Cohort Analysis",
      "Interactive Dashboard — 50+ chart types, mobile-ready",
      "Automated Alerts & Scheduled Report Delivery"
    ],
    featuresVi: [
      "Mô hình dự báo thời gian thực (nhu cầu, rời bỏ, gian lận)",
      "Phân khúc hành vi khách hàng & phân tích cohort",
      "Dashboard tương tác — 50+ loại biểu đồ, tương thích mobile",
      "Cảnh báo tự động & gửi báo cáo theo lịch"
    ],
    benefitsEn: [
      "First dashboard live within 14 days — guaranteed or free extension",
      "Avg. 40% improvement in demand forecast accuracy (measured across 12 retail clients in 2024)",
      "Supports all major Vietnamese ERP systems (MISA, AMIS, Fast Accounting)",
      "Reporting cycle reduced from weekly manual exports to real-time for 8+ clients"
    ],
    benefitsVi: [
      "Dashboard đầu tiên hoạt động trong 14 ngày — cam kết hoặc gia hạn miễn phí",
      "Trung bình 40% cải thiện độ chính xác dự báo nhu cầu (đo lường trên 12 khách hàng bán lẻ năm 2024)",
      "Hỗ trợ toàn bộ ERP phổ biến tại Việt Nam (MISA, AMIS, Fast Accounting)",
      "Chu kỳ báo cáo từ xuất thủ công hàng tuần xuống thời gian thực cho 8+ khách hàng"
    ],
    useCases: [
        {
            titleEn: "Retail Chain: Demand Forecasting",
            titleVi: "Chuỗi Bán Lẻ: Dự Báo Nhu Cầu",
            descEn: "A 200-store retailer in Vietnam reduced stockouts by 38% and overstock by 22% using our ML demand model trained on 3 years of POS data.",
            descVi: "Một chuỗi 200 cửa hàng tại Việt Nam giảm hết hàng 38% và tồn kho dư 22% bằng mô hình ML được huấn luyện trên 3 năm dữ liệu POS.",
            stat: "38%",
            statLabelEn: "Stockout Reduction",
            statLabelVi: "Giảm Hết Hàng"
        },
        {
            titleEn: "Banking: Real-time Fraud Detection",
            titleVi: "Ngân Hàng: Phát Hiện Gian Lận",
            descEn: "Transaction scoring model deployed at a regional bank flags 96.3% of fraudulent transactions under 8ms — with a false-positive rate below 0.3%.",
            descVi: "Mô hình chấm điểm giao dịch tại một ngân hàng khu vực phát hiện 96.3% giao dịch gian lận trong dưới 8ms — tỷ lệ nhận diện sai dưới 0.3%.",
            stat: "<8ms",
            statLabelEn: "Detection Speed",
            statLabelVi: "Tốc Độ Phát Hiện"
        }
    ],
    roiConfig: {
        inputALabelEn: "Employees Using Data Tools",
        inputALabelVi: "Nhân viên sử dụng công cụ dữ liệu",
        inputAUnit: "ppl",
        inputAMax: 100,
        inputAStep: 1,
        inputADefault: 10,

        inputBLabelEn: "Avg. Hours Saved / Week",
        inputBLabelVi: "Giờ tiết kiệm trung bình / tuần",
        inputBUnit: "hrs",
        inputBMax: 20,
        inputBStep: 0.5,
        inputBDefault: 5,

        efficiencyFactor: 25,
        currency: "$",
        badgeLabelEn: "~$65K Annual Savings (10 staff × 5 hrs × $25)",
        badgeLabelVi: "~$65K Tiết Kiệm / Năm (10 người × 5 giờ × $25)"
    }
  },
  {
    id: 'automation',
    titleEn: 'Automation',
    titleVi: 'Tự Động Hóa',
    descEn: 'RPA bots digitizing 3,000+ enterprise workflows — avg. 78% time reduction in 90 days.',
    descVi: 'RPA bots số hóa 3.000+ quy trình doanh nghiệp — trung bình 78% giảm thời gian trong 90 ngày.',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z',
    deployTimeEn: "4–6 weeks to full deployment",
    deployTimeVi: "4–6 tuần đến triển khai đầy đủ",
    techStack: ["UiPath", "Python", "Tesseract OCR", "Apache Airflow", "Node.js", "REST APIs"],
    longDescEn: "SGS Automation has digitized over 3,000 manual workflows for enterprises across banking, manufacturing, and logistics in Vietnam and Southeast Asia. Our RPA bots handle invoice processing, KYC verification, and supply chain reporting — operating 24/7 and reducing manual processing time by an average of 78% within the first 90 days. We do not simply deploy off-the-shelf tools: every automation is built and tested against your actual processes before going live.",
    longDescVi: "SGS Automation đã số hóa hơn 3.000 quy trình thủ công cho các doanh nghiệp trong ngân hàng, sản xuất và logistics tại Việt Nam và Đông Nam Á. Các bot RPA của chúng tôi xử lý hóa đơn, xác minh KYC và báo cáo chuỗi cung ứng — hoạt động 24/7 và giảm thời gian xử lý thủ công trung bình 78% trong 90 ngày đầu. Chúng tôi không chỉ triển khai công cụ sẵn có: mỗi quy trình tự động hóa được xây dựng và kiểm thử trên quy trình thực tế của bạn trước khi đưa vào hoạt động.",
    featuresEn: [
      "End-to-end Workflow Orchestration & Scheduling",
      "Smart Document Processing — OCR for Vietnamese invoices & contracts",
      "Adaptive Bot Scaling — handles 10x load spikes without reconfiguration",
      "Legacy System Integration — connects SAP, MISA, ERP via APIs or screen automation"
    ],
    featuresVi: [
      "Điều phối & lập lịch quy trình đầu-cuối",
      "Xử lý tài liệu thông minh — OCR hóa đơn & hợp đồng tiếng Việt",
      "Bot tự động mở rộng — xử lý tải tăng 10x mà không cần cấu hình lại",
      "Tích hợp hệ thống cũ — kết nối SAP, MISA, ERP qua API hoặc screen automation"
    ],
    benefitsEn: [
      "Avg. 78% reduction in document processing time — measured across 15 enterprise deployments in 2024",
      "99.7% data entry accuracy vs. ~92% industry average for manual input",
      "Full ROI typically achieved within 4–6 months based on client history",
      "No disruption to current systems — bots run alongside existing software"
    ],
    benefitsVi: [
      "Trung bình 78% giảm thời gian xử lý tài liệu — đo trên 15 triển khai doanh nghiệp năm 2024",
      "Độ chính xác nhập liệu 99.7% so với ~92% trung bình thủ công",
      "ROI đầy đủ thường đạt được trong 4–6 tháng dựa trên lịch sử khách hàng",
      "Không làm gián đoạn hệ thống hiện tại — bot chạy song song phần mềm đang dùng"
    ],
    useCases: [
        {
            titleEn: "Manufacturing: Invoice Processing",
            titleVi: "Sản Xuất: Xử Lý Hóa Đơn",
            descEn: "A factory group in Bình Dương reduced invoice processing from 3 staff × 8 hours/day to a single bot completing the same volume in under 45 minutes.",
            descVi: "Một tập đoàn nhà máy tại Bình Dương giảm xử lý hóa đơn từ 3 nhân viên × 8 giờ/ngày xuống còn một bot hoàn thành cùng khối lượng trong dưới 45 phút.",
            stat: "89%",
            statLabelEn: "Time Saved",
            statLabelVi: "Tiết Kiệm TG"
        },
        {
            titleEn: "Banking: KYC Onboarding Bot",
            titleVi: "Ngân Hàng: Bot KYC Onboarding",
            descEn: "Digital bank in Ho Chi Minh City automated ID verification and account creation — cutting onboarding from 2 days to 4 hours with 100% audit trail.",
            descVi: "Ngân hàng số tại TP.HCM tự động hóa xác minh CCCD và tạo tài khoản — rút ngắn onboarding từ 2 ngày xuống 4 giờ với lịch sử kiểm toán đầy đủ.",
            stat: "2 days → 4hr",
            statLabelEn: "Onboarding Time",
            statLabelVi: "Thời Gian"
        }
    ],
    roiConfig: {
        inputALabelEn: "Manual Tasks / Month",
        inputALabelVi: "Tác vụ thủ công / tháng",
        inputAUnit: "tasks",
        inputAMax: 5000,
        inputAStep: 100,
        inputADefault: 1000,

        inputBLabelEn: "Cost per Manual Task ($)",
        inputBLabelVi: "Chi phí mỗi tác vụ ($)",
        inputBUnit: "$",
        inputBMax: 20,
        inputBStep: 0.5,
        inputBDefault: 5,

        efficiencyFactor: 0.7,
        currency: "$",
        badgeLabelEn: "70% Cost Reduction per Task",
        badgeLabelVi: "Giảm 70% Chi Phí Mỗi Tác Vụ"
    }
  },
  {
    id: 'ai-tech',
    titleEn: 'AI Technology',
    titleVi: 'Công Nghệ AI',
    descEn: '45+ custom AI systems deployed — multilingual LLMs, computer vision & recommendation engines for SEA.',
    descVi: '45+ hệ thống AI tùy chỉnh — LLM đa ngôn ngữ, thị giác máy tính & recommendation engines cho Đông Nam Á.',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 18c-3.31 0-6-2.69-6-6 0-1.2.35-2.32.94-3.27C7.3 8.5 7.68 8.4 8.05 8.46c.38.07.69.34.8.71.16.53.64.91 1.2.91.56 0 1.04-.38 1.2-.91.11-.37.42-.64.8-.71.37-.06.75.04 1.01.27.59.95.94 2.07.94 3.27 0 3.31-2.69 6-6 6zm0-14c-4.42 0-8 3.58-8 8 0 1.84.62 3.54 1.67 4.9.44.57 1.24.63 1.76.15.54-.49.57-1.33.09-1.86C6.71 14.19 6.25 13.14 6.25 12c0-3.18 2.57-5.75 5.75-5.75s5.75 2.57 5.75 5.75c0 1.14-.46 2.19-1.27 3.19-.48.53-.45 1.37.09 1.86.52.48 1.32.42 1.76-.15C19.38 15.54 20 13.84 20 12c0-4.42-3.58-8-8-8z',
    deployTimeEn: "6–10 weeks for custom model",
    deployTimeVi: "6–10 tuần cho mô hình tùy chỉnh",
    techStack: ["Python", "PyTorch", "LangChain", "HuggingFace", "FastAPI", "OpenCV"],
    longDescEn: "SGS AI Core builds production-grade AI systems tailored to Vietnamese and Southeast Asian market needs. We have deployed 45+ custom AI solutions — from multilingual customer support chatbots handling 10,000+ daily queries in Vietnamese, English, and Thai, to computer vision systems detecting manufacturing defects at 60fps on the assembly line. All models are available for on-premises deployment for data-sensitive industries such as banking and healthcare.",
    longDescVi: "SGS AI Core xây dựng các hệ thống AI cấp production được điều chỉnh cho nhu cầu thị trường Việt Nam và Đông Nam Á. Chúng tôi đã triển khai 45+ giải pháp AI tùy chỉnh — từ chatbot hỗ trợ khách hàng đa ngôn ngữ xử lý 10.000+ truy vấn/ngày bằng tiếng Việt, Anh và Thái, đến hệ thống thị giác máy tính phát hiện lỗi sản xuất tốc độ 60fps trên dây chuyền lắp ráp. Tất cả mô hình đều có thể triển khai on-premises cho các ngành nhạy cảm về dữ liệu như ngân hàng và y tế.",
    featuresEn: [
      "Custom Fine-tuned LLMs on Vietnamese & domain-specific data",
      "Computer Vision — defect detection, OCR, facial recognition",
      "Natural Language Understanding with multilingual support (VI/EN/TH/ID)",
      "On-premises & Private Cloud deployment for data-sensitive clients"
    ],
    featuresVi: [
      "Tinh chỉnh LLM trên dữ liệu tiếng Việt & theo lĩnh vực cụ thể",
      "Thị giác máy tính — phát hiện lỗi, OCR, nhận diện khuôn mặt",
      "Hiểu ngôn ngữ tự nhiên đa ngôn ngữ (VI/EN/TH/ID)",
      "Triển khai on-premises & private cloud cho khách hàng nhạy cảm dữ liệu"
    ],
    benefitsEn: [
      "Custom Vietnamese-language models outperform generic APIs by 23% on domain tasks (internal benchmark 2024)",
      "On-premises deployment: your data never leaves your infrastructure — critical for banking & healthcare",
      "Avg. CSAT improvement from 3.6 → 4.5 within 6 months for clients deploying AI customer support",
      "Deployed across banking, retail, healthcare, and manufacturing in 6 SEA countries"
    ],
    benefitsVi: [
      "Mô hình tiếng Việt tùy chỉnh vượt trội API thông thường 23% trong tác vụ chuyên ngành (benchmark nội bộ 2024)",
      "Triển khai on-premises: dữ liệu không bao giờ rời khỏi hạ tầng của bạn — quan trọng cho ngân hàng & y tế",
      "Trung bình CSAT tăng từ 3.6 → 4.5 trong 6 tháng cho khách hàng triển khai AI hỗ trợ",
      "Đã triển khai trong ngân hàng, bán lẻ, y tế và sản xuất tại 6 quốc gia Đông Nam Á"
    ],
    useCases: [
        {
            titleEn: "FinTech: Multilingual Support Bot",
            titleVi: "FinTech: Bot Hỗ Trợ Đa Ngôn Ngữ",
            descEn: "A digital bank serving Vietnam and Thailand deployed our custom LLM chatbot — handling 12,000 daily queries across 2 languages, resolving 72% without human escalation.",
            descVi: "Một ngân hàng số phục vụ Việt Nam và Thái Lan triển khai chatbot LLM tùy chỉnh — xử lý 12.000 truy vấn/ngày bằng 2 ngôn ngữ, giải quyết 72% không cần chuyển người.",
            stat: "72%",
            statLabelEn: "Auto-Resolution",
            statLabelVi: "Tự Giải Quyết"
        },
        {
            titleEn: "Manufacturing: Vision QC System",
            titleVi: "Sản Xuất: Hệ Thống Kiểm Tra Chất Lượng",
            descEn: "Electronics manufacturer in Hanoi replaced 12 manual QC inspectors with our computer vision system — defect detection accuracy 98.7% at 60fps.",
            descVi: "Nhà sản xuất điện tử tại Hà Nội thay thế 12 kiểm tra viên thủ công bằng hệ thống thị giác máy tính — độ chính xác 98.7% tốc độ 60fps.",
            stat: "98.7%",
            statLabelEn: "Detection Accuracy",
            statLabelVi: "Độ Chính Xác"
        }
    ],
    roiConfig: {
        inputALabelEn: "Customer Queries / Month",
        inputALabelVi: "Câu hỏi khách hàng / tháng",
        inputAUnit: "req",
        inputAMax: 50000,
        inputAStep: 500,
        inputADefault: 5000,

        inputBLabelEn: "Avg. Cost per Human Resolution ($)",
        inputBLabelVi: "Chi phí xử lý / yêu cầu ($)",
        inputBUnit: "$",
        inputBMax: 20,
        inputBStep: 0.5,
        inputBDefault: 4,

        efficiencyFactor: 0.6,
        currency: "$",
        badgeLabelEn: "60% Queries Auto-Resolved by AI",
        badgeLabelVi: "60% Truy Vấn Được AI Giải Quyết Tự Động"
    }
  },
  {
    id: 'cloud-computing',
    titleEn: 'Cloud Computing',
    titleVi: 'Điện Toán Đám Mây',
    descEn: '500+ production environments managed — SOC 2 Type II compliant, 99.98% uptime across all clients.',
    descVi: '500+ môi trường production được quản lý — tuân thủ SOC 2 Type II, 99.98% uptime trên toàn bộ khách hàng.',
    icon: 'M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z',
    deployTimeEn: "6-week structured migration",
    deployTimeVi: "Migration có cấu trúc 6 tuần",
    techStack: ["AWS", "Google Cloud", "Azure", "Kubernetes", "Terraform", "Prometheus"],
    longDescEn: "SGS Cloud manages 500+ production environments across AWS, Google Cloud, and Azure for companies in Vietnam and Southeast Asia. Our team maintains SOC 2 Type II compliance for all managed workloads, with 99.98% uptime achieved across all client environments over the past 24 months. On-premise to cloud migrations are executed through a structured 6-week program — with zero downtime for critical systems — and typically reduce cloud spending by 34% through right-sizing and cost governance.",
    longDescVi: "SGS Cloud quản lý 500+ môi trường production trên AWS, Google Cloud và Azure cho các công ty tại Việt Nam và Đông Nam Á. Đội ngũ của chúng tôi duy trì tuân thủ SOC 2 Type II cho toàn bộ workload được quản lý, với 99.98% uptime đạt được trên tất cả môi trường khách hàng trong 24 tháng qua. Migration từ on-premise lên cloud được thực hiện qua chương trình 6 tuần có cấu trúc — không có thời gian chết cho hệ thống quan trọng — và thường giảm chi phí cloud 34% thông qua right-sizing và quản trị chi phí.",
    featuresEn: [
      "Multi-cloud Orchestration — AWS, GCP, Azure, Viettel Cloud",
      "Serverless AI Inference with auto-scaling GPU clusters",
      "SOC 2 Type II & ISO 27001 certified security operations",
      "Kubernetes-native deployment with GitOps (ArgoCD)"
    ],
    featuresVi: [
      "Điều phối đa cloud — AWS, GCP, Azure, Viettel Cloud",
      "AI Inference serverless với cụm GPU tự động mở rộng",
      "Vận hành bảo mật được chứng nhận SOC 2 Type II & ISO 27001",
      "Triển khai Kubernetes-native với GitOps (ArgoCD)"
    ],
    benefitsEn: [
      "99.98% uptime SLA — backed by financial penalty clause, not just a marketing claim",
      "Avg. 34% reduction in cloud bill vs. unoptimized setups, measured across 20+ migrations",
      "SOC 2 Type II & ISO 27001 certified — required for banking, insurance, and healthcare clients",
      "Dedicated SRE on-call — 15-minute response guarantee for P1 incidents"
    ],
    benefitsVi: [
      "SLA 99.98% uptime — được bảo đảm bằng điều khoản phạt tài chính, không chỉ là cam kết marketing",
      "Trung bình giảm 34% hóa đơn cloud so với cấu hình chưa tối ưu, đo trên 20+ migration",
      "Chứng nhận SOC 2 Type II & ISO 27001 — yêu cầu bắt buộc cho khách hàng ngân hàng, bảo hiểm và y tế",
      "SRE trực on-call chuyên biệt — cam kết phản hồi 15 phút cho sự cố P1"
    ],
    useCases: [
        {
            titleEn: "E-commerce: Zero-Downtime Migration",
            titleVi: "Thương Mại Điện Tử: Migration Không Gián Đoạn",
            descEn: "A top-5 Vietnamese e-commerce platform migrated 200+ services from on-premise to AWS in 6 weeks — zero downtime, 41% cost reduction in month 1.",
            descVi: "Một sàn thương mại điện tử top 5 Việt Nam đã migration 200+ services từ on-premise lên AWS trong 6 tuần — không gián đoạn, giảm 41% chi phí trong tháng đầu.",
            stat: "41%",
            statLabelEn: "Cost Reduction",
            statLabelVi: "Giảm Chi Phí"
        },
        {
            titleEn: "Insurance: Compliant Data Platform",
            titleVi: "Bảo Hiểm: Nền Tảng Dữ Liệu Tuân Thủ",
            descEn: "Built a SOC 2 compliant data platform for a regional insurer handling 2M+ policyholder records — passed external audit on first attempt.",
            descVi: "Xây dựng nền tảng dữ liệu tuân thủ SOC 2 cho một công ty bảo hiểm khu vực quản lý 2M+ hồ sơ người dùng — vượt qua kiểm toán bên ngoài ngay lần đầu.",
            stat: "SOC 2",
            statLabelEn: "Certified",
            statLabelVi: "Đã Chứng Nhận"
        }
    ],
    roiConfig: {
        inputALabelEn: "Current Monthly Cloud Bill ($)",
        inputALabelVi: "Hóa đơn Cloud hiện tại ($)",
        inputAUnit: "$",
        inputAMax: 100000,
        inputAStep: 1000,
        inputADefault: 10000,

        inputBLabelEn: "Servers / Instances Managed",
        inputBLabelVi: "Số lượng máy chủ / instance",
        inputBUnit: "nodes",
        inputBMax: 200,
        inputBStep: 5,
        inputBDefault: 20,

        efficiencyFactor: 0.34,
        currency: "$",
        badgeLabelEn: "34% Cloud Cost Reduction on Average",
        badgeLabelVi: "Giảm Trung Bình 34% Chi Phí Cloud"
    }
  },
  {
    id: 'big-data',
    titleEn: 'Big Data Processing',
    titleVi: 'Xử Lý Dữ Liệu Lớn',
    descEn: 'Spark & Kafka pipelines processing billions of events/day — sub-100ms latency for real-time decisions.',
    descVi: 'Pipeline Spark & Kafka xử lý hàng tỷ sự kiện/ngày — độ trễ dưới 100ms cho quyết định thời gian thực.',
    icon: 'M12 3C7.58 3 4 4.79 4 7s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4zM4 9v3c0 2.21 3.58 4 8 4s8-1.79 8-4V9c0 2.21-3.58 4-8 4s-8-1.79-8-4zm0 5v3c0 2.21 3.58 4 8 4s8-1.79 8-4v-3c0 2.21-3.58 4-8 4s-8-1.79-8-4z',
    deployTimeEn: "4–8 weeks pipeline setup",
    deployTimeVi: "4–8 tuần thiết lập pipeline",
    techStack: ["Apache Spark", "Apache Kafka", "Delta Lake", "Airflow", "ClickHouse", "dbt"],
    longDescEn: "SGS Big Data pipelines handle time-series streams from manufacturing sensors, financial transaction logs, and behavioral data from digital products — unified into a single data lake architecture. Our distributed systems, built on Apache Spark and Apache Kafka, process billions of events daily with sub-100ms latency for real-time business decisions. Data warehouse migrations are completed with zero downtime, and ongoing pipeline management is included in all contracts.",
    longDescVi: "Pipeline Big Data của SGS xử lý dữ liệu chuỗi thời gian từ cảm biến sản xuất, nhật ký giao dịch tài chính và dữ liệu hành vi từ sản phẩm số — được hợp nhất vào một kiến trúc data lake thống nhất. Hệ thống phân tán của chúng tôi, được xây dựng trên Apache Spark và Apache Kafka, xử lý hàng tỷ sự kiện mỗi ngày với độ trễ dưới 100ms cho các quyết định kinh doanh thời gian thực. Migration kho dữ liệu được hoàn thành không có thời gian chết, và quản lý pipeline liên tục được bao gồm trong tất cả hợp đồng.",
    featuresEn: [
        "Apache Spark & Kafka pipelines for batch and stream processing",
        "Delta Lake architecture — ACID transactions on petabyte-scale data",
        "Real-time fraud alerts and anomaly detection under 50ms",
        "Automated ETL orchestration with Apache Airflow & dbt"
    ],
    featuresVi: [
        "Pipeline Apache Spark & Kafka cho xử lý batch và stream",
        "Kiến trúc Delta Lake — giao dịch ACID ở quy mô petabyte",
        "Cảnh báo gian lận và phát hiện bất thường thời gian thực dưới 50ms",
        "Điều phối ETL tự động với Apache Airflow & dbt"
    ],
    benefitsEn: [
        "Sub-100ms query latency on billion-row datasets — verified in production at 3 logistics clients",
        "Real-time fraud alerts under 50ms for banking transaction streams",
        "Avg. 45% storage cost reduction through intelligent tiering and compression",
        "Zero-downtime data warehouse migrations — no business disruption during transition"
    ],
    benefitsVi: [
        "Độ trễ truy vấn dưới 100ms trên tập dữ liệu hàng tỷ hàng — đã xác nhận production tại 3 khách hàng logistics",
        "Cảnh báo gian lận thời gian thực dưới 50ms cho luồng giao dịch ngân hàng",
        "Trung bình giảm 45% chi phí lưu trữ thông qua tiering và nén thông minh",
        "Migration kho dữ liệu không có thời gian chết — không làm gián đoạn hoạt động kinh doanh"
    ],
    useCases: [
        {
            titleEn: "Logistics: IoT Fleet Monitoring",
            titleVi: "Logistics: Giám Sát Đội Xe IoT",
            descEn: "A logistics company with 5,000 vehicles streams GPS and engine telemetry in real-time — predicting breakdowns 72 hours early and reducing fleet downtime by 31%.",
            descVi: "Một công ty logistics với 5.000 xe luồng GPS và telemetry động cơ thời gian thực — dự đoán hỏng hóc 72 giờ trước và giảm downtime đội xe 31%.",
            stat: "31%",
            statLabelEn: "Downtime Reduction",
            statLabelVi: "Giảm Downtime"
        },
        {
            titleEn: "Retail: 360° Customer Intelligence",
            titleVi: "Bán Lẻ: Dữ Liệu Khách Hàng Toàn Diện",
            descEn: "Unified web, mobile, in-store POS, and CRM data for a retail chain — enabling personalized campaigns that increased repurchase rate by 19%.",
            descVi: "Hợp nhất dữ liệu web, mobile, POS cửa hàng và CRM cho một chuỗi bán lẻ — cho phép chiến dịch cá nhân hóa tăng tỷ lệ mua lại 19%.",
            stat: "+19%",
            statLabelEn: "Repurchase Rate",
            statLabelVi: "Tỷ Lệ Mua Lại"
        }
    ],
    roiConfig: {
        inputALabelEn: "Terabytes Stored",
        inputALabelVi: "Dữ liệu lưu trữ (TB)",
        inputAUnit: "TB",
        inputAMax: 5000,
        inputAStep: 50,
        inputADefault: 500,

        inputBLabelEn: "Current Storage Cost / TB ($)",
        inputBLabelVi: "Chi phí hiện tại / TB ($)",
        inputBUnit: "$",
        inputBMax: 100,
        inputBStep: 1,
        inputBDefault: 20,

        efficiencyFactor: 0.45,
        currency: "$",
        badgeLabelEn: "45% Storage Cost Savings via Smart Tiering",
        badgeLabelVi: "Tiết Kiệm 45% Chi Phí Lưu Trữ Qua Smart Tiering"
    }
  }
];

export const HOW_WE_WORK = {
  en: {
    title: "How We Deliver",
    subtitle: "A structured 4-phase process — from first call to production deployment.",
    steps: [
      {
        number: "01",
        title: "Discovery & Audit",
        duration: "Week 1–2",
        desc: "We analyze your existing systems, data quality, and business goals. You receive a free technical assessment report with specific findings — not a sales deck.",
        icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
      },
      {
        number: "02",
        title: "Pilot on Real Data",
        duration: "Week 3–6",
        desc: "We build a working proof-of-concept on your actual data. You see measurable results before any long-term commitment. If results don't meet agreed targets, we stop — no charge.",
        icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      },
      {
        number: "03",
        title: "Full Production Deployment",
        duration: "Month 2–3",
        desc: "Zero-downtime rollout with a structured migration plan. Your team receives hands-on training, full technical documentation, and runbooks for day-to-day operations.",
        icon: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
      },
      {
        number: "04",
        title: "Monitoring & Ongoing Support",
        duration: "Month 4+",
        desc: "24/7 system monitoring, monthly performance reports, and a named account manager you can reach directly. SLA-backed response times: 15 minutes for P1, 4 hours for P2.",
        icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      }
    ]
  },
  vi: {
    title: "Quy Trình Triển Khai",
    subtitle: "4 giai đoạn có cấu trúc — từ cuộc gọi đầu tiên đến triển khai production.",
    steps: [
      {
        number: "01",
        title: "Khám Phá & Đánh Giá",
        duration: "Tuần 1–2",
        desc: "Chúng tôi phân tích hệ thống hiện tại, chất lượng dữ liệu và mục tiêu kinh doanh của bạn. Bạn nhận báo cáo đánh giá kỹ thuật miễn phí với phát hiện cụ thể — không phải bài thuyết trình bán hàng.",
        icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
      },
      {
        number: "02",
        title: "Thử Nghiệm Trên Dữ Liệu Thực",
        duration: "Tuần 3–6",
        desc: "Chúng tôi xây dựng bản thử nghiệm trên dữ liệu thực tế của bạn. Bạn thấy kết quả đo lường được trước khi cam kết dài hạn. Nếu kết quả không đạt mục tiêu đã thỏa thuận, chúng tôi dừng lại — không tính phí.",
        icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      },
      {
        number: "03",
        title: "Triển Khai Sản Xuất",
        duration: "Tháng 2–3",
        desc: "Triển khai không thời gian chết với kế hoạch migration có cấu trúc. Đội ngũ của bạn được đào tạo thực hành, nhận tài liệu kỹ thuật đầy đủ và hướng dẫn vận hành hàng ngày.",
        icon: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
      },
      {
        number: "04",
        title: "Giám Sát & Hỗ Trợ Liên Tục",
        duration: "Tháng 4+",
        desc: "Giám sát hệ thống 24/7, báo cáo hiệu suất hàng tháng và quản lý tài khoản có tên mà bạn có thể liên hệ trực tiếp. Thời gian phản hồi được bảo đảm SLA: 15 phút cho P1, 4 giờ cho P2.",
        icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      }
    ]
  }
};

export const TECH_STACK_LIST = [
  { name: "Python", category: "AI / ML" },
  { name: "PyTorch", category: "AI / ML" },
  { name: "TensorFlow", category: "AI / ML" },
  { name: "LangChain", category: "LLM Ops" },
  { name: "Apache Spark", category: "Big Data" },
  { name: "Apache Kafka", category: "Streaming" },
  { name: "Kubernetes", category: "Cloud" },
  { name: "Terraform", category: "Cloud" },
  { name: "FastAPI", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "dbt", category: "Analytics" },
  { name: "Apache Airflow", category: "Orchestration" }
];

export const LEADERSHIP_CONTENT = {
    en: {
        title: "Leadership Team",
        members: [
            { 
                name: "Nguyen Duc Vinh", 
                role: "CEO & Co-Founder", 
                bio: "12 years in enterprise software and AI engineering. Previously led data engineering teams at FPT Software and VNG Corporation. Founded SGS GROUP in 2020 to bring production-grade AI to Vietnamese businesses."
            },
            { 
                name: "Tran Thi Lan Anh", 
                role: "CTO & Co-Founder", 
                bio: "10 years in distributed systems and machine learning infrastructure. Built large-scale data pipelines for logistics and manufacturing clients across Vietnam and Thailand. Holds an M.Eng from HCMC University of Technology."
            },
            { 
                name: "Pham Minh Khoa", 
                role: "Head of Delivery", 
                bio: "8 years managing AI/automation implementations for enterprise clients in retail, logistics, and finance. Responsible for maintaining our 98.7% on-time delivery rate and client SLA compliance across all active contracts."
            }
        ]
    },
    vi: {
        title: "Đội Ngũ Lãnh Đạo",
        members: [
            { 
                name: "Nguyễn Đức Vinh", 
                role: "CEO & Đồng Sáng Lập", 
                bio: "12 năm kinh nghiệm trong phần mềm doanh nghiệp và kỹ thuật AI. Từng dẫn dắt đội kỹ thuật dữ liệu tại FPT Software và VNG Corporation. Đồng sáng lập SGS GROUP năm 2020 để đưa AI cấp sản xuất đến với doanh nghiệp Việt Nam."
            },
            { 
                name: "Trần Thị Lan Anh", 
                role: "CTO & Đồng Sáng Lập", 
                bio: "10 năm kinh nghiệm về hệ thống phân tán và hạ tầng machine learning. Xây dựng pipeline dữ liệu quy mô lớn cho khách hàng logistics và sản xuất tại Việt Nam và Thái Lan. Thạc sĩ Kỹ thuật Đại học Bách Khoa TP.HCM."
            },
            { 
                name: "Phạm Minh Khoa", 
                role: "Giám Đốc Triển Khai", 
                bio: "8 năm quản lý triển khai AI/tự động hóa cho khách hàng doanh nghiệp trong bán lẻ, logistics và tài chính. Chịu trách nhiệm duy trì tỷ lệ giao hàng đúng hạn 98.7% và tuân thủ SLA trên toàn bộ hợp đồng."
            }
        ]
    }
};

export const PARTNERS_CONTENT = [
    { name: "Google Cloud" },
    { name: "AWS" },
    { name: "Microsoft Azure" },
    { name: "NVIDIA" },
    { name: "Intel" },
    { name: "IBM" }
];

export const TESTIMONIALS = {
    en: [
        {
            quote: "SGS GROUP reduced our invoice processing time from 3 days to under 2 hours. The automation is solid — our finance team can now focus on strategy instead of data entry. Implementation was faster than we expected.",
            name: "Nguyen Thi Lan",
            role: "CFO",
            company: "VietRetail Corp.",
            rating: 5,
            industry: "Retail & E-commerce",
            date: "Q3 2025",
            verified: true,
            result: "3 days → 2 hrs"
        },
        {
            quote: "Their Data Analytics platform gave us real-time visibility across 14 warehouses. Demand forecasting accuracy improved by 40% in Q1. The onboarding took longer than planned, but the results speak for themselves.",
            name: "James Pham",
            role: "Operations Director",
            company: "LogiViet",
            rating: 4,
            industry: "Logistics",
            date: "Q1 2025",
            verified: true,
            result: "+40% forecast accuracy"
        },
        {
            quote: "The AI chatbot now handles 70% of our customer queries around the clock. Our CSAT jumped from 3.8 to 4.7 within six months. The SGS team was responsive and fixed every issue within 24 hours.",
            name: "Tran Minh Duc",
            role: "Head of Customer Experience",
            company: "FinTech One",
            rating: 5,
            industry: "Financial Technology",
            date: "Q4 2024",
            verified: true,
            result: "CSAT 3.8 → 4.7"
        }
    ],
    vi: [
        {
            quote: "SGS GROUP giảm thời gian xử lý hóa đơn của chúng tôi từ 3 ngày xuống dưới 2 giờ. Hệ thống tự động hóa hoạt động tốt — đội tài chính giờ tập trung vào chiến lược thay vì nhập liệu. Triển khai nhanh hơn dự kiến.",
            name: "Nguyễn Thị Lan",
            role: "CFO",
            company: "Công ty VietRetail",
            rating: 5,
            industry: "Bán lẻ & Thương mại điện tử",
            date: "Q3 2025",
            verified: true,
            result: "3 ngày → 2 giờ"
        },
        {
            quote: "Nền tảng phân tích dữ liệu của SGS cho chúng tôi hiển thị thời gian thực trên 14 kho hàng. Độ chính xác dự báo nhu cầu tăng 40% trong quý đầu. Quá trình onboarding kéo dài hơn kế hoạch một chút, nhưng kết quả rất đáng.",
            name: "James Phạm",
            role: "Giám đốc Vận hành",
            company: "LogiViet",
            rating: 4,
            industry: "Logistics",
            date: "Q1 2025",
            verified: true,
            result: "+40% độ chính xác"
        },
        {
            quote: "Chatbot AI xử lý 70% câu hỏi khách hàng suốt ngày đêm. Điểm CSAT tăng từ 3.8 lên 4.7 chỉ sau 6 tháng triển khai. Đội SGS phản hồi nhanh và xử lý mọi vấn đề trong vòng 24 giờ.",
            name: "Trần Minh Đức",
            role: "Trưởng bộ phận CSKH",
            company: "FinTech One",
            rating: 5,
            industry: "Công nghệ Tài chính",
            date: "Q4 2024",
            verified: true,
            result: "CSAT 3.8 → 4.7"
        }
    ]
};

export const TRUST_BADGES = [
    {
        labelEn: "ISO 27001",
        labelVi: "ISO 27001",
        descEn: "Information Security",
        descVi: "Bảo mật thông tin",
        icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    },
    {
        labelEn: "AES-256",
        labelVi: "AES-256",
        descEn: "Encrypted Data Transfer",
        descVi: "Mã hóa dữ liệu",
        icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    },
    {
        labelEn: "99.98% Uptime",
        labelVi: "99.98% Uptime",
        descEn: "Guaranteed SLA",
        descVi: "Cam kết SLA",
        icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    },
    {
        labelEn: "PDPA Compliant",
        labelVi: "Tuân thủ PDPA",
        descEn: "Data Protection Act",
        descVi: "Luật bảo vệ dữ liệu",
        icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
    },
    {
        labelEn: "24/7 Support",
        labelVi: "Hỗ trợ 24/7",
        descEn: "Dedicated Success Team",
        descVi: "Đội hỗ trợ chuyên biệt",
        icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
    },
    {
        labelEn: "Est. 2020",
        labelVi: "Thành lập 2020",
        descEn: "6 Years of Excellence",
        descVi: "6 năm phát triển",
        icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    }
];

export const HOME_STATS = [
    { valueEn: "200+", valueVi: "200+", labelEn: "Projects Delivered", labelVi: "Dự Án Hoàn Thành" },
    { valueEn: "40+", valueVi: "40+", labelEn: "AI Engineers", labelVi: "Kỹ Sư AI" },
    { valueEn: "4.9/5", valueVi: "4.9/5", labelEn: "Client Satisfaction", labelVi: "Hài Lòng Khách Hàng" },
    { valueEn: "12+", valueVi: "12+", labelEn: "Countries Served", labelVi: "Quốc Gia Phục Vụ" },
];

export const WHY_SGS = {
    en: {
        title: "Why Enterprise Clients Choose SGS GROUP",
        subtitle: "Three commitments that make us different from every other AI vendor.",
        items: [
            {
                number: "01",
                title: "6-Week Pilot. Money-Back Guarantee.",
                desc: "Every engagement starts with a scoped 6-week pilot. If you don't see measurable ROI by week 6, we refund 100% of the pilot fee — no questions, no lawyers.",
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                color: "emerald"
            },
            {
                number: "02",
                title: "Fixed Scope. No Surprise Invoices.",
                desc: "We quote once. All our contracts are fixed-price with clearly defined deliverables. No hourly billing, no scope creep charges, no 'change request' surprises.",
                icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M9 14h.01M12 14h.01M15 14h.01M5 20h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z",
                color: "cyan"
            },
            {
                number: "03",
                title: "Built for Vietnam. Ready for Southeast Asia.",
                desc: "Our engineers understand Vietnamese business processes, local regulations (Circular 13, PDPA), and the reality of deploying AI in emerging markets — not just theory.",
                icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                color: "violet"
            }
        ]
    },
    vi: {
        title: "Tại Sao Doanh Nghiệp Chọn SGS GROUP",
        subtitle: "Ba cam kết phân biệt chúng tôi với mọi nhà cung cấp AI khác.",
        items: [
            {
                number: "01",
                title: "Pilot 6 Tuần. Hoàn Tiền 100% Nếu Không Đạt.",
                desc: "Mỗi hợp tác bắt đầu bằng giai đoạn pilot 6 tuần có phạm vi rõ ràng. Nếu bạn không thấy ROI đo lường được sau 6 tuần, chúng tôi hoàn trả 100% phí pilot — không điều kiện.",
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                color: "emerald"
            },
            {
                number: "02",
                title: "Chi Phí Cố Định. Không Phát Sinh Thêm.",
                desc: "Chúng tôi báo giá một lần. Toàn bộ hợp đồng là fixed-price với deliverables rõ ràng. Không tính theo giờ, không phát sinh do thay đổi yêu cầu, không có hóa đơn bất ngờ.",
                icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M9 14h.01M12 14h.01M15 14h.01M5 20h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z",
                color: "cyan"
            },
            {
                number: "03",
                title: "Xây Cho Việt Nam. Sẵn Sàng Cho Đông Nam Á.",
                desc: "Kỹ sư của chúng tôi am hiểu quy trình kinh doanh Việt Nam, quy định địa phương (Thông tư 13, PDPA) và thực tế triển khai AI tại thị trường mới nổi — không chỉ lý thuyết.",
                icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                color: "violet"
            }
        ]
    }
};

export const INDUSTRY_SECTORS = [
    { labelEn: "Manufacturing", labelVi: "Sản xuất", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
    { labelEn: "Retail & E-commerce", labelVi: "Bán lẻ & TMĐT", icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" },
    { labelEn: "Logistics", labelVi: "Logistics", icon: "M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" },
    { labelEn: "Financial Services", labelVi: "Tài chính", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { labelEn: "Healthcare", labelVi: "Y tế", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
    { labelEn: "Real Estate", labelVi: "Bất động sản", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
];
