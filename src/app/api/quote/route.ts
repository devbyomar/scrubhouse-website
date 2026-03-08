import { NextResponse } from "next/server";
import { quoteFormSchema } from "@/lib/validations";
import { calculateQuote } from "@/lib/pricing-engine";
import { generateSubmissionId, formatCurrency } from "@/lib/utils";
import {
  sendEmail,
  quoteNotificationEmail,
  quoteConfirmationEmail,
} from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot check
    if (body.company) {
      return NextResponse.json({ success: true, id: "ok" });
    }

    // Validate the form data
    const result = quoteFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = result.data;
    const submissionId = generateSubmissionId();

    // Recalculate quote server-side for integrity
    const quoteResult = calculateQuote({
      propertyType: data.propertyType,
      bedrooms: data.bedrooms ?? 1,
      bathrooms: data.bathrooms ?? 1,
      floors: data.floors ?? 1,
      serviceType: data.serviceType,
      condition: data.condition ?? "average",
      frequency: data.frequency ?? "one-time",
      addOns: data.addOns ?? [],
      area: data.area ?? "toronto",
      hasPets: data.hasPets ?? false,
      clientProvidesSupplies: data.clientProvidesSupplies ?? false,
      ecoFriendly: data.ecoFriendly ?? false,
      parking: data.parking ?? "easy",
      urgency: data.urgency ?? "none",
      packageTier: data.packageTier ?? "silver",
    });

    const formattedTotal = formatCurrency(quoteResult.total);

    // Send emails (notification + customer confirmation)
    try {
      await Promise.all([
        sendEmail(
          quoteNotificationEmail({
            name: data.name,
            email: data.email,
            phone: data.phone || undefined,
            propertyType: data.propertyType,
            serviceType: data.serviceType,
            packageTier: data.packageTier ?? "silver",
            total: formattedTotal,
            breakdown: quoteResult.breakdown,
            estimatedHours: quoteResult.estimatedHours,
            submissionId,
          })
        ),
        sendEmail(
          quoteConfirmationEmail({
            name: data.name,
            email: data.email,
            total: formattedTotal,
            breakdown: quoteResult.breakdown,
            estimatedHours: quoteResult.estimatedHours,
            submissionId,
          })
        ),
      ]);
    } catch (emailError) {
      console.error("[Quote] Email notification failed:", emailError);
    }

    console.log(`[Quote] Submission ${submissionId}:`, {
      name: data.name,
      email: data.email,
      total: formattedTotal,
      propertyType: data.propertyType,
      serviceType: data.serviceType,
    });

    return NextResponse.json({
      success: true,
      id: submissionId,
      quote: {
        total: quoteResult.total,
        breakdown: quoteResult.breakdown,
        estimatedHours: quoteResult.estimatedHours,
      },
    });
  } catch (error) {
    console.error("[Quote] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
