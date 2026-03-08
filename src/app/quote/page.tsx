import type { Metadata } from "next";
import { QuotePageClient } from "./client";

export const metadata: Metadata = {
  title: "Instant Quote",
  description:
    "Get your free instant cleaning quote in under 2 minutes. Transparent pricing for residential, commercial, and eco-friendly cleaning services across the GTA.",
};

export default function QuotePage() {
  return <QuotePageClient />;
}
