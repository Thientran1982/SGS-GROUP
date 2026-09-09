import { useT } from "../lang.jsx";
import Marquee from "../components/Marquee.jsx";

const STATS = [
  { value: "200+", label: { en: "Projects", vi: "Dự án" } },
  { value: "50+", label: { en: "Clients", vi: "Khách hàng" } },
  { value: "99.98%", label: { en: "Uptime", vi: "Hoạt động" } },
  { value: "6", label: { en: "Weeks to deploy", vi: "Tuần triển khai" } },
];

const BADGES = [
  { en: "200+ projects delivered", vi: "200+ dự án đã triển khai" },
  { en: "Uptime 99.98%", vi: "Hoạt động 99.98%" },
  { en: "Clients in 6+ countries", vi: "Khách hàng 6+ quốc gia" },
  { en: "6-week deployment", vi: "Triển khai 6 tuần" },
  { en: "30–78% cost reduction", vi: "Giảm 30–78% chi phí" },
  { en: "100% money-back pilot", vi: "Hoàn tiền 100% pilot" },
  { en: "ISO 27001 aligned", vi: "Tuân thủ ISO 27001" },
  { en: "Response <24h", vi: "Phản hồi <24h" },
  { en: "Zero data breaches", vi: "Không rò rỉ dữ liệu" },
  { en: "24/7 support", vi: "Hỗ trợ 24/7" },
  { en: "Founded 2020 · 40+ engineers", vi: "Thành lập 2020 · 40+ kỹ sư" },
];

const GUARANTEES = [
  {
    num: "01",
    title: { en: "6-week deployment", vi: "Triển khai 6 tuần" },
    body: {
      en: "Fixed-scope pilot on your real data. Success metrics agreed before any code is written.",
      vi: "Pilot phạm vi cố định trên dữ liệu thực. Chốt chỉ số thành công trước khi viết code.",
    },
  },
  {
    num: "02",
    title: { en: "100% money-back", vi: "Hoàn tiền 100%" },
    body: {
      en: "No measurable results in 6 weeks? Full refund — written into the contract.",
      vi: "Không có kết quả đo lường được trong 6 tuần? Hoàn đủ — ghi trong hợp đồng.",
    },
  },
  {
    num: "03",
    title: { en: "Zero data breaches", vi: "Không rò rỉ dữ liệu" },
    body: {
      en: "ISO 27001, AES-256, PDPA compliant. On-premise available for banking and healthcare.",
      vi: "ISO 27001, AES-256, tuân thủ PDPA. Có bản on-premise cho ngân hàng, y tế.",
    },
  },
];

const MODULES = [
  {
    num: "01",
    view: "tech-analytics",
    title: { en: "Data Analytics", vi: "Phân tích Dữ liệu" },
    body: {
      en: "Your data becomes decisions: forecasts, dashboards, alerts. First insight in 2–4 weeks.",
      vi: "Dữ liệu thành quyết định: dự báo, dashboard, cảnh báo. Insight đầu trong 2–4 tuần.",
    },
  },
  {
    num: "02",
    view: "tech-automation",
    title: { en: "Automation", vi: "Tự động hóa" },
    body: {
      en: "Invoices, KYC, reports — done by bots 24/7. Processing time down 78% on average.",
      vi: "Hóa đơn, KYC, báo cáo — bot lo 24/7. Thời gian xử lý giảm trung bình 78%.",
    },
  },
  {
    num: "03",
    view: "tech-ai",
    title: { en: "AI Technology", vi: "Công nghệ AI" },
    body: {
      en: "LLMs tuned for Vietnamese. Chatbots answer 70% of queries. On-premise when needed.",
      vi: "LLM hiểu tiếng Việt. Chatbot trả lời 70% yêu cầu. On-premise khi cần.",
    },
  },
  {
    num: "04",
    view: "tech-cloud",
    title: { en: "Cloud Computing", vi: "Điện toán đám mây" },
    body: {
      en: "Move to AWS, GCP or Azure with zero downtime. Costs down ~34% after migration.",
      vi: "Lên AWS, GCP, Azure không gián đoạn. Chi phí giảm ~34% sau di trú.",
    },
  },
  {
    num: "05",
    view: "tech-bigdata",
    title: { en: "Big Data", vi: "Xử lý Big Data" },
    body: {
      en: "All sources, one lake. Billions of events a day, answers under 100ms.",
      vi: "Mọi nguồn về một lake. Hàng tỷ sự kiện mỗi ngày, trả lời dưới 100ms.",
    },
  },
];

