import type { Metadata } from "next";
import { CareersPageClient } from "./client";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the ScrubHouse team. We're hiring reliable, detail-oriented cleaning professionals across the Greater Toronto Area. Apply today.",
};

export default function CareersPage() {
  return <CareersPageClient />;
}
