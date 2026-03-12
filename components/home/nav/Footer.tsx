"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Info,
  Wrench,
  Grid3x3,
  MapPin,
  Phone,
  Mail,
  Users,
  Briefcase,
} from "lucide-react";
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
import FooterCallToAction from "./FooterCallToAction";

// Types
type FlagComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

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
  { id: "about", label: "About", icon: Users, color: "text-white" },
  { id: "services", label: "Services", icon: Wrench, color: "text-white" },
  { id: "work", label: "Work", icon: Briefcase, color: "text-white" },
  { id: "stack", label: "Tech Stack", icon: Info, color: "text-white" },
] as const;

const PRODUCT_LINKS = [
  {
    id: "gobitoday",
    label: "GobiToday",
    url: "https://gobitoday.com/",
    logo: "/images/gobitoday.png",
  },
  {
    id: "welbuk",
    label: "Welbuk",
    url: "https://welbuk.com",
    logo: "/images/welbuk.png",
  },
  {
    id: "wrapper-biz",
    label: "Wrapper Biz",
    url: "https://wrapper_biz.com",
    logo: "/images/wrapper.png",
  },
  {
    id: "surveymachi",
    label: "SurveyMachi",
    url: "https://surveymachi.com",
    logo: "/images/surveymachi.jpg",
  },
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
  return key ? SOCIAL_BG_COLORS[key] : "bg-muted-foreground";
};

const formatAddress = (address: string): string[] => {
  return address.includes("\n")
    ? address.split("\n").filter((line) => line.trim())
    : address.split(",").map((line) => line.trim());
};

const formatPhoneNumber = (phone: string): string => {
  // Format Indian phone numbers: +91 75984 54546
  if (phone.startsWith("+91")) {
    const cleaned = phone.replace(/\s+/g, ""); // Remove all spaces
    if (cleaned.length === 13) {
      // +91XXXXXXXXXX
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 8)} ${cleaned.slice(8)}`;
    }
  }
  return phone; // Return as-is if not matching expected format
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
        <div className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center">
          {React.createElement(FlagComponent, {
            className: "w-full h-full object-contain",
          })}
        </div>
      );
    }
  }

  if (flagUrl) {
    return (
      <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0">
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
    <div className="space-y-2.5 sm:space-y-3 opacity-90">
      {locations.map((office, index) => (
        <div key={office.id} className="space-y-1.5">
          <div className="flex items-start gap-1.5 sm:gap-2 justify-start">
            <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 mt-0.5 shrink-0 text-white" />
            <div className="text-left text-[10px] sm:text-xs md:text-sm font-normal wrap-break-word leading-relaxed">
              {formatAddress(office.address).map((line, idx) => (
                <p
                  key={idx}
                  className="font-normal wrap-break-word leading-relaxed mb-0.5">
                  {line}
                </p>
              ))}
            </div>
          </div>
          {index < locations.length - 1 && (
            <div className="border-t border-primary-hover pt-2 mt-2" />
          )}
        </div>
      ))}

      {firstLocation && (
        <>
          {firstLocation.phone && (
            <div className="flex items-center gap-1.5 sm:gap-2 justify-start pt-1.5">
              <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 text-white" />
              <a
                href={`tel:${firstLocation.phone}`}
                className="hover:text-primary-light transition-colors text-[10px] sm:text-xs md:text-sm font-normal wrap-break-word">
                {formatPhoneNumber(firstLocation.phone)}
              </a>
            </div>
          )}
          {firstLocation.email && (
            <div className="flex items-center gap-1.5 sm:gap-2 justify-start pt-1">
              <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 text-white" />
              <a
                href={`mailto:${firstLocation.email}`}
                className="hover:text-primary-light transition-colors text-[10px] sm:text-xs md:text-sm break-all font-normal wrap-break-word">
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
      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full ${bgClass} flex items-center justify-center hover:opacity-90 transition-opacity`}
      aria-label={link.platform}>
      {React.createElement(IconComponent, {
        className: "w-4 h-4 sm:w-5 sm:h-5 text-white",
      })}
    </a>
  );
};

