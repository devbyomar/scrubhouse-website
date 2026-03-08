"use client";

import Link from "next/link";
import { Star, ArrowRight, Sparkles, MessageSquare, Quote, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { REVIEWS, REVIEW_STATS, getAverageRating } from "@/data/reviews";

const averageRating = getAverageRating().toFixed(1);

export function ReviewsPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-blue-accent" />
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-20 right-20 w-96 h-96 bg-cyan rounded-full blur-[120px]" />
        </div>
        <div className="container-custom relative z-10">
          <FadeIn>
            <Badge variant="secondary" className="bg-cyan/20 text-cyan border-cyan/30 mb-4">
              <MessageSquare className="h-3 w-3 mr-1" /> Client Feedback
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-sm mb-4">
              What Our <span className="text-cyan">Clients Say</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Real feedback from real clients. We let our work speak for itself — and our clients are happy to back it up.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Rating Summary */}
      <section className="py-12 bg-white border-b border-border">
        <div className="container-custom">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="text-center">
                <p className="text-6xl font-bold text-navy mb-2">{averageRating}</p>
                <div className="flex gap-1 justify-center mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`h-6 w-6 ${s <= Math.round(Number(averageRating)) ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
                  ))}
                </div>
                <p className="text-sm text-text-muted">Based on {REVIEW_STATS.totalReviews} Google reviews</p>
              </div>
              <div className="h-16 w-px bg-border hidden md:block" />
              <div className="text-center md:text-left">
                <p className="text-sm text-text-muted mb-3">Trusted by homeowners and businesses across the GTA</p>
                <a
                  href={REVIEW_STATS.googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-cyan hover:text-cyan/80 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Leave Us a Google Review
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((review, i) => (
              <StaggerItem key={i}>
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <Quote className="h-8 w-8 text-cyan/20 mb-4" />
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className={`h-4 w-4 ${j < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
                      ))}
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed mb-6">
                      &ldquo;{review.text}&rdquo;
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-navy/10 flex items-center justify-center">
                          <span className="text-sm font-bold text-navy">{review.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-text-primary">{review.name}</p>
                          <p className="text-xs text-text-muted">{review.location}</p>
                        </div>
                      </div>
                      <span className="text-xs text-text-light">{review.date}</span>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-blue-accent" />
        <div className="container-custom relative z-10 py-20 text-center">
          <FadeIn>
            <Sparkles className="h-10 w-10 text-cyan mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-sm mb-4">
              Ready to Experience the Difference?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
              Join hundreds of satisfied clients across the GTA. Get your free quote today.
            </p>
            <Button variant="cyan" size="xl" asChild>
              <Link href="/quote" className="group">
                Get Instant Quote
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
