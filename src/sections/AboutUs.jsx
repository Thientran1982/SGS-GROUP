import { useT } from "../lang.jsx";

const VALUES = [
  { en: "Agree on success measures before the pilot", vi: "Thống nhất chỉ số thành công trước pilot" },
  { en: "Pilot on real data before production rollout", vi: "Pilot trên dữ liệu thực trước khi triển khai production" },
  { en: "Vietnamese engineers, deep local expertise", vi: "Kỹ sư Việt Nam, am hiểu thị trường nội địa" },
  { en: "Security and compliance scoped to each engagement", vi: "Phạm vi bảo mật và tuân thủ được xác định theo từng dự án" },
];

const COUNTERS = [
  { value: "50+", label: { en: "Projects since 2020", vi: "Dự án từ 2020" } },
  { value: "50+", label: { en: "Enterprise clients served", vi: "Doanh nghiệp đã phục vụ" } },
  { value: "2020", label: { en: "Founded in Vietnam", vi: "Thành lập tại Việt Nam" } },
];

const TEAM = [
  {
    id: "001",
    initials: "NDV",
    name: "Nguyen Duc Vinh",
    role: { en: "CEO & Co-Founder", vi: "CEO & Đồng sáng lập" },
    bio: {
      en: "12 years in enterprise software and AI. Led data teams at FPT Software and VNG before founding SGS in 2020.",
      vi: "12 năm trong phần mềm doanh nghiệp và AI. Dẫn dắt đội dữ liệu tại FPT Software và VNG trước khi sáng lập SGS năm 2020.",
    },
  },
  {
    id: "002",
    initials: "TTLA",
    name: "Tran Thi Lan Anh",
    role: { en: "CTO & Co-Founder", vi: "CTO & Đồng sáng lập" },
    bio: {
      en: "10 years in distributed systems and ML infrastructure. Built large-scale pipelines for logistics clients in Vietnam and Thailand.",
      vi: "10 năm trong hệ thống phân tán và hạ tầng ML. Dựng pipeline quy mô lớn cho khách hàng logistics tại Việt Nam và Thái Lan.",
    },
  },
  {
    id: "003",
    initials: "PMK",
    name: "Pham Minh Khoa",
    role: { en: "Head of Delivery", vi: "Trưởng bộ phận Triển khai" },
    bio: {
      en: "8 years delivering AI and automation for retail, logistics and finance, with a focus on dependable project delivery.",
      vi: "8 năm triển khai AI và tự động hóa cho bán lẻ, logistics và tài chính, tập trung vào chất lượng bàn giao.",
    },
  },
];

const GUARANTEE_CHIPS = [
  { en: "Pilot scope agreed upfront", vi: "Thống nhất phạm vi pilot từ đầu" },
  { en: "Success measures agreed upfront", vi: "Thống nhất chỉ số thành công từ đầu" },
  { en: "Six-week pilot window where scope allows", vi: "Khung pilot sáu tuần khi phạm vi phù hợp" },
  { en: "Production rollout planned separately", vi: "Lộ trình production được lập riêng" },
];

const PARTNERS = ["Google Cloud", "AWS", "Microsoft Azure", "NVIDIA", "Intel", "IBM"];

