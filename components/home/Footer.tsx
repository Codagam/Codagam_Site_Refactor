"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Info, Wrench, Grid3x3, MapPin, Phone, Mail } from "lucide-react";
import * as Flags from "country-flag-icons/react/3x2";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaGithub,
  FaWhatsapp,
  FaTelegram,
  FaDribbble,
  FaBehance,
  FaPinterest,
  FaTiktok,
  FaSnapchat,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ContactForm } from "@/components/shared/ContactForm";

// Types
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
  flagUrl: string | null;
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

interface CountryGroup {
  country: string;
  countryPosition: number;
  countryCode: string | null;
  flagUrl: string | null;
  locations: FooterOffice[];
}

// Constants
const SOCIAL_ICON_MAP: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  instagram: FaInstagram,
  facebook: FaFacebook,
  twitter: FaXTwitter,
  x: FaXTwitter,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  github: FaGithub,
  whatsapp: FaWhatsapp,
  telegram: FaTelegram,
  dribbble: FaDribbble,
  behance: FaBehance,
  pinterest: FaPinterest,
  tiktok: FaTiktok,
  snapchat: FaSnapchat,
};

const SOCIAL_BG_COLORS: Record<string, string> = {
  instagram: "bg-linear-to-br from-purple-600 via-pink-500 to-orange-500",
  facebook: "bg-[#1877F2]",
  twitter: "bg-black",
  x: "bg-black",
  linkedin: "bg-[#0077B5]",
  youtube: "bg-[#FF0000]",
  github: "bg-[#181717]",
  whatsapp: "bg-[#25D366]",
  telegram: "bg-[#0088cc]",
  dribbble: "bg-[#EA4C89]",
  behance: "bg-[#1769FF]",
  pinterest: "bg-[#BD081C]",
  tiktok: "bg-[#000000]",
  snapchat: "bg-[#FFFC00]",
};

const QUICK_LINKS = [
  { id: "services", label: "Services", icon: Wrench },
  { id: "products", label: "Products", icon: Grid3x3 },
  { id: "stack", label: "Tech Stack", icon: Info },
] as const;

// Helper functions
const getCountryFlag = (countryCode: string | null): FlagComponent | null => {
  if (!countryCode) return null;
  return (
    (Flags as Record<string, FlagComponent>)[countryCode.toUpperCase()] || null
  );
};

const getSocialIcon = (platform: string) => {
  const normalized = platform.toLowerCase().trim();
  const key = Object.keys(SOCIAL_ICON_MAP).find((k) => normalized.includes(k));
  return key ? SOCIAL_ICON_MAP[key] : null;
};

const getSocialIconBg = (platform: string): string => {
  const normalized = platform.toLowerCase().trim();
  const key = Object.keys(SOCIAL_BG_COLORS).find((k) => normalized.includes(k));
  return key ? SOCIAL_BG_COLORS[key] : "bg-gray-600";
};

const formatAddress = (address: string): string[] => {
  return address.includes("\n")
    ? address.split("\n").filter((line) => line.trim())
    : address.split(",").map((line) => line.trim());
};

