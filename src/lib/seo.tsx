/**
 * ============================================
 * SCRUBHOUSE - SEO STRUCTURED DATA COMPONENTS
 * ============================================
 *
 * JSON-LD schema generators for rich snippets.
 * Each function returns a <script> tag for embedding
 * in page <head> via Next.js metadata or inline.
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */

import { SITE_CONFIG, SERVICE_AREAS } from "@/lib/config";

// ============================================
// TYPES
// ============================================

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceSchema {
  name: string;
  description: string;
  url?: string;
  provider?: string;
  areaServed?: string[];
  priceRange?: string;
}

interface ReviewSchema {
  author: string;
  rating: number;
  body: string;
  datePublished?: string;
}

// ============================================
// SCHEMA GENERATORS
// ============================================

/**
 * BreadcrumbList – helps Google show breadcrumb trails in SERPs
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.href}`,
    })),
  };
}

/**
 * FAQPage – enables FAQ rich snippets (expandable answers in SERPs)
 */
export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Service – for service pages
 */
export function generateServiceSchema(service: ServiceSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      name: service.provider || SITE_CONFIG.fullName,
      url: SITE_CONFIG.url,
    },
    areaServed: (service.areaServed || SERVICE_AREAS.map((a) => a.name)).map(
      (city) => ({
        "@type": "City",
        name: city,
      })
    ),
    ...(service.url && { url: `${SITE_CONFIG.url}${service.url}` }),
    ...(service.priceRange && { priceRange: service.priceRange }),
  };
}

/**
 * AggregateRating + individual Reviews for the reviews page
 */
export function generateReviewSchema(
  reviews: ReviewSchema[],
  aggregateRating: { ratingValue: number; reviewCount: number }
) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_CONFIG.fullName,
    url: SITE_CONFIG.url,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: r.author,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
      },
      reviewBody: r.body,
      ...(r.datePublished && { datePublished: r.datePublished }),
    })),
  };
}

/**
 * WebSite – enables sitelinks search box in Google
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.fullName,
    url: SITE_CONFIG.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/services?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Organization – brand knowledge panel
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.fullName,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo-full.jpg`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE_CONFIG.phone,
      contactType: "customer service",
      areaServed: "CA",
      availableLanguage: ["English"],
    },
    sameAs: [
      SITE_CONFIG.socialLinks.instagram,
      SITE_CONFIG.socialLinks.facebook,
      SITE_CONFIG.socialLinks.google,
    ],
  };
}

// ============================================
// COMPONENT HELPER
// ============================================

/**
 * Returns a JSON-LD <script> tag for use in page components.
 * Usage:
 *   <JsonLd data={generateBreadcrumbSchema([...])} />
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