const TESTIMONIALS = [
  {
    result: "3 days → 2 hrs",
    initials: "NT",
    name: "Nguyen Thi Lan",
    role: "CFO · VietRetail Corp.",
    meta: { en: "Retail · Q3 2025", vi: "Bán lẻ · Q3 2025" },
    quote: {
      en: "Invoice processing went from 3 days to under 2 hours. The finance team now works on strategy, not data entry.",
      vi: "Xử lý hóa đơn từ 3 ngày xuống dưới 2 giờ. Đội tài chính giờ làm chiến lược, không phải nhập liệu.",
    },
  },
  {
    result: "+40% accuracy",
    initials: "JP",
    name: "James Pham",
    role: { en: "Operations Director · LogiViet", vi: "Giám đốc Vận hành · LogiViet" },
    meta: { en: "Logistics · Q1 2025", vi: "Logistics · Q1 2025" },
    quote: {
      en: "Real-time visibility across 14 warehouses. Demand forecasts 40% more accurate in one quarter.",
      vi: "Nhìn thời gian thực 14 kho. Dự báo nhu cầu chính xác hơn 40% sau một quý.",
    },
  },
  {
    result: "CSAT 3.8 → 4.7",
    initials: "TM",
    name: "Tran Minh Duc",
    role: { en: "Head of CX · FinTech One", vi: "Trưởng bộ phận CX · FinTech One" },
    meta: { en: "FinTech · Q4 2024", vi: "FinTech · Q4 2024" },
    quote: {
      en: "The AI chatbot handles 70% of queries around the clock. Satisfaction jumped within six months.",
      vi: "Chatbot AI xử lý 70% yêu cầu suốt ngày đêm. Mức hài lòng tăng vọt trong 6 tháng.",
    },
  },
];

