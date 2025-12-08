import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getProjectConfig } from "@/lib/project-config";

export async function POST(request: Request) {
  const { name, email, phone, message } = await request.json();
  const { name: entityName, email: siteEmail } = getProjectConfig();

  // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: parseInt(process.env.EMAIL_PORT || "587"),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
    debug: true,
    logger: true,
  });

  try {
    // Verify email configuration first
    await transporter.verify();
    console.log("Email configuration verified successfully");

    const fromAddress = `support@${siteEmail}`;

    // Send email to support@codagam.com
    await transporter.sendMail({
      from: `${entityName} "Contact" <${fromAddress}>`,
      to: "support@codagam.com",
      subject: "New Contact Form Submission",
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
      `,
    });

    // Send thank you email to the user if email is provided
    if (email) {
      await transporter.sendMail({
        from: `${entityName} <${fromAddress}>`,
        to: email,
        subject: `Thank you for contacting ${entityName}`,
        text: `
          Dear ${name},

          Thank you for contacting ${entityName}. We have received your message and will get back to you within 48 hours.

          Best regards,
          ${entityName} Team
        `,
      });
    }

    return NextResponse.json({ message: "Emails sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        message: "Error sending email",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
