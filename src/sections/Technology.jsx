import { useT } from "../lang.jsx";
import Marquee from "../components/Marquee.jsx";
import {
  ForecastWidget,
  PipelineWidget,
  TerminalWidget,
  StatusWidget,
  LakeWidget,
} from "../components/widgets.jsx";

const TECH = [
  ["AI / ML", "Python"],
  ["AI / ML", "PyTorch"],
  ["AI / ML", "TensorFlow"],
  ["LLM Ops", "LangChain"],
  ["Big Data", "Apache Spark"],
  ["Streaming", "Apache Kafka"],
  ["Cloud", "Kubernetes"],
  ["Cloud", "Terraform"],
  ["Backend", "FastAPI"],
  ["Database", "PostgreSQL"],
  ["Analytics", "dbt"],
  ["Orchestration", "Apache Airflow"],
];

const PROCESS = [
  {
    num: "01",
    title: { en: "Discovery & Audit", vi: "Khám phá & Kiểm tra" },
    time: { en: "Week 1–2", vi: "Tuần 1–2" },
    body: {
      en: "We analyze your existing systems, data quality, and business goals. You receive a free technical assessment report with specific findings — not a sales deck.",
      vi: "Chúng tôi phân tích hệ thống hiện tại, chất lượng dữ liệu và mục tiêu kinh doanh. Bạn nhận báo cáo đánh giá kỹ thuật miễn phí với phát hiện cụ thể — không phải tài liệu bán hàng.",
    },
  },
  {
    num: "02",
    title: { en: "Pilot on Real Data", vi: "Pilot trên dữ liệu thực" },
    time: { en: "Week 3–6", vi: "Tuần 3–6" },
    body: {
      en: "We build a working proof-of-concept on your actual data. You see measurable results before any long-term commitment. If results don't meet agreed targets, we stop — no charge.",
      vi: "Chúng tôi xây proof-of-concept chạy trên dữ liệu thực của bạn. Bạn thấy kết quả đo lường được trước mọi cam kết dài hạn. Nếu kết quả không đạt mục tiêu đã thỏa thuận, chúng tôi dừng — không tính phí.",
    },
  },
  {
    num: "03",
    title: { en: "Full Production Deployment", vi: "Triển khai sản xuất đầy đủ" },
    time: { en: "Month 2–3", vi: "Tháng 2–3" },
    body: {
      en: "Zero-downtime rollout with a structured migration plan. Your team receives hands-on training, full technical documentation, and runbooks for day-to-day operations.",
      vi: "Rollout không gián đoạn với kế hoạch di trú có cấu trúc. Đội của bạn được đào tạo thực hành, tài liệu kỹ thuật đầy đủ và runbook vận hành hàng ngày.",
    },
  },
  {
    num: "04",
    title: { en: "Monitoring & Ongoing Support", vi: "Giám sát & Hỗ trợ liên tục" },
    time: { en: "Month 4+", vi: "Tháng 4+" },
    body: {
      en: "24/7 system monitoring, monthly performance reports, and a named account manager you can reach directly. SLA-backed response times: 15 minutes for P1, 4 hours for P2.",
      vi: "Giám sát hệ thống 24/7, báo cáo hiệu suất hàng tháng và quản lý tài khoản riêng bạn có thể liên hệ trực tiếp. Thời gian phản hồi theo SLA: 15 phút cho P1, 4 giờ cho P2.",
    },
  },
];

