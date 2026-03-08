"use client";

import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Home,
  Building2,
  Leaf,
  Shield,
  Clock,
  Award,
  ThumbsUp,
  Star,
  CheckCircle2,
  MapPin,
  ChevronRight,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/motion";
import { SITE_CONFIG, TRUST_STATS, SERVICE_AREAS } from "@/lib/config";
import { RESIDENTIAL_PACKAGES } from "@/lib/pricing-engine";
import { getTopReviews, REVIEW_STATS } from "@/data/reviews";

// ============================================
// HERO SECTION
// ============================================

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-blue-accent" />
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-cyan rounded-full blur-[100px]" />
      </div>
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <div className="container-custom relative z-10 py-32 md:py-40">
        <div className="max-w-4xl">
          <FadeIn delay={0.1}>
            <Badge variant="secondary" className="bg-cyan/20 text-cyan border-cyan/30 mb-6">
              <Sparkles className="h-3 w-3 mr-1" />
              Premium Cleaning Services · GTA
            </Badge>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6 drop-shadow-sm">
              <span className="text-white">Experience a</span>{" "}
              <span className="text-cyan">Spotless Clean</span>
              <br />
              <span className="text-white">Every Single Time</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed mb-10">
              Delivering consistent, high-quality cleaning services with meticulous 
              attention to detail. Trusted by hundreds of homes and businesses across 
              the Greater Toronto Area.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="cyan" size="xl" asChild>
                <Link href="/quote" className="group">
                  Get Instant Quote
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline-light" size="xl" asChild>
                <Link href="/contact">
                  <Phone className="h-5 w-5" />
                  Book a Consultation
                </Link>
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.6}>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {TRUST_STATS.map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-cyan mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120V60C240 20 480 0 720 20C960 40 1200 80 1440 60V120H0Z" fill="var(--background)" />
        </svg>
      </div>
    </section>
  );
}

// ============================================
// VALUE PROPOSITION
// ============================================

