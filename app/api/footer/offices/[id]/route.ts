import { NextRequest, NextResponse } from "next/server";
import { codagamSitePrisma } from "@/lib/prisma-codagam-site";
import { constructImageUrl, isFullUrl } from "@/lib/utils/image-url";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const office = await codagamSitePrisma.footerOffice.findUnique({
      where: { id },
    });

    if (!office) {
      return NextResponse.json(
        { error: "Office not found" },
        { status: 404 }
      );
    }

    const officeWithFullUrls = {
      ...office,
      flagUrl: office.flagUrl
        ? isFullUrl(office.flagUrl)
          ? office.flagUrl
          : constructImageUrl(office.flagUrl)
        : null,
    };

    return NextResponse.json(officeWithFullUrls);
  } catch (error) {
    console.error("Error fetching office:", error);
    return NextResponse.json(
      { error: "Failed to fetch office" },
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
      country,
      countryPosition,
      flagUrl,
      address,
      phone,
      email,
      position,
    } = body;

    const updateData: any = {
      ...(country && { country }),
      ...(countryPosition !== undefined && { countryPosition }),
      ...(address && { address }),
      ...(phone !== undefined && { phone }),
      ...(email !== undefined && { email }),
      ...(position !== undefined && { position }),
    };

    // Construct full CDN URL if flagUrl is a file path
    if (flagUrl !== undefined) {
      updateData.flagUrl =
        flagUrl && !isFullUrl(flagUrl)
          ? constructImageUrl(flagUrl)
          : flagUrl;
    }

    const office = await codagamSitePrisma.footerOffice.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(office);
  } catch (error) {
    console.error("Error updating office:", error);
    return NextResponse.json(
      { error: "Failed to update office" },
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
    await codagamSitePrisma.footerOffice.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Office deleted successfully" });
  } catch (error) {
    console.error("Error deleting office:", error);
    return NextResponse.json(
      { error: "Failed to delete office" },
      { status: 500 }
    );
  }
}

