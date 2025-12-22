
import React from 'react';
import { Language } from '../types';

interface SEOProps {
  title: string;
  description: string;
  language: Language;
  url?: string;
  type?: string;
  image?: string;
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  language, 
  url = 'https://sgsgroup.vn/', 
  type = 'website',
  image = 'https://sgsgroup.vn/og-image.jpg' // Default placeholder
}) => {
  const siteName = "SGS GROUP";
  const locale = language === 'vi' ? 'vi_VN' : 'en_US';

  // JSON-LD Structured Data for Organization
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SGS GROUP",
    "url": "https://sgsgroup.vn",
    "logo": "https://sgsgroup.vn/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+84-971132378",
      "contactType": "customer service",
      "areaServed": ["VN", "US"],
      "availableLanguage": ["English", "Vietnamese"]
    },
    "sameAs": [
      "https://facebook.com/sgsgroup",
      "https://twitter.com/sgsgroup",
      "https://linkedin.com/company/sgsgroup"
    ]
  };

  return (
    <>
      {/* Standard Metadata - React 19 Hoisting */}
      <title>{`${title} | ${siteName}`}</title>
      <meta name="description" content={description} />
      <meta name="author" content="SGS GROUP" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </>
  );
};
