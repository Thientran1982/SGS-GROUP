import { useT } from "../lang.jsx";
import Marquee from "../components/Marquee.jsx";

const STATS = [
  { value: "50+", label: { en: "Projects since 2020", vi: "Dự án từ 2020" } },
  { value: "50+", label: { en: "Enterprise clients served", vi: "Doanh nghiệp đã phục vụ" } },
  { value: "6", label: { en: "Weeks for a scoped pilot", vi: "Tuần cho pilot có phạm vi rõ ràng" } },
  { value: "2020", label: { en: "Founded in Vietnam", vi: "Thành lập tại Việt Nam" } },
];

const BADGES = [
  { en: "50+ projects since 2020", vi: "50+ dự án từ 2020" },
  { en: "50+ enterprise clients served", vi: "Đã phục vụ 50+ doanh nghiệp" },
  { en: "Six-week scoped pilot", vi: "Pilot phạm vi rõ ràng trong sáu tuần" },
  { en: "Success measures agreed upfront", vi: "Thống nhất chỉ số thành công từ đầu" },
  { en: "Pilot on real data", vi: "Pilot trên dữ liệu thực" },
  { en: "Production rollout scoped separately", vi: "Lộ trình production được xác định riêng" },
  { en: "Outcomes measured against a baseline", vi: "Đo kết quả theo mức cơ sở" },
];

const ENGAGEMENT_PRINCIPLES = [
  {
    num: "01",
    title: { en: "A focused six-week pilot", vi: "Pilot tập trung trong sáu tuần" },
    body: {
      en: "The six-week window is for a defined pilot on agreed data—not a promise that every production rollout takes six weeks.",
      vi: "Sáu tuần là khung thời gian cho pilot đã xác định trên dữ liệu được thống nhất, không phải cam kết mọi hệ thống production đều triển khai xong trong sáu tuần.",
    },
  },
  {
    num: "02",
    title: { en: "Success measures agreed upfront", vi: "Thống nhất cách đo thành công từ đầu" },
    body: {
      en: "We document the baseline, pilot scope, acceptance criteria and dependencies before work begins.",
      vi: "Trước khi bắt đầu, hai bên thống nhất mức cơ sở, phạm vi pilot, tiêu chí nghiệm thu và các điều kiện phụ thuộc.",
    },
  },
  {
    num: "03",
    title: { en: "A production plan based on evidence", vi: "Lộ trình production dựa trên dữ liệu thực tế" },
    body: {
      en: "After the pilot, deployment scope, timeline, security controls and investment are sized to the validated requirements.",
      vi: "Sau pilot, phạm vi triển khai, thời gian, kiểm soát bảo mật và ngân sách được xác định theo yêu cầu đã kiểm chứng.",
    },
  },
];

const MODULES = [
  {
    num: "01",
    view: "tech-analytics",
    title: { en: "Data Analytics", vi: "Phân tích Dữ liệu" },
    body: {
      en: "Turn available data into forecasts, dashboards and alerts, with measures agreed for the pilot.",
      vi: "Khai thác dữ liệu sẵn có cho dự báo, dashboard và cảnh báo; các chỉ số được thống nhất trong pilot.",
    },
  },
  {
    num: "02",
    view: "tech-automation",
    title: { en: "Automation", vi: "Tự động hóa" },
    body: {
      en: "Automate invoices, KYC and reporting where the process is suitable. Pilot measures cycle time, manual work and exceptions.",
      vi: "Tự động hóa hóa đơn, KYC và báo cáo khi quy trình phù hợp. Pilot đo thời gian xử lý, thao tác thủ công và ngoại lệ.",
    },
  },
  {
    num: "03",
    view: "tech-ai",
    title: { en: "AI Technology", vi: "Công nghệ AI" },
    body: {
      en: "Evaluate Vietnamese language models and conversational AI against your use cases, with deployment options based on data requirements.",
      vi: "Đánh giá LLM tiếng Việt và AI hội thoại theo tình huống sử dụng, với phương án triển khai dựa trên yêu cầu dữ liệu.",
    },
  },
  {
    num: "04",
    view: "tech-cloud",
    title: { en: "Cloud Computing", vi: "Điện toán đám mây" },
    body: {
      en: "Plan a move to AWS, GCP or Azure with continuity measures. Assess cost and availability against your current environment.",
      vi: "Lập kế hoạch chuyển lên AWS, GCP hoặc Azure kèm biện pháp duy trì vận hành. Đánh giá chi phí và tính sẵn sàng so với môi trường hiện tại.",
    },
  },
  {
    num: "05",
    view: "tech-bigdata",
    title: { en: "Big Data", vi: "Xử lý Big Data" },
    body: {
      en: "Unify data in a governed lakehouse, with throughput and latency targets defined for your workload.",
      vi: "Hợp nhất dữ liệu trong lakehouse có quản trị, với mục tiêu thông lượng và độ trễ được xác định theo workload.",
    },
  },
];

