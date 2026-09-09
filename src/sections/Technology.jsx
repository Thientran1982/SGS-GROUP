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
  ["LLM Ops", "LangChain"],
  ["Big Data", "Apache Spark"],
  ["Streaming", "Apache Kafka"],
  ["Cloud", "Kubernetes"],
  ["Cloud", "Terraform"],
  ["Backend", "FastAPI"],
  ["Database", "PostgreSQL"],
  ["Analytics", "dbt"],
];

const PROCESS = [
  {
    num: "01",
    title: { en: "Audit", vi: "Kiểm tra" },
    time: { en: "Week 1–2", vi: "Tuần 1–2" },
    body: {
      en: "We map your systems and data quality. You get a findings report — not a sales deck.",
      vi: "Chúng tôi khảo sát hệ thống và chất lượng dữ liệu. Bạn nhận báo cáo phát hiện — không phải tài liệu bán hàng.",
    },
  },
  {
    num: "02",
    title: { en: "Pilot", vi: "Thử nghiệm" },
    time: { en: "Week 3–6", vi: "Tuần 3–6" },
    body: {
      en: "A fixed-scope pilot on real data. Measurable results, or you pay nothing.",
      vi: "Pilot phạm vi cố định trên dữ liệu thực. Kết quả đo lường được, hoặc không mất phí.",
    },
  },
  {
    num: "03",
    title: { en: "Deploy", vi: "Triển khai" },
    time: { en: "Month 2–3", vi: "Tháng 2–3" },
    body: {
      en: "Zero-downtime rollout, training and documentation for your team.",
      vi: "Triển khai không gián đoạn, kèm đào tạo và tài liệu cho đội của bạn.",
    },
  },
  {
    num: "04",
    title: { en: "Support", vi: "Hỗ trợ" },
    time: { en: "Month 4+", vi: "Tháng 4+" },
    body: {
      en: "24/7 monitoring, monthly reports, SLA response: 15 min for critical issues.",
      vi: "Giám sát 24/7, báo cáo tháng, phản hồi SLA: 15 phút cho sự cố nghiêm trọng.",
    },
  },
];

const MODULES = [
  {
    num: "01",
    view: "tech-analytics",
    widget: ForecastWidget,
    title: { en: "Data Analytics", vi: "Phân tích Dữ liệu" },
    body: {
      en: "Forecasts, segmentation and live dashboards on your existing data. First insight in 2–4 weeks.",
      vi: "Dự báo, phân khúc và dashboard trực quan trên dữ liệu sẵn có. Insight đầu trong 2–4 tuần.",
    },
    stat: { value: "38%", label: { en: "fewer stockouts", vi: "giảm hết hàng" } },
  },
  {
    num: "02",
    view: "tech-automation",
    widget: PipelineWidget,
    title: { en: "Automation", vi: "Tự động hóa" },
    body: {
      en: "Bots handle invoices, KYC and reports 24/7. Processing time down 78% in 90 days.",
      vi: "Bot lo hóa đơn, KYC, báo cáo 24/7. Thời gian xử lý giảm 78% trong 90 ngày.",
    },
    stat: { value: "78%", label: { en: "faster processing", vi: "xử lý nhanh hơn" } },
  },
  {
    num: "03",
    view: "tech-ai",
    widget: TerminalWidget,
    title: { en: "AI Technology", vi: "Công nghệ AI" },
    body: {
      en: "LLMs tuned for Vietnamese, vision systems for production lines. On-premise when data is sensitive.",
      vi: "LLM hiểu tiếng Việt, thị giác máy tính cho dây chuyền. On-premise khi dữ liệu nhạy cảm.",
    },
    stat: { value: "70%", label: { en: "auto-resolved", vi: "tự xử lý" } },
  },
  {
    num: "04",
    view: "tech-cloud",
    widget: StatusWidget,
    title: { en: "Cloud Computing", vi: "Điện toán đám mây" },
    body: {
      en: "Migrate to AWS, GCP or Azure with zero downtime. Cloud bills drop ~34% after right-sizing.",
      vi: "Di trú lên AWS, GCP, Azure không gián đoạn. Hóa đơn cloud giảm ~34% sau right-sizing.",
    },
    stat: { value: "99.98%", label: { en: "uptime SLA", vi: "uptime SLA" } },
  },
  {
    num: "05",
    view: "tech-bigdata",
    widget: LakeWidget,
    title: { en: "Big Data", vi: "Xử lý Big Data" },
    body: {
      en: "One data lake for every source. Billions of events daily, queries under 100ms.",
      vi: "Một data lake cho mọi nguồn. Hàng tỷ sự kiện mỗi ngày, truy vấn dưới 100ms.",
    },
    stat: { value: "<100ms", label: { en: "stream latency", vi: "độ trễ luồng" } },
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
              en: "Five modules, each with its own page. Click any card to see capabilities, process and results.",
              vi: "Năm module, mỗi module một trang riêng. Nhấn vào thẻ bất kỳ để xem năng lực, quy trình và kết quả.",
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
