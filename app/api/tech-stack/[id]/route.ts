import { NextRequest, NextResponse } from "next/server";
import { codagamSitePrisma } from "@/lib/prisma-codagam-site";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const item = await codagamSitePrisma.techStackItem.findUnique({
      where: { id },
    });

    if (!item) {
      return NextResponse.json(
        { error: "Tech stack item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error("Error fetching tech stack item:", error);
    return NextResponse.json(
      { error: "Failed to fetch tech stack item" },
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
    const { iconUrl, name, position } = body;

    const item = await codagamSitePrisma.techStackItem.update({
      where: { id },
      data: {
        ...(iconUrl && { iconUrl }),
        ...(name && { name }),
        ...(position !== undefined && { position }),
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("Error updating tech stack item:", error);
    return NextResponse.json(
      { error: "Failed to update tech stack item" },
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
    await codagamSitePrisma.techStackItem.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Tech stack item deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting tech stack item:", error);
    return NextResponse.json(
      { error: "Failed to delete tech stack item" },
      { status: 500 }
    );
  }
}
