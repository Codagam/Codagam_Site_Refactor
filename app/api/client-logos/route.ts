import { NextRequest, NextResponse } from "next/server";
import { codagamSitePrisma } from "@/lib/prisma-codagam-site";
import { constructImageUrl, isFullUrl } from "@/lib/utils/image-url";

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      console.error("DATABASE_URL is not set");
      return NextResponse.json(
        { error: "Database connection not configured" },
        { status: 500 }
      );
    }

    const logos = await codagamSitePrisma.clientLogo.findMany({
      orderBy: { position: "asc" },
    });

    const logosWithFullUrls = logos
      .filter((logo) => logo?.id && logo?.name && logo?.logoUrl)
      .map((logo) => ({
        ...logo,
        logoUrl: constructImageUrl(logo.logoUrl),
      }));

    return NextResponse.json(logosWithFullUrls);
  } catch (error: any) {
    console.error("Error fetching client logos:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch client logos",
        ...(process.env.NODE_ENV === "development" && {
          details: error.message,
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

      const existingLogos = await codagamSitePrisma.clientLogo.findMany({
        where: { id: { in: order } },
      });

      if (existingLogos.length !== order.length) {
        const missingIds = order.filter(
          (id: string) => !existingLogos.some((l) => l.id === id)
        );
        return NextResponse.json(
          { error: "Some logo IDs are invalid", missingIds },
          { status: 400 }
        );
      }

      // Update positions based on order array
      await Promise.all(
        order.map((logoId: string, index: number) =>
          codagamSitePrisma.clientLogo.update({
            where: { id: logoId },
            data: {
              position: index,
            },
          })
        )
      );

      return NextResponse.json({
        success: true,
        message: "Client logos order updated successfully",
        count: order.length,
      });
    }

    return NextResponse.json(
      { error: "Invalid request. Use POST to create or provide 'order' array for bulk update." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error updating client logos order:", error);
    return NextResponse.json(
      { error: "Failed to update client logos order" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, logoUrl, alt, width, height, position } = body;

    if (!id || !name || !logoUrl || !alt) {
      return NextResponse.json(
        { error: "Missing required fields: id, name, logoUrl, alt" },
        { status: 400 }
      );
    }

    // Construct full CDN URL if logoUrl is a file path
    const fullLogoUrl = logoUrl && !isFullUrl(logoUrl)
      ? constructImageUrl(logoUrl)
      : logoUrl;

    const clientLogo = await codagamSitePrisma.clientLogo.create({
      data: {
        id,
        name,
        logoUrl: fullLogoUrl,
        alt,
        width: width || 160,
        height: height || 100,
        position: position || 0,
      },
    });

    return NextResponse.json(clientLogo, { status: 201 });
  } catch (error) {
    console.error("Error creating client logo:", error);
    return NextResponse.json(
      { error: "Failed to create client logo" },
      { status: 500 }
    );
  }
}

