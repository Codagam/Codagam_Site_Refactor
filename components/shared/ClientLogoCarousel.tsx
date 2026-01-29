"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";
import { ClientLogoWithSize } from "@/models/interfaces";

interface ClientLogoCarouselProps {
  logos?: ClientLogoWithSize[];
  pauseOnHover?: boolean;
  duration?: string;
}

export default function ClientLogoCarousel({
  logos: propLogos,
  pauseOnHover = true,
  duration = "60s",
}: ClientLogoCarouselProps) {
  const [logos, setLogos] = useState<ClientLogoWithSize[]>(propLogos || []);
  const [loading, setLoading] = useState(!propLogos);

  useEffect(() => {
    // If logos are provided as props, use them
    if (propLogos && propLogos.length > 0) {
      setLogos(propLogos);
      setLoading(false);
      return;
    }

    // Otherwise, fetch from API
    const fetchLogos = async () => {
      try {
        const response = await fetch("/api/client-logos", {
          cache: "no-store",
        });
        const data = await response.json();

        if (response.ok) {
          // Deduplicate logos by id or name to prevent duplicates
          const seenIds = new Set<string>();
          const seenNames = new Set<string>();

          const mappedLogos: ClientLogoWithSize[] = data
            .filter(
              (
                logo: unknown
              ): logo is {
                id?: string;
                name: string;
                logoUrl: string;
                alt?: string;
                width?: number;
                height?: number;
              } => {
                // Filter out invalid logos
                if (typeof logo !== "object" || logo === null) return false;
                if (!("name" in logo) || !("logoUrl" in logo)) return false;
                if (
                  typeof (logo as { name: unknown }).name !== "string" ||
                  typeof (logo as { logoUrl: unknown }).logoUrl !== "string"
                )
                  return false;

                const logoObj = logo as {
                  id?: string;
                  name: string;
                  logoUrl: string;
                };

                // Deduplicate by id if available, otherwise by name
                if (logoObj.id && seenIds.has(logoObj.id)) return false;
                if (!logoObj.id && seenNames.has(logoObj.name)) return false;

                if (logoObj.id) seenIds.add(logoObj.id);
                seenNames.add(logoObj.name);
                return true;
              }
            )
            .map(
              (logo: {
                id?: string;
                name: string;
                logoUrl: string;
                alt?: string;
                width?: number;
                height?: number;
              }) => ({
                id: logo.id,
                name: logo.name,
                logo: logo.logoUrl,
                alt: logo.alt || logo.name, // Use name as fallback if alt is missing
                width: logo.width || 160,
                height: logo.height || 100,
              })
            );
          setLogos(mappedLogos);
        } else {
          console.error("API error:", data.error);
        }
      } catch (error) {
        console.error("Error fetching client logos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogos();
  }, [propLogos]);

  if (loading || !logos || logos.length === 0) {
    return null;
  }

  // Calculate speed from duration string (e.g., "60s" -> 60)
  const speed = parseInt(duration.replace("s", "")) || 60;

  // Only duplicate for seamless scrolling if we have enough logos (4+)
  // For few logos (3 or less), don't duplicate to avoid showing duplicates
  const shouldDuplicate = logos.length >= 4;

  return (
    <div className="relative w-full max-w-[100vw] overflow-hidden min-h-[48px] sm:min-h-[56px] md:min-h-[64px] lg:min-h-[72px] xl:min-h-[88px] 2xl:min-h-[100px] flex items-center justify-center min-w-0">
      <Marquee
        pauseOnHover={pauseOnHover}
        speed={speed}
        duplicate={shouldDuplicate}
        className="w-full max-w-full">
        {logos.map((client, index) => (
          <div
            key={
              client.id ? `${client.id}-${index}` : `${client.name}-${index}`
            }
            className="shrink-0 mx-2 sm:mx-4 md:mx-5 lg:mx-6 xl:mx-8 2xl:mx-10">
            <div className="relative w-14 h-7 sm:w-20 sm:h-10 md:w-24 md:h-12 lg:w-28 lg:h-14 xl:w-32 xl:h-16 2xl:w-36 2xl:h-18 flex items-center justify-center group transition-all duration-300 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 brightness-0 hover:brightness-100">
              <Image
                src={client.logo}
                alt={client.alt || client.name}
                width={client.width || 160}
                height={client.height || 100}
                className="w-full h-full max-w-full max-h-full object-contain"
                sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 96px, (max-width: 1280px) 112px, (max-width: 1536px) 128px, 144px"
              />
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
