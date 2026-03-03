import { ArrowDown } from "lucide-react";
import { Fragment } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Hero174Props {
  className?: string;
}

const Hero = ({ className }: Hero174Props) => {
  return (
    <Fragment>
      <section
        className={cn(
          "dark relative h-svh max-h-[1400px] min-h-[600px] w-full bg-[url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/full-width-backgrounds/andrew-kliatskyi-MaVm_A0xhKk-unsplash.jpg')] bg-cover bg-center bg-no-repeat after:absolute after:inset-0 after:block after:size-full after:bg-zinc-950/50 after:content-['']",
          className,
        )}
      >
        <div className="relative z-10 mx-auto flex size-full max-w-[125rem] px-4 py-9">
          <div className="flex w-full flex-col justify-between gap-10">
            <div className="mx-auto flex max-w-[31.25rem] flex-1 flex-col items-center justify-center gap-7 sm:max-w-[37.5rem] md:max-w-[50rem]">
              <h1 className="text-center text-4xl leading-tight font-medium text-foreground sm:text-5xl md:text-6xl">
                Carve your style into every run
              </h1>
              <p className="text-center text-lg text-balance text-foreground md:text-2xl">
                Custom board wraps by Spencer Berry
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button
                  asChild
                  className="block h-fit w-fit px-6 py-3.5 text-sm font-semibold tracking-wider text-nowrap uppercase transition-colors hover:bg-foreground hover:text-background"
                >
                  <a href="/products">Shop Now</a>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 border border-border bg-black/20 px-6 py-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1 bg-primary"></div>
                <div className="text-sm font-medium text-muted-foreground">
                  <p className="text-primary">Based in</p>
                  <p>Boston, Massachusetts</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="flex size-10 border-2 border-primary transition-colors hover:bg-foreground hover:text-background"
              >
                <ArrowDown className="m-auto size-5! stroke-primary" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export { Hero };