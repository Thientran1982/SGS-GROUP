import { useT } from "../lang.jsx";
import {
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
    widget: ForecastWidget,
    title: { en: "Data Analytics", vi: "Phân tích Dữ liệu" },
    lead: {
      en: "Turn the data you already have into decisions you can act on.",
      vi: "Biến dữ liệu sẵn có thành quyết định có thể hành động ngay.",
    },
    intro: {
      en: "We connect to your existing systems, build clean pipelines, and deliver dashboards your team actually uses. First insights land in 2–4 weeks.",
      vi: "Chúng tôi kết nối hệ thống hiện có, dựng pipeline sạch và giao dashboard đội bạn thực sự dùng. Insight đầu tiên có trong 2–4 tuần.",
    },
    stats: [
      { value: "38%", label: { en: "Fewer stockouts", vi: "Giảm hết hàng" } },
      { value: "2–4 wks", label: { en: "First insight", vi: "Insight đầu tiên" } },
      { value: "50M+", label: { en: "Data points/day", vi: "Điểm dữ liệu/ngày" } },
    ],
    chips: ["Python", "TensorFlow", "Apache Spark", "dbt", "PostgreSQL", "Grafana"],
    features: [
      {
        title: { en: "Predictive models", vi: "Mô hình dự báo" },
        body: { en: "Demand, churn and fraud — tuned to your market.", vi: "Nhu cầu, churn, gian lận — tinh chỉnh theo thị trường của bạn." },
      },
      {
        title: { en: "Customer segmentation", vi: "Phân khúc khách hàng" },
        body: { en: "See who buys, who leaves, and why.", vi: "Biết ai mua, ai rời bỏ và vì sao." },
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
      { title: { en: "Clean & model", vi: "Làm sạch & dựng mô hình" }, body: { en: "Data quality check, then ML trained on your numbers.", vi: "Kiểm tra chất lượng dữ liệu, rồi huấn luyện ML trên số liệu của bạn." } },
      { title: { en: "Decide", vi: "Quyết định" }, body: { en: "Dashboards and alerts your team checks every morning.", vi: "Dashboard và cảnh báo đội bạn mở mỗi sáng." } },
    ],
    caseStudy: {
      label: { en: "Case: Retail chain, 14 warehouses", vi: "Case: Chuỗi bán lẻ, 14 kho" },
      result: "+40%",
      body: {
        en: "Demand forecast accuracy up 40% in the first quarter. Inventory visibility in real time across all warehouses.",
        vi: "Độ chính xác dự báo nhu cầu tăng 40% trong quý đầu. Nhìn tồn kho thời gian thực trên mọi kho.",
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
      en: "From invoices to KYC: we digitize manual workflows with bots that run 24/7. Average processing time drops 78% in the first 90 days.",
      vi: "Từ hóa đơn đến KYC: chúng tôi số hóa quy trình thủ công bằng bot chạy 24/7. Thời gian xử lý giảm trung bình 78% trong 90 ngày đầu.",
    },
    stats: [
      { value: "78%", label: { en: "Faster processing", vi: "Xử lý nhanh hơn" } },
      { value: "3,000+", label: { en: "Workflows digitized", vi: "Quy trình đã số hóa" } },
      { value: "24/7", label: { en: "Bot uptime", vi: "Bot hoạt động" } },
    ],
    chips: ["UiPath", "Python", "Tesseract OCR", "Apache Airflow", "Node.js", "REST APIs"],
    features: [
      {
        title: { en: "Document processing", vi: "Xử lý tài liệu" },
        body: { en: "OCR reads Vietnamese invoices and contracts correctly.", vi: "OCR đọc đúng hóa đơn, hợp đồng tiếng Việt." },
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
        body: { en: "10× load spike? Bots stretch without reconfiguration.", vi: "Tăng gấp 10 lần nhu cầu? Bot co giãn không cần cấu hình lại." },
      },
    ],
    steps: [
      { title: { en: "Map", vi: "Phác họa" }, body: { en: "We document your current process step by step.", vi: "Chúng tôi ghi lại quy trình hiện tại từng bước." } },
      { title: { en: "Automate", vi: "Tự động hóa" }, body: { en: "Bots built and tested against your real workflow.", vi: "Bot dựng và kiểm thử trên quy trình thực của bạn." } },
      { title: { en: "Monitor", vi: "Giám sát" }, body: { en: "Every run logged, exceptions flagged to a human.", vi: "Mỗi lần chạy có log, ngoại lệ báo cho người xử lý." } },
    ],
    caseStudy: {
      label: { en: "Case: Retail finance team", vi: "Case: Đội tài chính bán lẻ" },
      result: "3 days → 2 hrs",
      body: {
        en: "Invoice processing went from 3 days to under 2 hours. The finance team moved from data entry to strategy.",
        vi: "Xử lý hóa đơn từ 3 ngày xuống dưới 2 giờ. Đội tài chính chuyển từ nhập liệu sang chiến lược.",
      },
    },
  },

  ai: {
    num: "03",
    widget: TerminalWidget,
    title: { en: "AI Technology", vi: "Công nghệ AI" },
    lead: {
      en: "AI trained on your language, your industry, your data.",
      vi: "AI được huấn luyện theo ngôn ngữ, ngành và dữ liệu của bạn.",
    },
    intro: {
      en: "Not a generic API bolted onto a generic model. We fine-tune LLMs and build computer-vision systems for Vietnamese and regional use — deployable on-premise when data is sensitive.",
      vi: "Không phải API chung cắm vào mô hình chung. Chúng tôi tinh chỉnh LLM và dựng hệ thống thị giác máy tính cho nhu cầu Việt Nam và khu vực — triển khai on-premise khi dữ liệu nhạy cảm.",
    },
    stats: [
      { value: "45+", label: { en: "Custom AI systems", vi: "Hệ thống AI riêng" } },
      { value: "70%", label: { en: "Tickets auto-resolved", vi: "Tự xử lý yêu cầu" } },
      { value: "10k+", label: { en: "Queries/day served", vi: "Truy vấn/ngày" } },
    ],
    chips: ["Python", "PyTorch", "LangChain", "HuggingFace", "FastAPI", "OpenCV"],
    features: [
      {
        title: { en: "Fine-tuned LLMs", vi: "LLM tinh chỉnh riêng" },
        body: { en: "Fluent Vietnamese and domain-specific vocabulary.", vi: "Tiếng Việt trôi chảy, đúng thuật ngữ ngành." },
      },
      {
        title: { en: "Computer vision", vi: "Thị giác máy tính" },
        body: { en: "Defect detection on the line, OCR, recognition.", vi: "Phát hiện lỗi trên dây chuyền, OCR, nhận diện." },
      },
      {
        title: { en: "Multilingual NLU", vi: "Hiểu ngôn ngữ tự nhiên" },
        body: { en: "VI / EN / TH / ID in one system.", vi: "VI / EN / TH / ID trong một hệ thống." },
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
    caseStudy: {
      label: { en: "Case: FinTech support center", vi: "Case: Trung tâm CSKH FinTech" },
      result: "CSAT 3.8 → 4.7",
      body: {
        en: "An AI assistant now answers 70% of customer questions around the clock. Satisfaction rose within six months.",
        vi: "Trợ lý AI hiện trả lời 70% câu hỏi khách hàng suốt ngày đêm. Mức hài lòng tăng trong 6 tháng.",
      },
    },
  },

  cloud: {
    num: "04",
    widget: StatusWidget,
    title: { en: "Cloud Computing", vi: "Điện toán đám mây" },
    lead: {
      en: "Move to the cloud without downtime — and pay less after.",
      vi: "Lên đám mây không gián đoạn — và trả ít hơn sau đó.",
    },
    intro: {
      en: "We manage 500+ production environments on AWS, Google Cloud and Azure. Migrations run on a structured 6-week program; costs typically drop 34% through right-sizing.",
      vi: "Chúng tôi quản lý 500+ môi trường sản xuất trên AWS, Google Cloud và Azure. Di trú theo lộ trình 6 tuần có cấu trúc; chi phí thường giảm 34% nhờ right-sizing.",
    },
    stats: [
      { value: "99.98%", label: { en: "Uptime SLA", vi: "Uptime SLA" } },
      { value: "500+", label: { en: "Environments managed", vi: "Môi trường quản lý" } },
      { value: "−34%", label: { en: "Cloud cost", vi: "Chi phí cloud" } },
    ],
    chips: ["AWS", "Google Cloud", "Azure", "Kubernetes", "Terraform", "Prometheus"],
    features: [
      {
        title: { en: "Zero-downtime migration", vi: "Di trú không gián đoạn" },
        body: { en: "Critical systems stay online through the move.", vi: "Hệ thống trọng yếu vẫn chạy suốt quá trình chuyển." },
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
        body: { en: "SOC 2 & ISO 27001 aligned practices, monitoring 24/7.", vi: "Thực hành tuân thủ SOC 2 & ISO 27001, giám sát 24/7." },
      },
    ],
    steps: [
      { title: { en: "Assess", vi: "Đánh giá" }, body: { en: "Inventory workloads, pick the right targets.", vi: "Kiểm kê workload, chọn đúng đích chuyển." } },
      { title: { en: "Migrate", vi: "Di trú" }, body: { en: "Structured plan, rehearsed, zero downtime.", vi: "Kế hoạch có cấu trúc, diễn tập trước, không gián đoạn." } },
      { title: { en: "Optimize", vi: "Tối ưu" }, body: { en: "Right-size and govern cost continuously.", vi: "Right-size và quản trị chi phí liên tục." } },
    ],
    caseStudy: {
      label: { en: "Case: Manufacturing group", vi: "Case: Tập đoàn sản xuất" },
      result: "−41%",
      body: {
        en: "Cloud bill down 41% in the first year after migration — with faster release cycles.",
        vi: "Hóa đơn cloud giảm 41% năm đầu sau di trú — kèm chu trình ra mắt nhanh hơn.",
      },
    },
  },

  bigdata: {
    num: "05",
    widget: LakeWidget,
    title: { en: "Big Data Processing", vi: "Xử lý Big Data" },
    lead: {
      en: "All your data, one lake, real-time answers.",
      vi: "Toàn bộ dữ liệu của bạn, một data lake, câu trả lời thời gian thực.",
    },
    intro: {
      en: "Sensor streams, transaction logs, product events — unified on Spark and Kafka. Billions of events a day, under 100ms latency for real-time decisions.",
      vi: "Luồng cảm biến, log giao dịch, sự kiện sản phẩm — hợp nhất trên Spark và Kafka. Hàng tỷ sự kiện mỗi ngày, độ trễ dưới 100ms cho quyết định thời gian thực.",
    },
    stats: [
      { value: "<100ms", label: { en: "Stream latency", vi: "Độ trễ luồng" } },
      { value: "85PB", label: { en: "Processed to date", vi: "Đã xử lý" } },
      { value: "24/7", label: { en: "Pipeline uptime", vi: "Pipeline hoạt động" } },
    ],
    chips: ["Apache Spark", "Apache Kafka", "Delta Lake", "Airflow", "ClickHouse", "dbt"],
    features: [
      {
        title: { en: "Batch + streaming", vi: "Batch + streaming" },
        body: { en: "Spark and Kafka pipelines for both worlds.", vi: "Pipeline Spark và Kafka cho cả hai thế giới." },
      },
      {
        title: { en: "Lakehouse architecture", vi: "Kiến trúc lakehouse" },
        body: { en: "ACID transactions on petabyte scale.", vi: "Giao dịch ACID ở quy mô petabyte." },
      },
      {
        title: { en: "Real-time detection", vi: "Phát hiện thời gian thực" },
        body: { en: "Fraud and anomaly alerts in under 50ms.", vi: "Cảnh báo gian lận, bất thường dưới 50ms." },
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
    caseStudy: {
      label: { en: "Case: Logistics network", vi: "Case: Mạng logistics" },
      result: "−31%",
      body: {
        en: "Data incidents and downtime cut by 31% — dispatchers see the whole fleet live.",
        vi: "Sự cố dữ liệu và gián đoạn giảm 31% — điều phối viên nhìn toàn đội xe trực tiếp.",
      },
    },
  },
};

const ORDER = ["analytics", "automation", "ai", "cloud", "bigdata"];

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

      {/* Case study + CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass-high animate-fade-in-up p-8">
            <div className="mono-label">{t(m.caseStudy.label)}</div>
            <div className="mt-4 inline-flex rounded-full border border-primary-glow/30 bg-primary/10 px-3 py-1 font-mono text-sm text-primary-glow">
              {m.caseStudy.result}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#5d5d5d] dark:text-[#ececec]">
              {t(m.caseStudy.body)}
            </p>
          </div>
          <div className="glass-high animate-fade-in-up flex flex-col justify-center p-8 text-center">
            <h3 className="text-2xl font-semibold">
              {t({ en: "See it on your data — free.", vi: "Thử trên dữ liệu của bạn — miễn phí." })}
            </h3>
            <p className="mt-3 text-sm text-[#5d5d5d] dark:text-[#b4b4b4]">
              {t({
                en: "A 30-minute audit maps what this module does for your business.",
                vi: "Buổi kiểm tra 30 phút cho thấy module này làm gì cho doanh nghiệp bạn.",
              })}
            </p>
            <button className="btn-primary btn-shine mx-auto mt-6" onClick={() => onNavigate("contact")}>
              {t({ en: "Book Free Audit", vi: "Đặt kiểm tra miễn phí" })}
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
