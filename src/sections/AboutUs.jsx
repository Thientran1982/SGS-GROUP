import { useT } from "../lang.jsx";

const VALUES = [
  { en: "Results in the contract, not the pitch deck", vi: "Kết quả ghi trong hợp đồng, không phải bản thuyết trình" },
  { en: "Pilot on real data before full commitment", vi: "Chạy thử trên dữ liệu thực trước khi cam kết" },
  { en: "Vietnamese engineers, deep local expertise", vi: "Kỹ sư Việt Nam, am hiểu thị trường nội địa" },
  { en: "Compliant with Law 24/2018 & PDPA", vi: "Tuân thủ Luật An ninh mạng 24/2018 & PDPA" },
];

const COUNTERS = [
  { value: "200+", label: { en: "Projects since 2020", vi: "Dự án từ 2020" } },
  { value: "40+", label: { en: "Engineers on staff", vi: "Kỹ sư đang làm việc" } },
  { value: "6", label: { en: "Countries served", vi: "Quốc gia phục vụ" } },
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
      en: "8 years delivering AI and automation for retail, logistics and finance. Keeps our 98.7% on-time rate.",
      vi: "8 năm triển khai AI và tự động hóa cho bán lẻ, logistics, tài chính. Duy trì tỷ lệ bàn giao đúng hạn 98.7%.",
    },
  },
];

const GUARANTEE_CHIPS = [
  { en: "6-week pilot window", vi: "Pilot trong 6 tuần" },
  { en: "Signed SLA before start", vi: "Ký SLA trước khi bắt đầu" },
  { en: "100% refund if no results", vi: "Hoàn 100% nếu không có kết quả" },
  { en: "12-month support included", vi: "Bao gồm 12 tháng hỗ trợ" },
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
              en: "Founded in 2020 by engineers who solved these problems inside Vietnamese enterprises — then built the tools they couldn't buy. Everything we sell was proven in production first.",
              vi: "Thành lập 2020 bởi những kỹ sư từng giải quyết vấn đề này ngay trong doanh nghiệp Việt — rồi tự xây công cụ không nơi nào bán. Mọi dịch vụ đều chạy thật trước khi bán.",
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
              en: "2020: automated our own finance operations. 2021: first client analytics platform. 2022: first Vietnamese-language LLM. 2024: 50+ enterprises run our systems. We never demo what hasn't run in production.",
              vi: "2020: tự động hóa tài chính của chính mình. 2021: nền tảng phân tích cho khách hàng đầu tiên. 2022: LLM tiếng Việt đầu tiên. 2024: 50+ doanh nghiệp dùng hệ thống của chúng tôi. Chúng tôi không demo thứ chưa từng chạy thật.",
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

      {/* Delivery guarantee */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="glass-high terminal animate-fade-in-up p-8 md:p-10">
          <div className="mono-label">{t({ en: "Our delivery guarantee", vi: "Cam kết giao hàng" })}</div>
          <h3 className="mt-3 max-w-2xl text-2xl font-semibold md:text-3xl">
            {t({ en: "No results in 6 weeks? You pay nothing.", vi: "Không kết quả trong 6 tuần? Bạn không trả tiền." })}
          </h3>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#5d5d5d] dark:text-[#b4b4b4]">
            {t({
              en: "Every project starts with a fixed-scope pilot on your real data. If we can't show measurable improvement in the pilot window, we refund 100% — no questions asked.",
              vi: "Mọi dự án bắt đầu bằng pilot phạm vi cố định trên dữ liệu thực. Nếu không chứng minh được cải thiện đo lường được trong thời gian pilot, chúng tôi hoàn 100% — không hỏi lý do.",
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