const DefaultSocialIcons = () => (
  <>
    <a
      href="https://instagram.com"
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-linear-to-br from-purple-600 via-pink-500 to-orange-500 flex items-center justify-center hover:opacity-90 transition-opacity"
      aria-label="Instagram">
      <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
    </a>
    <a
      href="https://facebook.com"
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1877F2] flex items-center justify-center hover:opacity-90 transition-opacity"
      aria-label="Facebook">
      <FaFacebook className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
    </a>
    <a
      href="https://x.com"
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black flex items-center justify-center hover:opacity-90 transition-opacity"
      aria-label="X (Twitter)">
      <FaXTwitter className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
    </a>
    <a
      href="https://linkedin.com"
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0077B5] flex items-center justify-center hover:opacity-90 transition-opacity"
      aria-label="LinkedIn">
      <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
    </a>
  </>
);

const COUNTRY_SWITCH_INTERVAL = 5000; // 5 seconds

export default function Footer() {
  const [mounted, setMounted] = useState(false);
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
        const [officesRes, socialLinksRes] = await Promise.all([
          fetch("/api/footer/offices"),
          fetch("/api/footer/social-links"),
        ]);

        if (officesRes.ok) setOffices(await officesRes.json());
        if (socialLinksRes.ok) setSocialLinks(await socialLinksRes.json());
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };

    fetchFooterData();
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight =
        window.innerWidth >= 1280
          ? 60
          : window.innerWidth >= 1024
            ? 56
            : window.innerWidth >= 640
              ? 52
              : 44;
      const gapBelowNav = 4;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight - gapBelowNav;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });
    }
  }, []);

  const pathname = usePathname();
  const isHomePage = pathname === "/" || pathname?.startsWith("/#");

  // Group addresses by country
  const sortedCountries = useMemo(() => {
    const grouped = offices.reduce(
      (acc, office) => {
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
      },
      {} as Record<string, CountryGroup>,
    );

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

  return (
    <footer
      id="contact"
      className="font-sans bg-(--bg-deep) text-primary-foreground scroll-mt-12 sm:scroll-mt-14 md:scroll-mt-16 lg:scroll-mt-16 w-full overflow-x-hidden">
      <div className="mx-auto w-full min-w-0 px-4 sm:px-5 md:px-6 lg:px-[4vw] xl:px-[6vw] 2xl:px-[8vw] py-4 sm:py-5 md:py-6 lg:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-3 sm:mb-4 md:mb-5 lg:mb-6 w-full min-w-0 items-start">
          {/* Company Info - Countries cycling, showing all addresses per country */}
          {mounted && sortedCountries.length > 0 ? (
            <div className="text-left w-full sm:order-1 md:order-1 lg:order-1">
              <div className="mb-2 sm:mb-3 md:mb-4 lg:mb-4 xl:mb-4 flex justify-start">
                <h2 className="text-white font-bold text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg wrap-break-word">
                  Codagam
                </h2>
              </div>
              <div
                className={`space-y-1 text-[10px] sm:text-xs md:text-sm transition-opacity duration-500 ease-in-out wrap-break-word ${
                  isTransitioning ? "opacity-0" : "opacity-100"
                }`}>
                {sortedCountries[currentCountryIndex] && (
                  <>
                    <h4 className="font-bold text-[10px] sm:text-xs md:text-sm mb-1 sm:mb-1.5 flex items-center gap-1.5 justify-start">
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
            <div className="text-left w-full sm:order-1 md:order-1 lg:order-1">
              <div className="mb-2 sm:mb-3 md:mb-4 lg:mb-4 xl:mb-4 flex justify-start">
                <h2 className="text-white font-bold text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg wrap-break-word">
                  Codagam
                </h2>
              </div>
              <div className="space-y-1 text-[10px] sm:text-xs md:text-sm wrap-break-word">
                <h4 className="font-bold text-[10px] sm:text-xs md:text-sm mb-1 sm:mb-1.5 flex items-center gap-1.5 justify-start">
                  <CountryFlag
                    countryCode="IN"
                    flagUrl={null}
                    country="India"
                  />
                  India Office
                </h4>
                <div className="space-y-2.5 sm:space-y-3 opacity-90">
                  <div className="flex items-start gap-1.5 sm:gap-2 justify-start">
                    <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 mt-0.5 shrink-0 text-white" />
                    <div
                      className="text-left text-[10px] sm:text-xs md:text-sm font-normal wrap-break-word leading-relaxed"
                      style={{ fontWeight: 400 }}>
                      <p
                        className="font-normal wrap-break-word mb-0.5"
                        style={{ fontWeight: 400 }}>
                        45J, Rukmani Illa,
                      </p>
                      <p
                        className="font-normal wrap-break-word mb-0.5"
                        style={{ fontWeight: 400 }}>
                        Ramnagar 3rd cross St,
                      </p>
                      <p
                        className="font-normal wrap-break-word mb-0.5"
                        style={{ fontWeight: 400 }}>
                        Gobichettipalayam - 638452,
                      </p>
                      <p
                        className="font-normal wrap-break-word"
                        style={{ fontWeight: 400 }}>
                        Tamilnadu, India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-1.5 sm:gap-2 justify-start">
                    <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 mt-0.5 shrink-0 text-white" />
                    <div
                      className="text-left text-[10px] sm:text-xs md:text-sm font-normal wrap-break-word leading-relaxed"
                      style={{ fontWeight: 400 }}>
                      <p
                        className="font-normal wrap-break-word mb-0.5"
                        style={{ fontWeight: 400 }}>
                        363/2, Rukmani Nagar,
                      </p>
                      <p
                        className="font-normal wrap-break-word mb-0.5"
                        style={{ fontWeight: 400 }}>
                        Nagarpalayam Rd,
                      </p>
                      <p
                        className="font-normal wrap-break-word mb-0.5"
                        style={{ fontWeight: 400 }}>
                        Gobichettipalayam - 638452,
                      </p>
                      <p
                        className="font-normal wrap-break-word"
                        style={{ fontWeight: 400 }}>
                        Tamilnadu, India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 justify-start pt-1">
                    <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 text-white" />
                    <a
                      href="tel:+917598454546"
                      className="hover:text-primary-light transition-colors text-[10px] sm:text-xs md:text-sm font-normal"
                      style={{ fontWeight: 400 }}>
                      {formatPhoneNumber("+917598454546")}
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 justify-start pt-0.5">
                    <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 text-white" />
                    <a
                      href="mailto:support@codagam.com"
                      className="hover:text-primary-light transition-colors text-[10px] sm:text-xs md:text-sm break-all font-normal"
                      style={{ fontWeight: 400 }}>
                      support@codagam.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Links */}
          <div className="text-left w-full sm:order-3 md:order-3 lg:order-2">
            <h3 className="font-bold text-[10px] sm:text-xs md:text-sm lg:text-base mb-2 sm:mb-3 md:mb-4 lg:mb-4 xl:mb-4 flex items-center gap-2 justify-start wrap-break-word">
              Quick Links
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 md:space-y-2.5 lg:space-y-3 w-full">
              {QUICK_LINKS.map(({ id, label, icon: Icon, color }) => (
                <li key={id}>
                  {isHomePage ? (
                    <a
                      href={`#${id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(id);
                      }}
                      className="flex items-center gap-1.5 sm:gap-2 md:gap-2 text-[10px] sm:text-xs md:text-sm hover:text-primary-light transition-colors justify-start font-normal not-italic wrap-break-word max-w-full"
                      style={{ fontWeight: 400 }}
                    >
                      <Icon
                        className={`w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 ${color} shrink-0`}
                      />
                      <span
                        className="font-normal wrap-break-word"
                        style={{ fontWeight: 400 }}>
                        {label}
                      </span>
                    </a>
                  ) : (
                    <Link
                      href={`/#${id}`}
                      className="flex items-center gap-1.5 sm:gap-2 md:gap-2 text-[10px] sm:text-xs md:text-sm hover:text-primary-light transition-colors justify-start font-normal not-italic wrap-break-word max-w-full"
                      style={{ fontWeight: 400 }}
                    >
                      <Icon
                        className={`w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 ${color} shrink-0`}
                      />
                      <span
                        className="font-normal wrap-break-word"
                        style={{ fontWeight: 400 }}>
                        {label}
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Products - production app URLs */}
            <h3 className="font-bold text-[10px] sm:text-xs md:text-sm lg:text-base mb-3 sm:mb-4 md:mb-4 lg:mb-5 mt-6 sm:mt-8 md:mt-10 lg:mt-12 flex items-center gap-2 justify-start wrap-break-word">
              Products
            </h3>
            <ul className="space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-4 w-full">
              {PRODUCT_LINKS.map(({ id, label, url, logo }) => (
                <li key={id}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 sm:gap-2 md:gap-2 text-[10px] sm:text-xs md:text-sm hover:text-primary-light transition-colors justify-start font-normal not-italic wrap-break-word max-w-full"
                    style={{ fontWeight: 400 }}>
                    {logo ? (
                      <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 relative shrink-0">
                        <Image
                          src={logo}
                          alt={`${label} logo`}
                          fill
                          className="object-contain"
                          sizes="(max-width: 640px) 16px, (max-width: 768px) 20px, 24px"
                        />
                      </div>
                    ) : (
                      <Grid3x3 className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white shrink-0" />
                    )}
                    <span
                      className="font-normal wrap-break-word"
                      style={{ fontWeight: 400 }}>
                      {label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div className="text-left w-full sm:order-4 md:order-4 lg:order-3">
            <h3 className="font-bold text-[10px] sm:text-xs md:text-sm lg:text-base mb-2 sm:mb-3 md:mb-4 lg:mb-4 xl:mb-4 wrap-break-word">
              Follow Us
            </h3>
            <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-4 lg:gap-4 xl:gap-5 justify-start w-full">
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
          <div className="text-left w-full sm:order-2 md:order-2 lg:order-4 sm:col-span-2 md:col-span-1 lg:col-span-1">
            <h3 className="font-bold text-[10px] sm:text-xs md:text-sm lg:text-base mb-2 sm:mb-3 md:mb-4 lg:mb-4 xl:mb-4 wrap-break-word">
              Get in Touch
            </h3>
            <div className="w-full">
              <ContactForm
                asDialog={false}
                showTitle={false}
                className="text-white"
                submitButtonClassName="bg-blue-100 hover:bg-white text-gray-900"
                fieldClassName="bg-blue-100 text-gray-900 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section Header - Moved to bottom */}
      <FooterCallToAction />

      {/* Bottom Copyright Bar */}
      <div className="border-t border-white py-2 sm:py-2.5 md:py-3 w-full min-w-0">
        <div className="mx-auto w-full min-w-0 px-4 sm:px-5 md:px-6 lg:px-[4vw] xl:px-[6vw] 2xl:px-[8vw]">
          <div className="flex items-center justify-center sm:justify-between">
            <p
              className="text-[0.55rem] sm:text-[0.6rem] md:text-xs lg:text-xs text-center flex-1 font-normal"
              style={{ fontWeight: 400 }}>
              © 2025 Codagam Software Labs Private Limited. All rights reserved.
            </p>
            <div className="hidden sm:block w-8 h-8" />
          </div>
        </div>
      </div>
    </footer>
  );
}
