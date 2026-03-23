import type { Metadata } from "next";
import { ContactPageClient } from "./client";
import { JsonLd, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Us | Book a Cleaning Consultation",
  description:
    "Get in touch with ScrubHouse Cleaning. Call (416) 903-9982, email, or fill out our contact form. We serve the Greater Toronto Area. Response within 24 hours.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact ScrubHouse Cleaning",
    description:
      "Call, email, or message us. We respond within 24 hours. Serving the entire GTA.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ])}
      />
      <ContactPageClient />
    </>
  );
}