export default function Home({ onNavigate }) {
  const t = useT();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="hero-bg absolute inset-0" aria-hidden="true" />
        <div className="grid-lines absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-32 text-center sm:px-6 md:pt-40">
          <div className="animate-fade-in-up mono-label inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 dark:border-white/15">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary-glow animate-pulse-slow" />
            {t({ en: "Trusted by 50+ enterprises · Vietnam & SEA", vi: "Tin cậy bởi 50+ doanh nghiệp · Việt Nam & ĐNA" })}
          </div>

          <h1 className="animate-fade-in-up mx-auto mt-7 max-w-4xl text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl md:text-6xl" style={{ animationDelay: "80ms" }}>
            {t({ en: "AI that delivers results.", vi: "AI tạo kết quả thực." })}
            <br />
            <span className="text-gradient">{t({ en: "In 6 weeks — or free.", vi: "Trong 6 tuần — hoặc miễn phí." })}</span>
          </h1>

          <p className="animate-fade-in-up mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#5d5d5d] dark:text-[#b4b4b4]" style={{ animationDelay: "160ms" }}>
            {t({
              en: "We audit your process, pilot on your real data, and deploy production AI in 6 weeks. Success metrics are written into your contract.",
              vi: "Chúng tôi kiểm tra quy trình, chạy thử trên dữ liệu thực và triển khai AI trong 6 tuần. Chỉ số thành công ghi rõ trong hợp đồng.",
            })}
          </p>

          <div className="animate-fade-in-up mt-8 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: "240ms" }}>
            <button className="btn-primary btn-shine" onClick={() => onNavigate("contact")}>
              {t({ en: "Book a free 30-min audit", vi: "Đặt kiểm tra miễn phí 30 phút" })}
            </button>
            <button className="btn-ghost btn-shine" onClick={() => onNavigate("tech")}>
              {t({ en: "Explore technologies", vi: "Xem các công nghệ" })}
            </button>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4">
            {STATS.map((s, i) => (
              <div key={s.value} className="glass animate-fade-in-up p-5" style={{ animationDelay: `${400 + i * 90}ms` }}>
                <div className="font-mono text-2xl font-medium text-primary-glow md:text-3xl">{s.value}</div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-[#8f8f8f]">{t(s.label)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust marquee */}
      <section className="border-y border-black/10 py-4 dark:border-white/10" aria-label="Trust badges">
        <Marquee>
          {BADGES.map((b, i) => (
            <span key={i} className="mx-5 flex items-center gap-5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#8f8f8f]">
              {t(b)}
              <span className="text-primary-glow/60">◆</span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* Guarantees */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="animate-fade-in-up">
          <div className="mono-label">{t({ en: "Zero-risk engagement", vi: "Cam kết không rủi ro" })}</div>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
            {t({ en: "Three guarantees. In writing.", vi: "Ba cam kết. Bằng văn bản." })}
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {GUARANTEES.map((g, i) => (
            <div key={g.num} className="glass animate-fade-in-up p-6 transition-colors hover:border-primary-glow/40" style={{ animationDelay: `${i * 90}ms` }}>
              <div className="text-gradient font-mono text-3xl font-medium">{g.num}</div>
              <div className="mt-4 font-mono text-sm font-medium uppercase tracking-wider">{t(g.title)}</div>
              <p className="mt-4 text-sm leading-relaxed text-[#5d5d5d] dark:text-[#b4b4b4]">{t(g.body)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modules */}
      <section className="border-y border-black/10 bg-canvas-subtle/60 py-20 dark:border-white/10 dark:bg-canvas-subtle">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="animate-fade-in-up">
            <div className="mono-label">{t({ en: "What we build", vi: "Chúng tôi xây dựng gì" })}</div>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              {t({ en: "Five technologies. One partner.", vi: "Năm công nghệ. Một đối tác." })}
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {MODULES.map((m, i) => (
              <button
                key={m.num}
                onClick={() => onNavigate(m.view)}
                className="glass animate-fade-in-up flex flex-col p-6 text-left transition-transform hover:-translate-y-1"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <div className="mono-label">{`Module ${m.num}`}</div>
                <h3 className="mt-3 text-xl font-semibold">{t(m.title)}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#5d5d5d] dark:text-[#b4b4b4]">{t(m.body)}</p>
                <div className="mt-5 font-mono text-xs text-primary-glow">
                  {t({ en: "View details", vi: "Xem chi tiết" })} →
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-black/10 py-20 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="animate-fade-in-up">
            <div className="mono-label">{t({ en: "Client results", vi: "Kết quả khách hàng" })}</div>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              {t({ en: "Numbers our clients report", vi: "Con số khách hàng của chúng tôi" })}
            </h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {TESTIMONIALS.map((c, i) => (
              <figure key={c.name} className="glass animate-fade-in-up flex flex-col p-6" style={{ animationDelay: `${i * 90}ms` }}>
                <div className="inline-flex w-fit rounded-full border border-primary-glow/30 bg-primary/10 px-3 py-1 font-mono text-[11px] text-primary-glow">
                  {c.result}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-[#5d5d5d] dark:text-[#ececec]">
                  “{t(c.quote)}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-black/10 pt-4 dark:border-white/10">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#e3e3e3] font-mono text-xs font-medium text-[#0d0d0d] dark:bg-white/10 dark:text-[#e3e3e3]">
                    {c.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{c.name}</span>
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-[#8f8f8f]">
                      {t(c.role)} · {t(c.meta)}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="glass-high terminal animate-fade-in-up relative overflow-hidden p-10 text-center md:p-14">
          <div className="mono-label">{t({ en: "Zero-risk engagement", vi: "Cam kết không rủi ro" })}</div>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold md:text-4xl">
            {t({ en: "See results in 6 weeks — or pay nothing.", vi: "Nhìn kết quả trong 6 tuần — hoặc không trả tiền." })}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#5d5d5d] dark:text-[#b4b4b4]">
            {t({
              en: "A free 30-minute audit maps your automation opportunities with a concrete ROI projection.",
              vi: "Buổi kiểm tra miễn phí 30 phút vẽ ra cơ hội tự động hóa kèm dự phóng ROI cụ thể.",
            })}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button className="btn-primary btn-shine" onClick={() => onNavigate("contact")}>
              {t({ en: "Book free audit now", vi: "Đặt kiểm tra miễn phí" })}
            </button>
            <button className="btn-ghost btn-shine" onClick={() => onNavigate("aihub")}>
              {t({ en: "Ask the AI Hub", vi: "Hỏi AI Hub" })}
            </button>
          </div>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 font-mono text-[11px] uppercase tracking-widest text-[#8f8f8f]">
            <span>✓ {t({ en: "30-min free audit", vi: "Kiểm tra miễn phí 30 phút" })}</span>
            <span>✓ {t({ en: "100% money-back", vi: "Hoàn tiền 100%" })}</span>
            <span>✓ {t({ en: "Reply within 24h", vi: "Phản hồi trong 24h" })}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
