import { NextRequest, NextResponse } from "next/server";
import { codagamSitePrisma } from "@/lib/prisma-codagam-site";

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      console.error("DATABASE_URL is not set");
      return NextResponse.json(
        { error: "Database connection not configured" },
        { status: 500 }
      );
    }

    const content = await codagamSitePrisma.footerContent.findUnique({
      where: { id: "footer_content" },
    });

    if (!content) {
      // Return default values if not found
      return NextResponse.json({
        id: "footer_content",
        title: "Let's Build Something Great",
        description:
          "Ready to transform your ideas into scalable products? Reach out to discuss your project.",
      });
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error("Error fetching footer content:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch footer content",
        ...(process.env.NODE_ENV === "development" && {
          details: error instanceof Error ? error.message : "Unknown error",
        }),
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Missing required fields: title, description" },
        { status: 400 }
      );
    }

    const content = await codagamSitePrisma.footerContent.upsert({
      where: { id: "footer_content" },
      update: {
        title,
        description,
      },
      create: {
        id: "footer_content",
        title,
        description,
      },
    });

    return NextResponse.json(content);
  } catch (error) {
    console.error("Error updating footer content:", error);
    return NextResponse.json(
      {
        error: "Failed to update footer content",
        ...(process.env.NODE_ENV === "development" && {
          details: error instanceof Error ? error.message : "Unknown error",
        }),
      },
      { status: 500 }
    );
  }
}

