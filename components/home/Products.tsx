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
  CardContent,
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
              (product: any) =>
                product?.id && product?.headline && product?.imageUrl
            )
            .map((product: any) => {
              return {
                id: product.id,
                headline: product.headline,
                description: product.description,
                details: product.details,
                image: product.imageUrl,
                website: product.website,
                backgroundImage: product.backgroundImageUrl,
              };
            });
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
        className="py-6 sm:py-8 md:py-10 lg:py-12 bg-white scroll-mt-[48px] min-[375px]:scroll-mt-[52px] sm:scroll-mt-[56px] lg:scroll-mt-[64px] xl:scroll-mt-[68px] w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-3 min-[375px]:px-4 sm:px-5 md:px-6 lg:px-8 w-full">
          <h2 className="text-xl min-[375px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 md:mb-8 text-center font-semibold text-blue-900  wrap-break-word px-2 sm:px-0">
            Our Products
          </h2>
        </div>
        {loading ? (
          <div className="text-center py-8">
            <p className="text-black">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-black">No products available.</p>
          </div>
        ) : (
          <div className="relative w-full max-w-7xl mx-auto px-3 min-[375px]:px-4 sm:px-5 md:px-6 lg:px-8">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[autoplayPlugin]}
              className="w-full">
              <CarouselContent className="ml-0 w-full -mr-3 min-[375px]:-mr-4 sm:-mr-5 md:-mr-6 lg:-mr-8">
                {products.map((product) => {
                  const backgroundImage =
                    product.backgroundImage || "/images/office1.jpg";
                  return (
                    <CarouselItem
                      key={product.id}
                      className="pl-0 pr-3 min-[375px]:pr-4 sm:pr-5 md:pr-6 lg:pr-8 xl:pr-8 basis-full sm:basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/3 2xl:basis-1/4">
                      <Card
                        className="group h-[320px] sm:h-[360px] md:h-[380px] lg:h-[400px] w-full overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer flex flex-col border-0"
                        onClick={() => handleCardClick(product)}>
                        {/* Background Image Section with Logo Overlay */}
                        <div className="relative h-[140px] sm:h-[160px] md:h-[180px] lg:h-[200px] overflow-hidden">
                          {/* Background Image */}
                          <Image
                            src={backgroundImage}
                            alt={`${product.headline} background`}
                            fill
                            className="object-cover transition-all duration-300"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1536px) 25vw, 25vw"
                            priority={false}
                          />
                          {/* Gradient overlay for better logo visibility */}
                          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 transition-opacity duration-300 group-hover:opacity-90"></div>
                          {/* Logo Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-12 h-12 min-[375px]:w-14 min-[375px]:h-14 sm:w-16 sm:h-16 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden bg-white/10 backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
                              <Image
                                src={product.image}
                                alt={product.headline}
                                fill
                                className="object-contain drop-shadow-2xl rounded-full"
                                sizes="(max-width: 375px) 48px, (max-width: 640px) 56px, (max-width: 768px) 64px, (max-width: 1024px) 64px, (max-width: 1280px) 80px, 80px"
                              />
                            </div>
                          </div>
                        </div>
                        {/* Text Card Content */}
                        <CardHeader className="p-3 sm:p-4 flex-1 flex flex-col min-h-0">
                          <CardTitle className="text-sm sm:text-base md:text-base lg:text-lg font-bold mb-1 sm:mb-1.5 transition-colors duration-300 group-hover:text-black text-black line-clamp-2 leading-tight p-0">
                            {product.headline}
                          </CardTitle>
                          <CardDescription className="text-[10px] min-[375px]:text-xs sm:text-xs md:text-xs lg:text-sm leading-tight line-clamp-3 overflow-hidden m-0 flex-1 text-black font-normal p-0">
                            {product.description}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex absolute left-2 sm:-left-4 md:-left-12 lg:-left-12 xl:-left-12 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white" />
              <CarouselNext className="hidden sm:flex absolute right-2 sm:-right-4 md:-right-12 lg:-right-12 xl:-right-12 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white" />
            </Carousel>
          </div>
        )}
      </section>

      {/* Product Details Dialog */}
      {selectedProduct && (
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
          <DialogContent className="max-w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl max-h-[90vh] overflow-y-auto w-full">
            <DialogHeader className="space-y-2 sm:space-y-3">
              {/* Product Logo and Heading */}
              <div className="flex flex-col items-center gap-2 sm:gap-3 w-full">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.headline}
                    fill
                    className="object-contain rounded-full"
                    sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                  />
                </div>
                <DialogTitle className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold leading-tight text-center wrap-break-word px-2 text-black">
                  {selectedProduct.headline}
                </DialogTitle>
              </div>
            </DialogHeader>
            <div className="space-y-4 sm:space-y-5 md:space-y-6 mt-3 sm:mt-4 md:mt-5 w-full max-w-full">
              {/* Product Details */}
              <p className="text-black leading-relaxed text-sm sm:text-base md:text-base wrap-break-word">
                {selectedProduct.details}
              </p>
              {/* View Site Button */}
              <div className="flex justify-center sm:justify-start pt-2 sm:pt-3">
                <Button
                  variant="black"
                  onClick={() => handleVisitWebsite(selectedProduct.website)}
                  className="w-full sm:w-auto px-5 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-sm font-medium inline-flex items-center justify-center gap-2"
                  aria-label={`Visit ${selectedProduct.headline} website`}>
                  View Site
                  <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
