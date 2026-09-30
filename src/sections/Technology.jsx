import { useT } from "../lang.jsx";
import Marquee from "../components/Marquee.jsx";
import {
  AnalyticsWidget,
  ForecastWidget,
  PipelineWidget,
  TerminalWidget,
  StatusWidget,
  LakeWidget,
} from "../components/widgets.jsx";

const TECH = [
  ["AI / ML", "Python"],
  ["AI / ML", "PyTorch"],
  ["LLM Ops", "LangChain"],
  ["Big Data", "Apache Spark"],
  ["Streaming", "Apache Kafka"],
  ["Cloud", "Kubernetes"],
  ["Cloud", "Terraform"],
  ["Backend", "FastAPI"],
  ["Database", "PostgreSQL"],
  ["Analytics", "dbt"],
  ["Forecasting", "StatsForecast"],
];

const PROCESS = [
  {
    num: "01",
    title: { en: "Audit", vi: "Kiểm tra" },
    time: { en: "Week 1–2", vi: "Tuần 1–2" },
    body: {
      en: "We review your systems, data and goals. Deliverables, timeline and any audit fee are agreed before the assessment starts.",
      vi: "Chúng tôi tìm hiểu hệ thống, dữ liệu và mục tiêu của bạn. Hạng mục bàn giao, thời gian và chi phí audit (nếu có) được thống nhất trước khi đánh giá.",
    },
  },
  {
    num: "02",
    title: { en: "Pilot", vi: "Thử nghiệm" },
    time: { en: "Week 3–6", vi: "Tuần 3–6" },
    body: {
      en: "A fixed-scope pilot on agreed real data. Baseline, success measures and acceptance criteria are set before work begins; outcomes depend on scope and data access.",
      vi: "Pilot có phạm vi cố định trên dữ liệu thực đã thống nhất. Mức cơ sở, chỉ số thành công và tiêu chí nghiệm thu được chốt trước khi bắt đầu; kết quả phụ thuộc vào phạm vi và quyền truy cập dữ liệu.",
    },
  },
  {
    num: "03",
    title: { en: "Deploy", vi: "Triển khai" },
    time: { en: "Month 2–3", vi: "Tháng 2–3" },
    body: {
      en: "A production rollout plan, with continuity measures, training and documentation tailored to your environment.",
      vi: "Lập kế hoạch triển khai production, biện pháp duy trì vận hành, đào tạo và tài liệu phù hợp với môi trường của bạn.",
    },
  },
  {
    num: "04",
    title: { en: "Support", vi: "Hỗ trợ" },
    time: { en: "Month 4+", vi: "Tháng 4+" },
    body: {
      en: "Monitoring, reporting and response targets are defined in the support plan and SLA.",
      vi: "Phạm vi giám sát, báo cáo và mục tiêu phản hồi được xác định trong kế hoạch hỗ trợ và SLA.",
    },
  },
];

