"use client";

import { ArrowLeftIcon, ShoppingBagIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

interface ProductOption {
  name: string;
  values: string[];
}

interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: {
    amount: string;
    currencyCode: string;
  };
  selectedOptions: {
    name: string;
    value: string;
  }[];
}

interface ProductImage {
  url: string;
  altText: string | null;
}

interface Product {
  id: string;
  title: string;
  handle: string;
  descriptionHtml: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: { edges: { node: ProductImage }[] };
  variants: { edges: { node: ProductVariant }[] };
  options: ProductOption[];
}

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
}

const ProductDetail = ({ product }: { product: Product }) => {
  const images = product.images.edges.map((e) => e.node);
  const variants = product.variants.edges.map((e) => e.node);
  const options = product.options;

  const { addItem } = useCartStore();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    () => Object.fromEntries(options.map((o) => [o.name, o.values[0]]))
  );
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const selectedVariant =
    variants.find((v) =>
      v.selectedOptions.every((opt) => selectedOptions[opt.name] === opt.value)
    ) ?? variants[0];

  const price = selectedVariant
    ? formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)
    : formatPrice(
        product.priceRange.minVariantPrice.amount,
        product.priceRange.minVariantPrice.currencyCode
      );

  async function handleAddToCart() {
    if (!selectedVariant?.availableForSale) return;
    setAdding(true);
    try {
      await addItem({
        merchandiseId: selectedVariant.id,
        quantity: 1,
        title: product.title,
        variantTitle: selectedVariant.title,
        price: selectedVariant.price.amount,
        image: images[0]?.url,
        handle: product.handle,
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    } finally {
      setAdding(false);
    }
  }

  return (
    <Fragment>
      <div
        className="relative w-full min-h-screen bg-zinc-950 overflow-hidden"
        style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
      >
        {/* Orange glow */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-orange-600/8 rounded-full blur-[120px] pointer-events-none" />

        {/* Diagonal accent stripe */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
          <div
            className="absolute -left-10 top-0 h-full w-[3px] bg-white/5"
            style={{ transform: "rotate(12deg) translateX(120px)" }}
          />
          <div
            className="absolute -left-10 top-0 h-full w-[1px] bg-white/10"
            style={{ transform: "rotate(12deg) translateX(160px)" }}
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-10 sm:py-16">

          {/* Back link */}
          <a
            href="/products"
            className="group mb-10 inline-flex items-center gap-2 text-white/30 transition-colors hover:text-white/70"
            style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", fontWeight: 600 }}
          >
            <ArrowLeftIcon className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back to shop
          </a>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">

            {/* Image gallery */}
            <div className="flex flex-col gap-3">
              <div
                className="overflow-hidden bg-white/5"
                style={{ clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)" }}
              >
                <img
                  src={images[selectedImage]?.url}
                  alt={images[selectedImage]?.altText ?? product.title}
                  className="h-[420px] sm:h-[540px] w-full object-cover transition-opacity duration-300"
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-2">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={cn(
                        "h-20 w-20 flex-shrink-0 overflow-hidden transition-all duration-200",
                        selectedImage === i
                          ? "border border-orange-500"
                          : "border border-white/10 hover:border-white/30"
                      )}
                      style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)" }}
                    >
                      <img
                        src={img.url}
                        alt={img.altText ?? product.title}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product info */}
            <div className="flex flex-col gap-6">

              {/* Eyebrow */}
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-orange-500" />
                <span
                  className="text-xs tracking-[0.25em] text-orange-500 uppercase"
                  style={{ fontWeight: 600 }}
                >
                  SLB Designs · Boston, MA
                </span>
              </div>

              {/* Title + price */}
              <div className="flex flex-col gap-2">
                <h1
                  className="text-white leading-[0.9]"
                  style={{
                    fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
                    textTransform: "uppercase",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {product.title}
                </h1>
                <p
                  className="text-orange-500"
                  style={{
                    fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(1.5rem, 4vw, 2rem)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {price}
                </p>
                {selectedVariant && !selectedVariant.availableForSale && (
                  <p className="text-xs text-red-400 uppercase tracking-widest" style={{ fontWeight: 600 }}>
                    Out of stock
                  </p>
                )}
              </div>

              {/* Divider */}
              <div className="h-[1px] w-full bg-white/10" />

              {/* Options */}
              {options.map((option) => (
                <div key={option.name} className="flex flex-col gap-3">
                  <p
                    className="text-xs text-white/30 uppercase tracking-[0.2em]"
                    style={{ fontWeight: 600 }}
                  >
                    {option.name}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value) => (
                      <button
                        key={value}
                        onClick={() =>
                          setSelectedOptions((prev) => ({ ...prev, [option.name]: value }))
                        }
                        className={cn(
                          "px-4 py-2 text-xs uppercase tracking-widest transition-all duration-200",
                          selectedOptions[option.name] === value
                            ? "bg-white text-black"
                            : "border border-white/15 text-white/50 hover:border-white/40 hover:text-white/80"
                        )}
                        style={{
                          fontWeight: 600,
                          clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)",
                        }}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                disabled={adding || !selectedVariant?.availableForSale}
                className={cn(
                  "group mt-2 inline-flex items-center gap-3 px-7 py-4 text-sm uppercase tracking-widest transition-all duration-300",
                  selectedVariant?.availableForSale
                    ? "bg-white text-black hover:bg-orange-500 hover:text-white"
                    : "cursor-not-allowed border border-white/10 text-white/20"
                )}
                style={{
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 100%, 10px 100%)",
                }}
              >
                <ShoppingBagIcon className="size-4" />
                {adding ? "Adding..." : added ? "Added!" : "Add to Cart"}
              </button>

              {/* Divider */}
              <div className="h-[1px] w-full bg-white/10" />

              {/* Description */}
              {product.descriptionHtml && (
                <div
                  className="text-sm text-white/40 leading-relaxed [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:text-white/40 [&_li]:mb-1 [&_strong]:text-white/70 [&_strong]:font-semibold"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              )}

            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </Fragment>
  );
};

export { ProductDetail };