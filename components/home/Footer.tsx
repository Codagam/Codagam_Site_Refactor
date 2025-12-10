"use client";

import { ContactForm } from "@/components/shared/ContactForm";
import {
  Home,
  Info,
  Wrench,
  Grid3x3,
  User,
  MapPin,
  Phone,
  Mail,
  Flag,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as Flags from "country-flag-icons/react/3x2";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaGithub,
  FaWhatsapp,
  FaTelegram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// Type for country flag components
type FlagComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface FooterContent {
  id: string;
  title: string;
  description: string;
}

interface FooterOffice {
  id: string;
  country: string;
  countryCode: string | null;
  countryPosition: number;
  flagUrl: string | null; // Deprecated, kept for backward compatibility
  address: string;
  phone: string | null;
  email: string | null;
  position: number;
}

interface FooterSocialLink {
  id: string;
  platform: string;
  url: string;
  iconType: string;
  position: number;
}

// Get country flag component by country code
const getCountryFlag = (countryCode: string | null): FlagComponent | null => {
  if (!countryCode) return null;
  const code = countryCode.toUpperCase();
  return (Flags as Record<string, FlagComponent>)[code] || null;
};

// Get social media icon component by platform name
const getSocialIcon = (platform: string) => {
  const normalizedPlatform = platform.toLowerCase().trim();

  if (normalizedPlatform.includes("instagram")) {
    return FaInstagram;
  } else if (normalizedPlatform.includes("facebook")) {
    return FaFacebook;
  } else if (
    normalizedPlatform.includes("twitter") ||
    normalizedPlatform === "x"
  ) {
    return FaXTwitter;
  } else if (normalizedPlatform.includes("linkedin")) {
    return FaLinkedin;
  } else if (normalizedPlatform.includes("youtube")) {
    return FaYoutube;
  } else if (normalizedPlatform.includes("github")) {
    return FaGithub;
  } else if (normalizedPlatform.includes("whatsapp")) {
    return FaWhatsapp;
  } else if (normalizedPlatform.includes("telegram")) {
    return FaTelegram;
  }

  // Default fallback
  return null;
};

// Get social media icon background color by platform
const getSocialIconBg = (platform: string) => {
  const normalizedPlatform = platform.toLowerCase().trim();

  if (normalizedPlatform.includes("instagram")) {
    return "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500";
  } else if (normalizedPlatform.includes("facebook")) {
    return "bg-[#1877F2]";
  } else if (
    normalizedPlatform.includes("twitter") ||
    normalizedPlatform === "x"
  ) {
    return "bg-black";
  } else if (normalizedPlatform.includes("linkedin")) {
    return "bg-[#0077B5]";
  } else if (normalizedPlatform.includes("youtube")) {
    return "bg-[#FF0000]";
  } else if (normalizedPlatform.includes("github")) {
    return "bg-[#181717]";
  } else if (normalizedPlatform.includes("whatsapp")) {
    return "bg-[#25D366]";
  } else if (normalizedPlatform.includes("telegram")) {
    return "bg-[#0088cc]";
  }

  return "bg-gray-600";
};

export default function Footer() {
  const [footerContent, setFooterContent] = useState<FooterContent | null>(
    null
  );
  const [offices, setOffices] = useState<FooterOffice[]>([]);
  const [socialLinks, setSocialLinks] = useState<FooterSocialLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const [contentRes, officesRes, socialLinksRes] = await Promise.all([
          fetch("/api/footer/content"),
          fetch("/api/footer/offices"),
          fetch("/api/footer/social-links"),
        ]);

        if (contentRes.ok) {
          const content = await contentRes.json();
          setFooterContent(content);
        }

        if (officesRes.ok) {
          const officesData = await officesRes.json();
          setOffices(officesData);
        }

        if (socialLinksRes.ok) {
          const socialLinksData = await socialLinksRes.json();
          setSocialLinks(socialLinksData);
        }
      } catch (error) {
        console.error("Error fetching footer data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Format address - split by newlines if they exist, otherwise split by commas
  const formatAddress = (address: string) => {
    if (address.includes("\n")) {
      return address.split("\n").filter((line) => line.trim());
    }
    return address.split(",").map((line) => line.trim());
  };

  // Group offices by country
  const groupedOffices = offices.reduce((acc, office) => {
    if (!acc[office.country]) {
      acc[office.country] = {
        country: office.country,
        countryPosition: office.countryPosition,
        countryCode: office.countryCode,
        flagUrl: office.flagUrl, // Fallback for backward compatibility
        locations: [],
      };
    }
    acc[office.country].locations.push(office);
    return acc;
  }, {} as Record<string, { country: string; countryPosition: number; countryCode: string | null; flagUrl: string | null; locations: FooterOffice[] }>);

  // Sort countries by countryPosition, then sort locations within each country by position
  const sortedCountries = Object.values(groupedOffices)
    .sort((a, b) => a.countryPosition - b.countryPosition)
    .map((countryGroup) => ({
      ...countryGroup,
      locations: countryGroup.locations.sort((a, b) => a.position - b.position),
    }));

  return (
    <footer
      id="contact"
      className="bg-blue-900 text-white scroll-mt-[48px] min-[375px]:scroll-mt-[52px] sm:scroll-mt-[56px] lg:scroll-mt-[64px] xl:scroll-mt-[68px] w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-8 py-8 sm:py-10 md:py-12 w-full">
        {/* Contact Section Header */}
        <div className="mb-6 sm:mb-8 md:mb-10 text-center w-full">
          <h2 className="text-xl min-[375px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 md:mb-8 font-semibold wrap-break-word px-2 sm:px-0">
            {footerContent?.title || "Let's Build Something Great"}
          </h2>
          <p className="text-sm min-[375px]:text-base sm:text-lg md:text-xl max-w-2xl mx-auto opacity-90 px-2 sm:px-4 wrap-break-word">
            {footerContent?.description ||
              "Ready to transform your ideas into scalable products? Reach out to discuss your project."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 mb-8 w-full">
          {/* Company Info - Offices grouped by Country */}
          {sortedCountries.length > 0 ? (
            sortedCountries.map((countryGroup) => (
              <div
                key={countryGroup.country}
                className="text-center sm:text-left w-full max-w-full">
                <div className="mb-4 flex justify-center sm:justify-start">
                  <h2 className="text-white font-bold text-xl sm:text-2xl">
                    codagam
                  </h2>
                </div>
                <div className="space-y-3 text-sm sm:text-base">
                  <h4 className="font-semibold text-base sm:text-lg mb-3 flex items-center gap-2 justify-center sm:justify-start">
                    {(() => {
                      const FlagComponent = countryGroup.countryCode
                        ? getCountryFlag(countryGroup.countryCode)
                        : null;
                      if (FlagComponent) {
                        return (
                          <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center">
                            <FlagComponent className="w-full h-full object-contain" />
                          </div>
                        );
                      } else if (countryGroup.flagUrl) {
                        // Fallback to flagUrl if countryCode is not available
                        return (
                          <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0">
                            <img
                              src={countryGroup.flagUrl}
                              alt={`${countryGroup.country} flag`}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        );
                      }
                      return null;
                    })()}
                    {countryGroup.country}
                  </h4>
                  <div className="space-y-4 opacity-90">
                    {/* Show all addresses first */}
                    {countryGroup.locations.map((office, index) => (
                      <div key={office.id} className="space-y-2">
                        <div className="flex items-start gap-2 justify-center sm:justify-start">
                          <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                          <div className="text-center sm:text-left">
                            {formatAddress(office.address).map((line, idx) => (
                              <p key={idx}>{line}</p>
                            ))}
                          </div>
                        </div>
                        {/* Only show separator if not the last address */}
                        {index < countryGroup.locations.length - 1 && (
                          <div className="border-t border-blue-800 pt-2 mt-2"></div>
                        )}
                      </div>
                    ))}
                    
                    {/* Show phone and email from first location only, at the end */}
                    {countryGroup.locations.length > 0 && (
                      <>
                        {countryGroup.locations[0].phone && (
                          <div className="flex items-center gap-2 justify-center sm:justify-start pt-2">
                            <Phone className="w-4 h-4 shrink-0" />
                            <a
                              href={`tel:${countryGroup.locations[0].phone}`}
                              className="hover:text-blue-200 transition-colors">
                              {countryGroup.locations[0].phone}
                            </a>
                          </div>
                        )}
                        {countryGroup.locations[0].email && (
                          <div className="flex items-center gap-2 justify-center sm:justify-start">
                            <Mail className="w-4 h-4 shrink-0" />
                            <a
                              href={`mailto:${countryGroup.locations[0].email}`}
                              className="hover:text-blue-200 transition-colors">
                              {countryGroup.locations[0].email}
                            </a>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center sm:text-left w-full max-w-full">
              <div className="mb-4 flex justify-center sm:justify-start">
                <h2 className="text-white font-bold text-xl sm:text-2xl">
                  codagam
                </h2>
              </div>
              <div className="space-y-3 text-sm sm:text-base">
                <h4 className="font-semibold text-base sm:text-lg mb-3 flex items-center gap-2 justify-center sm:justify-start">
                  {(() => {
                    const IndiaFlag = Flags.IN;
                    return (
                      <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center">
                        <IndiaFlag
                          className="w-full h-full object-contain"
                          title="India"
                        />
                      </div>
                    );
                  })()}
                  India Office
                </h4>
                <div className="space-y-2 opacity-90">
                  <div className="flex items-start gap-2 justify-center sm:justify-start">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                    <div className="text-center sm:text-left">
                      <p>363/2, Rukmani Nagar,</p>
                      <p>Nagarpalaya Rd,</p>
                      <p>Gobichettipalayam,</p>
                      <p>Tamil Nadu, India, 638452</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <Phone className="w-4 h-4 shrink-0" />
                    <a
                      href="tel:+917598454546"
                      className="hover:text-blue-200 transition-colors">
                      +91 75984 54546
                    </a>
                  </div>
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <Mail className="w-4 h-4 shrink-0" />
                    <a
                      href="mailto:Support@codagam.com"
                      className="hover:text-blue-200 transition-colors">
                      Support@codagam.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Links */}
          <div className="text-center sm:text-left w-full max-w-full">
            <h3 className="font-semibold text-base sm:text-lg mb-4 flex items-center gap-2 justify-center sm:justify-start">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("services");
                  }}
                  className="flex items-center gap-2 text-sm sm:text-base hover:text-blue-200 transition-colors justify-center sm:justify-start">
                  <Wrench className="w-4 h-4" />
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("products");
                  }}
                  className="flex items-center gap-2 text-sm sm:text-base hover:text-blue-200 transition-colors justify-center sm:justify-start">
                  <Grid3x3 className="w-4 h-4" />
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#stack"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("stack");
                  }}
                  className="flex items-center gap-2 text-sm sm:text-base hover:text-blue-200 transition-colors justify-center sm:justify-start">
                  <Info className="w-4 h-4" />
                  Tech Stack
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="text-center sm:text-left w-full max-w-full">
            <h3 className="font-semibold text-base sm:text-lg mb-4">
              Follow Us
            </h3>
            <div className="flex gap-4 justify-center sm:justify-start">
              {socialLinks.length > 0 ? (
                socialLinks.map((link) => {
                  const IconComponent = getSocialIcon(link.platform);
                  const bgClass = getSocialIconBg(link.platform);

                  if (!IconComponent) {
                    return null;
                  }

                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-full ${bgClass} flex items-center justify-center hover:opacity-90 transition-opacity`}
                      aria-label={link.platform}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </a>
                  );
                })
              ) : (
                <>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-linear-to-br from-purple-600 via-pink-500 to-orange-500 flex items-center justify-center hover:opacity-90 transition-opacity"
                    aria-label="Instagram">
                    <FaInstagram className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center hover:opacity-90 transition-opacity"
                    aria-label="Facebook">
                    <FaFacebook className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:opacity-90 transition-opacity"
                    aria-label="X (Twitter)">
                    <FaXTwitter className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#0077B5] flex items-center justify-center hover:opacity-90 transition-opacity"
                    aria-label="LinkedIn">
                    <FaLinkedin className="w-5 h-5 text-white" />
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Get in Touch - Contact Form */}
          <div className="text-center sm:text-left w-full max-w-full">
            <h3 className="font-semibold text-base sm:text-lg mb-2">
              Get in Touch
            </h3>
            <ContactForm
              asDialog={false}
              showTitle={false}
              className="text-white"
            />
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-blue-800 py-2 w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-8 w-full">
          <div className="flex items-center justify-center sm:justify-between">
            <p className="text-xs sm:text-sm text-center flex-1 mx-4">
              © 2025 Codagam Software Labs Private Limited. All rights reserved.
            </p>
            <div className="hidden sm:block w-8 h-8"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