// Sub-components
const CountryFlag = ({
  countryCode,
  flagUrl,
  country,
}: {
  countryCode: string | null;
  flagUrl: string | null;
  country: string;
}) => {
  if (countryCode) {
    const FlagComponent = getCountryFlag(countryCode);
    if (FlagComponent) {
      return (
        <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center">
          {React.createElement(FlagComponent, {
            className: "w-full h-full object-contain",
          })}
        </div>
      );
    }
  }

  if (flagUrl) {
    return (
      <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={flagUrl}
          alt={`${country} flag`}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  return null;
};

const OfficeAddresses = ({ locations }: { locations: FooterOffice[] }) => {
  const firstLocation = locations[0];

  return (
    <div className="space-y-4 opacity-90">
      {locations.map((office, index) => (
        <div key={office.id} className="space-y-2">
          <div className="flex items-start gap-2 justify-center sm:justify-start">
            <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
            <div className="text-center sm:text-left">
              {formatAddress(office.address).map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>
          {index < locations.length - 1 && (
            <div className="border-t border-blue-800 pt-2 mt-2" />
          )}
        </div>
      ))}

      {firstLocation && (
        <>
          {firstLocation.phone && (
            <div className="flex items-center gap-2 justify-center sm:justify-start pt-2">
              <Phone className="w-4 h-4 shrink-0" />
              <a
                href={`tel:${firstLocation.phone}`}
                className="hover:text-blue-200 transition-colors">
                {firstLocation.phone}
              </a>
            </div>
          )}
          {firstLocation.email && (
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Mail className="w-4 h-4 shrink-0" />
              <a
                href={`mailto:${firstLocation.email}`}
                className="hover:text-blue-200 transition-colors">
                {firstLocation.email}
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const SocialIconLink = ({ link }: { link: FooterSocialLink }) => {
  const IconComponent = getSocialIcon(link.platform);
  if (!IconComponent) return null;

  const bgClass = getSocialIconBg(link.platform);

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-10 h-10 rounded-full ${bgClass} flex items-center justify-center hover:opacity-90 transition-opacity`}
      aria-label={link.platform}>
      {React.createElement(IconComponent, { className: "w-5 h-5 text-white" })}
    </a>
  );
};

const DefaultSocialIcons = () => (
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
);

const COUNTRY_SWITCH_INTERVAL = 5000; // 5 seconds

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const [footerContent, setFooterContent] = useState<FooterContent | null>(
    null
  );
  const [offices, setOffices] = useState<FooterOffice[]>([]);
  const [socialLinks, setSocialLinks] = useState<FooterSocialLink[]>([]);
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const [contentRes, officesRes, socialLinksRes] = await Promise.all([
          fetch("/api/footer/content"),
          fetch("/api/footer/offices"),
          fetch("/api/footer/social-links"),
        ]);

        if (contentRes.ok) setFooterContent(await contentRes.json());
        if (officesRes.ok) setOffices(await officesRes.json());
        if (socialLinksRes.ok) setSocialLinks(await socialLinksRes.json());
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };

    fetchFooterData();
  }, []);

  const scrollToSection = useCallback((id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Group addresses by country
  const sortedCountries = useMemo(() => {
    const grouped = offices.reduce((acc, office) => {
      if (!acc[office.country]) {
        acc[office.country] = {
          country: office.country,
          countryPosition: office.countryPosition,
          countryCode: office.countryCode,
          flagUrl: office.flagUrl,
          locations: [],
        };
      }
      acc[office.country].locations.push(office);
      return acc;
    }, {} as Record<string, CountryGroup>);

    return Object.values(grouped)
      .sort((a, b) => a.countryPosition - b.countryPosition)
      .map((group) => ({
        ...group,
        locations: group.locations.sort((a, b) => a.position - b.position),
      }));
  }, [offices]);

  // Auto-switch between countries
  useEffect(() => {
    if (!mounted || sortedCountries.length <= 1) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentCountryIndex((prev) => (prev + 1) % sortedCountries.length);
        setIsTransitioning(false);
      }, 300); // Half of transition duration
    }, COUNTRY_SWITCH_INTERVAL);

    return () => clearInterval(timer);
  }, [mounted, sortedCountries.length]);

  const defaultContent = {
    title: "Let's Build Something Great",
    description:
      "Ready to transform your ideas into scalable products? Reach out to discuss your project.",
  };

  return (
    <footer
      id="contact"
      className="bg-blue-900 text-white scroll-mt-[48px] min-[375px]:scroll-mt-[52px] sm:scroll-mt-[56px] lg:scroll-mt-[64px] xl:scroll-mt-[68px] w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-8 py-8 sm:py-10 md:py-12 w-full">
        {/* Contact Section Header */}
        <div className="mb-6 sm:mb-8 md:mb-10 text-center w-full">
          <h2 className="text-3xl mb-4 sm:mb-6 md:mb-8 font-bold wrap-break-word px-2 sm:px-0">
            {footerContent?.title || defaultContent.title}
          </h2>
          <p className="text-sm min-[375px]:text-base sm:text-lg md:text-xl max-w-2xl mx-auto opacity-90 px-2 sm:px-4 wrap-break-word">
            {footerContent?.description || defaultContent.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 mb-8 w-full">
          {/* Company Info - Countries cycling, showing all addresses per country */}
          {mounted && sortedCountries.length > 0 ? (
            <div className="text-center sm:text-left w-full max-w-full">
              <div className="mb-4 flex justify-center sm:justify-start">
                <h2 className="text-white font-bold text-xl sm:text-2xl">
                  codagam
                </h2>
              </div>
              <div
                className={`space-y-3 text-sm sm:text-base transition-opacity duration-500 ease-in-out ${
                  isTransitioning ? "opacity-0" : "opacity-100"
                }`}>
                {sortedCountries[currentCountryIndex] && (
                  <>
                    <h4 className="font-semibold text-base sm:text-lg mb-3 flex items-center gap-2 justify-center sm:justify-start">
                      <CountryFlag
                        countryCode={
                          sortedCountries[currentCountryIndex].countryCode
                        }
                        flagUrl={sortedCountries[currentCountryIndex].flagUrl}
                        country={sortedCountries[currentCountryIndex].country}
                      />
                      {sortedCountries[currentCountryIndex].country}
                    </h4>
                    <OfficeAddresses
                      locations={sortedCountries[currentCountryIndex].locations}
                    />
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center sm:text-left w-full max-w-full">
              <div className="mb-4 flex justify-center sm:justify-start">
                <h2 className="text-white font-bold text-xl sm:text-2xl">
                  codagam
                </h2>
              </div>
              <div className="space-y-3 text-sm sm:text-base">
                <h4 className="font-semibold text-base sm:text-lg mb-3 flex items-center gap-2 justify-center sm:justify-start">
                  <CountryFlag
                    countryCode="IN"
                    flagUrl={null}
                    country="India"
                  />
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
              {QUICK_LINKS.map(({ id, label, icon: Icon }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(id);
                    }}
                    className="flex items-center gap-2 text-sm sm:text-base hover:text-blue-200 transition-colors justify-center sm:justify-start">
                    <Icon className="w-4 h-4" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div className="text-center sm:text-left w-full max-w-full">
            <h3 className="font-semibold text-base sm:text-lg mb-4">
              Follow Us
            </h3>
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center sm:justify-start">
              {socialLinks.length > 0 ? (
                socialLinks.map((link) => (
                  <SocialIconLink key={link.id} link={link} />
                ))
              ) : (
                <DefaultSocialIcons />
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
            <div className="hidden sm:block w-8 h-8" />
          </div>
        </div>
      </div>
    </footer>
  );
}
