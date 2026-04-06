import { Fragment } from "react";
import { cn } from "@/lib/utils";

interface ShippingProps {
  className?: string;
}

const Shipping = ({ className }: ShippingProps) => {
  const regions = [
    { flag: "🇺🇸", label: "United States" },
    { flag: "🇨🇦", label: "Canada" },
    { flag: "🇪🇺", label: "Europe" },
  ];

  return (
    <Fragment>
      <section
        className={cn(
          "relative w-full bg-zinc-950 overflow-hidden py-14 sm:py-20",
          className,
        )}
        style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
      >
        {/* Blue glow */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Diagonal accent stripes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
          <div
            className="absolute -right-10 top-0 h-full w-[3px] bg-white/5"
            style={{ transform: "rotate(12deg) translateX(-120px)" }}
          />
          <div
            className="absolute -right-10 top-0 h-full w-[1px] bg-white/10"
            style={{ transform: "rotate(12deg) translateX(-160px)" }}
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-5xl px-4">
          <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-2xl">

              {/* Eyebrow */}
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-blue-500" />
                <span
                  className="text-xs tracking-[0.25em] text-blue-500 uppercase"
                  style={{ fontWeight: 600 }}
                >
                  Ships Internationally
                </span>
              </div>

              {/* Headline */}
              <h2
                className="text-left leading-[0.88] text-white"
                style={{
                  fontSize: "clamp(2.5rem, 12vw, 6rem)",
                  letterSpacing: "-0.01em",
                  fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                  fontWeight: 800,
                  textTransform: "uppercase",
                }}
              >
                We Ship
                <br />
                <span className="text-blue-500">Worldwide</span>
              </h2>

              {/* Regions row */}
              <div className="flex items-center gap-6 mt-1">
                {regions.map(({ flag, label }, i) => (
                  <Fragment key={label}>
                    <div className="flex items-center gap-2">
                      <span className="text-base">{flag}</span>
                      <span
                        className="text-xs text-white/50 uppercase tracking-[0.15em]"
                        style={{ fontWeight: 600 }}
                      >
                        {label}
                      </span>
                    </div>
                    {i < regions.length - 1 && (
                      <span className="text-white/15 text-sm">|</span>
                    )}
                  </Fragment>
                ))}
              </div>

              {/* Details row */}
              <div className="flex items-center gap-4 sm:gap-8">
                <div className="flex flex-col gap-0.5">
                  <span
                    className="text-[0.6rem] tracking-[0.2em] text-white/25 uppercase"
                    style={{ fontWeight: 500 }}
                  >
                    Lead Time
                  </span>
                  <span
                    className="text-sm text-blue-400 uppercase tracking-widest"
                    style={{ fontWeight: 700 }}
                  >
                    4–6 Weeks
                  </span>
                </div>
                <div className="h-8 w-[1px] bg-white/10" />
                <div className="flex flex-col gap-0.5">
                  <span
                    className="text-[0.6rem] tracking-[0.2em] text-white/25 uppercase"
                    style={{ fontWeight: 500 }}
                  >
                    Supply
                  </span>
                  <span
                    className="text-sm text-blue-400 uppercase tracking-widest"
                    style={{ fontWeight: 700 }}
                  >
                    Limited Drops
                  </span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap items-center gap-3 mt-1 sm:mt-2">
                <a
                  href="https://spences-newsletter-6d7ab9.beehiiv.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 bg-white px-7 py-3.5 text-black transition-all duration-300 hover:bg-blue-500 hover:text-white"
                  style={{
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 100%, 10px 100%)",
                  }}
                >
                  <span>Join Waitlist</span>
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="transition-transform group-hover:translate-x-1">
                    <path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>

            </div>
        </div>

        {/* Bottom rule */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5" />
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </Fragment>
  );
};

export { Shipping };