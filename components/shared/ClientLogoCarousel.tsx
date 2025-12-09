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
        const response = await fetch("/api/client-logos", { cache: "no-store" });
        const data = await response.json();
        
        if (response.ok) {
          const mappedLogos: ClientLogoWithSize[] = data
            .filter((logo: any) => logo?.name && logo?.logoUrl)
            .map((logo: any) => ({
              name: logo.name,
              logo: logo.logoUrl,
              alt: logo.alt,
              width: logo.width || 160,
              height: logo.height || 100,
            }));
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

  return (
    <div className="relative w-full overflow-x-hidden min-h-[50px] sm:min-h-[60px] md:min-h-[70px] lg:min-h-[100px] max-w-full">
      <Marquee
        pauseOnHover={pauseOnHover}
        speed={speed}
        className="smooth-marquee w-full max-w-full">
        {logos.map((client) => (
          <div
            key={client.name}
            className="shrink-0 mx-2 sm:mx-3 md:mx-4 lg:mx-8 xl:mx-10">
            <div className="relative w-16 h-8 sm:w-20 sm:h-10 md:w-24 md:h-12 lg:w-32 lg:h-16 xl:w-36 xl:h-18 flex items-center justify-center group transition-all duration-300 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 brightness-0 hover:brightness-100">
              <Image
                src={client.logo}
                alt={client.alt}
                width={client.width || 160}
                height={client.height || 100}
                className="w-full h-full max-w-full max-h-full object-contain"
                sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 96px, (max-width: 1280px) 192px, 224px"
              />
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
