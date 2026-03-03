"use client";
import { Instagram } from "lucide-react";

import { cn } from "@/lib/utils";

const SOCIAL_LINKS = [
  {
    icon: Instagram,
    href: "#",
  },
];

const NAVIGATION = [
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Portfolio", href: "/portfolio" },
      { name: "Shop", href: "/products" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
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
              <span className="text-lg font-semibold tracking-tighter text-foreground">
                SLB Designs
              </span>
            </a>
            <p className="w-full max-w-xs text-base leading-normal text-muted-foreground md:text-lg">
              Custom snowboard and skateboard vinyl wraps, based in Boston, MA.
            </p>
            <div className="flex w-full items-center justify-start gap-7">
              {SOCIAL_LINKS.map((socialLink, i) => (
                <a key={`social-link-${i}`}
                  href={socialLink.href}
                  className="flex size-6 opacity-100 transition-opacity hover:opacity-50"
                >
                  <socialLink.icon className="m-auto size-full stroke-foreground" />
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-24">
            <nav className="flex flex-wrap gap-24 md:gap-40">
              {NAVIGATION.map((section) => (
                <div key={section.title}
                  className="flex flex-col items-start justify-start gap-4"
                >
                  <p className="mb-2 text-sm font-semibold text-foreground md:text-base">
                    {section.title}
                  </p>
                  {section.links.map((navLink) => (
                    <a key={navLink.name}
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
            © 2025 SLB Designs
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            Designed & built by{" "}
            <a href="https://www.saorsa.ca"
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