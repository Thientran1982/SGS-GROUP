import { useT } from "../lang.jsx";
import Marquee from "../components/Marquee.jsx";

const STATS = [
  { value: "200+", label: { en: "Projects", vi: "Dự án" } },
  { value: "50+", label: { en: "Clients", vi: "Khách hàng" } },
  { value: "99.98%", label: { en: "Uptime", vi: "Hoạt động" } },
  { value: "6 Wks", label: { en: "Deploy", vi: "Triển khai" } },
];

const BADGES = [
  { en: "200+ Projects Delivered", vi: "200+ dự án đã triển khai" },
  { en: "Uptime: 99.98%", vi: "Thời gian hoạt động: 99.98%" },
  { en: "Clients in 6+ Countries", vi: "Khách hàng tại 6+ quốc gia" },
  { en: "6-Week Deployment Guarantee", vi: "Đảm bảo triển khai 6 tuần" },
  { en: "50+ Enterprise Clients", vi: "50+ khách hàng doanh nghiệp" },
  { en: "30–78% Cost Reduction", vi: "Giảm 30–78% chi phí" },
  { en: "100% Money-Back Pilot", vi: "Hoàn tiền 100% pilot" },
  { en: "ISO 27001 Aligned", vi: "Tuân thủ ISO 27001" },
  { en: "Response Time: <24h", vi: "Phản hồi: <24h" },
  { en: "Zero Data Breach Record", vi: "Không ghi nhận rò rỉ dữ liệu" },
  { en: "Google Cloud Ready", vi: "Sẵn sàng Google Cloud" },
  { en: "24/7 Production Support", vi: "Hỗ trợ sản xuất 24/7" },
  { en: "Founded 2020 · 40+ Engineers", vi: "Thành lập 2020 · 40+ kỹ sư" },
  { en: "Enterprise-Grade Security", vi: "Bảo mật cấp doanh nghiệp" },
];

const GUARANTEES = [
  {
    num: "01",
    title: { en: "6-Week Deployment", vi: "Triển khai 6 tuần" },
    sub: { en: "vs. traditional multi-month deployments", vi: "so với triển khai truyền thống nhiều tháng" },
    body: {
      en: "Fixed-scope pilot on your real data. We define success metrics together before writing a single line of code.",
      vi: "Pilot phạm vi cố định trên dữ liệu thực của bạn. Chúng tôi cùng định nghĩa chỉ số thành công trước khi viết dòng code đầu tiên.",
    },
  },
  {
    num: "02",
    title: { en: "100% Money-Back", vi: "Hoàn tiền 100%" },
    sub: { en: "if no measurable results in pilot", vi: "nếu không có kết quả đo lường được trong pilot" },
    body: {
      en: "No measurable results in 6 weeks? Full refund of the pilot fee — the conditions are defined upfront and written into your contract.",
      vi: "Không có kết quả đo lường được trong 6 tuần? Hoàn lại 100% phí pilot — điều kiện được xác định trước và ghi vào hợp đồng.",
    },
  },
  {
    num: "03",
    title: { en: "Zero Data Breaches", vi: "Không rò rỉ dữ liệu" },
    sub: { en: "across 200+ enterprise deployments", vi: "trên 200+ triển khai doanh nghiệp" },
    body: {
      en: "ISO 27001 aligned · AES-256 encryption · PDPA compliant. Data sovereignty built into every engagement — with full on-premises deployment for banking, healthcare, and regulated sectors.",
      vi: "Tuân thủ ISO 27001 · mã hóa AES-256 · phù hợp PDPA. Chủ quyền dữ liệu được thiết kế trong mọi hợp tác — với triển khai on-premise đầy đủ cho ngân hàng, y tế và các ngành được quản lý.",
    },
  },
];

const MODULES = [
  {
    num: "01",
    title: { en: "Data Analytics", vi: "Phân tích Dữ liệu" },
    body: {
      en: "Best for retail, logistics, and banking teams ready to turn the data they already have into decisions they can act on.",
      vi: "Phù hợp nhất với các đội bán lẻ, logistics và ngân hàng sẵn sàng biến dữ liệu sẵn có thành quyết định có thể hành động.",
    },
  },
  {
    num: "02",
    title: { en: "Automation", vi: "Tự động hóa" },
    body: {
      en: "Best for operations teams spending hours every day on documents, forms, and repetitive tasks that software should already be doing.",
      vi: "Phù hợp nhất với các đội vận hành dành hàng giờ mỗi ngày cho tài liệu, biểu mẫu và công việc lặp lại mà phần mềm lẽ ra đã làm.",
    },
  },
  {
    num: "03",
    title: { en: "AI Technology", vi: "Công nghệ AI" },
    body: {
      en: "Best for enterprises that need AI trained on their own language, industry, and data — not a generic API pointed at a generic model.",
      vi: "Phù hợp nhất với doanh nghiệp cần AI được huấn luyện theo ngôn ngữ, ngành và dữ liệu riêng — không phải API chung nối vào mô hình chung.",
    },
  },
];

