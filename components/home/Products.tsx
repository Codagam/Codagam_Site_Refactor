"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { ExternalLink } from "lucide-react";
import type { ProductItem, ButtonWithUrlHandler } from "@/models/interfaces";

interface ProductWithBackground extends ProductItem {
  backgroundImage?: string;
}

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [products, setProducts] = useState<ProductWithBackground[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products", { cache: "no-store" });
        const data = await response.json();

        if (response.ok) {
          const mappedProducts: ProductWithBackground[] = data
            .filter(
              (
                product: unknown
              ): product is {
                id: string;
                headline: string;
                imageUrl: string;
                description?: string;
                details?: string;
                website?: string;
              } =>
                typeof product === "object" &&
                product !== null &&
                "id" in product &&
                "headline" in product &&
                "imageUrl" in product &&
                typeof (product as { id: unknown }).id === "string" &&
                typeof (product as { headline: unknown }).headline ===
                  "string" &&
                typeof (product as { imageUrl: unknown }).imageUrl === "string"
            )
            .map(
              (product: {
                id: string;
                headline: string;
                imageUrl: string;
                description?: string;
                details?: string;
                website?: string;
                backgroundImageUrl?: string;
              }) => {
                return {
                  id: product.id,
                  headline: product.headline,
                  description: product.description,
                  details: product.details,
                  image: product.imageUrl,
                  website: product.website,
                  backgroundImage: product.backgroundImageUrl,
                };
              }
            );
          setProducts(mappedProducts);
        } else {
          console.error("API error:", data.error);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCardClick = useCallback((product: ProductItem) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  }, []);

  const handleVisitWebsite: ButtonWithUrlHandler = useCallback(
    (url: string) => {
      window.open(url, "_blank", "noopener,noreferrer");
    },
    []
  );

  const handleDialogClose = useCallback(() => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  }, []);

  // Autoplay plugin with pause on hover
  const autoplayPlugin = Autoplay({
    delay: 4000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
  });

  return (
    <>
      <section
        id="products"
        className="bg-card py-12 md:py-16 lg:pt-12 lg:pb-16 scroll-mt-12 sm:scroll-mt-14 md:scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary text-center mb-8 md:mb-12">
            Our Work
          </h2>
          {loading ? (
            <div className="flex justify-center items-center py-12 md:py-20">
              <p className="text-muted-foreground text-base md:text-lg">
                Loading portfolio...
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="flex justify-center items-center py-12 md:py-20">
              <p className="text-muted-foreground text-base md:text-lg">
                No portfolio items available.
              </p>
            </div>
          ) : (
            <div className="w-full relative">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[autoplayPlugin]}
                className="w-full">
                <CarouselContent className="ml-0 w-full py-4 md:py-5">
                  {products.map((product) => {
                    const backgroundImage =
                      product.backgroundImage || "/images/office1.jpg";
                    return (
                      <CarouselItem
                        key={product.id}
                        className="pl-2 md:pl-3 lg:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                        <Card
                          className="group h-[320px] md:h-[360px] lg:h-[380px] xl:h-[400px] w-full overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col border-0"
                          onClick={() => handleCardClick(product)}>
                          {/* Background Image Section with Logo Overlay */}
                          <div className="relative h-[140px] md:h-[170px] lg:h-[180px] xl:h-[200px] overflow-hidden w-full bg-muted">
                            {/* Background Image */}
                            <Image
                              src={backgroundImage}
                              alt={`${product.headline} background`}
                              fill
                              className="object-cover transition-all duration-300"
                              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                              priority={false}
                              loading="lazy"
                              unoptimized={false}
                            />
                            {/* Gradient overlay for better logo visibility */}
                            <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/50 z-10"></div>
                            {/* Logo Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                              <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full overflow-hidden bg-white/10 backdrop-blur-sm">
                                <Image
                                  src={product.image}
                                  alt={product.headline}
                                  fill
                                  className="object-contain drop-shadow-2xl rounded-full p-1"
                                  sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 96px, (max-width: 1280px) 112px, 128px"
                                  loading="lazy"
                                  unoptimized={false}
                                />
                              </div>
                            </div>
                          </div>
                          {/* Text Card Content */}
                          <CardHeader className="p-4 md:p-5 flex-1 flex flex-col min-h-0">
                            <CardTitle className="text-base md:text-lg lg:text-xl font-bold mb-2 md:mb-3 transition-colors duration-300 text-primary line-clamp-2 leading-tight wrap-break-word">
                              {product.headline}
                            </CardTitle>
                            <p className="text-sm md:text-base leading-relaxed line-clamp-4 text-muted-foreground wrap-break-word">
                              {product.description}
                            </p>
                          </CardHeader>
                        </Card>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex left-2 md:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-lg hover:bg-background border border-border" />
                <CarouselNext className="hidden sm:flex right-2 md:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-lg hover:bg-background border border-border" />
              </Carousel>
            </div>
          )}
        </div>
      </section>

      {/* Product Details Dialog */}
      {selectedProduct && (
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
          <DialogContent className="max-w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-4 md:p-6 rounded-2xl md:rounded-3xl max-h-[90vh] overflow-y-auto w-full">
            <DialogHeader className="space-y-3">
              {/* Product Logo and Heading */}
              <div className="flex flex-col items-center gap-3 w-full">
                <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.headline}
                    fill
                    className="object-contain rounded-full"
                    sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                  />
                </div>
                <DialogTitle className="text-lg md:text-xl lg:text-2xl font-bold leading-tight text-center wrap-break-word px-2 text-foreground">
                  {selectedProduct.headline}
                </DialogTitle>
              </div>
            </DialogHeader>
            <div className="space-y-4 md:space-y-6 mt-4 md:mt-5 w-full max-w-full">
              {/* Product Details */}
              <p className="text-foreground leading-relaxed text-sm md:text-base wrap-break-word">
                {selectedProduct.details}
              </p>
              {/* View Site Button */}
              <div className="flex justify-center sm:justify-start pt-3">
                <Button
                  variant="black"
                  onClick={() => handleVisitWebsite(selectedProduct.website)}
                  className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium inline-flex items-center justify-center gap-2"
                  aria-label={`Visit ${selectedProduct.headline} website`}>
                  View Site
                  <ExternalLink className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
