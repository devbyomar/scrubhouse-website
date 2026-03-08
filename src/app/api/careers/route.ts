import { NextResponse } from "next/server";
import { generateSubmissionId } from "@/lib/utils";
import {
  sendEmail,
  careerNotificationEmail,
  careerConfirmationEmail,
} from "@/lib/email";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Honeypot check
    const honeypot = formData.get("website") as string;
    if (honeypot) {
      return NextResponse.json({ success: true, id: "ok" });
    }

    const submissionId = generateSubmissionId();

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const city = formData.get("city") as string;
    const employmentType = formData.get("employmentType") as string;
    const experience = formData.get("experience") as string;
    const availability = formData.get("availability") as string;
    const hasTransportation = formData.get("hasTransportation") as string;

    // Get resume file
    const resume = formData.get("resume") as File | null;

    // Basic validation
    if (!firstName || !lastName || !email || !phone || !city) {
      return NextResponse.json(
        { success: false, error: "Required fields are missing" },
        { status: 400 }
      );
    }

    // Process resume attachment
    let resumeAttachment: { filename: string; content: Buffer } | undefined;

    if (resume) {
      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(resume.type)) {
        return NextResponse.json(
          { success: false, error: "Resume must be PDF, DOC, or DOCX" },
          { status: 400 }
        );
      }
      // Validate file size (5MB max)
      if (resume.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, error: "Resume must be under 5MB" },
          { status: 400 }
        );
      }

      // Convert to Buffer for email attachment
      const arrayBuffer = await resume.arrayBuffer();
      resumeAttachment = {
        filename: resume.name,
        content: Buffer.from(arrayBuffer),
      };
    }

    // Get short-answer responses
    const whyInterested = formData.get("whyInterested") as string;

    // Send emails (notification + applicant confirmation)
    try {
      await Promise.all([
        sendEmail(
          careerNotificationEmail({
            firstName,
            lastName,
            email,
            phone,
            city,
            employmentType,
            experience,
            availability,
            hasTransportation,
            whyInterested: whyInterested || undefined,
            submissionId,
            attachments: resumeAttachment ? [resumeAttachment] : undefined,
          })
        ),
        sendEmail(
          careerConfirmationEmail({
            firstName,
            email,
            submissionId,
          })
        ),
      ]);
    } catch (emailError) {
      console.error("[Careers] Email notification failed:", emailError);
    }

    console.log(`[Careers] Application ${submissionId}:`, {
      name: `${firstName} ${lastName}`,
      email,
      phone,
      city,
      employmentType,
      experience,
      availability,
      hasTransportation,
      hasResume: !!resume,
      resumeName: resume?.name,
    });

    return NextResponse.json({ success: true, id: submissionId });
  } catch (error) {
    console.error("[Careers] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