const COMPLIANCE = [
  { title: "ISO 27001", sub: { en: "Security Compliance", vi: "Tuân thủ bảo mật" } },
  { title: "AES-256", sub: { en: "Encrypted Data Transfer", vi: "Truyền dữ liệu mã hóa" } },
  { title: "99.98% Uptime", sub: { en: "Guaranteed SLA", vi: "SLA đảm bảo" } },
  { title: "PDPA Compliant", sub: { en: "Data Protection Act", vi: "Đạo luật bảo vệ dữ liệu" } },
  { title: "24/7 Support", sub: { en: "Dedicated Success Team", vi: "Đội hỗ trợ chuyên trách" } },
  { title: "Est. 2020", sub: { en: "6 Years of Excellence", vi: "6 năm xuất sắc" } },
];

const TESTIMONIALS = [
  {
    result: "3 days → 2 hrs",
    initials: "NT",
    name: "Nguyen Thi Lan",
    role: "CFO · VietRetail Corp.",
    meta: { en: "Retail & E-commerce · Q3 2025", vi: "Bán lẻ & TMĐT · Q3 2025" },
    quote: {
      en: "SGS GROUP reduced our invoice processing time from 3 days to under 2 hours. The automation is solid — our finance team can now focus on strategy instead of data entry. Implementation was faster than we expected.",
      vi: "SGS GROUP giảm thời gian xử lý hóa đơn của chúng tôi từ 3 ngày xuống dưới 2 giờ. Hệ thống tự động hóa rất ổn định — đội tài chính giờ có thể tập trung vào chiến lược thay vì nhập liệu. Triển khai nhanh hơn mong đợi.",
    },
  },
  {
    result: "+40% forecast accuracy",
    initials: "JP",
    name: "James Pham",
    role: { en: "Operations Director · LogiViet", vi: "Giám đốc Vận hành · LogiViet" },
    meta: { en: "Logistics · Q1 2025", vi: "Logistics · Q1 2025" },
    quote: {
      en: "Their Data Analytics platform gave us real-time visibility across 14 warehouses. Demand forecasting accuracy improved by 40% in Q1. The onboarding took longer than planned, but the results speak for themselves.",
      vi: "Nền tảng Phân tích Dữ liệu của họ cho chúng tôi khả năng hiển thị thời gian thực trên 14 kho. Độ chính xác dự báo nhu cầu tăng 40% trong Q1. Việc triển khai lâu hơn kế hoạch, nhưng kết quả tự chứng minh.",
    },
  },
  {
    result: "CSAT 3.8 → 4.7",
    initials: "TM",
    name: "Tran Minh Duc",
    role: {
      en: "Head of Customer Experience · FinTech One",
      vi: "Trưởng bộ phận Trải nghiệm KH · FinTech One",
    },
    meta: { en: "Financial Technology · Q4 2024", vi: "Công nghệ tài chính · Q4 2024" },
    quote: {
      en: "The AI chatbot now handles 70% of our customer queries around the clock. Our CSAT jumped from 3.8 to 4.7 within six months. The SGS team was responsive and fixed every issue within 24 hours.",
      vi: "Chatbot AI hiện xử lý 70% câu hỏi khách hàng quanh đồng hồ. CSAT tăng từ 3.8 lên 4.7 trong 6 tháng. Đội SGS phản hồi nhanh và khắc phục mọi sự cố trong 24 giờ.",
    },
  },
];

