import { NextRequest, NextResponse } from "next/server";
import { codagamSitePrisma } from "@/lib/prisma-codagam-site";
import { constructImageUrl, isFullUrl } from "@/lib/utils/image-url";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const logo = await codagamSitePrisma.clientLogo.findUnique({
      where: { id },
    });

    if (!logo) {
      return NextResponse.json(
        { error: "Client logo not found" },
        { status: 404 }
      );
    }

    // Construct full CDN URL for logo
    const logoWithFullUrl = {
      ...logo,
      logoUrl: constructImageUrl(logo.logoUrl),
    };

    return NextResponse.json(logoWithFullUrl);
  } catch (error) {
    console.error("Error fetching client logo:", error);
    return NextResponse.json(
      { error: "Failed to fetch client logo" },
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
    const { name, logoUrl, alt, width, height, position } = body;

    const updateData: Partial<{
      name: string;
      logoUrl: string;
      alt: string | null;
      width: number;
      height: number;
      position: number;
    }> = {
      ...(name && { name }),
      ...(alt && { alt }),
      ...(width !== undefined && { width }),
      ...(height !== undefined && { height }),
      ...(position !== undefined && { position }),
    };

    // Construct full CDN URL if logoUrl is a file path
    if (logoUrl) {
      updateData.logoUrl = !isFullUrl(logoUrl)
        ? constructImageUrl(logoUrl)
        : logoUrl;
    }

    const clientLogo = await codagamSitePrisma.clientLogo.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(clientLogo);
  } catch (error) {
    console.error("Error updating client logo:", error);
    return NextResponse.json(
      { error: "Failed to update client logo" },
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
    await codagamSitePrisma.clientLogo.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Client logo deleted successfully" });
  } catch (error) {
    console.error("Error deleting client logo:", error);
    return NextResponse.json(
      { error: "Failed to delete client logo" },
      { status: 500 }
    );
  }
}

