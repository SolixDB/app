"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full border-b bg-ink font-semibold leading-none tracking-[-0.05em] transition-colors duration-300 ${
        scrolled ? "border-white/[0.07]" : "border-transparent"
      }`}
    >
      <nav
        aria-label="Global"
        className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 sm:px-8"
      >
        <Link
          href="/"
          title={`${site.name} homepage`}
          className="shrink-0 transition-opacity hover:opacity-70"
        >
          <Image
            src="/logo.png"
            alt={site.name}
            width={104}
            height={28}
            priority
            className="h-7 w-auto"
          />
        </Link>

        <Link
          href={site.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-cta inline-flex items-center gap-[0.55em] text-[18px]"
        >
          <span aria-hidden className="hero-cta-arrow h-[1.1em] w-[1.1em] bg-current" />
          <span className="hero-cta-label">
            <span className="hidden sm:inline">View on </span>GitHub
          </span>
        </Link>
      </nav>
    </header>
  );
}
