"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Home,
  Building2,
  Hotel,
  Warehouse,
  CheckCircle2,
  MapPin,
  Calendar,
  User,
  Mail,
  Phone,
  FileText,
  Zap,
  Leaf,
  PawPrint,
  Car,
  Clock,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FadeIn } from "@/components/ui/motion";
import { formatCurrency } from "@/lib/utils";
import {
  calculateQuote,
  ADD_ONS,
  TRAVEL_FEES,
  type QuoteInput,
  type QuoteResult,
} from "@/lib/pricing-engine";

// ============================================
// TYPES & CONSTANTS
// ============================================

const STEPS = [
  { id: 1, label: "Property", icon: Home },
  { id: 2, label: "Service", icon: Sparkles },
  { id: 3, label: "Details", icon: FileText },
  { id: 4, label: "Location", icon: MapPin },
  { id: 5, label: "Contact", icon: User },
];

const PROPERTY_TYPES = [
  { value: "condo", label: "Condo / Apartment", icon: Building2 },
  { value: "house", label: "House", icon: Home },
  { value: "townhouse", label: "Townhouse", icon: Home },
  { value: "office", label: "Office", icon: Building2 },
  { value: "commercial", label: "Commercial Space", icon: Warehouse },
  { value: "airbnb", label: "Airbnb / Short-Term", icon: Hotel },
];

const SERVICE_TYPES = [
  { value: "standard", label: "Standard Clean", desc: "Routine maintenance cleaning" },
  { value: "deep", label: "Deep Clean", desc: "Thorough top-to-bottom cleaning" },
  { value: "move-in-out", label: "Move-In / Move-Out", desc: "Comprehensive transition clean" },
  { value: "recurring", label: "Recurring Service", desc: "Regular scheduled cleaning" },
  { value: "office", label: "Office Cleaning", desc: "Professional workspace maintenance" },
  { value: "post-renovation", label: "Post-Renovation", desc: "Heavy-duty construction cleanup" },
];

const CONDITIONS = [
  { value: "clean", label: "Fairly Clean", desc: "Light dust and tidying needed" },
  { value: "average", label: "Average", desc: "Typical lived-in condition" },
  { value: "messy", label: "Messy", desc: "Hasn't been cleaned in a while" },
  { value: "very-dirty", label: "Needs Heavy Work", desc: "Significant cleaning required" },
];

const AREAS = Object.keys(TRAVEL_FEES).map((key) => ({
  value: key,
  label: key.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
}));

// ============================================
// QUOTE PAGE CLIENT
// ============================================

