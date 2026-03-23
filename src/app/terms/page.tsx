import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms of Service | ScrubHouse",
  description: "Read the terms and conditions governing the use of ScrubHouse cleaning services.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsOfServicePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-blue-accent" />
        <div className="container-custom relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Terms of Service</h1>
          <p className="text-white/60 text-sm">Last updated: January 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto prose prose-sm prose-slate">
            <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              By accessing or using the ScrubHouse website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.
            </p>

            <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">2. Services</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              ScrubHouse provides professional cleaning services for residential and commercial properties across the Greater Toronto Area. Services include but are not limited to regular maintenance cleaning, deep cleaning, move-in/move-out cleaning, post-construction cleaning, and commercial cleaning.
            </p>

            <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">3. Quotes and Pricing</h2>
            <ul className="list-disc pl-6 space-y-2 text-text-secondary mb-4">
              <li>Online quotes are estimates based on the information you provide and are subject to adjustment after an in-person or virtual assessment.</li>
              <li>Final pricing will be confirmed before service begins.</li>
              <li>Prices may vary based on property condition, size accuracy, and additional services requested.</li>
              <li>All prices are in Canadian Dollars (CAD) and include applicable taxes unless otherwise stated.</li>
              <li>A minimum booking charge applies as indicated during the quoting process.</li>
            </ul>

            <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">4. Booking and Cancellation</h2>
            <ul className="list-disc pl-6 space-y-2 text-text-secondary mb-4">
              <li>Bookings are confirmed upon mutual agreement of service details, date, and pricing.</li>
              <li>Cancellations made with at least 24 hours&apos; notice will not incur a cancellation fee.</li>
              <li>Cancellations made with less than 24 hours&apos; notice may be subject to a cancellation fee of up to 50% of the quoted service price.</li>
              <li>ScrubHouse reserves the right to reschedule services due to inclement weather, staffing issues, or other circumstances beyond our control.</li>
            </ul>

            <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">5. Access and Preparation</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Clients must provide reasonable access to the property at the scheduled time. This includes ensuring entry, parking availability, and a safe working environment. Please secure or remove valuables and fragile items before our team arrives.
            </p>

            <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">6. Satisfaction Guarantee</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              We stand behind the quality of our work. If you are not satisfied with any aspect of our cleaning service, please notify us within 24 hours of service completion. We will re-clean the specified area at no additional charge. This guarantee does not cover pre-existing damage, stains that require specialized treatment, or areas not included in the original service agreement.
            </p>

            <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">7. Liability</h2>
            <ul className="list-disc pl-6 space-y-2 text-text-secondary mb-4">
              <li>Any damage claims must be reported within 24 hours of service completion.</li>
              <li>ScrubHouse is not liable for damage to items that are not properly secured, pre-existing damage, or normal wear and tear.</li>
              <li>Our liability is limited to the cost of repair or replacement of the damaged item, up to the value of the service provided.</li>
            </ul>

            <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">8. Payment</h2>
            <ul className="list-disc pl-6 space-y-2 text-text-secondary mb-4">
              <li>Payment is due upon completion of service unless alternative arrangements have been made.</li>
              <li>We accept major credit cards, e-transfer, and other payment methods as communicated during booking.</li>
              <li>Late payments may incur additional fees.</li>
            </ul>

            <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">9. Client Responsibilities</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Clients are responsible for providing accurate information about their property when requesting quotes. Significant discrepancies between the information provided and the actual property condition may result in price adjustments or the need to reschedule.
            </p>

            <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">10. Pets</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Please inform us of any pets in the home at the time of booking. Pets should be secured in a safe area during cleaning for the safety of both your pets and our team. A pet surcharge may apply.
            </p>

            <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">11. Intellectual Property</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              All content on the ScrubHouse website, including text, images, logos, and design, is the property of ScrubHouse and is protected by copyright and trademark laws. Unauthorized use is prohibited.
            </p>

            <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">12. Limitation of Liability</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              To the maximum extent permitted by law, ScrubHouse shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of our website or services.
            </p>

            <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">13. Governing Law</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              These Terms of Service are governed by the laws of the Province of Ontario, Canada. Any disputes shall be resolved in the courts of Ontario.
            </p>

            <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">14. Changes to Terms</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              ScrubHouse reserves the right to modify these Terms of Service at any time. Changes will be posted on this page with an updated date. Continued use of our services constitutes acceptance of updated terms.
            </p>

            <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">15. Contact</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              For questions about these Terms of Service, please contact us:
            </p>
            <ul className="list-none space-y-1 text-text-secondary mb-8">
              <li><strong>Email:</strong> <a href={`mailto:${SITE_CONFIG.email}`} className="text-cyan hover:underline">{SITE_CONFIG.email}</a></li>
              <li><strong>Phone:</strong> <a href={`tel:${SITE_CONFIG.phone.replace(/[^+\d]/g, "")}`} className="text-cyan hover:underline">{SITE_CONFIG.phone}</a></li>
            </ul>

            <div className="border-t border-border pt-6 mt-8">
              <Link href="/" className="text-sm text-cyan hover:underline">← Back to Home</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
