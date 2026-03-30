"use client";
import { Instagram } from "lucide-react";

import { cn } from "@/lib/utils";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
  </svg>
);

const SOCIAL_LINKS = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/spencelb_/",
    useFill: false,
  },
  {
    icon: TikTokIcon,
    href: "https://www.tiktok.com/@spencelb",
    useFill: true,
  },
];

const NAVIGATION = [
  {
    title: "Company",
    links: [
      //{ name: "About Us", href: "/about" },
      //{ name: "Portfolio", href: "/portfolio" },
      { name: "Shop", href: "/products" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/" },
      { name: "Terms of Service", href: "/" },
    ],
  },
];

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <section className={cn("py-32", className)}>
      <footer className="container flex flex-col gap-32">
        <div className="flex w-full flex-col justify-between gap-y-24 lg:flex-row">
          <div className="flex shrink-0 grow-0 basis-auto flex-col items-start justify-start gap-6">
            <a href="/">
              <img
                src="/SLB.png"
                alt="SLB Designs"
                className="h-10 w-auto"
              />
            </a>
            <p className="w-full max-w-xs text-base leading-normal text-muted-foreground md:text-lg">
              Custom snowboard and skateboard vinyl wraps, based in Boston, MA.
            </p>
            <div className="flex w-full items-center justify-start gap-7">
              {SOCIAL_LINKS.map((socialLink, i) => (
                <a
                  key={`social-link-${i}`}
                  href={socialLink.href}
                  className="flex size-6 opacity-100 transition-opacity hover:opacity-50"
                >
                  <socialLink.icon
                    className={cn(
                      "m-auto size-full",
                      socialLink.useFill
                        ? "fill-white text-white"
                        : "stroke-white fill-none"
                    )}
                  />
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-24">
            <nav className="flex flex-wrap gap-24 md:gap-40">
              {NAVIGATION.map((section) => (
                <div
                  key={section.title}
                  className="flex flex-col items-start justify-start gap-4"
                >
                  <p className="mb-2 text-sm font-semibold text-foreground md:text-base">
                    {section.title}
                  </p>
                  {section.links.map((navLink) => (
                    <a
                      key={navLink.name}
                      href={navLink.href}
                      className="text-sm leading-none font-medium text-foreground opacity-50 transition-opacity hover:opacity-100"
                    >
                      {navLink.name}
                    </a>
                  ))}
                </div>
              ))}
            </nav>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-y-4 md:flex-row">
          <div className="text-sm font-medium text-muted-foreground">
            © 2026 SLB Designs
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            Designed & built by{" "}
            <a
              href="https://www.saorsa.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-50 transition-opacity hover:opacity-100"
            >
              Saorsa
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
};

export { Footer };