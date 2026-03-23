import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist. Browse our cleaning services or get an instant quote.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <section className="relative min-h-[70vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-blue-accent" />
      <div className="container-custom relative z-10 text-center py-32">
        <p className="text-cyan font-bold text-lg mb-4">404</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-white/70 text-lg max-w-md mx-auto mb-10">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have
          been moved or no longer exists.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-cyan text-navy-dark font-bold px-8 py-3 rounded-lg hover:bg-cyan-light transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/quote"
            className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            Get Instant Quote
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            Browse Services
          </Link>
        </div>
      </div>
    </section>
  );
}
