import { NextRequest, NextResponse } from "next/server";
import { codagamSitePrisma } from "@/lib/prisma-codagam-site";
import { constructImageUrl, isFullUrl } from "@/lib/utils/image-url";

// Helper function to validate hero data
const isValidHero = (
  hero: unknown
): hero is {
  id: string;
  number?: string;
  heading?: string;
  description?: string;
  imageUrl?: string;
} => {
  return (
    typeof hero === "object" &&
    hero !== null &&
    "id" in hero &&
    typeof (hero as { id: unknown }).id === "string"
  );
};

// Helper function to fetch heroes with fallback ordering
// Using select to only fetch fields defined in the schema (ignoring any old fields in DB)
const fetchHeroes = async () => {
  try {
    return await codagamSitePrisma.heroSection.findMany({
      select: {
        id: true,
        number: true,
        heading: true,
        description: true,
        imageUrl: true,
        position: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: [{ position: "asc" }, { updatedAt: "asc" }],
    });
  } catch {
    try {
      return await codagamSitePrisma.heroSection.findMany({
        select: {
          id: true,
          number: true,
          heading: true,
          description: true,
          imageUrl: true,
          position: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { updatedAt: "asc" },
      });
    } catch {
      return await codagamSitePrisma.heroSection.findMany({
        select: {
          id: true,
          number: true,
          heading: true,
          description: true,
          imageUrl: true,
          position: true,
          createdAt: true,
          updatedAt: true,
        },
      });
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

    // Map heroes to response format, handling imageUrl correctly
    // Admin API may save imageUrl as full URL or file path, so we handle both
    const heroesWithFullUrls = heroes.filter(isValidHero).map((hero) => {
      const heroAny = hero as any;
      
      // Handle imageUrl: construct full URL if it's a file path
      // Admin API uses constructImageUrl before saving, so it might already be a full URL
      let imageUrl = null;
      if (heroAny.imageUrl) {
        // If already a full URL (http/https/blob), use as-is
        // Otherwise, construct CDN URL from file path
        imageUrl = isFullUrl(heroAny.imageUrl)
          ? heroAny.imageUrl
          : constructImageUrl(heroAny.imageUrl);
      }
      
      return {
        id: hero.id,
        number: heroAny.number || null,
        heading: heroAny.heading || null,
        description: heroAny.description || null,
        imageUrl: imageUrl,
        position:
          "position" in hero && typeof hero.position === "number"
            ? hero.position
            : 0,
      };
    });

    return NextResponse.json(heroesWithFullUrls);
  } catch (error) {
    console.error("Error fetching hero sections:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch hero sections",
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
    const { number, heading, description } = body;
    let { imageUrl, position } = body;

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
        ...(number !== undefined && { number }),
        ...(heading !== undefined && { heading }),
        ...(description !== undefined && { description }),
        ...(imageUrl !== undefined && { imageUrl }),
        position: position !== undefined ? position : undefined,
      } as any,
      create: {
        id: heroId,
        number: number || null,
        heading: heading || null,
        description: description || null,
        imageUrl: imageUrl || null,
        position: position || 0,
      } as any,
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
