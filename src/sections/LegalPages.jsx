import { useContext } from "react";
import { LangContext, useT } from "../lang.jsx";

const DOCUMENTS = {
  privacy: {
    label: { en: "Legal / Privacy", vi: "Pháp lý / Quyền riêng tư" },
    title: { en: "Privacy Policy", vi: "Chính sách bảo mật" },
    updated: { en: "Draft prepared: 30 September 2026", vi: "Bản nháp ngày: 30/09/2026" },
    sections: [
      {
        title: { en: "1. Who we are", vi: "1. Đơn vị phụ trách" },
        paragraphs: [
          {
            en: "This website is operated by Sai Gon Sun Co., Ltd (business registration number 0312960439), at 122–124 B2, Sala Urban Area, Thu Duc City, Ho Chi Minh City, Vietnam. For privacy questions or requests, contact info@sgsgroup.vn.",
            vi: "Website này do Công ty TNHH Sai Gon Sun vận hành (mã số đăng ký kinh doanh 0312960439), tại 122–124 B2, Khu đô thị Sala, TP. Thủ Đức, TP. Hồ Chí Minh, Việt Nam. Liên hệ info@sgsgroup.vn nếu có câu hỏi hoặc yêu cầu về quyền riêng tư.",
          },
        ],
      },
      {
        title: { en: "2. Information processed by this website", vi: "2. Thông tin website xử lý" },
        paragraphs: [
          {
            en: "The website stores interface preferences—such as the selected language, theme and last-viewed section—in local storage in your browser. The application code reviewed for this draft does not include account registration, online checkout, advertising pixels or analytics tools.",
            vi: "Website lưu một số tùy chọn giao diện—như ngôn ngữ, giao diện sáng/tối và mục được xem gần nhất—trong bộ nhớ local storage của trình duyệt. Mã ứng dụng được rà soát cho bản nháp này không có chức năng tạo tài khoản, thanh toán trực tuyến, pixel quảng cáo hoặc công cụ phân tích truy cập.",
          },
          {
            en: "The contact and newsletter forms do not send data to an SGS website server or a form/newsletter service. When you submit either form, your browser opens a draft in the email application configured on your device, addressed to info@sgsgroup.vn; the draft includes the details you entered. Nothing is sent to SGS unless you choose to send that email. If you do, your email application and email providers will process the message, and SGS may process and retain it in its mailbox to respond or handle your newsletter request. The email providers and their retention settings have not been identified by this website. A newsletter request is not an automatic subscription.",
            vi: "Biểu mẫu liên hệ và bản tin không gửi dữ liệu tới máy chủ website SGS hoặc dịch vụ biểu mẫu/bản tin. Khi gửi biểu mẫu, trình duyệt mở thư nháp trong ứng dụng email được thiết lập trên thiết bị của bạn, gửi tới info@sgsgroup.vn; thư nháp có các thông tin bạn đã nhập. SGS chỉ nhận được thông tin nếu bạn chọn gửi email đó. Khi bạn gửi, ứng dụng email và các nhà cung cấp email sẽ xử lý thư; SGS có thể xử lý và lưu thư trong hộp thư để phản hồi hoặc giải quyết yêu cầu đăng ký bản tin. Website chưa xác định các nhà cung cấp email và cài đặt lưu trữ của họ. Yêu cầu đăng ký bản tin không đồng nghĩa với việc được tự động đăng ký.",
          },
        ],
      },
      {
        title: { en: "3. SGS AI chat", vi: "3. Chat SGS AI" },
        paragraphs: [
          {
            en: "If you use the AI chat, your message and recent conversation history are sent to the SGS application server to generate a reply. Depending on which services are configured and available, the request may be sent to one or more AI providers in the fallback process: B.AI, OpenRouter, Google Gemini and OpenAI (where configured).",
            vi: "Khi sử dụng chat AI, tin nhắn và lịch sử hội thoại gần đây được gửi tới máy chủ ứng dụng SGS để tạo câu trả lời. Tùy dịch vụ được cấu hình và khả dụng, yêu cầu có thể được gửi tới một hoặc nhiều nhà cung cấp AI trong quy trình dự phòng: B.AI, OpenRouter, Google Gemini và OpenAI (nếu được cấu hình).",
          },
          {
            en: "The chat interface does not save conversation history to an account or browser storage. Messages are processed to provide a response. The active provider configuration, each provider’s retention and model-training practices, and the hosting provider’s log retention have not yet been confirmed for this draft.",
            vi: "Giao diện chat không lưu lịch sử hội thoại vào tài khoản hoặc bộ nhớ trình duyệt. Tin nhắn được xử lý để tạo phản hồi. Nhà cung cấp đang bật, cách từng nhà cung cấp lưu trữ hoặc sử dụng dữ liệu để huấn luyện mô hình, và thời hạn lưu log của đơn vị hosting chưa được xác nhận cho bản nháp này.",
          },
          {
            en: "Do not enter passwords, API keys, financial or health information, confidential business material, or personal information about another person unless you have permission and an approved process for sharing it.",
            vi: "Không nhập mật khẩu, API key, thông tin tài chính hoặc sức khỏe, bí mật kinh doanh hay dữ liệu cá nhân của người khác nếu bạn chưa có quyền và quy trình được phê duyệt để chia sẻ.",
          },
        ],
      },
      {
        title: { en: "4. Storage and retention", vi: "4. Lưu trữ và thời hạn lưu" },
        paragraphs: [
          {
            en: "Interface preferences remain in your browser until you clear its local storage. The application has no account or database feature for retaining chat history or form submissions. External AI and hosting providers may process or retain data under their own settings and terms. If you send a form-generated email, the email app and providers you use, as well as SGS's email service, may also process or retain it. SGS must confirm the applicable providers and retention settings before this draft is finalized.",
            vi: "Tùy chọn giao diện được lưu trong trình duyệt cho đến khi bạn xóa local storage. Ứng dụng hiện không có tài khoản hoặc cơ sở dữ liệu để lưu lịch sử chat hoặc thông tin từ biểu mẫu. Nhà cung cấp AI và hosting bên ngoài có thể xử lý hoặc lưu dữ liệu theo cấu hình và điều khoản riêng. Nếu bạn gửi email được tạo từ biểu mẫu, ứng dụng và nhà cung cấp email bạn sử dụng cũng như dịch vụ email của SGS cũng có thể xử lý hoặc lưu thư. SGS cần xác nhận nhà cung cấp và thời hạn lưu áp dụng trước khi hoàn thiện bản chính thức.",
          },
        ],
      },
      {
        title: { en: "5. Your requests and choices", vi: "5. Yêu cầu và lựa chọn của bạn" },
        paragraphs: [
          {
            en: "You can clear the website’s local storage using your browser settings. For privacy questions or requests concerning information you sent directly to SGS, contact info@sgsgroup.vn. Requests relating to data held by an external AI provider may also need to be directed to that provider under its own policy.",
            vi: "Bạn có thể xóa local storage của website trong cài đặt trình duyệt. Với câu hỏi hoặc yêu cầu về thông tin đã gửi trực tiếp cho SGS, hãy liên hệ info@sgsgroup.vn. Yêu cầu liên quan đến dữ liệu do nhà cung cấp AI bên ngoài nắm giữ có thể cần gửi tới nhà cung cấp đó theo chính sách riêng của họ.",
          },
        ],
      },
      {
        title: { en: "6. Children", vi: "6. Trẻ em" },
        paragraphs: [
          {
            en: "This website and its AI chat are intended for people aged 18 or older. Do not use the chat or submit personal information if you are under 18.",
            vi: "Website và chat AI dành cho người từ đủ 18 tuổi. Nếu chưa đủ 18 tuổi, vui lòng không sử dụng chat hoặc gửi thông tin cá nhân.",
          },
        ],
      },
      {
        title: { en: "7. Changes to this draft", vi: "7. Cập nhật chính sách" },
        paragraphs: [
          {
            en: "This page may be updated when the website’s data practices or applicable requirements change. The date at the top shows when this draft was prepared; it is not confirmation that the policy has received legal approval.",
            vi: "Trang này có thể được cập nhật khi cách xử lý dữ liệu của website hoặc yêu cầu áp dụng thay đổi. Ngày ở đầu trang là ngày chuẩn bị bản nháp, không xác nhận rằng nội dung đã được phê duyệt về pháp lý.",
          },
        ],
      },
    ],
  },
  terms: {
    label: { en: "Legal / Terms", vi: "Pháp lý / Điều khoản" },
    title: { en: "Terms & Conditions", vi: "Điều khoản & Điều kiện" },
    updated: { en: "Draft prepared: 30 September 2026", vi: "Bản nháp ngày: 30/09/2026" },
    sections: [
      {
        title: { en: "1. About these terms", vi: "1. Phạm vi điều khoản" },
        paragraphs: [
          {
            en: "These draft terms apply to your use of the SGS GROUP website and its public AI chat. The site is operated by Sai Gon Sun Co., Ltd (business registration number 0312960439), 122–124 B2, Sala Urban Area, Thu Duc City, Ho Chi Minh City, Vietnam.",
            vi: "Điều khoản dự thảo này áp dụng cho việc sử dụng website SGS GROUP và chat AI công khai. Website do Công ty TNHH Sai Gon Sun vận hành (mã số đăng ký kinh doanh 0312960439), tại 122–124 B2, Khu đô thị Sala, TP. Thủ Đức, TP. Hồ Chí Minh, Việt Nam.",
          },
          {
            en: "Any consulting, pilot or production services, including their scope, fees, delivery dates and support terms, are governed by a separate written agreement between the parties. This website does not take online payments or create a project agreement.",
            vi: "Hoạt động tư vấn, pilot hoặc triển khai production—bao gồm phạm vi, chi phí, ngày bàn giao và điều khoản hỗ trợ—được quy định trong thỏa thuận riêng bằng văn bản giữa các bên. Website này không nhận thanh toán trực tuyến hoặc tự tạo thỏa thuận dự án.",
          },
        ],
      },
      {
        title: { en: "2. Eligibility and acceptable use", vi: "2. Độ tuổi và cách sử dụng" },
        paragraphs: [
          {
            en: "You must be at least 18 years old to use this website or its AI chat. Use the site lawfully. Do not attempt to disrupt it, gain unauthorized access, introduce malicious code, or submit content you are not allowed to share.",
            vi: "Bạn phải từ đủ 18 tuổi để sử dụng website hoặc chat AI. Hãy sử dụng website đúng pháp luật. Không tìm cách gây gián đoạn, truy cập trái phép, đưa mã độc vào hệ thống hoặc gửi nội dung mà bạn không có quyền chia sẻ.",
          },
          {
            en: "Do not submit passwords, access credentials, sensitive personal data or confidential third-party information to the AI chat. You are responsible for having permission to provide any content you choose to submit.",
            vi: "Không gửi mật khẩu, thông tin xác thực, dữ liệu cá nhân nhạy cảm hoặc thông tin mật của bên thứ ba vào chat AI. Bạn chịu trách nhiệm bảo đảm mình có quyền cung cấp nội dung đã gửi.",
          },
        ],
      },
      {
        title: { en: "3. Website content and AI responses", vi: "3. Nội dung website và phản hồi AI" },
        paragraphs: [
          {
            en: "Website material and AI responses are provided for general information. AI responses may be incomplete, inaccurate or out of date and are not legal, financial, medical or other professional advice. Verify information and obtain qualified advice before relying on it for a decision.",
            vi: "Nội dung website và phản hồi AI chỉ nhằm cung cấp thông tin chung. Câu trả lời của AI có thể thiếu, không chính xác hoặc đã cũ; không thay thế tư vấn pháp lý, tài chính, y tế hay tư vấn chuyên môn khác. Hãy kiểm tra thông tin và hỏi chuyên gia phù hợp trước khi dựa vào đó để quyết định.",
          },
          {
            en: "Forecasts, examples, charts and interface demonstrations are illustrative unless a separate written agreement identifies them as project deliverables. No specific forecast accuracy, business result, savings, availability or delivery timeline is promised by this page.",
            vi: "Dự báo, ví dụ, biểu đồ và nội dung minh họa giao diện chỉ để tham khảo, trừ khi thỏa thuận riêng bằng văn bản xác định đó là hạng mục bàn giao của dự án. Trang này không cam kết độ chính xác dự báo, kết quả kinh doanh, khoản tiết kiệm, tính sẵn sàng hoặc thời gian bàn giao cụ thể.",
          },
        ],
      },
      {
        title: { en: "4. Intellectual property", vi: "4. Quyền sở hữu trí tuệ" },
        paragraphs: [
          {
            en: "The SGS GROUP name, branding and website materials are presented by SGS GROUP or their respective owners. GMDH Streamline and other third-party names belong to their respective owners. These terms do not transfer ownership of those materials or grant a license beyond ordinary use of the website.",
            vi: "Tên SGS GROUP, nhận diện thương hiệu và nội dung website được cung cấp bởi SGS GROUP hoặc chủ sở hữu tương ứng. GMDH Streamline và tên của các bên thứ ba khác thuộc về chủ sở hữu tương ứng. Điều khoản này không chuyển quyền sở hữu hoặc cấp quyền sử dụng ngoài việc truy cập website thông thường.",
          },
        ],
      },
      {
        title: { en: "5. Third-party services and availability", vi: "5. Dịch vụ bên thứ ba và tính sẵn sàng" },
        paragraphs: [
          {
            en: "The AI chat may rely on external model providers, depending on configuration and availability. Those providers operate under their own terms. SGS does not promise uninterrupted availability or that an AI response will meet a particular need.",
            vi: "Chat AI có thể sử dụng nhà cung cấp mô hình bên ngoài tùy cấu hình và mức độ khả dụng. Các nhà cung cấp đó hoạt động theo điều khoản riêng. SGS không cam kết dịch vụ hoạt động liên tục hoặc câu trả lời AI đáp ứng một nhu cầu cụ thể.",
          },
        ],
      },
      {
        title: { en: "6. Governing law and contact", vi: "6. Luật áp dụng và liên hệ" },
        paragraphs: [
          {
            en: "These terms are governed by the laws of Vietnam. Any dispute will be handled by the competent authorities or courts under applicable Vietnamese law. For questions about these terms, email info@sgsgroup.vn.",
            vi: "Điều khoản này được điều chỉnh theo pháp luật Việt Nam. Tranh chấp được giải quyết bởi cơ quan hoặc tòa án có thẩm quyền theo quy định pháp luật Việt Nam. Nếu có câu hỏi về điều khoản, vui lòng gửi email tới info@sgsgroup.vn.",
          },
        ],
      },
      {
        title: { en: "7. Updates", vi: "7. Cập nhật điều khoản" },
        paragraphs: [
          {
            en: "SGS may revise these terms as the website changes. The date at the top shows when this draft was prepared; review the page again before relying on a later version.",
            vi: "SGS có thể cập nhật điều khoản khi website thay đổi. Ngày ở đầu trang là ngày chuẩn bị bản nháp; hãy kiểm tra lại trang trước khi dựa vào phiên bản được cập nhật sau này.",
          },
        ],
      },
    ],
  },
};