const MODULES = [
  {
    num: "01",
    view: "tech-analytics",
    widget: AnalyticsWidget,
    title: { en: "Data Analytics", vi: "Phân tích Dữ liệu" },
    body: {
      en: "Bring operational data into KPI dashboards, reports and alerts. The pilot agrees measures for data freshness and reporting coverage.",
      vi: "Tổng hợp dữ liệu vận hành thành dashboard KPI, báo cáo và cảnh báo. Pilot thống nhất cách đo độ cập nhật và phạm vi báo cáo.",
    },
    stat: { value: "KPI", label: { en: "dashboards + reporting", vi: "dashboard + báo cáo" } },
  },
  {
    num: "02",
    view: "tech-automation",
    widget: PipelineWidget,
    title: { en: "Automation", vi: "Tự động hóa" },
    body: {
      en: "Bots can support invoice, KYC and reporting workflows. Pilot measures cycle time, manual effort and exception handling.",
      vi: "Bot có thể hỗ trợ quy trình hóa đơn, KYC và báo cáo. Pilot đo thời gian xử lý, công sức thủ công và cách xử lý ngoại lệ.",
    },
    stat: { value: "KPI", label: { en: "time + exceptions", vi: "thời gian + ngoại lệ" } },
  },
  {
    num: "03",
    view: "tech-ai",
    widget: TerminalWidget,
    title: { en: "AI Technology", vi: "Công nghệ AI" },
    body: {
      en: "Vietnamese language models and computer vision can be evaluated against your domain cases, with deployment options matched to data requirements.",
      vi: "LLM tiếng Việt và thị giác máy tính có thể được đánh giá theo tình huống ngành của bạn, với phương án triển khai phù hợp yêu cầu dữ liệu.",
    },
    stat: { value: "KPI", label: { en: "quality + handoff", vi: "chất lượng + chuyển tiếp" } },
  },
  {
    num: "04",
    view: "tech-cloud",
    widget: StatusWidget,
    title: { en: "Cloud Computing", vi: "Điện toán đám mây" },
    body: {
      en: "Plan a migration to AWS, GCP or Azure. Measure cost, availability and operational risk against the current environment.",
      vi: "Lập kế hoạch di trú lên AWS, GCP hoặc Azure. Đo chi phí, tính sẵn sàng và rủi ro vận hành so với môi trường hiện tại.",
    },
    stat: { value: "KPI", label: { en: "cost + availability", vi: "chi phí + tính sẵn sàng" } },
  },
  {
    num: "05",
    view: "tech-bigdata",
    widget: LakeWidget,
    title: { en: "Big Data", vi: "Xử lý Big Data" },
    body: {
      en: "Unify data sources in a governed lakehouse. Set latency, reliability and data-quality targets for the expected workload.",
      vi: "Hợp nhất nguồn dữ liệu trong lakehouse có quản trị. Xác định mục tiêu độ trễ, độ tin cậy và chất lượng dữ liệu theo tải dự kiến.",
    },
    stat: { value: "KPI", label: { en: "latency + reliability", vi: "độ trễ + độ tin cậy" } },
  },
  {
    num: "06",
    view: "tech-forecast",
    widget: ForecastWidget,
    title: { en: "Demand Forecasting", vi: "Dự báo nhu cầu" },
    body: {
      en: "Evaluate demand forecasts from historical sales and available business signals to support inventory and replenishment planning.",
      vi: "Đánh giá dự báo nhu cầu từ lịch sử bán hàng và dữ liệu kinh doanh sẵn có để hỗ trợ lập kế hoạch tồn kho, bổ sung hàng.",
    },
    stat: { value: "KPI", label: { en: "forecast error + bias", vi: "sai số + độ lệch dự báo" } },
  },
];

export default function Technology({ onNavigate }) {
  const t = useT();

  return (
    <div className="pt-24">
      {/* Header + marquee */}
      <section className="relative overflow-hidden border-b border-black/10 dark:border-white/10">
        <div className="hero-bg absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-10 sm:px-6">
          <div className="animate-fade-in-up mono-label">Tech_Stack</div>
          <h2 className="animate-fade-in-up mt-3 text-3xl font-semibold md:text-4xl" style={{ animationDelay: "80ms" }}>
            {t({ en: "Our technologies", vi: "Công nghệ của chúng tôi" })}
          </h2>
          <p className="mt-3 max-w-2xl text-[#5d5d5d] dark:text-[#b4b4b4]">
            {t({
              en: "Six modules, each with its own page. Click any card to see capabilities, process and pilot measures.",
              vi: "Sáu module, mỗi module có một trang riêng. Nhấn vào thẻ để xem năng lực, quy trình và cách đánh giá pilot.",
            })}
          </p>
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
          <div className="mono-label">{t({ en: "Our process", vi: "Quy trình" })}</div>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
            {t({ en: "From first call to production", vi: "Từ cuộc gọi đầu đến sản xuất" })}
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p, i) => (
            <div key={p.num} className="glass animate-fade-in-up relative p-6" style={{ animationDelay: `${i * 90}ms` }}>
              <div className="flex items-center justify-between">
                <span className="text-gradient font-mono text-2xl font-medium">{p.num}</span>
                <span className="chip">{t(p.time)}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold leading-snug">{t(p.title)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5d5d5d] dark:text-[#b4b4b4]">{t(p.body)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Module cards */}
      <section className="border-t border-black/10 py-20 dark:border-white/10">
        <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6">
          {MODULES.map((m, i) => {
            const Widget = m.widget;
            return (
              <article
                key={m.num}
                className="glass animate-fade-in-up grid cursor-pointer gap-8 p-6 transition-colors hover:border-primary-glow/40 md:p-8 lg:grid-cols-[1.25fr_1fr]"
                style={{ animationDelay: `${i * 70}ms` }}
                onClick={() => onNavigate(m.view)}
              >
                <div>
                  <div className="mono-label">Module {m.num}</div>
                  <h3 className="mt-3 text-2xl font-semibold">{t(m.title)}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#5d5d5d] dark:text-[#b4b4b4]">{t(m.body)}</p>
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
                    {t({ en: "View details & ROI", vi: "Xem chi tiết & ROI" })} →
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