export default function Home() {
  const t = useT();

  return (
    <div>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden">
        <div className="hero-bg absolute inset-0" aria-hidden="true" />
        <div className="grid-lines absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-32 text-center sm:px-6 md:pt-40">
          <div className="animate-fade-in-up mono-label inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 dark:border-white/15">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary-glow animate-pulse-slow" />
            {t({
              en: "Trusted by 50+ Enterprises · Vietnam & Southeast Asia",
              vi: "Được tin cậy bởi 50+ doanh nghiệp · Việt Nam & Đông Nam Á",
            })}
          </div>

          <h1
            className="animate-fade-in-up mx-auto mt-7 max-w-4xl text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl md:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            {t({ en: "AI That Delivers.", vi: "AI mang lại hiệu quả thực sự." })}
            <br />
            <span className="text-gradient">
              {t({ en: "Not Just Promises.", vi: "Không chỉ là lời hứa." })}
            </span>
          </h1>

          <p
            className="animate-fade-in-up mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#5d5d5d] dark:text-[#b4b4b4]"
            style={{ animationDelay: "160ms" }}
          >
            {t({
              en: "Production-grade AI built for Vietnamese and Southeast Asian enterprises. We audit your process, pilot on your real data, and deploy in 6 weeks — with measurable results defined upfront and written into your contract.",
              vi: "AI cấp sản xuất dành cho doanh nghiệp Việt Nam và Đông Nam Á. Chúng tôi kiểm tra quy trình của bạn, thử nghiệm trên dữ liệu thực và triển khai trong 6 tuần — với kết quả đo lường được xác định trước và ghi rõ trong hợp đồng.",
            })}
          </p>

          <div
            className="animate-fade-in-up mt-8 flex flex-wrap items-center justify-center gap-3"
            style={{ animationDelay: "240ms" }}
          >
            <button className="btn-primary btn-shine">
              {t({ en: "Book Free Technical Audit", vi: "Đặt lịch kiểm tra kỹ thuật miễn phí" })}
            </button>
            <button className="btn-ghost btn-shine">
              {t({ en: "See Our Work", vi: "Xem dự án của chúng tôi" })}
            </button>
          </div>

          <div
            className="animate-fade-in-up mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 font-mono text-[11px] uppercase tracking-widest text-[#8f8f8f]"
            style={{ animationDelay: "320ms" }}
          >
            <span>✓ {t({ en: "Free 30-min audit", vi: "Kiểm tra miễn phí 30 phút" })}</span>
            <span>✓ {t({ en: "No commitment", vi: "Không ràng buộc" })}</span>
            <span>✓ {t({ en: "Response <24h", vi: "Phản hồi <24h" })}</span>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.value}
                className="glass animate-fade-in-up p-5"
                style={{ animationDelay: `${400 + i * 90}ms` }}
              >
                <div className="font-mono text-2xl font-medium text-primary-glow md:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-[#8f8f8f]">
                  {t(s.label)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Trust marquee ===== */}
      <section className="border-y border-black/10 py-4 dark:border-white/10" aria-label="Trust badges">
        <Marquee>
          {BADGES.map((b, i) => (
            <span
              key={i}
              className="mx-5 flex items-center gap-5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#8f8f8f]"
            >
              {t(b)}
              <span className="text-primary-glow/60">◆</span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* ===== Guarantees ===== */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="animate-fade-in-up">
          <div className="mono-label">{t({ en: "Zero-Risk Engagement", vi: "Cam kết không rủi ro" })}</div>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
            {t({
              en: "Three Guarantees That Remove All Risk",
              vi: "Ba cam kết loại bỏ mọi rủi ro",
            })}
          </h2>
          <p className="mt-3 max-w-2xl text-[#5d5d5d] dark:text-[#b4b4b4]">
            {t({
              en: "Every engagement is backed by contractual commitments — not marketing claims.",
              vi: "Mọi hợp tác đều được bảo đảm bằng cam kết hợp đồng — không phải lời quảng cáo.",
            })}
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {GUARANTEES.map((g, i) => (
            <div
              key={g.num}
              className="glass animate-fade-in-up p-6 transition-colors hover:border-primary-glow/40"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <div className="text-gradient font-mono text-3xl font-medium">{g.num}</div>
              <div className="mt-4 font-mono text-sm font-medium uppercase tracking-wider">
                {t(g.title)}
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#8f8f8f]">{t(g.sub)}</div>
              <p className="mt-4 text-sm leading-relaxed text-[#5d5d5d] dark:text-[#b4b4b4]">
                {t(g.body)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Modules ===== */}
      <section className="border-y border-black/10 bg-canvas-subtle/60 py-20 dark:border-white/10 dark:bg-canvas-subtle">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="animate-fade-in-up">
            <div className="mono-label">{t({ en: "AI Solutions", vi: "Giải pháp AI" })}</div>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              {t({ en: "Our Technologies", vi: "Công nghệ của chúng tôi" })}
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {MODULES.map((m, i) => (
              <div
                key={m.num}
                className="glass animate-fade-in-up flex flex-col p-6 transition-transform hover:-translate-y-1"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <div className="mono-label">{`Module ${m.num}`}</div>
                <h3 className="mt-3 text-xl font-semibold">{t(m.title)}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#5d5d5d] dark:text-[#b4b4b4]">
                  {t(m.body)}
                </p>
                <div className="mt-5 font-mono text-xs text-primary-glow">
                  {t({ en: "View Details", vi: "Xem chi tiết" })} →
                </div>
              </div>
            ))}
          </div>
          <button className="chip animate-fade-in-up mt-6 hover:border-primary-glow/60" style={{ animationDelay: "300ms" }}>
            {t({
              en: "+ 2 more: Cloud Computing & Big Data Processing →",
              vi: "+ 2 nữa: Điện toán đám mây & Xử lý Big Data →",
            })}
          </button>
        </div>
      </section>

      {/* ===== Compliance strip ===== */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {COMPLIANCE.map((c, i) => (
            <div
              key={c.title}
              className="animate-fade-in-up text-center"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="font-display text-sm font-semibold">{c.title}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[#8f8f8f]">
                {t(c.sub)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="border-y border-black/10 py-20 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="animate-fade-in-up">
            <div className="mono-label">{t({ en: "Client Results", vi: "Kết quả khách hàng" })}</div>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              {t({ en: "What Our Clients Say", vi: "Khách hàng nói gì" })}
            </h2>
            <p className="mt-3 max-w-2xl text-[#5d5d5d] dark:text-[#b4b4b4]">
              {t({
                en: "Real outcomes from businesses that trusted SGS GROUP to transform their operations.",
                vi: "Kết quả thực từ các doanh nghiệp tin tưởng SGS GROUP chuyển đổi hoạt động của họ.",
              })}
            </p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {TESTIMONIALS.map((c, i) => (
              <figure
                key={c.name}
                className="glass animate-fade-in-up flex flex-col p-6"
                style={{ animationDelay: `${i * 90}ms` }}
              >
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
                    <span className="block text-sm font-semibold">
                      {c.name}{" "}
                      <span className="font-mono text-[10px] font-normal text-ok">✓ {t({ en: "Verified", vi: "Đã xác minh" })}</span>
                    </span>
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

      {/* ===== Final CTA ===== */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="glass-high terminal animate-fade-in-up relative overflow-hidden p-10 text-center md:p-14">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(40rem 18rem at 50% 0%, rgba(6,182,212,0.12), transparent 65%)",
            }}
            aria-hidden="true"
          />
          <div className="mono-label">{t({ en: "Zero-Risk Engagement", vi: "Cam kết không rủi ro" })}</div>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold md:text-4xl">
            {t({
              en: "See Results in 6 Weeks — Or Pay Nothing.",
              vi: "Nhìn thấy kết quả trong 6 tuần — Hoặc không trả tiền.",
            })}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#5d5d5d] dark:text-[#b4b4b4]">
            {t({
              en: "Schedule your free 30-minute technical audit. We map your automation opportunities and deliver a concrete ROI projection — at zero cost, zero obligation.",
              vi: "Đặt buổi kiểm tra kỹ thuật miễn phí 30 phút. Chúng tôi sơ đồ hóa cơ hội tự động hóa và đưa ra dự phóng ROI cụ thể — không chi phí, không ràng buộc.",
            })}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button className="btn-primary btn-shine">
              {t({ en: "Book Free Audit Now", vi: "Đặt kiểm tra miễn phí ngay" })}
            </button>
            <button className="btn-ghost btn-shine">
              {t({ en: "Talk to an Expert", vi: "Trò chuyện với chuyên gia" })}
            </button>
          </div>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 font-mono text-[11px] uppercase tracking-widest text-[#8f8f8f]">
            <span>✓ {t({ en: "Free 30-min technical audit", vi: "Kiểm tra kỹ thuật miễn phí 30 phút" })}</span>
            <span>✓ {t({ en: "100% money-back if no results", vi: "Hoàn tiền 100% nếu không có kết quả" })}</span>
            <span>✓ {t({ en: "Response within 24 hours", vi: "Phản hồi trong 24 giờ" })}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
