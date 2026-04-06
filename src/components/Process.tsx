import { Fragment } from "react";
import { cn } from "@/lib/utils";

interface ProcessProps {
  className?: string;
}

const steps = [
  {
    number: "01",
    title: "Pick Your Design",
    description:
      "Browse Spencer's posts and find the design you want. DM him or send an email with your board dimensions and the design you're going after.",
  },
  {
    number: "02",
    title: "Design & Approve",
    description:
      "Spencer designs the wrap custom to your specs. You review and approve before anything gets cut.",
  },
  {
    number: "03",
    title: "Cut To Spec",
    description:
      "Once approved, your wrap is precision cut to fit your exact board dimensions. No guesswork, no waste.",
  },
  {
    number: "04",
    title: "Shipped To You",
    description:
      "Your finished wrap is packaged and shipped directly to your door — ready to apply.",
  },
];

const Process = ({ className }: ProcessProps) => {
  return (
    <Fragment>
      <section
        className={cn(
          "relative w-full bg-zinc-950 overflow-hidden py-16 sm:py-24",
          className,
        )}
        style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
      >
        {/* Top border */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/5" />

        {/* Corner accent — top right */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
          <div className="absolute top-0 right-16 w-[1px] h-24 bg-white/10" />
          <div className="absolute top-0 right-20 w-[1px] h-12 bg-white/5" />
          <div className="absolute bottom-0 left-16 w-[1px] h-24 bg-white/10" />
          <div className="absolute bottom-0 left-20 w-[1px] h-12 bg-white/5" />
        </div>

        {/* Orange glow */}
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-orange-600/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 mx-auto w-full max-w-5xl px-4">

          {/* Header */}
          <div className="flex flex-col gap-3 mb-12 sm:mb-16">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-orange-500" />
              <span
                className="text-xs tracking-[0.25em] text-orange-500 uppercase"
                style={{ fontWeight: 600 }}
              >
                Custom Wraps · How It Works
              </span>
            </div>
            <h2
              className="text-left leading-[0.88] text-white"
              style={{
                fontSize: "clamp(2.5rem, 12vw, 6rem)",
                fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
              }}
            >
              The <span className="text-orange-500">Process</span>
            </h2>
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative flex flex-col gap-4 bg-white/5 p-6 transition-colors duration-300 hover:bg-white/8"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)",
                }}
              >
                {/* Step number */}
                <span
                  className="text-orange-500/30"
                  style={{
                    fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                    fontWeight: 800,
                    fontSize: "3.5rem",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {step.number}
                </span>

                {/* Divider */}
                <div className="h-[1px] w-full bg-white/10" />

                {/* Title */}
                <h3
                  className="text-white uppercase leading-tight"
                  style={{
                    fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.2rem",
                    letterSpacing: "0.02em",
                  }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm text-white/40 leading-relaxed"
                  style={{ fontWeight: 400 }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-3">
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 bg-white px-7 py-3.5 text-black transition-all duration-300 hover:bg-orange-500 hover:text-white"
              style={{
                fontWeight: 700,
                fontSize: "0.8rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 100%, 10px 100%)",
              }}
            >
              <span>Get Started</span>
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="transition-transform group-hover:translate-x-1">
                <path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="https://spences-newsletter-6d7ab9.beehiiv.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border border-white/20 px-7 py-3.5 text-white/50 transition-all duration-300 hover:border-white/40 hover:text-white/80"
              style={{
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

        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5" />
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </Fragment>
  );
};

export { Process };