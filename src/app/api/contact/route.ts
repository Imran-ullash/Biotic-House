import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    const adminEmail = process.env.BREVO_ADMIN_EMAIL || "support@biotichouse.com";
    const senderEmail = process.env.BREVO_SENDER_EMAIL || "support@biotichouse.com";

    // If Brevo API key is not configured, simulate success
    if (!apiKey) {
      console.warn(
        `[Brevo API Mock] Contact form submitted by ${name} (${email}): Subject: "${subject}". Configure BREVO_API_KEY to send live email notifications.`
      );
      return NextResponse.json({
        success: true,
        mock: true,
        message: "Message received. Configure BREVO_API_KEY in .env.local to dispatch live notification emails.",
      });
    }

    // 1. Also ensure the sender is recorded as a Contact in Brevo
    try {
      await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          updateEnabled: true,
          attributes: {
            FIRSTNAME: name?.split(" ")[0] || "Researcher",
            LASTNAME: name?.split(" ").slice(1).join(" ") || "",
            SOURCE: "contact_form",
          },
        }),
      });
    } catch (contactErr) {
      console.warn("[Brevo Contact Record Warning]:", contactErr);
    }

    // 2. Dispatch Email Notification to Admin via Brevo SMTP
    const adminEmailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "Biotic House Inquiry Form",
          email: senderEmail,
        },
        to: [{ email: adminEmail }],
        replyTo: {
          email: email.trim().toLowerCase(),
          name: name || "Researcher",
        },
        subject: `[Contact Form] ${subject || "Inquiry from website"}: ${name || email}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
            <h2 style="color: #0f172a; margin-top: 0;">New Contact Form Submission</h2>
            <p><strong>From:</strong> ${name || "N/A"} (&lt;${email}&gt;)</p>
            <p><strong>Subject:</strong> ${subject || "N/A"}</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
            <p style="white-space: pre-wrap; color: #334155; line-height: 1.6;">${message}</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
            <p style="font-size: 11px; color: #94a3b8;">Sent from Biotic House Next.js Headless Store.</p>
          </div>
        `,
      }),
    });

    if (!adminEmailRes.ok) {
      const errData = await adminEmailRes.json();
      console.error("[Brevo SMTP Error]:", errData);
      return NextResponse.json(
        { error: errData.message || "Failed to dispatch email via Brevo." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error) {
    console.error("[Brevo Contact Route Error]:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while sending your message." },
      { status: 500 }
    );
  }
}
