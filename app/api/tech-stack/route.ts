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

    const items = await codagamSitePrisma.techStackItem.findMany({
      orderBy: { position: "asc" },
    });

    const itemsWithFullUrls = items
      .filter((item) => item?.id && item?.name && item?.iconUrl)
      .map((item) => ({
        ...item,
        iconUrl: constructImageUrl(item.iconUrl),
      }));

    return NextResponse.json(itemsWithFullUrls);
  } catch (error: any) {
    console.error("Error fetching tech stack items:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch tech stack items",
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

      const existingItems = await codagamSitePrisma.techStackItem.findMany({
        where: { id: { in: order } },
      });

      if (existingItems.length !== order.length) {
        const missingIds = order.filter(
          (id: string) => !existingItems.some((item) => item.id === id)
        );
        return NextResponse.json(
          { error: "Some tech stack item IDs are invalid", missingIds },
          { status: 400 }
        );
      }

      // Update positions based on order array
      await Promise.all(
        order.map((itemId: string, index: number) =>
          codagamSitePrisma.techStackItem.update({
            where: { id: itemId },
            data: {
              position: index,
            },
          })
        )
      );

      return NextResponse.json({
        success: true,
        message: "Tech stack items order updated successfully",
        count: order.length,
      });
    }

    return NextResponse.json(
      { error: "Invalid request. Use POST to create or provide 'order' array for bulk update." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error updating tech stack items order:", error);
    return NextResponse.json(
      { error: "Failed to update tech stack items order" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, iconUrl, name, position } = body;

    if (!id || !iconUrl || !name) {
      return NextResponse.json(
        { error: "Missing required fields: id, iconUrl, name" },
        { status: 400 }
      );
    }

    // Construct full CDN URL if iconUrl is a file path
    const fullIconUrl = iconUrl && !isFullUrl(iconUrl)
      ? constructImageUrl(iconUrl)
      : iconUrl;

    const item = await codagamSitePrisma.techStackItem.create({
      data: {
        id,
        iconUrl: fullIconUrl,
        name,
        position: position || 0,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Error creating tech stack item:", error);
    return NextResponse.json(
      { error: "Failed to create tech stack item" },
      { status: 500 }
    );
  }
}