export default function AboutUs() {
  const t = useT();

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-black/10 dark:border-white/10">
        <div className="hero-bg absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-10 sm:px-6">
          <div className="animate-fade-in-up flex items-center gap-4">
            <span className="mono-label">Profile</span>
            <span className="chip">{t({ en: "Est. 2020", vi: "Thành lập 2020" })}</span>
          </div>
          <h1 className="animate-fade-in-up mt-5 max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl" style={{ animationDelay: "140ms" }}>
            {t({ en: "Built in Vietnam. Trusted across Southeast Asia.", vi: "Xây tại Việt Nam. Tin cậy khắp Đông Nam Á." })}
          </h1>
          <p className="animate-fade-in-up mt-6 max-w-2xl leading-relaxed text-[#5d5d5d] dark:text-[#b4b4b4]" style={{ animationDelay: "220ms" }}>
            {t({
              en: "Founded in 2020, SGS GROUP works with Vietnamese and Southeast Asian enterprises on analytics, demand forecasting, automation, AI, cloud and data platforms. Each engagement starts by understanding the operating context and defining how success will be measured.",
              vi: "Thành lập năm 2020, SGS GROUP đồng hành cùng doanh nghiệp Việt Nam và Đông Nam Á trong các bài toán phân tích dữ liệu, dự báo nhu cầu, tự động hóa, AI, cloud và nền tảng dữ liệu. Mỗi hợp tác bắt đầu bằng việc hiểu bối cảnh vận hành và xác định cách đo lường thành công.",
            })}
          </p>
        </div>
      </section>

      {/* Story + values */}
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div className="animate-fade-in-up">
          <h4 className="text-lg font-semibold">{t({ en: "Our journey", vi: "Hành trình" })}</h4>
          <p className="mt-3 text-sm leading-relaxed text-[#5d5d5d] dark:text-[#b4b4b4]">
            {t({
              en: "Since 2020, our work has spanned analytics, demand forecasting, automation, AI, cloud and data platforms. We begin with the client's current process, data and constraints, then define a pilot and success measures before planning a production rollout.",
              vi: "Từ năm 2020, SGS GROUP triển khai các giải pháp phân tích dữ liệu, dự báo nhu cầu, tự động hóa, AI, cloud và nền tảng dữ liệu. Chúng tôi bắt đầu từ quy trình, dữ liệu và giới hạn thực tế của khách hàng, sau đó xác định pilot và chỉ số thành công trước khi lập kế hoạch production.",
            })}
          </p>
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "120ms" }}>
          <h4 className="text-lg font-semibold">{t({ en: "What we stand for", vi: "Giá trị chúng tôi theo đuổi" })}</h4>
          <ul className="mt-3 space-y-2.5">
            {VALUES.map((v, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-[#5d5d5d] dark:text-[#ececec]">
                <span className="text-primary-glow">✓</span>
                {t(v)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Counters */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {COUNTERS.map((c, i) => (
            <div key={i} className="glass animate-fade-in-up p-6 text-center" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="text-gradient font-mono text-4xl font-medium">{c.value}</div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-widest text-[#8f8f8f]">{t(c.label)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="border-y border-black/10 py-16 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="animate-fade-in-up text-2xl font-semibold md:text-3xl">
            {t({ en: "Leadership", vi: "Đội ngũ lãnh đạo" })}
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {TEAM.map((p, i) => (
              <div key={p.id} className="glass animate-fade-in-up flex flex-col p-6" style={{ animationDelay: `${i * 90}ms` }}>
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-[#e3e3e3] font-mono text-xs font-medium text-[#0d0d0d] dark:bg-white/10 dark:text-[#e3e3e3]">
                    {p.initials}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#8f8f8f]">ID: {p.id}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{p.name}</h3>
                <div className="mono-label mt-1">{t(p.role)}</div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#5d5d5d] dark:text-[#b4b4b4]">{t(p.bio)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pilot and delivery approach */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="glass-high terminal animate-fade-in-up p-8 md:p-10">
          <div className="mono-label">{t({ en: "Our pilot and delivery approach", vi: "Cách triển khai pilot và dự án" })}</div>
          <h3 className="mt-3 max-w-2xl text-2xl font-semibold md:text-3xl">
            {t({ en: "Validate the pilot. Scope production with evidence.", vi: "Kiểm chứng pilot. Lập phạm vi production dựa trên dữ liệu." })}
          </h3>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#5d5d5d] dark:text-[#b4b4b4]">
            {t({
              en: "A pilot can run for up to six weeks when scope, data access and dependencies allow. Baseline, success measures, deliverables, fees and any remedies are agreed in writing before work starts. Full production rollout is scoped separately.",
              vi: "Pilot có thể kéo dài tối đa sáu tuần khi phạm vi, quyền truy cập dữ liệu và các điều kiện phụ thuộc cho phép. Mức cơ sở, chỉ số thành công, hạng mục bàn giao, chi phí và biện pháp xử lý (nếu có) cần được thống nhất bằng văn bản trước khi bắt đầu. Triển khai production được xác định phạm vi riêng.",
            })}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {GUARANTEE_CHIPS.map((c, i) => (
              <span key={i} className="chip">✓ {t(c)}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="animate-fade-in-up">
          <div className="mono-label">{t({ en: "Cloud & infrastructure partners", vi: "Đối tác đám mây & hạ tầng" })}</div>
          <p className="mt-2 font-mono text-[11px] text-[#8f8f8f]">
            {"// "}
            {t({ en: "Platforms we build and deploy on", vi: "Nền tảng chúng tôi xây dựng và triển khai" })}
          </p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {PARTNERS.map((p, i) => (
            <div
              key={p}
              className="glass animate-fade-in-up grid place-items-center px-4 py-5 font-display text-sm font-semibold text-[#5d5d5d] transition-colors hover:border-primary-glow/40 hover:text-primary-glow dark:text-[#afafaf]"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {p}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