const MODULES = [
  {
    num: "01",
    time: { en: "2–4 weeks to first insights", vi: "2–4 tuần có insight đầu tiên" },
    title: { en: "Data Analytics", vi: "Phân tích Dữ liệu" },
    body: {
      en: "SGS Data Analytics connects to your existing data sources — MySQL, PostgreSQL, MongoDB, Google Sheets, or Vietnamese ERP systems — and deploys ML models trained specifically on Southeast Asian market patterns. Clients across retail, logistics, and banking typically see their first measurable insights within 2 weeks. Our platform has processed over 50M data points daily across 30+ production deployments in Vietnam and the region.",
      vi: "SGS Data Analytics kết nối các nguồn dữ liệu hiện có của bạn — MySQL, PostgreSQL, MongoDB, Google Sheets hoặc hệ thống ERP Việt Nam — và triển khai mô hình ML được huấn luyện riêng cho đặc thù thị trường Đông Nam Á. Khách hàng bán lẻ, logistics và ngân hàng thường thấy insight đo lường được đầu tiên trong 2 tuần. Nền tảng đã xử lý hơn 50M điểm dữ liệu mỗi ngày trên 30+ triển khai sản xuất tại Việt Nam và khu vực.",
    },
    chips: ["Python", "TensorFlow", "Apache Spark", "dbt", "PostgreSQL", "Grafana"],
    features: [
      { en: "Real-time Predictive Modeling (demand, churn, fraud)", vi: "Mô hình dự báo thời gian thực (nhu cầu, churn, gian lận)" },
      { en: "Customer Behavior Segmentation & Cohort Analysis", vi: "Phân khúc hành vi khách hàng & phân tích cohort" },
      { en: "Interactive Dashboard — 50+ chart types, mobile-ready", vi: "Dashboard tương tác — 50+ loại biểu đồ, tương thích mobile" },
      { en: "Automated Alerts & Scheduled Report Delivery", vi: "Cảnh báo tự động & gửi báo cáo định kỳ" },
    ],
    stat: { value: "38%", label: { en: "Stockout Reduction", vi: "Giảm hết hàng" } },
    widget: ForecastWidget,
  },
  {
    num: "02",
    time: { en: "4–6 weeks to full deployment", vi: "4–6 tuần triển khai đầy đủ" },
    title: { en: "Automation", vi: "Tự động hóa" },
    body: {
      en: "SGS Automation has digitized over 3,000 manual workflows for enterprises across banking, manufacturing, and logistics in Vietnam and Southeast Asia. Our RPA bots handle invoice processing, KYC verification, and supply chain reporting — operating 24/7 and reducing manual processing time by an average of 78% within the first 90 days. We do not simply deploy off-the-shelf tools: every automation is built and tested against your actual processes before going live.",
      vi: "SGS Automation đã số hóa hơn 3.000 quy trình thủ công cho doanh nghiệp ngân hàng, sản xuất và logistics tại Việt Nam và Đông Nam Á. Robot RPA xử lý hóa đơn, xác minh KYC và báo cáo chuỗi cung ứng — hoạt động 24/7 và giảm trung bình 78% thời gian xử lý thủ công trong 90 ngày đầu. Chúng tôi không đơn thuần triển khai công cụ có sẵn: mọi tự động hóa đều được xây dựng và kiểm thử theo quy trình thực của bạn trước khi go-live.",
    },
    chips: ["UiPath", "Python", "Tesseract OCR", "Apache Airflow", "Node.js", "REST APIs"],
    features: [
      { en: "End-to-end Workflow Orchestration & Scheduling", vi: "Điều phối & lập lịch quy trình end-to-end" },
      { en: "Smart Document Processing — OCR for Vietnamese invoices & contracts", vi: "Xử lý tài liệu thông minh — OCR cho hóa đơn & hợp đồng tiếng Việt" },
      { en: "Adaptive Bot Scaling — handles 10x load spikes without reconfiguration", vi: "Bot mở rộng thích ứng — xử lý tăng đột biến 10 lần không cần cấu hình lại" },
      { en: "Legacy System Integration — connects SAP, MISA, ERP via APIs or screen automation", vi: "Tích hợp hệ thống legacy — kết nối SAP, MISA, ERP qua API hoặc screen automation" },
    ],
    stat: { value: "89%", label: { en: "Time Saved", vi: "Thời gian tiết kiệm" } },
    widget: PipelineWidget,
  },
  {
    num: "03",
    time: { en: "6–10 weeks for custom model", vi: "6–10 tuần cho mô hình tùy chỉnh" },
    title: { en: "AI Technology", vi: "Công nghệ AI" },
    body: {
      en: "SGS AI Core builds production-grade AI systems tailored to Vietnamese and Southeast Asian market needs. We have deployed 45+ custom AI solutions — from multilingual customer support chatbots handling 10,000+ daily queries in Vietnamese, English, and Thai, to computer vision systems detecting manufacturing defects at 60fps on the assembly line. All models are available for on-premises deployment for data-sensitive industries such as banking and healthcare.",
      vi: "SGS AI Core xây hệ thống AI cấp sản xuất theo nhu cầu thị trường Việt Nam và Đông Nam Á. Chúng tôi đã triển khai 45+ giải pháp AI tùy chỉnh — từ chatbot hỗ trợ đa ngôn ngữ xử lý 10.000+ truy vấn mỗi ngày bằng tiếng Việt, tiếng Anh và tiếng Thái, đến hệ thống thị giác máy tính phát hiện lỗi sản xuất ở 60fps trên dây chuyền. Mọi mô hình đều có thể triển khai on-premise cho ngành nhạy cảm dữ liệu như ngân hàng và y tế.",
    },
    chips: ["Python", "PyTorch", "LangChain", "HuggingFace", "FastAPI", "OpenCV"],
    features: [
      { en: "Custom Fine-tuned LLMs on Vietnamese & domain-specific data", vi: "LLM tinh chỉnh riêng trên dữ liệu tiếng Việt & theo ngành" },
      { en: "Computer Vision — defect detection, OCR, facial recognition", vi: "Thị giác máy tính — phát hiện lỗi, OCR, nhận diện khuôn mặt" },
      { en: "Natural Language Understanding with multilingual support (VI/EN/TH/ID)", vi: "Hiểu ngôn ngữ tự nhiên đa ngôn ngữ (VI/EN/TH/ID)" },
      { en: "On-premises & Private Cloud deployment for data-sensitive clients", vi: "Triển khai on-premise & private cloud cho khách hàng nhạy cảm dữ liệu" },
    ],
    stat: { value: "72%", label: { en: "Auto-Resolution", vi: "Tự xử lý" } },
    widget: TerminalWidget,
  },
  {
    num: "04",
    time: { en: "6-week structured migration", vi: "Di trú có cấu trúc 6 tuần" },
    title: { en: "Cloud Computing", vi: "Điện toán đám mây" },
    body: {
      en: "SGS Cloud manages 500+ production environments across AWS, Google Cloud, and Azure for companies in Vietnam and Southeast Asia. Our team maintains SOC 2 Type II compliance for all managed workloads, with 99.98% uptime achieved across all client environments over the past 24 months. On-premise to cloud migrations are executed through a structured 6-week program — with zero downtime for critical systems — and typically reduce cloud spending by 34% through right-sizing and cost governance.",
      vi: "SGS Cloud quản lý 500+ môi trường sản xuất trên AWS, Google Cloud và Azure cho các công ty tại Việt Nam và Đông Nam Á. Đội ngũ duy trì tuân thủ SOC 2 Type II cho mọi workload được quản lý, với 99.98% uptime trên tất cả môi trường khách hàng trong 24 tháng qua. Di trú từ on-premise lên cloud theo chương trình 6 tuần có cấu trúc — không gián đoạn hệ thống trọng yếu — và thường giảm 34% chi phí cloud nhờ right-sizing và quản trị chi phí.",
    },
    chips: ["AWS", "Google Cloud", "Azure", "Kubernetes", "Terraform", "Prometheus"],
    features: [
      { en: "Multi-cloud Orchestration — AWS, GCP, Azure, Viettel Cloud", vi: "Điều phối đa đám mây — AWS, GCP, Azure, Viettel Cloud" },
      { en: "Serverless AI Inference with auto-scaling GPU clusters", vi: "Suy luận AI serverless với cụm GPU tự mở rộng" },
      { en: "SOC 2 Type II & ISO 27001 aligned security operations", vi: "Vận hành bảo mật tuân thủ SOC 2 Type II & ISO 27001" },
      { en: "Kubernetes-native deployment with GitOps (ArgoCD)", vi: "Triển khai Kubernetes-native với GitOps (ArgoCD)" },
    ],
    stat: { value: "41%", label: { en: "Cost Reduction", vi: "Giảm chi phí" } },
    widget: StatusWidget,
  },
  {
    num: "05",
    time: { en: "4–8 weeks pipeline setup", vi: "4–8 tuần dựng pipeline" },
    title: { en: "Big Data Processing", vi: "Xử lý Big Data" },
    body: {
      en: "SGS Big Data pipelines handle time-series streams from manufacturing sensors, financial transaction logs, and behavioral data from digital products — unified into a single data lake architecture. Our distributed systems, built on Apache Spark and Apache Kafka, process billions of events daily with sub-100ms latency for real-time business decisions. Data warehouse migrations are completed with zero downtime, and ongoing pipeline management is included in all contracts.",
      vi: "Pipeline SGS Big Data xử lý luồng time-series từ cảm biến sản xuất, log giao dịch tài chính và dữ liệu hành vi sản phẩm số — hợp nhất trong kiến trúc data lake duy nhất. Hệ thống phân tán trên Apache Spark và Apache Kafka xử lý hàng tỷ sự kiện mỗi ngày với độ trễ dưới 100ms cho quyết định kinh doanh thời gian thực. Di trú kho dữ liệu hoàn tất không gián đoạn, quản lý pipeline liên tục được bao gồm trong mọi hợp đồng.",
    },
    chips: ["Apache Spark", "Apache Kafka", "Delta Lake", "Airflow", "ClickHouse", "dbt"],
    features: [
      { en: "Apache Spark & Kafka pipelines for batch and stream processing", vi: "Pipeline Apache Spark & Kafka cho xử lý batch và stream" },
      { en: "Delta Lake architecture — ACID transactions on petabyte-scale data", vi: "Kiến trúc Delta Lake — giao dịch ACID trên dữ liệu petabyte" },
      { en: "Real-time fraud alerts and anomaly detection under 50ms", vi: "Cảnh báo gian lận & phát hiện bất thường thời gian thực dưới 50ms" },
      { en: "Automated ETL orchestration with Apache Airflow & dbt", vi: "Điều phối ETL tự động với Apache Airflow & dbt" },
    ],
    stat: { value: "31%", label: { en: "Downtime Reduction", vi: "Giảm gián đoạn" } },
    widget: LakeWidget,
  },
];

