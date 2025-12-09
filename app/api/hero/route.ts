import { NextRequest, NextResponse } from "next/server";
import { codagamSitePrisma } from "@/lib/prisma-codagam-site";
import { constructImageUrl, isFullUrl } from "@/lib/utils/image-url";

// Helper function to validate hero data
const isValidHero = (hero: any): boolean => {
  return !!(
    hero?.id &&
    hero?.title?.trim() &&
    hero?.imageUrl?.trim()
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
        buttonText: hero.buttonText || "Learn More",
        position: (hero as any).position ?? 0,
      }));

    return NextResponse.json(heroesWithFullUrls);
  } catch (error: any) {
    console.error("Error fetching hero section:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch hero section",
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
    let { title, imageUrl, buttonText, position } = body;

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
        buttonText: buttonText || "Learn More",
        position: position !== undefined ? position : undefined,
      },
      create: {
        id: heroId,
        title,
        imageUrl,
        buttonText: buttonText || "Learn More",
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

