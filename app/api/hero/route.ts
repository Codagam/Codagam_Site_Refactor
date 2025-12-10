import { NextRequest, NextResponse } from "next/server";
import { codagamSitePrisma } from "@/lib/prisma-codagam-site";
import { constructImageUrl, isFullUrl } from "@/lib/utils/image-url";

// Helper function to validate hero data
const isValidHero = (hero: unknown): hero is { id: string; title: string; imageUrl: string } => {
  return (
    typeof hero === "object" &&
    hero !== null &&
    "id" in hero &&
    "title" in hero &&
    "imageUrl" in hero &&
    typeof (hero as { id: unknown }).id === "string" &&
    typeof (hero as { title: unknown }).title === "string" &&
    typeof (hero as { imageUrl: unknown }).imageUrl === "string" &&
    String((hero as { title: string }).title).trim() !== "" &&
    String((hero as { imageUrl: string }).imageUrl).trim() !== ""
  );
};

// Helper function to fetch heroes with fallback ordering
const fetchHeroes = async () => {
  try {
    return await codagamSitePrisma.heroSection.findMany({
      orderBy: [{ position: "asc" }, { updatedAt: "asc" }],
    });
  } catch {
    try {
      return await codagamSitePrisma.heroSection.findMany({
        orderBy: { updatedAt: "asc" },
      });
    } catch {
      return await codagamSitePrisma.heroSection.findMany();
    }
  }
};

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "Database connection not configured" },
        { status: 500 }
      );
    }

    const heroes = await fetchHeroes();

    const heroesWithFullUrls = heroes
      .filter(isValidHero)
      .map((hero) => ({
        id: hero.id,
        title: hero.title,
        imageUrl: constructImageUrl(hero.imageUrl),
        position: "position" in hero && typeof hero.position === "number" ? hero.position : 0,
      }));

    return NextResponse.json(heroesWithFullUrls);
  } catch (error) {
    console.error("Error fetching hero section:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch hero section",
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

      const existingHeroes = await codagamSitePrisma.heroSection.findMany({
        where: { id: { in: order } },
      });

      if (existingHeroes.length !== order.length) {
        const missingIds = order.filter(
          (id: string) => !existingHeroes.some((h) => h.id === id)
        );
        return NextResponse.json(
          { error: "Some hero IDs are invalid", missingIds },
          { status: 400 }
        );
      }

      // Update positions based on order array
      await Promise.all(
        order.map((heroId: string, index: number) =>
          codagamSitePrisma.heroSection.update({
            where: { id: heroId },
            data: { position: index },
          })
        )
      );

      return NextResponse.json({
        success: true,
        message: "Hero sections order updated successfully",
        count: order.length,
      });
    }

    // Handle single hero section update
    const { title } = body;
    let { imageUrl, position } = body;

    if (!title || !imageUrl) {
      return NextResponse.json(
        { error: "Title and imageUrl are required" },
        { status: 400 }
      );
    }

    // Construct full CDN URL if imageUrl is a file path
    if (imageUrl && !isFullUrl(imageUrl)) {
      imageUrl = constructImageUrl(imageUrl);
    }

    // If position is not provided, get the current count to set as default
    if (position === undefined || position === null) {
      const count = await codagamSitePrisma.heroSection.count();
      position = count;
    }

    // Check if id is provided, if not use "hero" as default
    const heroId = body.id || "hero";

    const hero = await codagamSitePrisma.heroSection.upsert({
      where: { id: heroId },
      update: {
        title,
        imageUrl,
        position: position !== undefined ? position : undefined,
      },
      create: {
        id: heroId,
        title,
        imageUrl,
        position: position || 0,
      },
    });

    return NextResponse.json(hero);
  } catch (error) {
    console.error("Error updating hero section:", error);
    return NextResponse.json(
      { error: "Failed to update hero section" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return PUT(request);
}

