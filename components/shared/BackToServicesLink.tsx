"use client";

import { useRouter } from "next/navigation";

const SERVICES_HREF = "/home#services";

export default function BackToServicesLink() {
  const router = useRouter();

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (typeof window !== "undefined" && window.history.length > 1) {
      e.preventDefault();
      router.back();
    }
  }

  return (
    <a
      href={SERVICES_HREF}
      onClick={handleClick}
      className="mt-6 inline-block text-[.9rem] text-[var(--acc2)] hover:text-[var(--acc3)] transition-colors"
      aria-label="Back to all services">
      ← All services
    </a>
  );
}
