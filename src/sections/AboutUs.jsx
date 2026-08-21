import { useT } from "../lang.jsx";

const VALUES = [
  {
    en: "Results in the contract, not in the pitch deck",
    vi: "Kết quả trong hợp đồng, không phải trong bản thuyết trình",
  },
  {
    en: "Fixed-scope pilot on real data before full commitment",
    vi: "Pilot phạm vi cố định trên dữ liệu thực trước khi cam kết đầy đủ",
  },
  {
    en: "Vietnamese engineers with deep local expertise",
    vi: "Kỹ sư Việt Nam với chuyên môn địa phương sâu",
  },
  {
    en: "Compliance with Cybersecurity Law 24/2018 and PDPA",
    vi: "Tuân thủ Luật An ninh mạng 24/2018 và PDPA",
  },
];

const COUNTERS = [
  { value: "200+", label: { en: "Projects delivered since 2020", vi: "Dự án đã triển khai từ 2020" } },
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
      en: "12 years in enterprise software and AI engineering. Previously led data engineering teams at FPT Software and VNG Corporation. Founded SGS GROUP in 2020 to bring production-grade AI to Vietnamese businesses.",
      vi: "12 năm trong kỹ thuật phần mềm doanh nghiệp và AI. Trước đây dẫn dắt đội kỹ thuật dữ liệu tại FPT Software và VNG Corporation. Thành lập SGS GROUP năm 2020 để mang AI cấp sản xuất đến doanh nghiệp Việt.",
    },
  },
  {
    id: "002",
    initials: "TTLA",
    name: "Tran Thi Lan Anh",
    role: { en: "CTO & Co-Founder", vi: "CTO & Đồng sáng lập" },
    bio: {
      en: "10 years in distributed systems and machine learning infrastructure. Built large-scale data pipelines for logistics and manufacturing clients across Vietnam and Thailand. Holds an M.Eng from HCMC University of Technology.",
      vi: "10 năm trong hệ thống phân tán và hạ tầng machine learning. Xây pipeline dữ liệu quy mô lớn cho khách hàng logistics và sản xuất tại Việt Nam và Thái Lan. Thạc sĩ Kỹ thuật, Đại học Bách Khoa TP.HCM.",
    },
  },
  {
    id: "003",
    initials: "PMK",
    name: "Pham Minh Khoa",
    role: { en: "Head of Delivery", vi: "Trưởng bộ phận Triển khai" },
    bio: {
      en: "8 years managing AI/automation implementations for enterprise clients in retail, logistics, and finance. Responsible for maintaining our 98.7% on-time delivery rate and client SLA compliance across all active contracts.",
      vi: "8 năm quản lý triển khai AI/tự động hóa cho khách hàng doanh nghiệp trong bán lẻ, logistics và tài chính. Chịu trách nhiệm duy trì tỷ lệ bàn giao đúng hạn 98.7% và tuân thủ SLA trên mọi hợp đồng đang hoạt động.",
    },
  },
];

