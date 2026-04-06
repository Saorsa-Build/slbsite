import { Fragment } from "react";
import { cn } from "@/lib/utils";

interface HeroProps {
  className?: string;
}

const Hero = ({ className }: HeroProps) => {
  return (
    <Fragment>
      <section
        className={cn(
          "dark relative h-svh max-h-[1400px] min-h-svh w-full bg-[url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/full-width-backgrounds/andrew-kliatskyi-MaVm_A0xhKk-unsplash.jpg')] bg-cover bg-center bg-no-repeat",
          className,
        )}
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
        }}
      >
        {/* Gradient overlay — dark bottom, lighter top */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />

        {/* Diagonal accent stripe */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          aria-hidden
        >
          <div
            className="absolute -left-10 top-0 h-full w-[3px] bg-white/10"
            style={{ transform: "rotate(12deg) translateX(120px)" }}
          />
          <div
            className="absolute -left-10 top-0 h-full w-[1px] bg-white/20"
            style={{ transform: "rotate(12deg) translateX(160px)" }}
          />
        </div>

        <div className="relative z-10 mx-auto flex size-full max-w-[125rem] flex-col px-4 py-6 sm:py-9">
          {/* Top bar — brand label */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-6 sm:w-10 bg-white/20" />
            <div className="flex items-center gap-2">
              <span
                className="text-[0.6rem] tracking-[0.3em] text-orange-500 uppercase"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700 }}
              >
                Custom Made
              </span>
              <span className="text-orange-500/40 text-xs">|</span>
              <span
                className="text-[0.6rem] tracking-[0.3em] text-orange-500 uppercase"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700 }}
              >
                Spencer Berry
              </span>
              <span className="text-orange-500/40 text-xs">|</span>
              <span
                className="text-[0.6rem] tracking-[0.3em] text-orange-500 uppercase"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700 }}
              >
                Boston, MA
              </span>
            </div>
            <div className="h-[1px] w-6 sm:w-10 bg-white/20" />
          </div>

          {/* Center content */}
          <div className="flex flex-1 flex-col items-center justify-center px-0 sm:px-4">
            <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-2xl">
              {/* Eyebrow tag — removed, now in top bar */}

              {/* Main headline */}
              <h1
                className="text-left leading-[0.88] text-white"
                style={{
                  fontSize: "clamp(3rem, 18vw, 8rem)",
                  letterSpacing: "-0.01em",
                  fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                  fontWeight: 800,
                  textTransform: "uppercase",
                }}
              >
                Built To
                <br />
                <span className="text-orange-500">Stand Out</span>
                <br />
                Not Blend In
              </h1>

              {/* Description */}
              <p
                className="text-sm sm:text-base text-white/40 leading-relaxed max-w-sm"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 400 }}
              >
                Custom vinyl wraps and apparel inspired by icon soccer balls.
                Snowboards, skis, skate decks and beanies made in Boston&nbsp;MA.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap items-center gap-3 mt-1 sm:mt-2">
                {/* Primary — Shop */}
                <a
                  href="/products"
                  className="group relative inline-flex items-center gap-2 overflow-hidden bg-white px-7 py-3.5 text-black transition-all duration-300 hover:bg-orange-500 hover:text-white"
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
                  <span>Shop Now</span>
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="transition-transform group-hover:translate-x-1">
                    <path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>

                {/* Secondary — Waitlist */}
                <a
                  href="/waitlist"
                  className="group relative inline-flex items-center gap-2 border border-white/50 px-7 py-3.5 text-white transition-all duration-300 hover:border-white hover:bg-white/10"
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontWeight: 600,
                    fontSize: "0.8rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 100%, 10px 100%)",
                  }}
                >
                  <span>Join Waitlist</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom marquee bar */}
          <div className="overflow-hidden border border-white/10 bg-black/30 backdrop-blur-sm py-3">
            <div
              className="flex gap-10 whitespace-nowrap"
              style={{ animation: "marquee 8s linear infinite" }}
            >
              {[...Array(4)].flatMap(() =>
                ["Snowboards", "Skis", "Skate Decks", "Beanies", "Vinyl Wraps"].map((item, i) => (
                  <span
                    key={`${item}-${i}`}
                    className="text-sm text-white/50 uppercase tracking-[0.2em]"
                    style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 600 }}
                  >
                    {item}
                    <span className="ml-10 text-white/40 text-xl">·</span>
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Load Barlow Condensed + DM Sans from Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </Fragment>
  );
};

export { Hero };