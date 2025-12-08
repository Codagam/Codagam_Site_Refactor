import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const resume = formData.get("resume") as File;

    if (!name || !email || !resume) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Convert file to buffer
    const buffer = await resume.arrayBuffer();

    // Send email with resume attachment
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "support@codagam.com",
      subject: "New Job Application",
      text: `
        Name: ${name}
        Email: ${email}
        
        Please find the attached resume.
      `,
      attachments: [
        {
          filename: resume.name,
          content: Buffer.from(buffer),
        },
      ],
    });

    return NextResponse.json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Error processing application:", error);
    return NextResponse.json(
      { error: "Error submitting application" },
      { status: 500 }
    );
  }
}
