import { useT } from "../lang.jsx";
import {
  AnalyticsWidget,
  ForecastWidget,
  PipelineWidget,
  TerminalWidget,
  StatusWidget,
  LakeWidget,
} from "../components/widgets.jsx";

/* ===== 5 module detail pages — one per technology ===== */

const MODULES = {
  analytics: {
    num: "01",
    widget: AnalyticsWidget,
    title: { en: "Data Analytics", vi: "Phân tích Dữ liệu" },
    lead: {
      en: "Turn the data you already have into decisions you can act on.",
      vi: "Biến dữ liệu vận hành thành thông tin rõ ràng để hỗ trợ quyết định.",
    },
    intro: {
      en: "We assess your data and systems, then scope dashboards and reports around the questions your team needs to answer. Forecasting is covered separately in Module 06.",
      vi: "Chúng tôi đánh giá dữ liệu và hệ thống, sau đó xác định dashboard và báo cáo theo nhu cầu thông tin của đội ngũ. Nội dung dự báo được trình bày riêng tại Module 06.",
    },
    stats: [
      { value: "KPI", label: { en: "Reporting coverage", vi: "Phạm vi báo cáo" } },
      { value: "KPI", label: { en: "Data freshness", vi: "Độ cập nhật dữ liệu" } },
      { value: "KPI", label: { en: "Dashboard usage", vi: "Mức độ sử dụng dashboard" } },
    ],
    chips: ["Python", "TensorFlow", "Apache Spark", "dbt", "PostgreSQL", "Grafana"],
    features: [
      {
        title: { en: "Operational dashboards", vi: "Dashboard vận hành" },
        body: { en: "Bring agreed KPIs and operational signals into a shared, readable view.", vi: "Tổng hợp KPI và chỉ số vận hành đã thống nhất vào một giao diện dễ theo dõi." },
      },
      {
        title: { en: "Business reporting", vi: "Báo cáo kinh doanh" },
        body: { en: "Organize recurring reports around the decisions your team makes.", vi: "Sắp xếp báo cáo định kỳ theo các quyết định đội ngũ cần đưa ra." },
      },
      {
        title: { en: "Live dashboards", vi: "Dashboard trực quan" },
        body: { en: "One screen for the whole operation. Works on mobile.", vi: "Một màn hình cho toàn bộ vận hành. Dùng tốt trên mobile." },
      },
      {
        title: { en: "Auto alerts & reports", vi: "Cảnh báo & báo cáo tự động" },
        body: { en: "The right number reaches the right person on time.", vi: "Con số đúng đến đúng người, đúng lúc." },
      },
    ],
    steps: [
      { title: { en: "Connect", vi: "Kết nối" }, body: { en: "Plug into MySQL, PostgreSQL, MongoDB, Sheets or local ERP.", vi: "Cắm vào MySQL, PostgreSQL, MongoDB, Sheets hoặc ERP nội địa." } },
      { title: { en: "Prepare data", vi: "Chuẩn bị dữ liệu" }, body: { en: "Review data quality, KPI definitions and reporting needs before building the agreed views.", vi: "Rà soát chất lượng dữ liệu, định nghĩa KPI và nhu cầu báo cáo trước khi xây dựng các giao diện đã thống nhất." } },
      { title: { en: "Decide", vi: "Quyết định" }, body: { en: "Dashboards and alerts your team checks every morning.", vi: "Dashboard và cảnh báo đội bạn mở mỗi sáng." } },
    ],
    successMeasures: {
      label: { en: "Pilot success measures", vi: "Chỉ số đánh giá pilot" },
      result: { en: "Baseline → agreed target", vi: "Mức cơ sở → mục tiêu thống nhất" },
      body: {
        en: "Review reporting coverage, data freshness and dashboard usage against an agreed baseline. Measures are finalized after reviewing data quality and scope.",
        vi: "Đánh giá phạm vi báo cáo, độ cập nhật dữ liệu và mức độ sử dụng dashboard so với mức cơ sở đã thống nhất. Chỉ số được chốt sau khi xem xét chất lượng dữ liệu và phạm vi.",
      },
    },
  },

  automation: {
    num: "02",
    widget: PipelineWidget,
    title: { en: "Automation", vi: "Tự động hóa" },
    lead: {
      en: "Hand the repetitive work to software. Your team focuses on what matters.",
      vi: "Giao việc lặp lại cho phần mềm. Đội bạn tập trung việc quan trọng.",
    },
    intro: {
      en: "From invoices to KYC: we assess manual workflows and design automation around your systems. A pilot measures cycle time, manual effort and exception rates against a baseline.",
      vi: "Từ hóa đơn đến KYC: chúng tôi đánh giá quy trình thủ công và thiết kế tự động hóa theo hệ thống hiện có. Pilot đo thời gian xử lý, công sức thủ công và tỷ lệ ngoại lệ so với mức cơ sở.",
    },
    stats: [
      { value: "KPI", label: { en: "Cycle time", vi: "Thời gian xử lý" } },
      { value: "KPI", label: { en: "Manual effort", vi: "Công sức thủ công" } },
      { value: "KPI", label: { en: "Exception rate", vi: "Tỷ lệ ngoại lệ" } },
    ],
    chips: ["UiPath", "Python", "Tesseract OCR", "Apache Airflow", "Node.js", "REST APIs"],
    features: [
      {
        title: { en: "Document processing", vi: "Xử lý tài liệu" },
        body: { en: "OCR can extract fields from Vietnamese documents; accuracy is tested on representative samples.", vi: "OCR có thể trích xuất trường dữ liệu từ tài liệu tiếng Việt; độ chính xác được kiểm thử trên mẫu đại diện." },
      },
      {
        title: { en: "Workflow orchestration", vi: "Điều phối quy trình" },
        body: { en: "Every step scheduled, tracked and logged end-to-end.", vi: "Mọi bước được lập lịch, theo dõi, ghi log end-to-end." },
      },
      {
        title: { en: "Legacy integration", vi: "Tích hợp hệ thống cũ" },
        body: { en: "Connects SAP, MISA, ERP via API or screen automation.", vi: "Nối SAP, MISA, ERP qua API hoặc screen automation." },
      },
      {
        title: { en: "Elastic scale", vi: "Mở rộng linh hoạt" },
        body: { en: "Capacity and exception handling are designed around expected workload and peak-volume requirements.", vi: "Năng lực xử lý và cách xử lý ngoại lệ được thiết kế theo tải dự kiến và nhu cầu cao điểm." },
      },
    ],
    steps: [
      { title: { en: "Map", vi: "Phác họa" }, body: { en: "We document your current process step by step.", vi: "Chúng tôi ghi lại quy trình hiện tại từng bước." } },
      { title: { en: "Automate", vi: "Tự động hóa" }, body: { en: "Bots built and tested against your real workflow.", vi: "Bot dựng và kiểm thử trên quy trình thực của bạn." } },
      { title: { en: "Monitor", vi: "Giám sát" }, body: { en: "Every run logged, exceptions flagged to a human.", vi: "Mỗi lần chạy có log, ngoại lệ báo cho người xử lý." } },
    ],
    successMeasures: {
      label: { en: "Pilot success measures", vi: "Chỉ số đánh giá pilot" },
      result: { en: "Baseline → agreed target", vi: "Mức cơ sở → mục tiêu thống nhất" },
      body: {
        en: "Measure end-to-end processing time, manual touchpoints and exception handling on an agreed sample of real documents.",
        vi: "Đo thời gian xử lý đầu-cuối, số bước cần thao tác thủ công và cách xử lý ngoại lệ trên mẫu chứng từ thực tế đã thống nhất.",
      },
    },
  },

  ai: {
    num: "03",
    widget: TerminalWidget,
    title: { en: "AI Technology", vi: "Công nghệ AI" },
    lead: {
      en: "Evaluate AI for your language, industry and use case.",
      vi: "Đánh giá AI theo ngôn ngữ, ngành và bài toán của bạn.",
    },
    intro: {
      en: "We assess whether a language model or computer-vision system fits your use case, then evaluate it against representative domain examples. Deployment options depend on data and security requirements.",
      vi: "Chúng tôi đánh giá mức độ phù hợp của LLM hoặc hệ thống thị giác máy tính với bài toán, sau đó kiểm thử trên ví dụ đại diện của ngành. Phương án triển khai phụ thuộc vào yêu cầu dữ liệu và bảo mật.",
    },
    stats: [
      { value: "KPI", label: { en: "Answer quality", vi: "Chất lượng câu trả lời" } },
      { value: "KPI", label: { en: "Resolution rate", vi: "Tỷ lệ xử lý thành công" } },
      { value: "KPI", label: { en: "Safe human handoff", vi: "Chuyển tiếp an toàn" } },
    ],
    chips: ["Python", "PyTorch", "LangChain", "HuggingFace", "FastAPI", "OpenCV"],
    features: [
      {
        title: { en: "Fine-tuned LLMs", vi: "LLM tinh chỉnh riêng" },
        body: { en: "Evaluate Vietnamese fluency and domain terminology on examples supplied or approved by your team.", vi: "Đánh giá độ tự nhiên tiếng Việt và thuật ngữ ngành trên ví dụ do đội ngũ của bạn cung cấp hoặc phê duyệt." },
      },
      {
        title: { en: "Computer vision", vi: "Thị giác máy tính" },
        body: { en: "Defect detection on the line, OCR, recognition.", vi: "Phát hiện lỗi trên dây chuyền, OCR, nhận diện." },
      },
      {
        title: { en: "Multilingual NLU", vi: "Hiểu ngôn ngữ tự nhiên" },
        body: { en: "Language coverage and quality are defined for the languages required by your use case.", vi: "Phạm vi ngôn ngữ và chất lượng được xác định theo yêu cầu của bài toán." },
      },
      {
        title: { en: "On-premise option", vi: "Tùy chọn on-premise" },
        body: { en: "Full deployment inside your own infrastructure.", vi: "Triển khai trọn vẹn trong hạ tầng của bạn." },
      },
    ],
    steps: [
      { title: { en: "Define", vi: "Xác định" }, body: { en: "Pin down the exact task and success metric.", vi: "Chốt đúng nhiệm vụ và chỉ số thành công." } },
      { title: { en: "Train", vi: "Huấn luyện" }, body: { en: "Fine-tune on your data, test on your cases.", vi: "Tinh chỉnh trên dữ liệu của bạn, kiểm thử trên case của bạn." } },
      { title: { en: "Ship", vi: "Triển khai" }, body: { en: "Cloud or on-premise — with monitoring from day one.", vi: "Cloud hoặc on-premise — có giám sát từ ngày đầu." } },
    ],
    successMeasures: {
      label: { en: "Pilot success measures", vi: "Chỉ số đánh giá pilot" },
      result: { en: "Baseline → agreed target", vi: "Mức cơ sở → mục tiêu thống nhất" },
      body: {
        en: "Evaluate answer quality, task resolution, escalation accuracy and user feedback on representative conversations.",
        vi: "Đánh giá chất lượng câu trả lời, khả năng xử lý yêu cầu, độ chính xác khi chuyển tiếp và phản hồi người dùng trên hội thoại đại diện.",
      },
    },
  },

  cloud: {
    num: "04",
    widget: StatusWidget,
    title: { en: "Cloud Computing", vi: "Điện toán đám mây" },
    lead: {
      en: "Plan a cloud migration around continuity, cost and availability requirements.",
      vi: "Lập kế hoạch di trú cloud theo yêu cầu duy trì vận hành, chi phí và tính sẵn sàng.",
    },
    intro: {
      en: "We assess cloud architecture, workloads and operating requirements across AWS, Google Cloud and Azure. Migration scope, schedule and potential savings depend on the current environment.",
      vi: "Chúng tôi đánh giá kiến trúc cloud, workload và yêu cầu vận hành trên AWS, Google Cloud và Azure. Phạm vi di trú, lịch trình và cơ hội tiết kiệm phụ thuộc vào môi trường hiện tại.",
    },
    stats: [
      { value: "KPI", label: { en: "Availability", vi: "Tính sẵn sàng" } },
      { value: "KPI", label: { en: "Cloud spend", vi: "Chi phí cloud" } },
      { value: "KPI", label: { en: "Migration risk", vi: "Rủi ro di trú" } },
    ],
    chips: ["AWS", "Google Cloud", "Azure", "Kubernetes", "Terraform", "Prometheus"],
    features: [
      {
        title: { en: "Migration continuity planning", vi: "Lập kế hoạch duy trì vận hành khi di trú" },
        body: { en: "Continuity and cutover plans are designed to minimize disruption; achievable service windows are agreed for each workload.", vi: "Kế hoạch duy trì và chuyển đổi được thiết kế để giảm gián đoạn; khung thời gian dịch vụ được thống nhất cho từng workload." },
      },
      {
        title: { en: "Multi-cloud orchestration", vi: "Điều phối đa đám mây" },
        body: { en: "AWS, GCP, Azure, Viettel Cloud — one control plane.", vi: "AWS, GCP, Azure, Viettel Cloud — một mặt trận thống nhất." },
      },
      {
        title: { en: "Auto-scaling AI serving", vi: "Phục vụ AI tự mở rộng" },
        body: { en: "GPU clusters that stretch with demand.", vi: "Cụm GPU giãn theo nhu cầu." },
      },
      {
        title: { en: "Security operations", vi: "Vận hành bảo mật" },
        body: { en: "Security controls and monitoring are scoped to your environment and documented requirements.", vi: "Kiểm soát bảo mật và giám sát được xác định theo môi trường và yêu cầu đã thống nhất." },
      },
    ],
    steps: [
      { title: { en: "Assess", vi: "Đánh giá" }, body: { en: "Inventory workloads, pick the right targets.", vi: "Kiểm kê workload, chọn đúng đích chuyển." } },
      { title: { en: "Migrate", vi: "Di trú" }, body: { en: "Use a structured, rehearsed plan with service windows agreed for each workload.", vi: "Thực hiện theo kế hoạch có cấu trúc, được diễn tập; thống nhất khung thời gian dịch vụ cho từng workload." } },
      { title: { en: "Optimize", vi: "Tối ưu" }, body: { en: "Right-size and govern cost continuously.", vi: "Right-size và quản trị chi phí liên tục." } },
    ],
    successMeasures: {
      label: { en: "Pilot success measures", vi: "Chỉ số đánh giá pilot" },
      result: { en: "Baseline → agreed target", vi: "Mức cơ sở → mục tiêu thống nhất" },
      body: {
        en: "Compare cloud spend, availability and operational effort with the agreed baseline, while documenting migration risks and dependencies.",
        vi: "So sánh chi phí cloud, tính sẵn sàng và công sức vận hành với mức cơ sở đã thống nhất, đồng thời ghi nhận rủi ro và điều kiện phụ thuộc khi di trú.",
      },
    },
  },

  bigdata: {
    num: "05",
    widget: LakeWidget,
    title: { en: "Big Data Processing", vi: "Xử lý Big Data" },
    lead: {
      en: "Bring data sources together in an architecture designed for your workload.",
      vi: "Hợp nhất các nguồn dữ liệu trong kiến trúc phù hợp với workload.",
    },
    intro: {
      en: "Unify sensor streams, transaction logs and product events with a governed data architecture. Throughput and latency targets are set against your expected workload.",
      vi: "Hợp nhất luồng cảm biến, log giao dịch và sự kiện sản phẩm trong kiến trúc dữ liệu có quản trị. Mục tiêu thông lượng và độ trễ được xác định theo tải dự kiến.",
    },
    stats: [
      { value: "KPI", label: { en: "Event latency", vi: "Độ trễ sự kiện" } },
      { value: "KPI", label: { en: "Pipeline reliability", vi: "Độ tin cậy pipeline" } },
      { value: "KPI", label: { en: "Data quality", vi: "Chất lượng dữ liệu" } },
    ],
    chips: ["Apache Spark", "Apache Kafka", "Delta Lake", "Airflow", "ClickHouse", "dbt"],
    features: [
      {
        title: { en: "Batch + streaming", vi: "Batch + streaming" },
        body: { en: "Spark and Kafka pipelines for both worlds.", vi: "Pipeline Spark và Kafka cho cả hai thế giới." },
      },
      {
        title: { en: "Lakehouse architecture", vi: "Kiến trúc lakehouse" },
        body: { en: "Architecture and storage options are selected for your workload, consistency and retention requirements.", vi: "Kiến trúc và phương án lưu trữ được lựa chọn theo tải, yêu cầu nhất quán và thời gian lưu dữ liệu." },
      },
      {
        title: { en: "Real-time detection", vi: "Phát hiện thời gian thực" },
        body: { en: "Fraud and anomaly detection targets are validated against representative data and latency requirements.", vi: "Mục tiêu phát hiện gian lận và bất thường được kiểm chứng bằng dữ liệu đại diện và yêu cầu độ trễ." },
      },
      {
        title: { en: "Managed ETL", vi: "ETL được quản lý" },
        body: { en: "Airflow + dbt orchestration, fully operated by us.", vi: "Điều phối Airflow + dbt, chúng tôi vận hành trọn." },
      },
    ],
    steps: [
      { title: { en: "Unify", vi: "Hợp nhất" }, body: { en: "Every source lands in one governed lake.", vi: "Mọi nguồn dữ liệu về một lake được quản trị." } },
      { title: { en: "Process", vi: "Xử lý" }, body: { en: "Batch and streams, automated and monitored.", vi: "Batch và stream, tự động và được giám sát." } },
      { title: { en: "Serve", vi: "Phục vụ" }, body: { en: "Fast queries where decisions are made.", vi: "Truy vấn nhanh ngay nơi ra quyết định." } },
    ],
    successMeasures: {
      label: { en: "Pilot success measures", vi: "Chỉ số đánh giá pilot" },
      result: { en: "Baseline → agreed target", vi: "Mức cơ sở → mục tiêu thống nhất" },
      body: {
        en: "Measure event latency, data completeness and pipeline recovery against agreed workload and service requirements.",
        vi: "Đo độ trễ sự kiện, mức đầy đủ dữ liệu và khả năng khôi phục pipeline theo tải và yêu cầu dịch vụ đã thống nhất.",
      },
    },
  },

  forecast: {
    num: "06",
    widget: ForecastWidget,
    title: { en: "Demand Forecasting", vi: "Dự báo nhu cầu" },
    partner: {
      label: { en: "Forecasting partner", vi: "Đối tác dự báo" },
      name: "GMDH Streamline",
    },
    lead: {
      en: "Use demand history to support inventory and replenishment planning.",
      vi: "Khai thác lịch sử nhu cầu để hỗ trợ lập kế hoạch tồn kho và bổ sung hàng.",
    },
    intro: {
      en: "This module is delivered with forecasting partner GMDH Streamline. We review sales or order history, seasonality, lead times and other available business signals. Forecast scope, planning horizon and system connections depend on data readiness and your workflow.",
      vi: "Module này được triển khai cùng đối tác dự báo GMDH Streamline. Chúng tôi xem xét lịch sử bán hàng hoặc đơn hàng, mùa vụ, thời gian cung ứng và các tín hiệu kinh doanh sẵn có. Phạm vi dự báo, kỳ hạn và kết nối hệ thống phụ thuộc vào mức độ sẵn sàng của dữ liệu và quy trình lập kế hoạch.",
    },
    stats: [
      { value: "KPI", label: { en: "Forecast error", vi: "Sai số dự báo" } },
      { value: "KPI", label: { en: "Forecast bias", vi: "Độ lệch dự báo" } },
      { value: "KPI", label: { en: "SKU / period coverage", vi: "Phạm vi SKU / kỳ dự báo" } },
    ],
    chips: ["GMDH Streamline", "Python", "SQL", "POS / ERP data", "Inventory systems"],
    features: [
      {
        title: { en: "Historical demand patterns", vi: "Mẫu hình nhu cầu lịch sử" },
        body: { en: "Assess sales and order history by product, location and time period where the data supports that level of detail.", vi: "Phân tích lịch sử bán hàng và đơn đặt theo sản phẩm, địa điểm, khoảng thời gian khi dữ liệu đáp ứng được mức chi tiết đó." },
      },
      {
        title: { en: "Seasonality and business signals", vi: "Mùa vụ và tín hiệu kinh doanh" },
        body: { en: "Test whether calendar effects, promotions, stock availability or lead times can be used reliably in the forecast.", vi: "Kiểm tra khả năng sử dụng các yếu tố lịch, khuyến mãi, tình trạng hàng và thời gian cung ứng trong dự báo." },
      },
      {
        title: { en: "Backtesting against a baseline", vi: "Kiểm thử so với mức cơ sở" },
        body: { en: "Compare candidate forecasts with a simple baseline on agreed products, periods and planning horizons before selecting an approach.", vi: "So sánh các phương án dự báo với mức cơ sở đơn giản trên sản phẩm, kỳ dữ liệu và khoảng hoạch định đã thống nhất trước khi chọn cách tiếp cận." },
      },
      {
        title: { en: "Planning workflow fit", vi: "Phù hợp quy trình hoạch định" },
        body: { en: "Shape forecast outputs for review by planners and assess spreadsheet, API or enterprise-system connections where available.", vi: "Định dạng kết quả để nhân sự hoạch định xem xét và đánh giá khả năng kết nối bảng tính, API hoặc hệ thống doanh nghiệp nếu có." },
      },
    ],
    steps: [
      { title: { en: "Review data", vi: "Rà soát dữ liệu" }, body: { en: "Check history, granularity, missing periods and the planning decisions the forecast should support.", vi: "Kiểm tra dữ liệu lịch sử, mức chi tiết, kỳ bị thiếu và quyết định hoạch định mà dự báo cần hỗ trợ." } },
      { title: { en: "Backtest options", vi: "Kiểm thử phương án" }, body: { en: "Compare suitable methods with a baseline using agreed products, time periods and evaluation measures.", vi: "So sánh phương pháp phù hợp với mức cơ sở trên sản phẩm, khoảng thời gian và chỉ số đánh giá đã thống nhất." } },
      { title: { en: "Review and integrate", vi: "Rà soát và tích hợp" }, body: { en: "Review forecasts with your team, then scope how approved outputs fit the existing planning workflow.", vi: "Cùng đội ngũ rà soát dự báo, sau đó xác định cách đưa kết quả đã duyệt vào quy trình hoạch định hiện có." } },
    ],
    successMeasures: {
      label: { en: "Pilot success measures", vi: "Chỉ số đánh giá pilot" },
      result: { en: "Baseline → agreed target", vi: "Mức cơ sở → mục tiêu thống nhất" },
      body: {
        en: "Backtest forecast error, bias and coverage against an agreed baseline by product and horizon. Set targets only after reviewing data quality, planning context and pilot scope.",
        vi: "Kiểm thử sai số, độ lệch và phạm vi dự báo so với mức cơ sở đã thống nhất theo sản phẩm và kỳ hạn. Chỉ xác định mục tiêu sau khi xem xét chất lượng dữ liệu, bối cảnh hoạch định và phạm vi pilot.",
      },
    },
  },
};

