"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { ExternalLink } from "lucide-react";
import {
  productItemsContent,
  productBackgroundImages,
} from "@/lib/content/products";
import type { ProductItem, ButtonWithUrlHandler } from "@/models/interfaces";

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  return (
    <>
      <section
        id="products"
        className="py-6 sm:py-8 md:py-10 lg:py-12 bg-white scroll-mt-[60px] sm:scroll-mt-[70px] w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-3 min-[375px]:px-4 sm:px-5 md:px-6 lg:px-8 w-full">
          <h2 className="text-2xl min-[375px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 md:mb-8 text-center font-semibold text-blue-900 wrap-break-word px-2 sm:px-0">
            Our Products
          </h2>
        </div>
        <div className="relative w-full max-w-7xl mx-auto px-3 min-[375px]:px-4 sm:px-5 md:px-6 lg:px-8">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full">
            <CarouselContent className="ml-0 w-full -mr-3 min-[375px]:-mr-4 sm:-mr-5 md:-mr-6 lg:-mr-8">
              {productItemsContent.map((product) => {
                const backgroundImage =
                  productBackgroundImages[product.id] || "/images/office1.jpg";
                return (
                  <CarouselItem
                    key={product.id}
                    className="pl-0 pr-3 min-[375px]:pr-4 sm:pr-5 md:pr-6 lg:pr-8 xl:pr-8 basis-full sm:basis-[85%] md:basis-[70%] lg:basis-1/3 xl:basis-1/4 w-full max-w-full">
                    <div
                      className="group rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer h-full flex flex-col w-full max-w-full"
                      onClick={() => handleCardClick(product)}>
                      {/* Background Image Section with Logo Overlay */}
                      <div className="relative h-[200px] min-[375px]:h-[220px] sm:h-[240px] md:h-[280px] lg:h-[300px] xl:h-[320px] overflow-hidden">
                        {/* Background Image */}
                        <Image
                          src={backgroundImage}
                          alt={`${product.headline} background`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 85vw, (max-width: 1024px) 70vw, (max-width: 1280px) 33vw, 25vw"
                        />
                        {/* Gradient overlay for better logo visibility */}
                        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/50"></div>
                        {/* Logo Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center p-3 min-[375px]:p-4 sm:p-5 md:p-6 lg:p-6">
                          <div className="relative w-16 h-16 min-[375px]:w-20 min-[375px]:h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full overflow-hidden">
                            <Image
                              src={product.image}
                              alt={product.alt}
                              fill
                              className="object-contain drop-shadow-2xl rounded-full"
                              sizes="(max-width: 375px) 64px, (max-width: 640px) 80px, (max-width: 768px) 96px, (max-width: 1024px) 128px, (max-width: 1280px) 144px, 160px"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Text Card Below */}
                      <div className="bg-white p-4 min-[375px]:p-5 sm:p-5 md:p-6 lg:p-6 xl:p-7 flex-1 flex flex-col">
                        <h3 className="text-base min-[375px]:text-lg sm:text-xl md:text-xl lg:text-2xl font-semibold mb-2 min-[375px]:mb-3 sm:mb-3">
                          {product.headline}
                        </h3>
                        <p className="text-slate-600 text-xs min-[375px]:text-sm sm:text-sm md:text-base lg:text-base leading-relaxed m-0 flex-1">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex absolute left-2 sm:-left-4 md:-left-12 lg:-left-12 xl:-left-12 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm shadow-lg" />
            <CarouselNext className="hidden sm:flex absolute right-2 sm:-right-4 md:-right-12 lg:-right-12 xl:-right-12 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm shadow-lg" />
          </Carousel>
        </div>
      </section>

      {/* Product Details Dialog */}
      {selectedProduct && (
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
          <DialogContent className="max-w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl max-h-[90vh] overflow-y-auto w-full">
            <DialogHeader className="space-y-4 sm:space-y-6">
              {/* Product Logo and Heading */}
              <div className="flex flex-col items-center gap-4 sm:gap-6 w-full">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.alt}
                    fill
                    className="object-contain rounded-full"
                    sizes="(max-width: 768px) 96px, (max-width: 1024px) 128px, 160px"
                  />
                </div>
                <DialogTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-center wrap-break-word px-2">
                  {selectedProduct.headline}
                </DialogTitle>
              </div>
            </DialogHeader>
            <div className="space-y-6 sm:space-y-8 mt-4 sm:mt-6 w-full max-w-full">
              {/* Product Details */}
              <p className="text-foreground leading-relaxed text-sm sm:text-base md:text-lg wrap-break-word">
                {selectedProduct.details}
              </p>
              {/* View Site Button */}
              <div className="flex justify-center sm:justify-start pt-2 sm:pt-4">
                <Button
                  variant="black"
                  onClick={() => handleVisitWebsite(selectedProduct.website)}
                  className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-medium inline-flex items-center justify-center gap-2"
                  aria-label={`Visit ${selectedProduct.label} website`}>
                  View Site
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