const SUCCESS_MEASURES = [
  {
    title: { en: "Workflow efficiency", vi: "Hiệu quả quy trình" },
    body: { en: "Track cycle time, manual effort and exception rates against the current process.", vi: "Theo dõi thời gian xử lý, công sức thủ công và tỷ lệ ngoại lệ so với quy trình hiện tại." },
  },
  {
    title: { en: "Decision quality", vi: "Chất lượng quyết định" },
    body: { en: "Compare forecast accuracy, data freshness and inventory visibility with an agreed baseline.", vi: "So sánh độ chính xác dự báo, độ cập nhật dữ liệu và khả năng quan sát tồn kho với mức cơ sở đã thống nhất." },
  },
  {
    title: { en: "AI service quality", vi: "Chất lượng dịch vụ AI" },
    body: { en: "Evaluate answer quality, resolution rate and safe handoff to a human reviewer.", vi: "Đánh giá chất lượng câu trả lời, tỷ lệ xử lý thành công và khả năng chuyển tiếp an toàn cho nhân viên." },
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
            {t({ en: "50+ enterprise clients served · Vietnam & SEA", vi: "Đã phục vụ 50+ doanh nghiệp · Việt Nam & ĐNA" })}
          </div>

          <h1 className="animate-fade-in-up mx-auto mt-7 max-w-4xl text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl md:text-6xl" style={{ animationDelay: "80ms" }}>
            {t({ en: "AI solutions for real business needs.", vi: "Giải pháp AI cho nhu cầu thực tế của doanh nghiệp." })}
            <br />
            <span className="text-gradient">{t({ en: "Start small. Measure results before expanding.", vi: "Thử nghiệm quy mô nhỏ. Đo hiệu quả rồi mới mở rộng." })}</span>
          </h1>

          <p className="animate-fade-in-up mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#5d5d5d] dark:text-[#b4b4b4]" style={{ animationDelay: "160ms" }}>
            {t({
              en: "We agree on what you want to improve, test a solution with your real data and measure the results. If it works for your needs, we plan the next steps together. A scoped trial may take up to six weeks.",
              vi: "Hai bên thống nhất điều cần cải thiện, thử giải pháp trên dữ liệu thực tế và đo kết quả. Nếu phù hợp, chúng ta sẽ cùng lên kế hoạch tiếp theo. Thời gian thử nghiệm có thể kéo dài tối đa sáu tuần, tùy phạm vi.",
            })}
          </p>

          <div className="animate-fade-in-up mt-8 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: "240ms" }}>
            <button className="btn-primary btn-shine" onClick={() => onNavigate("contact")}>
              {t({ en: "Book a 30-minute intro call", vi: "Đặt lịch trao đổi 30 phút" })}
            </button>
            <button className="btn-ghost btn-shine" onClick={() => onNavigate("tech")}>
              {t({ en: "Explore technologies", vi: "Xem các công nghệ" })}
            </button>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4">
            {STATS.map((s, i) => (
              <div key={s.label.en} className="glass animate-fade-in-up p-5" style={{ animationDelay: `${400 + i * 90}ms` }}>
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
            <div className="mono-label">{t({ en: "A clear way to evaluate", vi: "Cách đánh giá rõ ràng" })}</div>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
            {t({ en: "Prove value before scaling.", vi: "Kiểm chứng giá trị trước khi mở rộng." })}
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {ENGAGEMENT_PRINCIPLES.map((g, i) => (
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
            <div className="mono-label">{t({ en: "How we measure progress", vi: "Cách đo lường tiến độ" })}</div>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              {t({ en: "Define success before the pilot starts.", vi: "Xác định thành công trước khi pilot bắt đầu." })}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#5d5d5d] dark:text-[#b4b4b4]">
              {t({
                en: "Every engagement starts with a baseline and agreed measures. Actual outcomes depend on your data, scope and operating environment.",
                vi: "Mỗi hợp tác bắt đầu bằng mức cơ sở và chỉ số được thống nhất. Kết quả thực tế phụ thuộc vào dữ liệu, phạm vi và môi trường vận hành của bạn.",
              })}
            </p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {SUCCESS_MEASURES.map((measure, i) => (
              <article key={measure.title.en} className="glass animate-fade-in-up flex flex-col p-6" style={{ animationDelay: `${i * 90}ms` }}>
                <div className="mono-label">{t({ en: `Measure 0${i + 1}`, vi: `Chỉ số 0${i + 1}` })}</div>
                <h3 className="mt-4 text-lg font-semibold">{t(measure.title)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5d5d5d] dark:text-[#b4b4b4]">{t(measure.body)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="glass-high terminal animate-fade-in-up relative overflow-hidden p-10 text-center md:p-14">
          <div className="mono-label">{t({ en: "Start with a conversation", vi: "Bắt đầu bằng một cuộc trao đổi" })}</div>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold md:text-4xl">
            {t({ en: "Find out whether a pilot is right for your team.", vi: "Xác định pilot có phù hợp với đội ngũ của bạn không." })}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#5d5d5d] dark:text-[#b4b4b4]">
            {t({
              en: "Book a 30-minute introductory conversation. Audit scope, ROI estimates and project terms are defined separately after we understand your needs.",
              vi: "Đặt lịch trao đổi ban đầu trong 30 phút. Phạm vi audit, ước tính ROI và điều khoản dự án sẽ được xác định riêng sau khi hiểu nhu cầu của bạn.",
            })}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button className="btn-primary btn-shine" onClick={() => onNavigate("contact")}>
              {t({ en: "Book an intro call", vi: "Đặt lịch trao đổi" })}
            </button>
            <button className="btn-ghost btn-shine" onClick={() => onNavigate("aihub")}>
              {t({ en: "Ask the AI Hub", vi: "Hỏi AI Hub" })}
            </button>
          </div>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 font-mono text-[11px] uppercase tracking-widest text-[#8f8f8f]">
            <span>✓ {t({ en: "30-minute intro call", vi: "Trao đổi ban đầu 30 phút" })}</span>
            <span>✓ {t({ en: "Pilot scope agreed upfront", vi: "Thống nhất phạm vi pilot từ đầu" })}</span>
            <span>✓ {t({ en: "Outcomes measured against a baseline", vi: "Đo kết quả theo mức cơ sở" })}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
