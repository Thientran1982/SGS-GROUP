
import React, { useEffect } from 'react';
import { Language } from '../types';
import { SEO_CONTENT } from '../constants';

interface SEOProps {
  currentView: string;
  language: Language;
}

export const SEO: React.FC<SEOProps> = ({ currentView, language }) => {
  const seoKey = currentView === 'service-detail' ? 'services' : (currentView === 'privacy' || currentView === 'terms' ? 'home' : currentView);
  const seo = SEO_CONTENT[seoKey] ?? SEO_CONTENT['home'];

  const title = language === 'vi' ? seo.titleVi : seo.titleEn;
  const description = language === 'vi' ? seo.descriptionVi : seo.descriptionEn;
  const locale = language === 'vi' ? 'vi_VN' : 'en_US';
  const siteName = "SGS GROUP";
  const canonicalBase = "https://sgsgroup.vn";
  const canonicalUrl = `${canonicalBase}/`;
  const ogImage = `${canonicalBase}/og-image.jpg`;

  useEffect(() => {
    document.documentElement.lang = language === 'vi' ? 'vi' : 'en';
  }, [language]);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${canonicalBase}/#organization`,
        "name": "SGS GROUP",
        "alternateName": "Công ty TNHH Sai Gon Sun",
        "url": canonicalBase,
        "logo": {
          "@type": "ImageObject",
          "url": `${canonicalBase}/logo.png`,
          "width": 200,
          "height": 60
        },
        "foundingDate": "2020",
        "numberOfEmployees": { "@type": "QuantitativeValue", "value": 40 },
        "description": "Enterprise AI engineering company delivering automation, data analytics, and AI systems to businesses across Vietnam and Southeast Asia.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "122-124 B2, Khu đô thị Sala",
          "addressLocality": "Thủ Đức",
          "addressRegion": "TP. Hồ Chí Minh",
          "postalCode": "700000",
          "addressCountry": "VN"
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+84-971132378",
            "email": "info@sgsgroup.vn",
            "contactType": "customer service",
            "areaServed": ["VN", "TH", "ID", "SG", "MY"],
            "availableLanguage": ["English", "Vietnamese"],
            "hoursAvailable": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "18:00"
            }
          }
        ],
        "sameAs": [
          "https://www.facebook.com/sgsgroup.vn",
          "https://www.linkedin.com/company/sgsgroup-vn"
        ],
        "knowsAbout": [
          "Artificial Intelligence", "Machine Learning", "Process Automation",
          "Robotic Process Automation", "Data Analytics", "Natural Language Processing",
          "Cloud Infrastructure", "Enterprise Software Vietnam"
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${canonicalBase}/#website`,
        "url": canonicalBase,
        "name": siteName,
        "description": "Enterprise AI & Automation solutions for Vietnam and Southeast Asia",
        "publisher": { "@id": `${canonicalBase}/#organization` },
        "inLanguage": ["en", "vi"]
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        "url": canonicalUrl,
        "name": title,
        "description": description,
        "isPartOf": { "@id": `${canonicalBase}/#website` },
        "publisher": { "@id": `${canonicalBase}/#organization` },
        "inLanguage": locale === 'vi_VN' ? 'vi' : 'en'
      }
    ]
  };

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="author" content="SGS GROUP" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="vi" href={`${canonicalUrl}?lang=vi`} />
      <link rel="alternate" hrefLang="en" href={`${canonicalUrl}?lang=en`} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${siteName} — Enterprise AI Vietnam`} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      <meta property="og:locale:alternate" content={locale === 'vi_VN' ? 'en_US' : 'vi_VN'} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@sgsgroup_vn" />
      <meta name="twitter:creator" content="@sgsgroup_vn" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${siteName} — Enterprise AI Vietnam`} />

      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
    </>
  );
};