export function QuotePageClient() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<QuoteInput> & Record<string, unknown>>({
    propertyType: "",
    bedrooms: 2,
    bathrooms: 1,
    floors: 1,
    serviceType: "",
    packageTier: "gold",
    frequency: "one-time",
    condition: "average",
    hasPets: false,
    clientProvidesSupplies: false,
    ecoFriendly: false,
    addOns: [],
    area: "",
    parking: "easy",
    urgency: "none",
    preferredDate: "",
    postalCode: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleAddOn = (id: string) => {
    setFormData((prev) => {
      const current = (prev.addOns as string[]) || [];
      return {
        ...prev,
        addOns: current.includes(id) ? current.filter((a) => a !== id) : [...current, id],
      };
    });
  };

  const canAdvance = (): boolean => {
    switch (step) {
      case 1:
        return !!formData.propertyType;
      case 2:
        return !!formData.serviceType;
      case 3:
        return !!formData.condition;
      case 4:
        return !!formData.area && !!formData.postalCode;
      case 5:
        return !!(formData.name as string)?.length && !!(formData.email as string)?.length && !!(formData.phone as string)?.length;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      // Calculate quote
      const result = calculateQuote(formData as QuoteInput);
      setQuoteResult(result);
    }
  };

  const prevStep = () => {
    if (quoteResult) {
      setQuoteResult(null);
    } else if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    // TODO: Send data to API route / email service
    console.log("Quote submission:", { ...formData, quote: quoteResult });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <FadeIn>
              <div className="h-20 w-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-10 w-10 text-green-500" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Quote Request Submitted!
              </h1>
              <p className="text-lg text-text-muted mb-8">
                Thank you for your interest in ScrubHouse. We&apos;ve received your quote request and our team will reach out within 24 hours to confirm your booking details.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="lg" asChild>
                  <Link href="/">Back to Home</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-blue-accent" />
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-20 right-20 w-96 h-96 bg-cyan rounded-full blur-[120px]" />
        </div>
        <div className="container-custom relative z-10">
          <FadeIn>
            <Badge variant="secondary" className="bg-cyan/20 text-cyan border-cyan/30 mb-4">
              <Sparkles className="h-3 w-3 mr-1" />
              Free Estimate
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-sm mb-3">
              Get Your <span className="text-cyan">Instant Quote</span>
            </h1>
            <p className="text-white/80 max-w-xl">
              Answer a few quick questions and receive a personalized cleaning estimate in under 2 minutes.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Progress */}
      <section className="bg-white border-b border-border sticky top-[60px] z-40">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center">
                <button
                  onClick={() => !quoteResult && s.id < step && setStep(s.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    step === s.id && !quoteResult
                      ? "bg-navy text-white"
                      : s.id < step || quoteResult
                      ? "bg-cyan/10 text-cyan cursor-pointer hover:bg-cyan/20"
                      : "bg-surface-raised text-text-light"
                  }`}
                  disabled={s.id > step}
                >
                  <s.icon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className={`w-8 md:w-12 h-px mx-1 ${s.id < step ? "bg-cyan" : "bg-border"}`} />
                )}
              </div>
            ))}
            {quoteResult && (
              <>
                <div className="w-8 md:w-12 h-px mx-1 bg-cyan" />
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-navy text-white">
                  <Zap className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Quote</span>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              {quoteResult ? (
                <QuoteResultView
                  key="result"
                  result={quoteResult}
                  formData={formData}
                  onBack={prevStep}
                  onSubmit={handleSubmit}
                />
              ) : (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {step === 1 && <Step1Property formData={formData} updateField={updateField} />}
                  {step === 2 && <Step2Service formData={formData} updateField={updateField} />}
                  {step === 3 && <Step3Details formData={formData} updateField={updateField} toggleAddOn={toggleAddOn} />}
                  {step === 4 && <Step4Location formData={formData} updateField={updateField} />}
                  {step === 5 && <Step5Contact formData={formData} updateField={updateField} />}

                  <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
                    <Button variant="ghost" onClick={prevStep} disabled={step === 1}>
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </Button>
                    <div className="text-sm text-text-muted">
                      Step {step} of 5
                    </div>
                    <Button variant="primary" onClick={nextStep} disabled={!canAdvance()}>
                      {step === 5 ? "Calculate Quote" : "Continue"}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}

// ============================================
// STEP COMPONENTS
// ============================================

function Step1Property({ formData, updateField }: { formData: Record<string, unknown>; updateField: (k: string, v: unknown) => void }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-text-primary mb-2">What type of property?</h2>
      <p className="text-text-muted mb-8">Select the type of space you need cleaned.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {PROPERTY_TYPES.map((pt) => (
          <button
            key={pt.value}
            onClick={() => updateField("propertyType", pt.value)}
            className={`p-5 rounded-xl border-2 text-left transition-all ${
              formData.propertyType === pt.value
                ? "border-cyan bg-cyan/5 shadow-md"
                : "border-border hover:border-navy/20 hover:shadow-sm"
            }`}
          >
            <pt.icon className={`h-6 w-6 mb-3 ${formData.propertyType === pt.value ? "text-cyan" : "text-text-muted"}`} />
            <span className="text-sm font-semibold text-text-primary block">{pt.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Bedrooms</label>
          <div className="flex items-center gap-3">
            <button onClick={() => updateField("bedrooms", Math.max(0, (formData.bedrooms as number) - 1))} className="h-10 w-10 rounded-lg border border-border flex items-center justify-center hover:bg-surface-raised transition-colors text-lg">−</button>
            <span className="text-lg font-bold w-8 text-center">{formData.bedrooms as number}</span>
            <button onClick={() => updateField("bedrooms", Math.min(10, (formData.bedrooms as number) + 1))} className="h-10 w-10 rounded-lg border border-border flex items-center justify-center hover:bg-surface-raised transition-colors text-lg">+</button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Bathrooms</label>
          <div className="flex items-center gap-3">
            <button onClick={() => updateField("bathrooms", Math.max(1, (formData.bathrooms as number) - 1))} className="h-10 w-10 rounded-lg border border-border flex items-center justify-center hover:bg-surface-raised transition-colors text-lg">−</button>
            <span className="text-lg font-bold w-8 text-center">{formData.bathrooms as number}</span>
            <button onClick={() => updateField("bathrooms", Math.min(10, (formData.bathrooms as number) + 1))} className="h-10 w-10 rounded-lg border border-border flex items-center justify-center hover:bg-surface-raised transition-colors text-lg">+</button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Floors / Levels</label>
          <div className="flex items-center gap-3">
            <button onClick={() => updateField("floors", Math.max(1, (formData.floors as number) - 1))} className="h-10 w-10 rounded-lg border border-border flex items-center justify-center hover:bg-surface-raised transition-colors text-lg">−</button>
            <span className="text-lg font-bold w-8 text-center">{formData.floors as number}</span>
            <button onClick={() => updateField("floors", Math.min(5, (formData.floors as number) + 1))} className="h-10 w-10 rounded-lg border border-border flex items-center justify-center hover:bg-surface-raised transition-colors text-lg">+</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step2Service({ formData, updateField }: { formData: Record<string, unknown>; updateField: (k: string, v: unknown) => void }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-text-primary mb-2">What type of service?</h2>
      <p className="text-text-muted mb-8">Choose your cleaning type, package, and frequency.</p>

      <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">Service Type</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
        {SERVICE_TYPES.map((st) => (
          <button
            key={st.value}
            onClick={() => updateField("serviceType", st.value)}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              formData.serviceType === st.value
                ? "border-cyan bg-cyan/5 shadow-md"
                : "border-border hover:border-navy/20"
            }`}
          >
            <span className="text-sm font-semibold text-text-primary block">{st.label}</span>
            <span className="text-xs text-text-muted">{st.desc}</span>
          </button>
        ))}
      </div>

      <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">Package Tier</h3>
      <div className="grid grid-cols-3 gap-3 mb-8">
        {["silver", "gold", "platinum"].map((tier) => (
          <button
            key={tier}
            onClick={() => updateField("packageTier", tier)}
            className={`p-4 rounded-xl border-2 text-center transition-all ${
              formData.packageTier === tier
                ? "border-cyan bg-cyan/5 shadow-md"
                : "border-border hover:border-navy/20"
            }`}
          >
            <span className="text-sm font-semibold text-text-primary block capitalize">{tier}</span>
            {tier === "gold" && <span className="text-xs text-cyan">Popular</span>}
          </button>
        ))}
      </div>

      <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">Frequency</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { value: "one-time", label: "One-Time" },
          { value: "weekly", label: "Weekly", discount: "20% off" },
          { value: "bi-weekly", label: "Bi-Weekly", discount: "15% off" },
          { value: "monthly", label: "Monthly", discount: "10% off" },
        ].map((freq) => (
          <button
            key={freq.value}
            onClick={() => updateField("frequency", freq.value)}
            className={`p-4 rounded-xl border-2 text-center transition-all ${
              formData.frequency === freq.value
                ? "border-cyan bg-cyan/5 shadow-md"
                : "border-border hover:border-navy/20"
            }`}
          >
            <span className="text-sm font-semibold text-text-primary block">{freq.label}</span>
            {freq.discount && <span className="text-xs text-green-600 font-medium">{freq.discount}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

function Step3Details({ formData, updateField, toggleAddOn }: { formData: Record<string, unknown>; updateField: (k: string, v: unknown) => void; toggleAddOn: (id: string) => void }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-text-primary mb-2">Tell us more</h2>
      <p className="text-text-muted mb-8">These details help us provide a more accurate estimate.</p>

      <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">Current Condition</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {CONDITIONS.map((c) => (
          <button
            key={c.value}
            onClick={() => updateField("condition", c.value)}
            className={`p-4 rounded-xl border-2 text-center transition-all ${
              formData.condition === c.value
                ? "border-cyan bg-cyan/5 shadow-md"
                : "border-border hover:border-navy/20"
            }`}
          >
            <span className="text-sm font-semibold text-text-primary block">{c.label}</span>
            <span className="text-xs text-text-muted">{c.desc}</span>
          </button>
        ))}
      </div>

      <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">Additional Info</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {[
          { key: "hasPets", label: "Pets in Home", icon: PawPrint },
          { key: "ecoFriendly", label: "Eco-Friendly Products", icon: Leaf },
          { key: "clientProvidesSupplies", label: "I'll Provide Supplies", icon: Sparkles },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => updateField(item.key, !formData[item.key])}
            className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
              formData[item.key] ? "border-cyan bg-cyan/5" : "border-border hover:border-navy/20"
            }`}
          >
            <div className={`h-5 w-5 rounded border-2 flex items-center justify-center ${formData[item.key] ? "bg-cyan border-cyan" : "border-border"}`}>
              {formData[item.key] ? <CheckCircle2 className="h-3.5 w-3.5 text-white" /> : null}
            </div>
            <item.icon className="h-4 w-4 text-text-muted" />
            <span className="text-sm font-medium text-text-primary">{item.label}</span>
          </button>
        ))}
      </div>

      <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">Add-Ons</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {ADD_ONS.map((addon) => (
          <button
            key={addon.id}
            onClick={() => toggleAddOn(addon.id)}
            className={`flex items-center justify-between p-3 rounded-lg border transition-all text-left ${
              (formData.addOns as string[])?.includes(addon.id)
                ? "border-cyan bg-cyan/5"
                : "border-border hover:border-navy/20"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`h-4 w-4 rounded border flex items-center justify-center ${
                (formData.addOns as string[])?.includes(addon.id) ? "bg-cyan border-cyan" : "border-border"
              }`}>
                {(formData.addOns as string[])?.includes(addon.id) && <CheckCircle2 className="h-3 w-3 text-white" />}
              </div>
              <span className="text-sm text-text-primary">{addon.label}</span>
            </div>
            <span className="text-xs font-semibold text-text-muted">+{formatCurrency(addon.price)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Step4Location({ formData, updateField }: { formData: Record<string, unknown>; updateField: (k: string, v: unknown) => void }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-text-primary mb-2">Where are you located?</h2>
      <p className="text-text-muted mb-8">Help us calculate travel and availability for your area.</p>

      <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">Service Area</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        {AREAS.map((area) => (
          <button
            key={area.value}
            onClick={() => updateField("area", area.value)}
            className={`flex items-center gap-2 p-3 rounded-xl border-2 text-left transition-all ${
              formData.area === area.value
                ? "border-cyan bg-cyan/5 shadow-md"
                : "border-border hover:border-navy/20"
            }`}
          >
            <MapPin className={`h-4 w-4 ${formData.area === area.value ? "text-cyan" : "text-text-muted"}`} />
            <span className="text-sm font-medium text-text-primary">{area.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Postal Code</label>
          <Input
            placeholder="e.g. L5B 1M2"
            value={(formData.postalCode as string) || ""}
            onChange={(e) => updateField("postalCode", e.target.value.toUpperCase())}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Preferred Date (Optional)</label>
          <Input
            type="date"
            value={(formData.preferredDate as string) || ""}
            onChange={(e) => updateField("preferredDate", e.target.value)}
          />
        </div>
      </div>

      <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">Parking / Access</h3>
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { value: "easy", label: "Easy Access", icon: Car },
          { value: "moderate", label: "Moderate", icon: Car },
          { value: "difficult", label: "Difficult", icon: Car },
        ].map((p) => (
          <button
            key={p.value}
            onClick={() => updateField("parking", p.value)}
            className={`p-4 rounded-xl border-2 text-center transition-all ${
              formData.parking === p.value ? "border-cyan bg-cyan/5" : "border-border hover:border-navy/20"
            }`}
          >
            <p.icon className="h-5 w-5 mx-auto mb-1 text-text-muted" />
            <span className="text-sm font-medium text-text-primary block">{p.label}</span>
          </button>
        ))}
      </div>

      <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">Urgency</h3>
      <div className="grid grid-cols-3 gap-3">
        {[
          { value: "none", label: "No Rush" },
          { value: "next-day", label: "Within 48hrs", extra: "+$20" },
          { value: "same-day", label: "Same Day", extra: "+$40" },
        ].map((u) => (
          <button
            key={u.value}
            onClick={() => updateField("urgency", u.value)}
            className={`p-4 rounded-xl border-2 text-center transition-all ${
              formData.urgency === u.value ? "border-cyan bg-cyan/5" : "border-border hover:border-navy/20"
            }`}
          >
            <Clock className="h-5 w-5 mx-auto mb-1 text-text-muted" />
            <span className="text-sm font-medium text-text-primary block">{u.label}</span>
            {u.extra && <span className="text-xs text-amber-600 font-medium">{u.extra}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

function Step5Contact({ formData, updateField }: { formData: Record<string, unknown>; updateField: (k: string, v: unknown) => void }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-text-primary mb-2">Your Contact Details</h2>
      <p className="text-text-muted mb-8">We&apos;ll use this to send you your quote and follow up on your request.</p>

      <div className="space-y-5">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-2">
            <User className="h-4 w-4" /> Full Name
          </label>
          <Input
            placeholder="Your full name"
            value={(formData.name as string) || ""}
            onChange={(e) => updateField("name", e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-2">
              <Mail className="h-4 w-4" /> Email
            </label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={(formData.email as string) || ""}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-2">
              <Phone className="h-4 w-4" /> Phone
            </label>
            <Input
              type="tel"
              placeholder="(416) 000-0000"
              value={(formData.phone as string) || ""}
              onChange={(e) => updateField("phone", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-2">
            <FileText className="h-4 w-4" /> Additional Notes (Optional)
          </label>
          <Textarea
            placeholder="Any special instructions, access details, or requests..."
            value={(formData.notes as string) || ""}
            onChange={(e) => updateField("notes", e.target.value)}
            className="min-h-[120px]"
          />
        </div>
      </div>

      {/* Honeypot - hidden from users */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={(formData.company as string) || ""}
          onChange={(e) => updateField("company", e.target.value)}
        />
      </div>
    </div>
  );
}

// ============================================
// QUOTE RESULT VIEW
// ============================================

function QuoteResultView({
  result,
  formData,
  onBack,
  onSubmit,
}: {
  result: QuoteResult;
  formData: Record<string, unknown>;
  onBack: () => void;
  onSubmit: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-10">
        <div className="h-16 w-16 rounded-full bg-cyan/10 flex items-center justify-center mx-auto mb-4">
          <Zap className="h-8 w-8 text-cyan" />
        </div>
        <h2 className="text-3xl font-bold text-text-primary mb-2">Your Estimated Quote</h2>
        <p className="text-text-muted">Based on the details you provided</p>
      </div>

      <Card className="border-2 border-cyan/20 shadow-xl mb-8">
        <CardContent className="p-8">
          {/* Big Price */}
          <div className="text-center mb-8 pb-8 border-b border-border">
            <p className="text-sm font-medium text-text-muted mb-2">Estimated Total</p>
            <p className="text-5xl md:text-6xl font-bold text-navy mb-2">
              {formatCurrency(result.total)}
            </p>
            {result.frequencyDiscountPercent > 0 && (
              <Badge variant="success" className="mt-2">
                Saving {Math.round(result.frequencyDiscountPercent * 100)}% with recurring service
              </Badge>
            )}
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-border">
            <div className="text-center">
              <p className="text-2xl font-bold text-text-primary">{result.estimatedHours}h</p>
              <p className="text-xs text-text-muted">Est. Duration</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-text-primary">{result.numberOfCleaners}</p>
              <p className="text-xs text-text-muted">Cleaner{result.numberOfCleaners > 1 ? "s" : ""}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-text-primary capitalize">{formData.packageTier as string}</p>
              <p className="text-xs text-text-muted">Package</p>
            </div>
          </div>

          {/* Breakdown */}
          <div className="space-y-3 mb-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-3">Breakdown</h3>
            {result.breakdown.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">{item.label}</span>
                <span className={`text-sm font-semibold ${item.amount < 0 ? "text-green-600" : "text-text-primary"}`}>
                  {item.amount < 0 ? "−" : ""}{formatCurrency(Math.abs(item.amount))}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-base font-bold text-text-primary">Total</span>
              <span className="text-base font-bold text-navy">{formatCurrency(result.total)}</span>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
            <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-800">This is an estimate</p>
              <p className="text-xs text-amber-700 mt-1">
                Final pricing may vary based on actual site conditions, access, and specific requirements. Our team will confirm the exact price before your appointment.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="ghost" onClick={onBack} className="flex-1">
          <ArrowLeft className="h-4 w-4" />
          Adjust Details
        </Button>
        <Button variant="cyan" size="lg" onClick={onSubmit} className="flex-2">
          Submit Quote Request
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