const ORDER = ["analytics", "automation", "ai", "cloud", "bigdata", "forecast"];

export default function TechDetail({ module, onNavigate }) {
  const t = useT();
  const key = module in MODULES ? module : "analytics";
  const m = MODULES[key];
  const Widget = m.widget;
  const idx = ORDER.indexOf(key);
  const prev = ORDER[(idx - 1 + ORDER.length) % ORDER.length];
  const next = ORDER[(idx + 1) % ORDER.length];

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="border-b border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-10 sm:px-6">
          <button
            onClick={() => onNavigate("tech")}
            className="chip mb-6 hover:border-primary-glow/60"
          >
            ← {t({ en: "All technologies", vi: "Tất cả công nghệ" })}
          </button>
          <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="mono-label">Module {m.num}</div>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                {t(m.title)}
              </h1>
              {m.partner && (
                <div className="mt-4 inline-flex flex-wrap items-center gap-2 rounded-full border border-primary-glow/30 bg-primary/5 px-3 py-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#8f8f8f]">{t(m.partner.label)}</span>
                  <span className="text-sm font-semibold text-primary-glow">{m.partner.name}</span>
                </div>
              )}
              <p className="mt-4 text-lg leading-relaxed text-[#5d5d5d] dark:text-[#b4b4b4]">
                {t(m.lead)}
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#5d5d5d] dark:text-[#b4b4b4]">
                {t(m.intro)}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {m.chips.map((c) => (
                  <span key={c} className="chip">{c}</span>
                ))}
              </div>
            </div>
            <div className="animate-fade-in-up">
              <Widget />
            </div>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-3">
            {m.stats.map((s, i) => (
              <div key={i} className="glass animate-fade-in-up p-4 text-center" style={{ animationDelay: `\${i * 80}ms` }}>
                <div className="font-mono text-xl font-medium text-primary-glow md:text-2xl">{s.value}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[#8f8f8f]">{t(s.label)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mono-label">{t({ en: "What you get", vi: "Bạn nhận được gì" })}</div>
        <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
          {t({ en: "Core capabilities", vi: "Năng lực cốt lõi" })}
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {m.features.map((f, i) => (
            <div key={i} className="glass animate-fade-in-up p-6" style={{ animationDelay: `\${i * 80}ms` }}>
              <h3 className="text-base font-semibold">▸ {t(f.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5d5d5d] dark:text-[#b4b4b4]">{t(f.body)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-black/10 bg-canvas-subtle/60 py-16 dark:border-white/10 dark:bg-canvas-subtle">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mono-label">{t({ en: "How it works", vi: "Cách vận hành" })}</div>
          <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
            {t({ en: "Three steps to value", vi: "Ba bước tạo giá trị" })}
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {m.steps.map((s, i) => (
              <div key={i} className="glass animate-fade-in-up p-6" style={{ animationDelay: `\${i * 90}ms` }}>
                <div className="text-gradient font-mono text-3xl font-medium">0{i + 1}</div>
                <h3 className="mt-3 text-lg font-semibold">{t(s.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5d5d5d] dark:text-[#b4b4b4]">{t(s.body)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pilot measures + CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass-high animate-fade-in-up p-8">
            <div className="mono-label">{t(m.successMeasures.label)}</div>
            <div className="mt-4 inline-flex rounded-full border border-primary-glow/30 bg-primary/10 px-3 py-1 font-mono text-sm text-primary-glow">
              {t(m.successMeasures.result)}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#5d5d5d] dark:text-[#ececec]">
              {t(m.successMeasures.body)}
            </p>
          </div>
          <div className="glass-high animate-fade-in-up flex flex-col justify-center p-8 text-center">
            <h3 className="text-2xl font-semibold">
              {t({ en: "Discuss a pilot for your data.", vi: "Trao đổi về pilot trên dữ liệu của bạn." })}
            </h3>
            <p className="mt-3 text-sm text-[#5d5d5d] dark:text-[#b4b4b4]">
              {t({
                en: "Start with a 30-minute introductory conversation. Assessment scope and any fees are agreed separately.",
                vi: "Bắt đầu bằng buổi trao đổi ban đầu 30 phút. Phạm vi đánh giá và chi phí (nếu có) được thống nhất riêng.",
              })}
            </p>
            <button className="btn-primary btn-shine mx-auto mt-6" onClick={() => onNavigate("contact")}>
              {t({ en: "Book an intro call", vi: "Đặt lịch trao đổi" })}
            </button>
          </div>
        </div>
      </section>

      {/* Prev / Next */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="grid gap-4 md:grid-cols-2">
          <button onClick={() => onNavigate("tech-" + prev)} className="glass p-5 text-left transition-colors hover:border-primary-glow/40">
            <div className="mono-label">← {t({ en: "Previous", vi: "Trước" })}</div>
            <div className="mt-2 text-lg font-semibold">{t(MODULES[prev].title)}</div>
          </button>
          <button onClick={() => onNavigate("tech-" + next)} className="glass p-5 text-right transition-colors hover:border-primary-glow/40">
            <div className="mono-label">{t({ en: "Next", vi: "Tiếp" })} →</div>
            <div className="mt-2 text-lg font-semibold">{t(MODULES[next].title)}</div>
          </button>
        </div>
      </section>
    </div>
  );
}
