import type { MetadataRoute } from "next";

/**
 * Dynamic robots.txt generation.
 * Next.js serves this at /robots.txt automatically.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://scrubhouse.ca/sitemap.xml",
  };
}
