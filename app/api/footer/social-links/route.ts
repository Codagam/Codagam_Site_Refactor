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

    const socialLinks = await codagamSitePrisma.footerSocialLink.findMany({
      orderBy: { position: "asc" },
    });

    return NextResponse.json(socialLinks);
  } catch (error) {
    console.error("Error fetching footer social links:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch footer social links",
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

    // Handle bulk position updates (like drag and drop reordering)
    if (body.order && Array.isArray(body.order)) {
      const { order } = body;

      if (order.length === 0) {
        return NextResponse.json(
          { error: "Order array is required" },
          { status: 400 }
        );
      }

      const existingLinks = await codagamSitePrisma.footerSocialLink.findMany({
        where: { id: { in: order } },
      });

      if (existingLinks.length !== order.length) {
        const missingIds = order.filter(
          (id: string) => !existingLinks.some((l) => l.id === id)
        );
        return NextResponse.json(
          { error: "Some social link IDs are invalid", missingIds },
          { status: 400 }
        );
      }

      // Update positions based on order array
      await Promise.all(
        order.map((linkId: string, index: number) =>
          codagamSitePrisma.footerSocialLink.update({
            where: { id: linkId },
            data: {
              position: index,
            },
          })
        )
      );

      return NextResponse.json({
        success: true,
        message: "Footer social links order updated successfully",
        count: order.length,
      });
    }

    return NextResponse.json(
      {
        error:
          "Invalid request. Use POST to create or provide 'order' array for bulk update.",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error updating footer social links order:", error);
    return NextResponse.json(
      { error: "Failed to update footer social links order" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, platform, url, iconType, position } = body;

    if (!id || !platform || !url) {
      return NextResponse.json(
        { error: "Missing required fields: id, platform, url" },
        { status: 400 }
      );
    }

    const socialLink = await codagamSitePrisma.footerSocialLink.create({
      data: {
        id,
        platform,
        url,
        iconType: iconType || "",
        position: position !== undefined ? position : 0,
      },
    });

    return NextResponse.json(socialLink, { status: 201 });
  } catch (error) {
    console.error("Error creating footer social link:", error);
    return NextResponse.json(
      { error: "Failed to create footer social link" },
      { status: 500 }
    );
  }
}

