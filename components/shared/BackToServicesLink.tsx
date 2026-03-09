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
      className="mt-4 inline-block text-[.9rem] text-(--acc2) hover:text-(--acc3) transition-colors"
      aria-label="Back to all services">
      ← All services
    </a>
  );
}
