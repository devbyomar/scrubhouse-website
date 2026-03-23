"use client";

import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Shield,
  Heart,
  Leaf,
  Users,
  Target,
  Award,
  CheckCircle2,
  Clock,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/motion";

const VALUES = [
  {
    icon: Shield,
    title: "Trust & Transparency",
    desc: "We provide clear upfront pricing, honest communication, and never cut corners. Every team member is vetted and held to the highest standards.",
  },
  {
    icon: Heart,
    title: "Customer-First Philosophy",
    desc: "Your satisfaction isn't a bonus — it's the baseline. We listen, adapt, and go the extra mile to make sure every clean exceeds expectations.",
  },
  {
    icon: Leaf,
    title: "Eco-Conscious Approach",
    desc: "We offer plant-based, non-toxic cleaning products that are safe for families, pets, and the planet — without sacrificing cleaning power.",
  },
  {
    icon: Users,
    title: "Team Empowerment",
    desc: "We invest in our people with fair wages, training, and respect. A happy team delivers better results — and it shows in every clean.",
  },
  {
    icon: Target,
    title: "Attention to Detail",
    desc: "From baseboards to ceiling fans, we clean the spots others miss. Our checklists are thorough and our standards are uncompromising.",
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    desc: "Not satisfied? We'll re-clean the area at no extra charge. We stand behind every single service visit with a 100% satisfaction guarantee.",
  },
];

const MILESTONES = [
  { number: "2022", label: "Founded in the GTA" },
  { number: "100+", label: "Homes & offices cleaned" },
  { number: "5.0★", label: "Average client rating" },
  { number: "100%", label: "Satisfaction guarantee" },
];

const COMMITMENTS = [
  "Carefully selected and trained team members",
  "Thoroughly vetted and trained cleaning professionals",
  "Eco-friendly product options on every service",
  "Flexible scheduling — evenings and weekends available",
  "Clear, upfront pricing with no hidden fees",
  "24-hour response time on all inquiries",
  "Consistent quality through detailed checklists",
  "Dedicated customer support for every client",
];

export function AboutPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-blue-accent" />
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-32 left-20 w-72 h-72 bg-cyan rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-10 w-96 h-96 bg-cyan rounded-full blur-[140px]" />
        </div>
        <div className="container-custom relative z-10">
          <FadeIn>
            <Badge variant="secondary" className="bg-cyan/20 text-cyan border-cyan/30 mb-4">
              <Sparkles className="h-3 w-3 mr-1" /> Our Story
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-sm mb-4">
              Cleaning Redefined for the <span className="text-cyan">Modern GTA</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              ScrubHouse was built on one belief: professional cleaning should be reliable, transparent, and something you genuinely look forward to.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <SectionHeading
                badge="Who We Are"
                title="Born in the GTA. Built on Trust."
                align="left"
              />
              <div className="space-y-6 text-text-secondary leading-relaxed">
                <p>
                  ScrubHouse was founded with a straightforward mission: to bring a higher standard of cleanliness to homes and businesses across the Greater Toronto Area. We saw an industry full of inconsistency — unreliable scheduling, hidden fees, subpar results — and decided to do things differently.
                </p>
                <p>
                  From day one, we&apos;ve prioritized transparency, quality, and the human touch. Every team member is carefully vetted, professionally trained, and treated with the respect they deserve. We believe that when our people feel valued, our clients feel the difference.
                </p>
                <p>
                  Today, ScrubHouse serves hundreds of residential and commercial clients from Toronto to Oakville, Brampton to Markham. Whether it&apos;s a weekly maintenance clean or a one-time deep clean, we bring the same level of care, professionalism, and attention to detail to every single visit.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 bg-surface border-y border-border">
        <div className="container-custom">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {MILESTONES.map((m) => (
              <StaggerItem key={m.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-navy mb-1">{m.number}</p>
                <p className="text-sm text-text-muted">{m.label}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading
            badge="Our Values"
            title="What We Stand For"
            description="These principles guide every decision, every hire, and every clean."
          />
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {VALUES.map((v) => (
              <StaggerItem key={v.title}>
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className="h-14 w-14 rounded-2xl bg-navy/5 flex items-center justify-center mb-6 group-hover:bg-cyan/10 transition-colors">
                      <v.icon className="h-7 w-7 text-navy group-hover:text-cyan transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-3">{v.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{v.desc}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <SectionHeading
                badge="Our Promise"
                title="The ScrubHouse Commitment"
                description="We don't just clean — we earn your trust, one visit at a time."
                align="left"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {COMMITMENTS.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cyan shrink-0 mt-0.5" />
                    <p className="text-sm text-text-secondary">{item}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
            <ScaleIn>
              <div className="bg-gradient-to-br from-navy to-navy-dark rounded-3xl p-10 text-center">
                <div className="h-20 w-20 rounded-full bg-cyan/20 flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-10 w-10 text-cyan" />
                </div>
                <h3 className="text-2xl font-bold text-white drop-shadow-sm mb-3">100% Satisfaction Guarantee</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  If you&apos;re not completely satisfied, we&apos;ll re-clean the area at no additional cost. No questions asked, no hassle.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white/10 rounded-xl p-4">
                    <Clock className="h-6 w-6 text-cyan mx-auto mb-2" />
                    <p className="text-xs text-white/60">24hr Response</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <Star className="h-6 w-6 text-cyan mx-auto mb-2" />
                    <p className="text-xs text-white/60">5.0★ Rated</p>
                  </div>
                </div>
              </div>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-blue-accent" />
        <div className="container-custom relative z-10 py-20 text-center">
          <FadeIn>
            <Sparkles className="h-10 w-10 text-cyan mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-sm mb-4">
              Let Us Show You the ScrubHouse Difference
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
              Experience premium cleaning with honest pricing, reliable teams, and results that speak for themselves.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cyan" size="xl" asChild>
                <Link href="/quote" className="group">
                  Get Your Free Quote
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline-light" size="xl" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
