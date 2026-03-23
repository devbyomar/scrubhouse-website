import type { Metadata } from "next";
import { AboutPageClient } from "./client";
import { JsonLd, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About ScrubHouse | Our Story & Values",
  description:
    "Learn about ScrubHouse Cleaning — our mission, values, and commitment to delivering premium cleaning services across the Greater Toronto Area. Founded in 2023.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About ScrubHouse Cleaning",
    description:
      "Our mission, values, and the team behind the GTA's trusted cleaning service.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ])}
      />
      <AboutPageClient />
    </>
  );
}
