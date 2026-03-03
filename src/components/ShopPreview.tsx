"use client";

import { ArrowRightIcon } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

interface CardData {
  title: string;
  price: string;
  image: string;
  link: string;
}

const ShopPreview = ({
  cardData = [
    {
      title: "June Collection",
      price: "$150",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img1.jpeg",
      link: "#",
    },
    {
      title: "Summer Essentials",
      price: "$89",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img2.jpeg",
      link: "#",
    },
    {
      title: "Premium Bundle",
      price: "$299",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img3.jpeg",
      link: "#",
    },
    {
      title: "New Arrivals",
      price: "$120",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img4.jpeg",
      link: "#",
    },
    {
      title: "Limited Edition",
      price: "$199",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img27.jpeg",
      link: "#",
    },
    {
      title: "Exclusive Set",
      price: "$249",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img13.jpeg",
      link: "#",
    },
  ],
  className,
}: {
  cardData?: CardData[];
  className?: string;
}) => {
  return (
    <section className={cn("overflow-hidden py-32", className)}>
      <div className="container w-full">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cardData.map((card, index) => (
            <a key={index} href={card.link} className="group relative flex flex-col border border-border bg-muted/60 p-2 cursor-pointer transition-colors hover:border-foreground">
              <img
                src={card.image}
                alt={card.title}
                className="h-72 w-full object-cover"
              />
              <div className="mt-3 flex items-center justify-between gap-3 px-2 pb-3">
                <div>
                  <p className="text-sm tracking-tighter text-muted-foreground">
                    {card.title}
                  </p>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {card.price}
                  </h3>
                </div>
                <div className="flex size-12 items-center justify-center gap-2 border border-border bg-muted/10 text-sm transition-colors group-hover:bg-foreground group-hover:text-background">
                  <ArrowRightIcon className="size-7 -rotate-45 stroke-1" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export { ShopPreview };