const LEGAL_PATHS = {
  privacy: "/privacy-policy",
  terms: "/terms-and-conditions",
};

function InternalLink({ section, href, onNavigate, children, className }) {
  const handleClick = (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate(section);
  };

  return <a href={href} onClick={handleClick} className={className}>{children}</a>;
}

function LegalPage({ kind, onNavigate }) {
  const t = useT();
  const { lang, setLang } = useContext(LangContext);
  const document = DOCUMENTS[kind];
  const alternate = kind === "privacy" ? "terms" : "privacy";
  const alternateLabel = kind === "privacy"
    ? { en: "Terms & Conditions", vi: "Điều khoản & Điều kiện" }
    : { en: "Privacy Policy", vi: "Chính sách bảo mật" };

  return (
    <article className="mx-auto w-full max-w-4xl px-4 pb-16 pt-7 sm:px-6">
      <header className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-5 dark:border-white/10">
        <InternalLink
          section="home"
          href="/"
          onNavigate={onNavigate}
          className="flex items-center gap-2.5"
        >
          <img src="/logo.svg" alt="" className="h-8 w-8 rounded-lg" />
          <span className="font-display text-lg font-semibold tracking-tight">SGS GROUP</span>
        </InternalLink>
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-full border border-black/10 p-0.5 font-mono text-[11px] dark:border-white/15" role="group" aria-label="Language">
            {["en", "vi"].map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
                  lang === code ? "bg-black/[0.07] font-medium dark:bg-white/10" : "text-[#8f8f8f]"
                }`}
              >
                {code}
              </button>
            ))}
          </div>
          <InternalLink
            section="home"
            href="/"
            onNavigate={onNavigate}
            className="text-sm text-[#5d5d5d] hover:text-primary-glow dark:text-[#b4b4b4]"
          >
            ← {t({ en: "Back to website", vi: "Về website" })}
          </InternalLink>
        </div>
      </header>

      <div className="mono-label">{t(document.label)}</div>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">{t(document.title)}</h1>
      <p className="mt-3 font-mono text-xs text-[#8f8f8f]">{t(document.updated)}</p>

      <aside className="mt-8 rounded-lg border border-amber-300 bg-amber-50 px-4 py-4 text-sm leading-relaxed text-amber-950 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
        <strong>{t({ en: "Draft — not legal advice.", vi: "Bản nháp — không phải tư vấn pháp lý." })}</strong>{" "}
        {t({
          en: "The active AI providers, hosting provider, email providers used by visitors and SGS, and third-party data-retention settings have not been confirmed. Have qualified Vietnamese counsel review this draft and confirm these details before publication as a final policy.",
          vi: "Nhà cung cấp AI đang hoạt động, đơn vị hosting, nhà cung cấp email được khách truy cập và SGS sử dụng, cùng cài đặt lưu dữ liệu của bên thứ ba chưa được xác nhận. Hãy nhờ luật sư đủ chuyên môn tại Việt Nam rà soát bản nháp và xác nhận các thông tin này trước khi công bố thành chính sách chính thức.",
        })}
      </aside>

      <div className="mt-10 space-y-9">
        {document.sections.map((section) => (
          <section key={section.title.en}>
            <h2 className="text-xl font-semibold">{t(section.title)}</h2>
            <div className="mt-3 space-y-3 text-sm leading-7 text-[#4f4f4f] dark:text-[#c8c8c8]">
              {section.paragraphs.map((paragraph, index) => <p key={index}>{t(paragraph)}</p>)}
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-black/10 pt-6 text-sm dark:border-white/10">
        <InternalLink
          section={alternate}
          href={LEGAL_PATHS[alternate]}
          onNavigate={onNavigate}
          className="text-primary-glow hover:underline"
        >
          {t(alternateLabel)}
        </InternalLink>
        <a href="mailto:info@sgsgroup.vn" className="text-primary-glow hover:underline">
          {t({ en: "Contact SGS", vi: "Liên hệ SGS" })}
        </a>
        <InternalLink
          section="home"
          href="/"
          onNavigate={onNavigate}
          className="text-[#5d5d5d] hover:text-primary-glow dark:text-[#b4b4b4]"
        >
          {t({ en: "Home", vi: "Trang chủ" })}
        </InternalLink>
      </footer>
    </article>
  );
}

export function PrivacyPolicy(props) {
  return <LegalPage {...props} kind="privacy" />;
}

export function TermsAndConditions(props) {
  return <LegalPage {...props} kind="terms" />;
}