export default function Technology() {
  const t = useT();

  return (
    <div className="pt-24">
      {/* Header + tech marquee */}
      <section className="relative overflow-hidden border-b border-black/10 dark:border-white/10">
        <div className="hero-bg absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-10 sm:px-6">
          <div className="animate-fade-in-up mono-label">Tech_Stack</div>
          <h2 className="animate-fade-in-up mt-3 text-3xl font-semibold md:text-4xl" style={{ animationDelay: "80ms" }}>
            {t({ en: "Our Technologies", vi: "Công nghệ của chúng tôi" })}
          </h2>
        </div>
        <Marquee fast className="border-t border-black/10 py-4 dark:border-white/10">
          {TECH.map(([cat, name], i) => (
            <span key={i} className="chip mx-2.5">
              <span className="text-primary-glow">{cat}</span> · {name}
            </span>
          ))}
        </Marquee>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="animate-fade-in-up">
          <div className="mono-label">{t({ en: "Our Process", vi: "Quy trình của chúng tôi" })}</div>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
            {t({ en: "How We Deliver", vi: "Chúng tôi triển khai thế nào" })}
          </h2>
          <p className="mt-3 max-w-2xl text-[#5d5d5d] dark:text-[#b4b4b4]">
            {t({
              en: "A structured 4-phase process — from first call to production deployment.",
              vi: "Quy trình 4 giai đoạn có cấu trúc — từ cuộc gọi đầu tiên đến triển khai sản xuất.",
            })}
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p, i) => (
            <div
              key={p.num}
              className="glass animate-fade-in-up relative p-6"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="text-gradient font-mono text-2xl font-medium">{p.num}</span>
                <span className="chip">{t(p.time)}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold leading-snug">{t(p.title)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5d5d5d] dark:text-[#b4b4b4]">
                {t(p.body)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Module detail cards */}
      <section className="border-t border-black/10 py-20 dark:border-white/10">
        <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6">
          {MODULES.map((m, i) => {
            const Widget = m.widget;
            return (
              <article
                key={m.num}
                className="glass animate-fade-in-up grid gap-8 p-6 md:p-8 lg:grid-cols-[1.25fr_1fr]"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="mono-label">Module {m.num}</span>
                    <span className="font-mono text-[11px] text-[#8f8f8f]">{t(m.time)}</span>
                  </div>
                  <h3 className="mt-3 text-2xl font-semibold">{t(m.title)}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#5d5d5d] dark:text-[#b4b4b4]">
                    {t(m.body)}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {m.chips.map((c) => (
                      <span key={c} className="chip">{c}</span>
                    ))}
                  </div>
                  <ul className="mt-6 space-y-2.5">
                    {m.features.map((f, j) => (
                      <li key={j} className="flex gap-2.5 text-sm text-[#5d5d5d] dark:text-[#ececec]">
                        <span className="mt-0.5 text-primary-glow">▸</span>
                        {t(f)}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-baseline gap-3">
                    <span className="text-gradient font-mono text-3xl font-medium">{m.stat.value}</span>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-[#8f8f8f]">
                      {t(m.stat.label)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col justify-between gap-4">
                  <Widget />
                  <div className="text-right font-mono text-xs text-primary-glow">
                    {t({ en: "View Details & ROI", vi: "Xem chi tiết & ROI" })} →
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
