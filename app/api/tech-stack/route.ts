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

    // Fetch all categories with their capabilities
    const categories = await codagamSitePrisma.techStackCategory.findMany({
      include: {
        capabilities: {
          orderBy: { position: "asc" },
        },
      },
      orderBy: { position: "asc" },
    });

    // Map categories with capabilities to the format expected by the component
    const categoriesWithCapabilities = categories
      .filter((category) => category?.id && category?.title)
      .map((category) => {
        const capabilities = category.capabilities
          .filter((capability) => capability?.id && capability?.text)
          .map((capability) => {
            // Use image if available, otherwise use icon
            // If icon is an emoji (not a URL), use it directly; otherwise construct URL
            let imageUrl = "";
            if (capability.image) {
              imageUrl = constructImageUrl(capability.image);
            } else if (capability.icon) {
              // Check if icon is a URL (starts with http/https/blob) or an emoji
              if (isFullUrl(capability.icon) || capability.icon.startsWith("/")) {
                imageUrl = constructImageUrl(capability.icon);
              } else {
                // It's likely an emoji or text icon, use it directly
                imageUrl = capability.icon;
              }
            }

            return {
              id: capability.id,
              text: capability.text,
              image: imageUrl,
              icon: capability.icon || "",
              alt: capability.alt || capability.text,
            };
          });

        return {
          id: category.id,
          title: category.title,
          position: category.position,
          capabilities,
        };
      });

    return NextResponse.json(categoriesWithCapabilities);
  } catch (error) {
    console.error("Error fetching tech stack items:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch tech stack items",
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

      const existingItems = await codagamSitePrisma.techStackCapability.findMany({
        where: { id: { in: order } },
      });

      if (existingItems.length !== order.length) {
        const missingIds = order.filter(
          (id: string) => !existingItems.some((item) => item.id === id)
        );
        return NextResponse.json(
          { error: "Some tech stack capability IDs are invalid", missingIds },
          { status: 400 }
        );
      }

      // Update positions based on order array
      await Promise.all(
        order.map((itemId: string, index: number) =>
          codagamSitePrisma.techStackCapability.update({
            where: { id: itemId },
            data: {
              position: index,
            },
          })
        )
      );

      return NextResponse.json({
        success: true,
        message: "Tech stack capabilities order updated successfully",
        count: order.length,
      });
    }

    return NextResponse.json(
      { error: "Invalid request. Use POST to create or provide 'order' array for bulk update." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error updating tech stack capabilities order:", error);
    return NextResponse.json(
      { error: "Failed to update tech stack capabilities order" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, image, icon, alt, categoryId, position } = body;

    if (!text || !alt || !categoryId) {
      return NextResponse.json(
        { error: "Missing required fields: text, alt, categoryId" },
        { status: 400 }
      );
    }

    // Construct full CDN URL if image is a file path
    let fullImageUrl = null;
    if (image) {
      fullImageUrl = isFullUrl(image) ? image : constructImageUrl(image);
    }

    // Construct full CDN URL if icon is a file path (and not an emoji)
    let fullIconUrl = null;
    if (icon) {
      if (isFullUrl(icon) || icon.startsWith("/")) {
        fullIconUrl = constructImageUrl(icon);
      } else {
        // It's likely an emoji or text icon, use it directly
        fullIconUrl = icon;
      }
    }

    const item = await codagamSitePrisma.techStackCapability.create({
      data: {
        text,
        image: fullImageUrl,
        icon: fullIconUrl,
        alt,
        categoryId,
        position: position || 0,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Error creating tech stack capability:", error);
    return NextResponse.json(
      { error: "Failed to create tech stack capability" },
      { status: 500 }
    );
  }
}

