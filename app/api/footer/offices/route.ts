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

    // Fetch all offices ordered by country position first, then position within country
    const offices = await codagamSitePrisma.footerOffice.findMany({
      orderBy: [
        { countryPosition: "asc" },
        { position: "asc" },
      ],
    });

    const officesWithFullUrls = offices.map((office) => ({
      ...office,
      flagUrl: office.flagUrl
        ? isFullUrl(office.flagUrl)
          ? office.flagUrl
          : constructImageUrl(office.flagUrl)
        : null,
    }));

    return NextResponse.json(officesWithFullUrls);
  } catch (error: any) {
    console.error("Error fetching footer offices:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch footer offices",
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

      const existingOffices = await codagamSitePrisma.footerOffice.findMany({
        where: { id: { in: order } },
      });

      if (existingOffices.length !== order.length) {
        const missingIds = order.filter(
          (id: string) => !existingOffices.some((o) => o.id === id)
        );
        return NextResponse.json(
          { error: "Some office IDs are invalid", missingIds },
          { status: 400 }
        );
      }

      // Update positions based on order array
      await Promise.all(
        order.map((officeId: string, index: number) =>
          codagamSitePrisma.footerOffice.update({
            where: { id: officeId },
            data: {
              position: index,
            },
          })
        )
      );

      return NextResponse.json({
        success: true,
        message: "Footer offices order updated successfully",
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
    console.error("Error updating footer offices order:", error);
    return NextResponse.json(
      { error: "Failed to update footer offices order" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      country,
      countryCode,
      countryPosition,
      flagUrl,
      address,
      phone,
      email,
      position,
    } = body;

    if (!id || !country || !address) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: id, country, address",
        },
        { status: 400 }
      );
    }

    // Construct full CDN URL if flagUrl is a file path
    const fullFlagUrl =
      flagUrl && !isFullUrl(flagUrl)
        ? constructImageUrl(flagUrl)
        : flagUrl || null;

    // If countryPosition is not provided, get the max position for this country or 0
    let finalCountryPosition = countryPosition;
    if (finalCountryPosition === undefined) {
      const maxCountryPosition = await codagamSitePrisma.footerOffice.findFirst({
        where: { country },
        orderBy: { countryPosition: "desc" },
        select: { countryPosition: true },
      });
      finalCountryPosition = maxCountryPosition
        ? maxCountryPosition.countryPosition + 1
        : 0;
    }

    // If position is not provided, get the max position within this country or 0
    let finalPosition = position;
    if (finalPosition === undefined) {
      const maxPosition = await codagamSitePrisma.footerOffice.findFirst({
        where: { country },
        orderBy: { position: "desc" },
        select: { position: true },
      });
      finalPosition = maxPosition ? maxPosition.position + 1 : 0;
    }

    const office = await codagamSitePrisma.footerOffice.create({
      data: {
        id,
        country,
        countryCode: countryCode ? countryCode.toUpperCase() : null,
        countryPosition: finalCountryPosition,
        flagUrl: fullFlagUrl,
        address,
        phone: phone || null,
        email: email || null,
        position: finalPosition,
      },
    });

    return NextResponse.json(office, { status: 201 });
  } catch (error) {
    console.error("Error creating footer office:", error);
    return NextResponse.json(
      { error: "Failed to create footer office" },
      { status: 500 }
    );
  }
}

