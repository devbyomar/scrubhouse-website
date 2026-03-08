import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import { generateSubmissionId } from "@/lib/utils";
import { sendEmail, contactNotificationEmail, contactConfirmationEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot check
    if (body.website) {
      // Silently accept but don't process — suspected bot
      return NextResponse.json({ success: true, id: "ok" });
    }

    // Validate the form data
    const result = contactFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = result.data;
    const submissionId = generateSubmissionId();

    // Send emails (notification to team + confirmation to customer)
    try {
      await Promise.all([
        sendEmail(
          contactNotificationEmail({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone || undefined,
            message: data.message,
            submissionId,
          })
        ),
        sendEmail(
          contactConfirmationEmail({
            firstName: data.firstName,
            email: data.email,
            submissionId,
          })
        ),
      ]);
    } catch (emailError) {
      // Log email failure but don't fail the submission
      console.error("[Contact Form] Email notification failed:", emailError);
    }

    console.log(`[Contact Form] Submission ${submissionId}:`, {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      message: data.message.substring(0, 100) + "...",
    });

    return NextResponse.json({ success: true, id: submissionId });
  } catch (error) {
    console.error("[Contact Form] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
