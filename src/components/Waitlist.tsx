import { Fragment } from "react";
import { cn } from "@/lib/utils";

interface WaitlistProps {
  className?: string;
}

const Waitlist = ({ className }: WaitlistProps) => {
  return (
    <Fragment>
      <section
        className={cn(
          "relative w-full bg-zinc-900 overflow-hidden py-16 sm:py-24",
          className,
        )}
        style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
      >
        {/* Horizontal accent lines — different from shipping's diagonal */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
          <div className="absolute right-0 top-[20%] w-24 h-[1px] bg-white/10" />
          <div className="absolute right-0 top-[22%] w-12 h-[1px] bg-white/5" />
          <div className="absolute right-0 bottom-[20%] w-32 h-[1px] bg-white/10" />
          <div className="absolute right-0 bottom-[22%] w-16 h-[1px] bg-white/5" />
        </div>

        {/* Red glow top-left */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-green-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 mx-auto w-full max-w-5xl px-4">

          {/* Main content — left-aligned, centered block */}
          <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-2xl">

              {/* Eyebrow */}
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                <span
                  className="text-xs tracking-[0.25em] text-green-500 uppercase"
                  style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 600 }}
                >
                  SLB Designs · Est. 2025
                </span>
              </div>

              {/* Headline */}
              <h2
                className="text-left leading-[0.88] text-green-500"
                style={{
                  fontSize: "clamp(2.5rem, 12vw, 6rem)",
                  letterSpacing: "-0.01em",
                  fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                  fontWeight: 800,
                  textTransform: "uppercase",
                }}
              >
                Limited Drop
                <br />
                <span className="text-white">Access</span>
              </h2>

              {/* Description */}
              <p
                className="text-sm sm:text-base text-white/40 leading-relaxed max-w-sm sm:max-w-lg"
                style={{ fontWeight: 400 }}
              >
                Each piece is made in limited runs — when they're gone, they're gone.
                Get early access before items go live to the public.
              </p>

              {/* CTA button */}
              <div className="flex flex-wrap items-center gap-3 mt-1 sm:mt-2">
                <a
                  href="https://spences-newsletter-6d7ab9.beehiiv.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 bg-white px-7 py-3.5 text-black transition-all duration-300 hover:bg-green-500 hover:text-white"
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 100%, 10px 100%)",
                  }}
                >
                  <span>Join Now</span>
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="transition-transform group-hover:translate-x-1">
                    <path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>

              {/* Fine print */}
              <p
                className="text-[0.65rem] text-white/20 tracking-wider uppercase"
                style={{ fontWeight: 500 }}
              >
                No spam. Drop notifications only.
              </p>

          {/* Bottom rule */}
          <div className="mt-16 sm:mt-24 h-[1px] w-full bg-white/5" />
        </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </Fragment>
  );
};

export { Waitlist };