const GUARANTEE_CHIPS = [
  { en: "6-week pilot window", vi: "Cửa sổ pilot 6 tuần" },
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
          <h2 className="animate-fade-in-up mt-3 text-3xl font-semibold md:text-4xl" style={{ animationDelay: "60ms" }}>
            {t({ en: "About SGS", vi: "Về SGS" })}
          </h2>
          <h1
            className="animate-fade-in-up mt-5 max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
            style={{ animationDelay: "140ms" }}
          >
            {t({
              en: "Built in Vietnam. Trusted Across Southeast Asia.",
              vi: "Xây dựng tại Việt Nam. Được tin cậy khắp Đông Nam Á.",
            })}
          </h1>
          <p
            className="animate-fade-in-up mt-6 max-w-2xl leading-relaxed text-[#5d5d5d] dark:text-[#b4b4b4]"
            style={{ animationDelay: "220ms" }}
          >
            {t({
              en: "Founded in 2020 by engineers who first solved these problems inside Vietnamese enterprises — then built the tools they couldn't buy anywhere. Every service SGS offers was deployed internally before it was sold to a client.",
              vi: "Thành lập năm 2020 bởi các kỹ sư từng giải quyết những vấn đề này ngay trong các doanh nghiệp Việt Nam — rồi xây những công cụ mà không nơi nào mua được. Mọi dịch vụ của SGS đều được triển khai nội bộ trước khi bán cho khách hàng.",
            })}
          </p>
        </div>
      </section>

      {/* Story + values */}
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div className="animate-fade-in-up">
          <h4 className="text-lg font-semibold">
            {t({ en: "How We Got Here", vi: "Hành trình của chúng tôi" })}
          </h4>
          <p className="mt-3 text-sm leading-relaxed text-[#5d5d5d] dark:text-[#b4b4b4]">
            {t({
              en: "We automated our own finance operations in 2020. Built our first client-facing analytics platform in 2021. Deployed our first custom Vietnamese-language LLM in 2022. By 2024, over 50 enterprises were running the systems we built — first for ourselves, then for them. We don't demo capabilities we haven't already put into production.",
              vi: "Chúng tôi tự động hóa vận hành tài chính của mình từ 2020. Xây nền tảng phân tích cho khách hàng đầu tiên năm 2021. Triển khai LLM tiếng Việt tùy chỉnh đầu tiên năm 2022. Đến 2024, hơn 50 doanh nghiệp đang vận hành hệ thống chúng tôi xây — trước cho chính mình, sau cho họ. Chúng tôi không demo năng lực chưa từng đưa vào sản xuất.",
            })}
          </p>
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "120ms" }}>
          <h4 className="text-lg font-semibold">
            {t({ en: "What We Stand For", vi: "Giá trị chúng tôi theo đuổi" })}
          </h4>
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
              <div className="mt-2 font-mono text-[11px] uppercase tracking-widest text-[#8f8f8f]">
                {t(c.label)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="border-y border-black/10 py-16 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="animate-fade-in-up text-2xl font-semibold md:text-3xl">
            {t({ en: "Leadership Team", vi: "Đội ngũ lãnh đạo" })}
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {TEAM.map((p, i) => (
              <div
                key={p.id}
                className="glass animate-fade-in-up flex flex-col p-6"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-[#e3e3e3] font-mono text-xs font-medium text-[#0d0d0d] dark:bg-white/10 dark:text-[#e3e3e3]">
                    {p.initials}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#8f8f8f]">
                    ID: {p.id}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{p.name}</h3>
                <div className="mono-label mt-1">{t(p.role)}</div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#5d5d5d] dark:text-[#b4b4b4]">
                  {t(p.bio)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery guarantee */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="glass-high terminal animate-fade-in-up p-8 md:p-10">
          <div className="mono-label">{t({ en: "Our Delivery Guarantee", vi: "Cam kết giao hàng" })}</div>
          <h3 className="mt-3 max-w-2xl text-2xl font-semibold md:text-3xl">
            {t({
              en: "No results in 6 weeks? You pay nothing.",
              vi: "Không có kết quả trong 6 tuần? Bạn không phải trả tiền.",
            })}
          </h3>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#5d5d5d] dark:text-[#b4b4b4]">
            {t({
              en: "Every engagement begins with a fixed-scope pilot on your real data. We define success metrics together before writing a single line of code. If we cannot demonstrate measurable improvement within the pilot window, we refund 100% of pilot fees — no questions asked.",
              vi: "Mọi hợp tác bắt đầu bằng pilot phạm vi cố định trên dữ liệu thực. Chúng tôi cùng định nghĩa chỉ số thành công trước khi viết dòng code đầu tiên. Nếu không chứng minh được cải thiện đo lường được trong thời gian pilot, chúng tôi hoàn lại 100% phí — không hỏi lý do.",
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
          <div className="mono-label">
            {t({
              en: "Cloud & Infrastructure Partners",
              vi: "Đối tác đám mây & hạ tầng",
            })}
          </div>
          <p className="mt-2 font-mono text-[11px] text-[#8f8f8f]">
            {"// "}
            {t({
              en: "Platforms we build and deploy on",
              vi: "Nền tảng chúng tôi xây dựng và triển khai",
            })}
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
