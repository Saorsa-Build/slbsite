import { ArrowDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero79Props {
  className?: string;
}

const Hero = ({ className }: Hero79Props) => {
  return (
    <section
      className={cn(
        "dark h-svh w-svw bg-background bg-[url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/full-width-backgrounds/andrew-kliatskyi-MaVm_A0xhKk-unsplash.jpg')] bg-cover bg-center bg-no-repeat pt-12 pb-24",
        className,
      )}
    >
      <div className="container flex h-full flex-col justify-between px-5 xl:px-20">
        <img src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-white-1.svg" alt="" className="size-20" />
        <div className="flex items-end justify-between">
          <div className="flex w-full flex-col gap-8 md:w-2/3">
            <h1 className="text-6xl font-medium text-foreground md:text-[5.8rem]">
              Create your own fiber optics facility
            </h1>
            <p className="text-xl text-foreground md:text-2xl">
              CableCore Partnership. Worldwide network. Regional manufacturing
            </p>
          </div>
          <Button
            variant="ghost"
            className="hidden items-center gap-2 text-foreground hover:bg-transparent md:flex"
          >
            <span className="text-2xl">Read More</span>
            <ArrowDown className="size-6!" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Hero };