function ValueProposition() {
  const values = [
    {
      icon: Shield,
      title: "Trusted & Insured",
      description: "Fully vetted, background-checked professionals. Your home is in safe hands.",
    },
    {
      icon: Award,
      title: "Quality Guaranteed",
      description: "100% satisfaction guarantee on every cleaning. We don't cut corners — we clean them.",
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Book when it works for you. One-time, weekly, bi-weekly, or monthly — your schedule, your rules.",
    },
    {
      icon: Leaf,
      title: "Eco-Friendly Options",
      description: "Green cleaning products that are safe for your family, pets, and the environment.",
    },
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeading
          badge="Why ScrubHouse"
          title="A Higher Standard of Clean"
          description="We don't just clean spaces — we transform them. Every visit is backed by professional expertise, premium products, and a genuine commitment to excellence."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, i) => (
            <FadeIn key={value.title} delay={i * 0.1}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="h-12 w-12 rounded-xl bg-cyan/10 flex items-center justify-center mb-5 group-hover:bg-cyan/20 transition-colors">
                    <value.icon className="h-6 w-6 text-cyan" />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">{value.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// SERVICES OVERVIEW
// ============================================

function ServicesOverview() {
  const services = [
    {
      icon: Home,
      title: "Residential Cleaning",
      description: "Transform your home into a haven of cleanliness. From routine tidying to deep cleaning — every corner polished to perfection.",
      features: ["Standard & Deep Cleans", "Move-In / Move-Out", "Recurring Schedules", "Customizable Add-Ons"],
      href: "/services#residential",
    },
    {
      icon: Building2,
      title: "Commercial Cleaning",
      description: "Maintain a professional, hygienic workspace that impresses clients and supports your team's productivity.",
      features: ["Office Cleaning", "Retail Spaces", "Sanitization Services", "Flexible Scheduling"],
      href: "/services#commercial",
    },
    {
      icon: Leaf,
      title: "Eco-Friendly Cleaning",
      description: "Choose sustainability without compromise. Green products and methods that are safe for the planet, your family, and your pets.",
      features: ["Non-Toxic Products", "Safe for Pets & Children", "Reduced Environmental Impact", "Same Premium Quality"],
      href: "/services#eco-friendly",
    },
  ];

  return (
    <section className="section-padding bg-surface-raised">
      <div className="container-custom">
        <SectionHeading
          badge="Our Services"
          title="Tailored Cleaning Solutions"
          description="Whether it's your home, office, or commercial space — we deliver spotless results with services designed around your needs."
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <FadeIn key={service.title} delay={i * 0.15}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-navy to-cyan" />
                <CardContent className="p-8">
                  <div className="h-14 w-14 rounded-2xl bg-navy/5 flex items-center justify-center mb-6 group-hover:bg-cyan/10 transition-colors">
                    <service.icon className="h-7 w-7 text-navy group-hover:text-cyan transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-3">{service.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed mb-6">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-text-secondary">
                        <CheckCircle2 className="h-4 w-4 text-cyan flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={service.href} className="inline-flex items-center gap-1 text-sm font-semibold text-navy hover:text-cyan transition-colors group/link">
                    Learn More
                    <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// PACKAGES PREVIEW
// ============================================

function PackagesPreview() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeading
          badge="Packages"
          title="Choose Your Clean"
          description="Three carefully crafted tiers designed to match every need and budget. All packages include our quality guarantee."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {RESIDENTIAL_PACKAGES.map((pkg, i) => (
            <FadeIn key={pkg.id} delay={i * 0.15}>
              <Card className={`h-full relative overflow-hidden transition-all duration-300 hover:-translate-y-1 ${pkg.recommended ? "border-2 border-cyan shadow-xl ring-1 ring-cyan/20" : "border shadow-lg"}`}>
                {pkg.recommended && (
                  <div className="absolute top-0 left-0 right-0 bg-cyan text-navy-dark text-xs font-bold text-center py-1.5 uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <CardContent className={`p-8 ${pkg.recommended ? "pt-12" : ""}`}>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-text-primary mb-1">{pkg.name}</h3>
                    <p className="text-sm text-text-muted">{pkg.description}</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
                        <CheckCircle2 className="h-4 w-4 text-cyan flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button variant={pkg.recommended ? "cyan" : "outline"} className="w-full" asChild>
                    <Link href="/quote">Get a Quote</Link>
                  </Button>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.5}>
          <p className="text-center text-sm text-text-muted mt-8">
            All packages available for residential, commercial, and eco-friendly cleaning.{" "}
            <Link href="/services" className="text-navy font-semibold hover:text-cyan transition-colors">View full details →</Link>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ============================================
// WHY CHOOSE US
// ============================================

function WhyChooseUs() {
  const reasons = [
    { icon: Shield, title: "Fully Insured & Bonded", description: "Complete peace of mind with comprehensive liability coverage on every job." },
    { icon: ThumbsUp, title: "100% Satisfaction Guarantee", description: "Not happy? We'll re-clean at no extra cost. Your satisfaction is non-negotiable." },
    { icon: Clock, title: "Punctual & Reliable", description: "We show up on time, every time. Consistency you can count on." },
    { icon: Star, title: "5-Star Rated Service", description: "Hundreds of happy clients trust us with their homes and businesses." },
    { icon: Leaf, title: "Eco-Conscious Approach", description: "Green cleaning options that protect your family and the environment." },
    { icon: Award, title: "Trained Professionals", description: "Every team member is vetted, trained, and committed to excellence." },
  ];

  return (
    <section className="section-padding bg-surface-raised">
      <div className="container-custom">
        <SectionHeading badge="The ScrubHouse Difference" title="Why Clients Choose Us" description="We've built our reputation on reliability, quality, and genuine care. Here's what sets us apart." />
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason) => (
            <StaggerItem key={reason.title}>
              <div className="flex gap-4 p-6 rounded-xl bg-white border border-border hover:shadow-md transition-all duration-300 h-full">
                <div className="h-10 w-10 rounded-lg bg-cyan/10 flex items-center justify-center flex-shrink-0">
                  <reason.icon className="h-5 w-5 text-cyan" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary mb-1">{reason.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{reason.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// ============================================
// REVIEWS PREVIEW
// ============================================

function ReviewsPreview() {
  const reviews = getTopReviews(3);

  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeading badge={`⭐ ${REVIEW_STATS.averageRating} / 5 — ${REVIEW_STATS.totalReviews} Google Reviews`} title="What Our Clients Say" description="Don't just take our word for it. Here's what real clients across the GTA have to say about the ScrubHouse experience." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <FadeIn key={review.name} delay={i * 0.15}>
              <Card className="h-full border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6 italic">&ldquo;{review.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-navy/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-navy">{review.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{review.name}</p>
                      <p className="text-xs text-text-muted">{review.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.5}>
          <div className="text-center mt-10">
            <Button variant="outline" asChild>
              <Link href="/reviews">Read All Reviews<ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ============================================
// SERVICE AREAS PREVIEW
// ============================================

function ServiceAreasPreview() {
  return (
    <section className="section-padding bg-surface-raised">
      <div className="container-custom">
        <SectionHeading badge="Coverage" title="Serving the Greater Toronto Area" description="From Mississauga to Markham, we bring premium cleaning services to communities across the GTA." />
        <FadeIn>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {SERVICE_AREAS.map((area) => (
              <div key={area.slug} className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-full border border-border shadow-sm hover:shadow-md hover:border-cyan/30 transition-all duration-200">
                <MapPin className="h-4 w-4 text-cyan" />
                <span className="text-sm font-medium text-text-secondary">{area.name}</span>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="text-center">
            <Button variant="outline" asChild>
              <Link href="/service-areas">View All Service Areas<ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ============================================
// FAQ PREVIEW
// ============================================

function FAQPreview() {
  const faqs = [
    { question: "How do I book a cleaning?", answer: "You can get an instant quote through our website, call us directly at (416) 903-9982, or email us at scrubhousecc@gmail.com. We'll work with you to find the perfect cleaning schedule." },
    { question: "Are your cleaning products safe for pets and children?", answer: "Absolutely. We offer eco-friendly cleaning options using non-toxic, biodegradable products that are completely safe for your family and pets. Just select the Eco-Friendly option when booking." },
    { question: "Do I need to provide cleaning supplies?", answer: "No — our team arrives fully equipped with professional-grade cleaning products and tools. If you prefer we use your own supplies, just let us know and we'll accommodate." },
    { question: "What if I'm not satisfied with the cleaning?", answer: "Your satisfaction is guaranteed. If you're not completely happy with any aspect of our service, contact us within 24 hours and we'll return to re-clean the area at no additional cost." },
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeading badge="FAQ" title="Frequently Asked Questions" description="Quick answers to the most common questions about our cleaning services." />
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <details className="group bg-white rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-300">
                <summary className="flex items-center justify-between cursor-pointer p-6 text-left">
                  <span className="font-semibold text-text-primary pr-4">{faq.question}</span>
                  <ChevronRight className="h-5 w-5 text-text-muted flex-shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-sm text-text-muted leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// FINAL CTA
// ============================================

function FinalCTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-blue-accent" />
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-10 right-1/4 w-72 h-72 bg-cyan rounded-full blur-[100px]" />
        <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-cyan rounded-full blur-[100px]" />
      </div>
      <div className="container-custom relative z-10 py-20 md:py-28">
        <div className="text-center max-w-3xl mx-auto">
          <ScaleIn>
            <Badge variant="secondary" className="bg-cyan/20 text-cyan border-cyan/30 mb-6">
              <Sparkles className="h-3 w-3 mr-1" />
              Ready to Get Started?
            </Badge>
          </ScaleIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-sm mb-6">
              Your Spotless Space Is<br />Just a Click Away
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
              Get your personalized cleaning estimate in under 2 minutes. No obligations, no hidden fees — just honest, transparent pricing.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cyan" size="xl" asChild>
                <Link href="/quote" className="group">Get Your Free Quote<ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></Link>
              </Button>
              <Button variant="outline-light" size="xl" asChild>
                <Link href="/contact"><Phone className="h-5 w-5" />Call {SITE_CONFIG.phone}</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ============================================
// HOME PAGE
// ============================================

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ValueProposition />
      <ServicesOverview />
      <PackagesPreview />
      <WhyChooseUs />
      <ReviewsPreview />
      <ServiceAreasPreview />
      <FAQPreview />
      <FinalCTA />
    </>
  );
}
