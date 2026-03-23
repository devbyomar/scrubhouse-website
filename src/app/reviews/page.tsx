import type { Metadata } from "next";
import { ReviewsPageClient } from "./client";
import { JsonLd, generateBreadcrumbSchema, generateReviewSchema } from "@/lib/seo";
import { getTopReviews, REVIEW_STATS } from "@/data/reviews";

export const metadata: Metadata = {
  title: "Customer Reviews | 5-Star Rated Cleaning Service",
  description:
    "Read what our clients say about ScrubHouse Cleaning. 5.0★ average rating. Trusted by hundreds of homes and businesses across the Greater Toronto Area.",
  alternates: {
    canonical: "/reviews",
  },
  openGraph: {
    title: "Customer Reviews | ScrubHouse Cleaning",
    description:
      "5.0★ average rating from hundreds of satisfied customers across the GTA.",
    url: "/reviews",
  },
};

export default function ReviewsPage() {
  const topReviews = getTopReviews(10);

  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Reviews", href: "/reviews" },
        ])}
      />
      <JsonLd
        data={generateReviewSchema(
          topReviews.map((r) => ({
            author: r.name,
            rating: r.rating,
            body: r.text,
          })),
          {
            ratingValue: REVIEW_STATS.averageRating,
            reviewCount: REVIEW_STATS.totalReviews,
          }
        )}
      />
      <ReviewsPageClient />
    </>
  );
}
