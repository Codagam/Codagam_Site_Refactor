"use client";

import Image from "next/image";
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
} from "lucide-react";
import Link from "next/link";

// Social Media Icons with original brand colors
const InstagramIcon = () => (
  <svg
    className="w-5 h-5 text-white"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    className="w-5 h-5 text-white"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const XTwitterIcon = () => (
  <svg
    className="w-5 h-5 text-white"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    className="w-5 h-5 text-white"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer
      id="contact"
      className="bg-blue-900 text-white scroll-mt-[60px] sm:scroll-mt-[70px] w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-8 py-8 sm:py-10 md:py-12 w-full">
        {/* Contact Section Header */}
        <div className="mb-6 sm:mb-8 md:mb-10 text-center w-full">
          <h2 className="text-2xl min-[375px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 md:mb-8 font-semibold wrap-break-word px-2 sm:px-0">
            Let&apos;s Build Something Great
          </h2>
          <p className="text-sm min-[375px]:text-base sm:text-lg md:text-xl max-w-2xl mx-auto opacity-90 px-2 sm:px-4 wrap-break-word">
            Ready to transform your ideas into scalable products? Reach out to
            discuss your project.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 mb-8 w-full">
          {/* Company Info */}
          <div className="text-center sm:text-left w-full max-w-full">
            <div className="mb-4 flex justify-center sm:justify-start">
              <Image
                src="/images/og-image.jpg"
                alt="Codagam Logo"
                width={200}
                height={100}
                className="w-auto h-auto max-w-full"
              />
            </div>
            <div className="space-y-3 text-sm sm:text-base">
              <h4 className="font-semibold text-base sm:text-lg mb-3">
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
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("contact");
                  }}
                  className="flex items-center gap-2 text-sm sm:text-base hover:text-blue-200 transition-colors justify-center sm:justify-start">
                  <User className="w-4 h-4" />
                  Contact
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
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-linear-to-br from-purple-600 via-pink-500 to-orange-500 flex items-center justify-center hover:opacity-90 transition-opacity"
                aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center hover:opacity-90 transition-opacity"
                aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:opacity-90 transition-opacity"
                aria-label="X (Twitter)">
                <XTwitterIcon />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#0077B5] flex items-center justify-center hover:opacity-90 transition-opacity"
                aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
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
