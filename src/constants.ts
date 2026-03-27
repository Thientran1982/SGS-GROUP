
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
    heroTitle: "Future Intelligence",
    heroSubtitle: "We help businesses in Vietnam & Southeast Asia automate processes, analyze data, and scale operations using enterprise-grade AI — delivered by a team of 40+ engineers since 2020.",
    cta: "Explore AI Hub",
    learnMore: "Learn More",
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
    heroTitle: "Trí Tuệ Tương Lai",
    heroSubtitle: "Chúng tôi hỗ trợ doanh nghiệp Việt Nam & Đông Nam Á tự động hóa quy trình, phân tích dữ liệu và mở rộng quy mô bằng AI cấp doanh nghiệp — đội ngũ 40+ kỹ sư, hoạt động từ năm 2020.",
    cta: "Khám Phá AI Hub",
    learnMore: "Xem Chi Tiết",
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
        title: "Our Visionary Journey",
        subtitle: "Bridging the gap between biological potential and digital infinity.",
        sections: [
            {
                heading: "Who We Are",
                text: "SGS GROUP is more than a technology company; we are architects of the future. Established in 2020, we have rapidly evolved from a boutique AI research lab into a global powerhouse for enterprise automation and digital transformation. We believe that technology should be invisible, intuitive, and inherently helpful."
            },
            {
                heading: "Our Mission",
                text: "To democratize access to advanced artificial intelligence, ensuring that businesses of all sizes can leverage the power of neural networks and machine learning to solve their most complex challenges."
            },
            {
                heading: "Core Values",
                items: ["Innovation First", "Ethical AI", "User-Centric Design", "Global Scalability"]
            }
        ],
        stats: [
            { value: "50+", label: "Global Partners" },
            { value: "200+", label: "Projects Delivered" },
            { value: "4.9/5", label: "Client Satisfaction" }
        ]
    },
    vi: {
        title: "Hành Trình Tầm Nhìn",
        subtitle: "Thu hẹp khoảng cách giữa tiềm năng sinh học và sự vô tận của kỹ thuật số.",
        sections: [
            {
                heading: "Chúng Tôi Là Ai",
                text: "SGS GROUP không chỉ là một công ty công nghệ; chúng tôi là những kiến trúc sư của tương lai. Được thành lập vào năm 2020, chúng tôi đã phát triển nhanh chóng từ một phòng thí nghiệm nghiên cứu AI nhỏ thành một thế lực toàn cầu về tự động hóa doanh nghiệp và chuyển đổi số. Chúng tôi tin rằng công nghệ nên vô hình, trực quan và hữu ích từ bản chất."
            },
            {
                heading: "Sứ Mệnh",
                text: "Bình dân hóa việc tiếp cận trí tuệ nhân tạo tiên tiến, đảm bảo rằng các doanh nghiệp ở mọi quy mô đều có thể tận dụng sức mạnh của mạng nơ-ron và máy học để giải quyết các thách thức phức tạp nhất."
            },
            {
                heading: "Giá Trị Cốt Lõi",
                items: ["Đổi Mới Là Tiên Phong", "AI Có Đạo Đức", "Thiết Kế Vì Người Dùng", "Mở Rộng Toàn Cầu"]
            }
        ],
        stats: [
            { value: "50+", label: "Đối Tác Toàn Cầu" },
            { value: "200+", label: "Dự Án Hoàn Thành" },
            { value: "4.9/5", label: "Hài Lòng Khách Hàng" }
        ]
    }
};

