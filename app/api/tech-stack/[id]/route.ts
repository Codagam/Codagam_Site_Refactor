import { NextRequest, NextResponse } from "next/server";
import { codagamSitePrisma } from "@/lib/prisma-codagam-site";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const item = await codagamSitePrisma.techStackCapability.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!item) {
      return NextResponse.json(
        { error: "Tech stack capability not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error("Error fetching tech stack capability:", error);
    return NextResponse.json(
      { error: "Failed to fetch tech stack capability" },
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
    const { text, image, icon, alt, categoryId, position } = body;

    const item = await codagamSitePrisma.techStackCapability.update({
      where: { id },
      data: {
        ...(text !== undefined && { text }),
        ...(image !== undefined && { image }),
        ...(icon !== undefined && { icon }),
        ...(alt !== undefined && { alt }),
        ...(categoryId !== undefined && { categoryId }),
        ...(position !== undefined && { position }),
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("Error updating tech stack capability:", error);
    return NextResponse.json(
      { error: "Failed to update tech stack capability" },
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
    await codagamSitePrisma.techStackCapability.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Tech stack capability deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting tech stack capability:", error);
    return NextResponse.json(
      { error: "Failed to delete tech stack capability" },
      { status: 500 }
    );
  }
}
