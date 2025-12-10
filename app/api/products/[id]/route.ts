import { NextRequest, NextResponse } from "next/server";
import { codagamSitePrisma } from "@/lib/prisma-codagam-site";
import { constructImageUrl, isFullUrl } from "@/lib/utils/image-url";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await codagamSitePrisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Construct full CDN URLs for images
    const productWithFullUrls = {
      ...product,
      imageUrl: constructImageUrl(product.imageUrl),
      backgroundImageUrl: product.backgroundImageUrl
        ? constructImageUrl(product.backgroundImageUrl)
        : null,
    };

    return NextResponse.json(productWithFullUrls);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      headline,
      description,
      details,
      imageUrl,
      website,
      backgroundImageUrl,
      position,
    } = body;

    const updateData: Partial<{
      headline: string;
      description: string;
      details: string;
      imageUrl: string;
      website: string;
      backgroundImageUrl: string | null;
      position: number;
    }> = {
      ...(headline && { headline }),
      ...(description && { description }),
      ...(details && { details }),
      ...(website && { website }),
      ...(position !== undefined && { position }),
    };

    // Construct full CDN URLs if images are file paths
    if (imageUrl) {
      updateData.imageUrl = !isFullUrl(imageUrl)
        ? constructImageUrl(imageUrl)
        : imageUrl;
    }

    if (backgroundImageUrl !== undefined) {
      updateData.backgroundImageUrl = backgroundImageUrl && !isFullUrl(backgroundImageUrl)
        ? constructImageUrl(backgroundImageUrl)
        : backgroundImageUrl;
    }

    const product = await codagamSitePrisma.product.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await codagamSitePrisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}