export const CONTACT_CONTENT = {
    en: {
        title: "Get In Touch",
        subtitle: "Ready to transform your business? Our team is here to help.",
        connectNodeId: "CONNECT_NODE_ID_883",
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
    descEn: 'Deep learning models that predict market trends.',
    descVi: 'Mô hình học sâu dự đoán xu hướng thị trường.',
    icon: 'M3 13.125C3 12.5037 3.50368 12 4.125 12h2.25c.62132 0 1.125.5037 1.125 1.125v6.75C7.5 20.4963 6.99632 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.62132.5037-1.125 1.125-1.125h2.25c.6213 0 1.125.5037 1.125 1.125v11.25c0 .6213-.5037 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.62132.5037-1.125 1.125-1.125h2.25C20.4963 3 21 3.50368 21 4.125v15.75c0 .6213-.5037 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z',
    longDescEn: "Unlock the hidden potential of your data with SGS Group's advanced analytics suite. We transform raw information into actionable strategic insights using state-of-the-art Machine Learning algorithms. Our platform visualizes complex patterns, helping you make data-driven decisions that propel your business forward.",
    longDescVi: "Khai phá tiềm năng ẩn giấu trong dữ liệu của bạn với bộ công cụ phân tích tiên tiến từ SGS Group. Chúng tôi chuyển đổi thông tin thô thành các chiến lược hành động thực tế bằng cách sử dụng các thuật toán Machine Learning hiện đại nhất. Nền tảng của chúng tôi trực quan hóa các mô hình phức tạp, giúp bạn đưa ra quyết định dựa trên dữ liệu để thúc đẩy doanh nghiệp phát triển.",
    featuresEn: [
      "Real-time Predictive Modeling",
      "Customer Behavior Segmentation",
      "Interactive 3D Data Visualization",
      "Automated Reporting & Dashboards"
    ],
    featuresVi: [
      "Mô hình dự báo thời gian thực",
      "Phân khúc hành vi khách hàng",
      "Trực quan hóa dữ liệu 3D tương tác",
      "Báo cáo & Bảng điều khiển tự động"
    ],
    benefitsEn: [
      "Increase ROI by 30% through targeted insights",
      "Reduce operational risks with anomaly detection",
      "Seamless integration with existing SQL/NoSQL databases"
    ],
    benefitsVi: [
      "Tăng ROI lên 30% thông qua thông tin chi tiết",
      "Giảm thiểu rủi ro vận hành với phát hiện bất thường",
      "Tích hợp liền mạch với cơ sở dữ liệu hiện có"
    ],
    useCases: [
        {
            titleEn: "Retail Sales Forecasting",
            titleVi: "Dự Báo Doanh Số Bán Lẻ",
            descEn: "Predict demand for inventory management with 95% accuracy using historical sales data and seasonal trend analysis.",
            descVi: "Dự đoán nhu cầu quản lý tồn kho với độ chính xác 95% bằng dữ liệu bán hàng lịch sử và phân tích xu hướng mùa vụ.",
            stat: "95%",
            statLabelEn: "Accuracy",
            statLabelVi: "Chính Xác"
        },
        {
            titleEn: "Financial Fraud Detection",
            titleVi: "Phát Hiện Gian Lận Tài Chính",
            descEn: "Identify suspicious transaction patterns in real-time to prevent revenue loss and enhance security compliance.",
            descVi: "Xác định các mẫu giao dịch đáng ngờ trong thời gian thực để ngăn chặn thất thoát doanh thu và tăng cường tuân thủ bảo mật.",
            stat: "<2ms",
            statLabelEn: "Detection",
            statLabelVi: "Phát Hiện"
        }
    ],
    roiConfig: {
        // Advanced Dual Variable Config
        inputALabelEn: "Employees Using Data",
        inputALabelVi: "Nhân viên sử dụng dữ liệu",
        inputAUnit: "ppl",
        inputAMax: 100,
        inputAStep: 1,
        inputADefault: 10,

        inputBLabelEn: "Avg. Hours Saved/Week",
        inputBLabelVi: "Giờ tiết kiệm/tuần/người",
        inputBUnit: "hrs",
        inputBMax: 20,
        inputBStep: 0.5,
        inputBDefault: 5,

        efficiencyFactor: 25, // Average hourly value ($25/hr)
        currency: "$"
    }
  },
  {
    id: 'automation',
    titleEn: 'Automation',
    titleVi: 'Tự Động Hóa',
    descEn: 'Smart agents handling workflows autonomously.',
    descVi: 'Đại lý thông minh xử lý quy trình làm việc tự động.',
    icon: 'M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 21v-1.5m3.75 1.5v-1.5m3.75 1.5v-1.5M16.5 7.5V6a2.25 2.25 0 00-2.25-2.25H9.75A2.25 2.25 0 007.5 6v1.5m0 12V18a2.25 2.25 0 002.25-2.25h4.5A2.25 2.25 0 0016.5 18v-1.5m-9-9h9m-9 3.75h9',
    longDescEn: "Streamline your operations with SGS Automation. We deploy intelligent robotic process automation (RPA) agents that handle repetitive tasks with zero error rate. From invoice processing to supply chain management, our systems work 24/7, allowing your human workforce to focus on creativity and strategy.",
    longDescVi: "Tối ưu hóa quy trình vận hành với SGS Automation. Chúng tôi triển khai các tác nhân tự động hóa quy trình bằng robot (RPA) thông minh, xử lý các tác vụ lặp lại với tỷ lệ lỗi bằng 0. Từ xử lý hóa đơn đến quản lý chuỗi cung ứng, hệ thống của chúng tôi hoạt động 24/7, cho phép nhân sự của bạn tập trung vào sáng tạo và chiến lược.",
    featuresEn: [
      "End-to-end Workflow Orchestration",
      "Smart Document Processing (OCR)",
      "Adaptive Bot Scaling",
      "Legacy System Bridging"
    ],
    featuresVi: [
      "Điều phối quy trình làm việc đầu-cuối",
      "Xử lý tài liệu thông minh (OCR)",
      "Mở rộng Bot thích ứng",
      "Kết nối hệ thống cũ (Legacy)"
    ],
    benefitsEn: [
      "Reduce operational costs by up to 50%",
      "Eliminate human error in data entry",
      "Instant scalability during peak loads"
    ],
    benefitsVi: [
      "Giảm chi phí vận hành lên đến 50%",
      "Loại bỏ lỗi con người trong nhập liệu",
      "Khả năng mở rộng tức thì khi tải cao điểm"
    ],
    useCases: [
        {
            titleEn: "Automated Invoice Processing",
            titleVi: "Xử Lý Hóa Đơn Tự Động",
            descEn: "Extract data from thousands of PDF invoices instantly and sync with your ERP, reducing manual entry time by 80%.",
            descVi: "Trích xuất dữ liệu từ hàng nghìn hóa đơn PDF ngay lập tức và đồng bộ với ERP, giảm 80% thời gian nhập liệu thủ công.",
            stat: "80%",
            statLabelEn: "Time Saved",
            statLabelVi: "Tiết Kiệm"
        },
        {
            titleEn: "Customer Onboarding Bot",
            titleVi: "Bot Tiếp Nhận Khách Hàng",
            descEn: "Verify documents and create accounts for new users 24/7 without human intervention, creating a seamless experience.",
            descVi: "Xác minh tài liệu và tạo tài khoản cho người dùng mới 24/7 mà không cần can thiệp của con người, tạo trải nghiệm liền mạch.",
            stat: "24/7",
            statLabelEn: "Availability",
            statLabelVi: "Sẵn Sàng"
        }
    ],
    roiConfig: {
        inputALabelEn: "Manual Tasks / Month",
        inputALabelVi: "Tác vụ thủ công / tháng",
        inputAUnit: "tasks",
        inputAMax: 5000,
        inputAStep: 100,
        inputADefault: 1000,

        inputBLabelEn: "Cost per Manual Task",
        inputBLabelVi: "Chi phí mỗi tác vụ",
        inputBUnit: "$",
        inputBMax: 20,
        inputBStep: 0.5,
        inputBDefault: 5,

        efficiencyFactor: 0.7, // 70% cost reduction per task
        currency: "$"
    }
  },
  {
    id: 'ai-tech',
    titleEn: 'AI Technology',
    titleVi: 'Công Nghệ AI',
    descEn: 'Generative models and neural networks driving innovation.',
    descVi: 'Mô hình tạo sinh và mạng nơ-ron thúc đẩy đổi mới sáng tạo.',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 18c-3.31 0-6-2.69-6-6 0-1.2.35-2.32.94-3.27C7.3 8.5 7.68 8.4 8.05 8.46c.38.07.69.34.8.71.16.53.64.91 1.2.91.56 0 1.04-.38 1.2-.91.11-.37.42-.64.8-.71.37-.06.75.04 1.01.27.59.95.94 2.07.94 3.27 0 3.31-2.69 6-6 6zm0-14c-4.42 0-8 3.58-8 8 0 1.84.62 3.54 1.67 4.9.44.57 1.24.63 1.76.15.54-.49.57-1.33.09-1.86C6.71 14.19 6.25 13.14 6.25 12c0-3.18 2.57-5.75 5.75-5.75s5.75 2.57 5.75 5.75c0 1.14-.46 2.19-1.27 3.19-.48.53-.45 1.37.09 1.86.52.48 1.32.42 1.76-.15C19.38 15.54 20 13.84 20 12c0-4.42-3.58-8-8-8z',
    longDescEn: "Embrace the future with SGS AI Core. We specialize in custom LLMs (Large Language Models), Generative AI for media, and Neural Networks for complex problem solving. Whether you need a smart chatbot, an AI design assistant, or a prediction engine, we build the brains behind your digital transformation.",
    longDescVi: "Đón đầu tương lai với SGS AI Core. Chúng tôi chuyên về các mô hình ngôn ngữ lớn (LLM) tùy chỉnh, AI tạo sinh (Generative AI) cho truyền thông và Mạng nơ-ron để giải quyết các vấn đề phức tạp. Cho dù bạn cần chatbot thông minh, trợ lý thiết kế AI hay động cơ dự đoán, chúng tôi xây dựng bộ não đằng sau sự chuyển đổi số của bạn.",
    featuresEn: [
      "Custom Fine-tuned LLMs",
      "Computer Vision & Recognition",
      "Natural Language Understanding (NLU)",
      "Generative Art & Video"
    ],
    featuresVi: [
      "Tinh chỉnh LLM tùy biến",
      "Thị giác máy tính & Nhận diện",
      "Hiểu ngôn ngữ tự nhiên (NLU)",
      "Tạo sinh Nghệ thuật & Video"
    ],
    benefitsEn: [
      "Stay ahead of competitors with cutting-edge tech",
      "Personalized customer experiences at scale",
      "Secure, private AI deployment options"
    ],
    benefitsVi: [
      "Dẫn trước đối thủ với công nghệ tiên tiến",
      "Cá nhân hóa trải nghiệm khách hàng ở quy mô lớn",
      "Tùy chọn triển khai AI riêng tư, bảo mật"
    ],
    useCases: [
        {
            titleEn: "Smart Customer Support",
            titleVi: "Hỗ Trợ Khách Hàng Thông Minh",
            descEn: "Deploy a context-aware chatbot that resolves 70% of inquiries instantly, learning from every interaction.",
            descVi: "Triển khai chatbot nhận biết ngữ cảnh giải quyết 70% thắc mắc ngay lập tức, học hỏi từ mọi tương tác.",
            stat: "70%",
            statLabelEn: "Resolution",
            statLabelVi: "Giải Quyết"
        },
        {
            titleEn: "Visual Quality Control",
            titleVi: "Kiểm Soát Chất Lượng Hình Ảnh",
            descEn: "Use computer vision to detect manufacturing defects in real-time on the assembly line with precision.",
            descVi: "Sử dụng thị giác máy tính để phát hiện lỗi sản xuất trong thời gian thực trên dây chuyền lắp ráp với độ chính xác cao.",
            stat: "99.9%",
            statLabelEn: "Precision",
            statLabelVi: "Chính Xác"
        }
    ],
    roiConfig: {
        inputALabelEn: "Customer Queries / Month",
        inputALabelVi: "Câu hỏi khách hàng / tháng",
        inputAUnit: "req",
        inputAMax: 50000,
        inputAStep: 500,
        inputADefault: 5000,

        inputBLabelEn: "Avg. Cost per Resolution",
        inputBLabelVi: "Chi phí xử lý / yêu cầu",
        inputBUnit: "$",
        inputBMax: 20,
        inputBStep: 0.5,
        inputBDefault: 4,

        efficiencyFactor: 0.6, // 60% automated resolution
        currency: "$"
    }
  },
  {
    id: 'cloud-computing',
    titleEn: 'Cloud Computing',
    titleVi: 'Điện Toán Đám Mây',
    descEn: 'Scalable infrastructure for global deployment.',
    descVi: 'Cơ sở hạ tầng có thể mở rộng để triển khai toàn cầu.',
    icon: 'M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z',
    longDescEn: "SGS Cloud Infrastructure ensures your applications are always online, secure, and fast. We provide hybrid and multi-cloud solutions optimized for AI workloads. Experience infinite scalability with serverless architectures and edge computing nodes positioned globally.",
    longDescVi: "Cơ sở hạ tầng đám mây SGS đảm bảo ứng dụng của bạn luôn trực tuyến, bảo mật và tốc độ cao. Chúng tôi cung cấp giải pháp đám mây lai (hybrid) và đa đám mây (multi-cloud) được tối ưu hóa cho khối lượng công việc AI. Trải nghiệm khả năng mở rộng vô hạn với kiến trúc không máy chủ (serverless) và các nút tính toán biên (edge computing) trên toàn cầu.",
    featuresEn: [
      "Serverless AI Inference",
      "Global Edge CDN",
      "Military-grade Security & Compliance",
      "Auto-scaling Kubernetes Clusters"
    ],
    featuresVi: [
      "Suy luận AI không máy chủ",
      "Mạng phân phối nội dung (CDN) toàn cầu",
      "Bảo mật cấp quân sự & Tuân thủ",
      "Cụm Kubernetes tự động mở rộng"
    ],
    benefitsEn: [
      "99.99% Uptime Guarantee",
      "Pay-per-use optimized pricing",
      "Instant global deployment in seconds"
    ],
    benefitsVi: [
      "Cam kết thời gian hoạt động 99.99%",
      "Giá tối ưu theo mức sử dụng",
      "Triển khai toàn cầu ngay lập tức"
    ],
    useCases: [
        {
            titleEn: "Global E-commerce Scaling",
            titleVi: "Mở Rộng TMĐT Toàn Cầu",
            descEn: "Handle Black Friday traffic spikes effortlessly with auto-scaling infrastructure that adapts to demand.",
            descVi: "Xử lý lưu lượng truy cập đột biến ngày Black Friday dễ dàng với cơ sở hạ tầng tự động mở rộng thích ứng theo nhu cầu.",
            stat: "1M+",
            statLabelEn: "Req/Sec",
            statLabelVi: "Yêu Cầu/Giây"
        },
        {
            titleEn: "Secure Data Archiving",
            titleVi: "Lưu Trữ Dữ Liệu An Toàn",
            descEn: "Store compliant financial records with immutable backups and geo-redundancy for disaster recovery.",
            descVi: "Lưu trữ hồ sơ tài chính tuân thủ với các bản sao lưu bất biến và dự phòng địa lý để phục hồi sau thảm họa.",
            stat: "100%",
            statLabelEn: "Integrity",
            statLabelVi: "Toàn Vẹn"
        }
    ],
    roiConfig: {
        inputALabelEn: "Current Monthly Cloud Bill",
        inputALabelVi: "Hóa đơn Cloud hiện tại",
        inputAUnit: "$",
        inputAMax: 100000,
        inputAStep: 1000,
        inputADefault: 10000,

        inputBLabelEn: "Servers Managed",
        inputBLabelVi: "Số lượng máy chủ",
        inputBUnit: "nodes",
        inputBMax: 200,
        inputBStep: 5,
        inputBDefault: 20,

        efficiencyFactor: 0.35, // 35% bill reduction optimization
        currency: "$"
    }
  },
  {
    id: 'big-data',
    titleEn: 'Big Data Processing',
    titleVi: 'Xử Lý Dữ Liệu Lớn',
    descEn: 'Process petabytes of information with high-speed clusters.',
    descVi: 'Xử lý hàng petabyte thông tin với các cụm tốc độ cao.',
    icon: 'M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125',
    longDescEn: "SGS Big Data Processing clusters allow you to ingest, store, and analyze massive datasets in real-time. Whether it's IoT sensor streams, financial logs, or social media feed, our architecture scales horizontally to handle petabytes of data with low latency.",
    longDescVi: "Các cụm Xử Lý Dữ Liệu Lớn của SGS cho phép bạn thu thập, lưu trữ và phân tích các bộ dữ liệu khổng lồ trong thời gian thực. Cho dù là luồng cảm biến IoT, nhật ký tài chính hay nguồn cấp dữ liệu mạng xã hội, kiến trúc của chúng tôi mở rộng theo chiều ngang để xử lý hàng petabyte dữ liệu với độ trễ thấp.",
    featuresEn: [
        "Distributed Computing (Spark/Hadoop)",
        "Real-time Stream Processing",
        "Data Lake Architecture",
        "ETL Pipeline Automation"
    ],
    featuresVi: [
        "Tính toán phân tán (Spark/Hadoop)",
        "Xử lý luồng thời gian thực",
        "Kiến trúc hồ dữ liệu (Data Lake)",
        "Tự động hóa quy trình ETL"
    ],
    benefitsEn: [
        "Decision making with zero latency",
        "Unified data view across organization",
        "Cost-effective storage tiering"
    ],
    benefitsVi: [
        "Ra quyết định với độ trễ bằng không",
        "Chế độ xem dữ liệu thống nhất toàn tổ chức",
        "Phân cấp lưu trữ hiệu quả về chi phí"
    ],
    useCases: [
        {
            titleEn: "IoT Sensor Aggregation",
            titleVi: "Tổng Hợp Cảm Biến IoT",
            descEn: "Process streams from millions of factory sensors to predict equipment failure before it happens.",
            descVi: "Xử lý luồng dữ liệu từ hàng triệu cảm biến nhà máy để dự đoán hỏng hóc thiết bị trước khi nó xảy ra.",
            stat: "10PB",
            statLabelEn: "Processed",
            statLabelVi: "Đã Xử Lý"
        },
        {
            titleEn: "Marketing Attribution",
            titleVi: "Phân Bổ Tiếp Thị",
            descEn: "Track user journeys across web, mobile, and offline channels to attribute sales to the right campaign.",
            descVi: "Theo dõi hành trình người dùng qua web, di động và kênh ngoại tuyến để phân bổ doanh số cho đúng chiến dịch.",
            stat: "360°",
            statLabelEn: "View",
            statLabelVi: "Toàn Cảnh"
        }
    ],
    roiConfig: {
        inputALabelEn: "Terabytes Stored",
        inputALabelVi: "Dữ liệu lưu trữ (TB)",
        inputAUnit: "TB",
        inputAMax: 5000,
        inputAStep: 50,
        inputADefault: 500,

        inputBLabelEn: "Current Storage Cost/TB",
        inputBLabelVi: "Chi phí hiện tại/TB",
        inputBUnit: "$",
        inputBMax: 100,
        inputBStep: 1,
        inputBDefault: 20,

        efficiencyFactor: 0.45, // 45% compression and tiering savings
        currency: "$"
    }
  }
];

