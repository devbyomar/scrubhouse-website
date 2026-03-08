/**
 * Real Google Reviews for ScrubHouse Inc.
 * 
 * Source: Google Business Profile (25 reviews, 5.0 average)
 * Google Maps: https://www.google.com/maps/place/ScrubHouse+Inc./
 * 
 * To add new reviews:
 * 1. Go to your Google Business Profile
 * 2. Click "Read reviews"
 * 3. Copy the reviewer name, text, and date
 * 4. Add a new entry to the REVIEWS array below
 * 5. Update REVIEW_STATS.totalReviews count
 */

export interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
  /** Optional: area/city of the reviewer */
  location?: string;
}

/**
 * Overall stats from Google Business Profile.
 * Update these when adding new reviews.
 */
export const REVIEW_STATS = {
  averageRating: 5.0,
  totalReviews: 25,
  /** Link to leave a new Google review */
  googleReviewUrl:
    "https://www.google.com/maps/place/ScrubHouse+Inc./@43.901344,-79.2986321,15z/data=!4m8!3m7!1s0x82318cb2b91025e7:0x9bacd1590f8338f1!8m2!3d43.901344!4d-79.2986321!9m1!1b1!16s%2Fg%2F11lmhqx09b?entry=ttu",
} as const;

/**
 * Real reviews from Google Business Profile.
 * Ordered newest first.
 */
export const REVIEWS: Review[] = [
  {
    name: "Andrea Diaz",
    rating: 5,
    text: "Highly recommend ScrubHouse Cleaning for your carpet cleaning needs! They did an incredible job getting my client's house ready for listing. Their professionalism and meticulous attention to detail in removing stains were impressive.",
    date: "1 year ago",
    location: "GTA",
  },
  {
    name: "Alex",
    rating: 5,
    text: "I recently used Scrub House Cleaning Inc. for a deep clean at my new property, and I couldn't be happier with the results! A special thank you to Mansor for his attention to detail and professionalism throughout the entire process.",
    date: "1 year ago",
    location: "GTA",
  },
  {
    name: "Martha Bond",
    rating: 5,
    text: "My realtor hired scrub house for a pre-staging deep clean. They arrived right on time, were polite and did an exceptional job. Highly recommend them.",
    date: "10 months ago",
    location: "GTA",
  },
  {
    name: "Muvzy Hoops",
    rating: 5,
    text: "I can't say enough great things about ScrubHouse! From the moment I contacted them, I knew I was dealing with true professionals. Their commitment to delivering a spotless clean every time is evident as they did an amazing job with my home.",
    date: "1 year ago",
    location: "GTA",
  },
  {
    name: "Arzo Nooristani",
    rating: 5,
    text: "Rating: ★★★★★ (5/5) — HIGHLY RECOMMENDED! ScrubHouse delivered an outstanding cleaning service. Their team was thorough, professional, and left everything spotless. Incredible attention to detail.",
    date: "1 year ago",
    location: "GTA",
  },
  {
    name: "Asim Ebrahimi",
    rating: 5,
    text: "I have consistently employed ScrubHouse for pre-staging cleans for all of my property listings. They are punctual, deliver exceptional cleaning services, and offer excellent customer support. I highly recommend them to homeowners and realtors in search of a reliable and professional cleaning company.",
    date: "1 year ago",
    location: "GTA",
  },
  {
    name: "Akeim Villous",
    rating: 5,
    text: "Wasn't sure at first but after my first service with ScrubHouse I'm impressed. They did a fantastic job cleaning my condo. The team was professional, thorough, and really paid attention to detail. I'm really happy with how clean everything turned out.",
    date: "1 year ago",
    location: "GTA",
  },
  {
    name: "MLKS Delivery Solutions",
    rating: 5,
    text: "I recently contracted ScrubHouse to clean my office, and they did an absolutely amazing job! From the moment I contacted them, the experience was seamless and professional. I had the pleasure of dealing with Mansor, who was incredibly helpful and attentive.",
    date: "1 year ago",
    location: "GTA",
  },
];

/**
 * Get the top N reviews for homepage preview.
 */
export function getTopReviews(count = 3): Review[] {
  return REVIEWS.slice(0, count);
}

/**
 * Calculate average rating from the reviews array.
 * Falls back to REVIEW_STATS.averageRating if no reviews.
 */
export function getAverageRating(): number {
  if (REVIEWS.length === 0) return REVIEW_STATS.averageRating;
  return REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length;
}
