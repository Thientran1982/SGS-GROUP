import { useState } from "react";
import { useT } from "../lang.jsx";

const INFO = [
  {
    label: { en: "Address", vi: "Địa chỉ" },
    value: {
      en: "122 -124 B2, Sala Urban Area, Thu Duc City, HCMC",
      vi: "122 -124 B2, Khu đô thị Sala, TP. Thủ Đức, TP.HCM",
    },
  },
  { label: { en: "Email", vi: "Email" }, value: "info@sgsgroup.vn" },
  { label: { en: "Phone", vi: "Điện thoại" }, value: "(+84)9 7113 2378" },
  {
    label: { en: "Hours", vi: "Giờ làm việc" },
    value: { en: "Mon-Fri: 9:00 AM - 6:00 PM (GMT+7)", vi: "Thứ 2–6: 9:00 - 18:00 (GMT+7)" },
  },
];

export default function Contact() {
  const t = useT();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6">
      <div className="animate-fade-in-up">
        <div className="mono-label">Comm_Link</div>
        <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
          {t({ en: "Get In Touch", vi: "Liên hệ với chúng tôi" })}
        </h2>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {/* Form */}
        <div className="glass terminal animate-fade-in-up p-6 md:p-8" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">
              {t({ en: "Send us a message", vi: "Gửi tin nhắn cho chúng tôi" })}
            </h3>
            <span className="chip">
              <span className="h-1.5 w-1.5 rounded-full bg-ok animate-pulse-slow" />
              {t({ en: "Secure Channel", vi: "Kênh bảo mật" })}
            </span>
          </div>

          {sent ? (
            <div className="mt-8 rounded-lg border border-ok/40 bg-ok/10 p-6 text-center">
              <div className="font-mono text-sm text-ok">✓ {t({ en: "Transmission Complete", vi: "Gửi thành công" })}</div>
              <p className="mt-2 text-sm text-[#5d5d5d] dark:text-[#b4b4b4]">
                {t({
                  en: "We respond to all enquiries within 1 business day (Mon–Fri, 9 AM–6 PM GMT+7)",
                  vi: "Chúng tôi phản hồi mọi yêu cầu trong 1 ngày làm việc (Thứ 2–6, 9:00–18:00 GMT+7)",
                })}
              </p>
            </div>
          ) : (
            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div>
                <label className="mono-label" htmlFor="ct-name">{t({ en: "Name", vi: "Tên" })}</label>
                <input
                  id="ct-name"
                  required
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Ex: John Doe"
                  className="mt-2 w-full rounded-md border border-black/10 bg-transparent px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-glow/60 dark:border-white/15"
                />
              </div>
              <div>
                <label className="mono-label" htmlFor="ct-email">Email</label>
                <input
                  id="ct-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={set("email")}
                  placeholder="email@company.com"
                  className="mt-2 w-full rounded-md border border-black/10 bg-transparent px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-glow/60 dark:border-white/15"
                />
              </div>
              <div>
                <label className="mono-label" htmlFor="ct-msg">{t({ en: "Message", vi: "Nội dung" })}</label>
                <textarea
                  id="ct-msg"
                  required
                  rows={5}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="..."
                  className="mt-2 w-full resize-none rounded-md border border-black/10 bg-transparent px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-glow/60 dark:border-white/15"
                />
              </div>
              <button
                type="submit"
                className="btn-primary btn-shine w-full font-mono text-xs uppercase tracking-[0.25em]"
              >
                {t({ en: "Send", vi: "Gửi" })}
              </button>
              <p className="text-center font-mono text-[10px] text-[#8f8f8f]">
                {t({
                  en: "We respond to all enquiries within 1 business day (Mon–Fri, 9 AM–6 PM GMT+7)",
                  vi: "Chúng tôi phản hồi mọi yêu cầu trong 1 ngày làm việc (Thứ 2–6, 9:00–18:00 GMT+7)",
                })}
              </p>
            </form>
          )}
        </div>

        {/* Info + map */}
        <div className="animate-fade-in-up space-y-6" style={{ animationDelay: "180ms" }}>
          <div className="glass p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase leading-relaxed tracking-wider text-[#8f8f8f]">
              Sai Gon Sun Co., Ltd — {t({ en: "Business Reg. No.", vi: "Mã số DN" })} 0312960439 —{" "}
              {t({
                en: "Issued by HCM City Dept. of Planning and Investment",
                vi: "Cấp bởi Sở Kế hoạch & Đầu tư TP.HCM",
              })}
            </p>
            <dl className="mt-5 space-y-4">
              {INFO.map((row, i) => (
                <div key={i} className="flex flex-col gap-1 border-b border-black/10 pb-4 last:border-0 dark:border-white/10">
                  <dt className="mono-label">{t(row.label)}</dt>
                  <dd className="text-sm text-[#0d0d0d] dark:text-[#cdcdcd]">{t(row.value)}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="glass overflow-hidden">
            <div className="flex items-center justify-between border-b border-black/10 px-4 py-3 dark:border-white/10">
              <span className="mono-label">{t({ en: "Live Satellite Feed", vi: "Trực tiếp vệ tinh" })}</span>
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ok">
                <span className="h-1.5 w-1.5 rounded-full bg-ok animate-pulse-slow" />
                Online
              </span>
            </div>
            <iframe
              title="SGS GROUP — Sala, Thu Duc City, HCMC"
              src="https://www.google.com/maps?q=Sala%20Urban%20Area%2C%20Thu%20Duc%20City%2C%20Ho%20Chi%20Minh%20City&z=15&output=embed"
              className="h-64 w-full grayscale-[0.35] dark:opacity-90 dark:invert-[0.92] dark:hue-rotate-180"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
