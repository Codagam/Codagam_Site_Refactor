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

    const products = await codagamSitePrisma.product.findMany({
      orderBy: { position: "asc" },
    });

    const productsWithFullUrls = products
      .filter(
        (product) => product?.id && product?.headline && product?.imageUrl
      )
      .map((product) => ({
        ...product,
        imageUrl: constructImageUrl(product.imageUrl),
        backgroundImageUrl: product.backgroundImageUrl
          ? constructImageUrl(product.backgroundImageUrl)
          : null,
      }));

    return NextResponse.json(productsWithFullUrls);
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch products",
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

      const existingProducts = await codagamSitePrisma.product.findMany({
        where: { id: { in: order } },
      });

      if (existingProducts.length !== order.length) {
        const missingIds = order.filter(
          (id: string) => !existingProducts.some((p) => p.id === id)
        );
        return NextResponse.json(
          { error: "Some product IDs are invalid", missingIds },
          { status: 400 }
        );
      }

      // Update positions based on order array
      await Promise.all(
        order.map((productId: string, index: number) =>
          codagamSitePrisma.product.update({
            where: { id: productId },
            data: {
              position: index,
            },
          })
        )
      );

      return NextResponse.json({
        success: true,
        message: "Products order updated successfully",
        count: order.length,
      });
    }

    return NextResponse.json(
      { error: "Invalid request. Use POST to create or provide 'order' array for bulk update." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error updating products order:", error);
    return NextResponse.json(
      { error: "Failed to update products order" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      headline,
      description,
      details,
      imageUrl,
      website,
      backgroundImageUrl,
      position,
    } = body;

    if (
      !id ||
      !headline ||
      !description ||
      !details ||
      !imageUrl ||
      !website
    ) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: id, headline, description, details, imageUrl, website",
        },
        { status: 400 }
      );
    }

    // Construct full CDN URLs if images are file paths
    const fullImageUrl = imageUrl && !isFullUrl(imageUrl)
      ? constructImageUrl(imageUrl)
      : imageUrl;

    const fullBackgroundImageUrl = backgroundImageUrl && !isFullUrl(backgroundImageUrl)
      ? constructImageUrl(backgroundImageUrl)
      : backgroundImageUrl || null;

    const product = await codagamSitePrisma.product.create({
      data: {
        id,
        headline,
        description,
        details,
        imageUrl: fullImageUrl,
        website,
        backgroundImageUrl: fullBackgroundImageUrl,
        position: position !== undefined ? position : 0,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

