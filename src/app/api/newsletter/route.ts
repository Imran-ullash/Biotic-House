import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, source } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listId = process.env.BREVO_LIST_ID ? Number(process.env.BREVO_LIST_ID) : undefined;
    const senderEmail = process.env.BREVO_SENDER_EMAIL || "support@biotichouse.com";

    // If Brevo API key is not configured, log and return graceful simulated success
    if (!apiKey) {
      console.warn(
        `[Brevo API Mock] No BREVO_API_KEY found in environment variables. Simulated subscription for: ${email} (Source: ${source})`
      );
      return NextResponse.json({
        success: true,
        mock: true,
        message: "Email received successfully. Configure BREVO_API_KEY in .env.local to sync live with Brevo.",
      });
    }

    // 1. Add / Update Contact in Brevo
    const contactPayload: Record<string, unknown> = {
      email: email.trim().toLowerCase(),
      updateEnabled: true,
      attributes: {
        SOURCE: source || "website",
        SIGNUP_DATE: new Date().toISOString(),
      },
    };

    if (listId && !isNaN(listId)) {
      contactPayload.listIds = [listId];
    }

    const contactRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(contactPayload),
    });

    const contactData = await contactRes.json();

    // 2. If from 10% popup, dispatch the 10% coupon directly to their inbox via Brevo SMTP
    if (source === "popup_10_percent" && contactRes.ok) {
      try {
        await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "api-key": apiKey,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            sender: {
              name: "Biotic House Research",
              email: senderEmail,
            },
            to: [{ email: email.trim().toLowerCase() }],
            subject: "Your 10% Off Research Peptide Coupon - Biotic House",
            htmlContent: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
                <div style="text-align: center; margin-bottom: 20px;">
                  <h1 style="color: #0f172a; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 1px;">Biotic House</h1>
                  <p style="color: #64748b; font-size: 12px; margin-top: 4px; text-transform: uppercase;">Research Peptides &middot; 99%+ Purity</p>
                </div>
                
                <h2 style="color: #1e293b; font-size: 20px;">Welcome to Biotic House!</h2>
                <p style="color: #475569; font-size: 14px; line-height: 1.6;">
                  Thank you for subscribing. Here is your exclusive 10% discount code for your first research peptide order:
                </p>
                
                <div style="background-color: #f8fafc; border: 2px dashed #0284c7; border-radius: 12px; padding: 16px; text-align: center; margin: 24px 0;">
                  <span style="font-family: monospace; font-size: 24px; font-weight: bold; color: #0369a1; letter-spacing: 2px;">WELCOME10</span>
                  <p style="font-size: 12px; color: #64748b; margin-top: 8px; margin-bottom: 0;">Enter this code at checkout to claim 10% off your entire cart.</p>
                </div>

                <p style="color: #64748b; font-size: 11px; line-height: 1.5; border-top: 1px solid #f1f5f9; padding-top: 16px;">
                  <strong>RESEARCH DISCLAIMER:</strong> All compounds sold by Biotic House are strictly intended for in-vitro laboratory experimentation and analytical research only. Not for human or animal consumption.
                </p>
              </div>
            `,
          }),
        });
      } catch (emailErr) {
        console.error("[Brevo SMTP Error]: Failed to dispatch welcome coupon email", emailErr);
      }
    }

    if (!contactRes.ok && contactData.code !== "duplicate_parameter") {
      console.error("[Brevo API Error]:", contactData);
      return NextResponse.json(
        { error: contactData.message || "Failed to subscribe with Brevo." },
        { status: contactRes.status || 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Subscribed successfully to Brevo.",
    });
  } catch (error) {
    console.error("[Brevo Subscribe Server Error]:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your subscription." },
      { status: 500 }
    );
  }
}