export const LEADERSHIP_CONTENT = {
    en: {
        title: "Leadership Team",
        members: [
            { name: "Dr. Victor Nguyen", role: "CEO & Founder", bio: "Former Lead AI Architect at Google Brain. 15 years experience in Neural Networks." },
            { name: "Sarah Chen", role: "CTO", bio: "MIT Alumna. Expert in Distributed Systems and Quantum Computing Algorithms." },
            { name: "David Miller", role: "Head of Product", bio: "Product visionary who led teams at Spotify and Stripe. Focused on user-centric design." }
        ]
    },
    vi: {
        title: "Đội Ngũ Lãnh Đạo",
        members: [
            { name: "Dr. Victor Nguyen", role: "CEO & Nhà Sáng Lập", bio: "Cựu Kiến trúc sư AI trưởng tại Google Brain. 15 năm kinh nghiệm về Mạng Nơ-ron." },
            { name: "Sarah Chen", role: "Giám Đốc Công Nghệ (CTO)", bio: "Cựu sinh viên MIT. Chuyên gia về Hệ thống phân tán và Thuật toán Lượng tử." },
            { name: "David Miller", role: "Giám Đốc Sản Phẩm", bio: "Người có tầm nhìn sản phẩm từng dẫn dắt đội ngũ tại Spotify và Stripe." }
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
            quote: "SGS GROUP reduced our invoice processing time from 3 days to under 2 hours. The automation is flawless — our finance team can now focus on strategy, not data entry.",
            name: "Nguyen Thi Lan",
            role: "CFO, VietRetail Corp.",
            rating: 5,
            industry: "Retail & E-commerce"
        },
        {
            quote: "Their Data Analytics platform gave us real-time visibility across 14 warehouses. We improved demand forecasting accuracy by 40% in the first quarter alone.",
            name: "James Pham",
            role: "Operations Director, LogiViet",
            rating: 5,
            industry: "Logistics"
        },
        {
            quote: "The AI chatbot they built handles 70% of our customer queries 24/7. Our CSAT score jumped from 3.8 to 4.7 within 6 months of deployment.",
            name: "Tran Minh Duc",
            role: "Head of Customer Experience, FinTech One",
            rating: 5,
            industry: "Financial Technology"
        }
    ],
    vi: [
        {
            quote: "SGS GROUP giảm thời gian xử lý hóa đơn của chúng tôi từ 3 ngày xuống còn dưới 2 giờ. Hệ thống tự động hóa hoạt động hoàn hảo — đội tài chính giờ có thể tập trung vào chiến lược thay vì nhập liệu.",
            name: "Nguyễn Thị Lan",
            role: "CFO, Công ty VietRetail",
            rating: 5,
            industry: "Bán lẻ & Thương mại điện tử"
        },
        {
            quote: "Nền tảng phân tích dữ liệu của SGS cho chúng tôi khả năng hiển thị thời gian thực trên 14 kho hàng. Độ chính xác dự báo nhu cầu tăng 40% chỉ trong quý đầu tiên.",
            name: "James Phạm",
            role: "Giám đốc Vận hành, LogiViet",
            rating: 5,
            industry: "Logistics"
        },
        {
            quote: "Chatbot AI họ xây dựng xử lý 70% câu hỏi khách hàng 24/7. Điểm CSAT của chúng tôi tăng từ 3.8 lên 4.7 chỉ sau 6 tháng triển khai.",
            name: "Trần Minh Đức",
            role: "Trưởng bộ phận CSKH, FinTech One",
            rating: 5,
            industry: "Công nghệ Tài chính"
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
