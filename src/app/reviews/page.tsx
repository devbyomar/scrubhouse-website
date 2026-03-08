import type { Metadata } from "next";
import { ReviewsPageClient } from "./client";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Read what our clients say about ScrubHouse Cleaning. Trusted by hundreds of homes and businesses across the Greater Toronto Area.",
};

export default function ReviewsPage() {
  return <ReviewsPageClient />;
}
