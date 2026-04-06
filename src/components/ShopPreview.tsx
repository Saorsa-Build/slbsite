"use client";

import { ArrowRightIcon } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// --- Shopify Storefront API ---
const domain = import.meta.env.PUBLIC_SHOPIFY_STORE_DOMAIN;
const token = import.meta.env.PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: {
      node: {
        url: string;
        altText: string | null;
      };
    }[];
  };
}

async function fetchProducts(): Promise<ShopifyProduct[]> {
  const query = `{
    products(first: 6) {
      edges {
        node {
          id
          title
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }`;

  const res = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query }),
  });

  const data = await res.json();
  return data.data.products.edges.map(
    (edge: { node: ShopifyProduct }) => edge.node
  );
}

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
}

// --- Component ---
const ShopPreview = ({ className }: { className?: string }) => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() => setError("Failed to load products."))
      .finally(() => setLoading(false));
  }, []);

  const isCentered = !loading && products.length < 3;

  return (
    <Fragment>
      <section
        className={cn("relative w-full bg-zinc-950 overflow-hidden py-16 sm:py-24", className)}
        style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
      >
        {/* Subtle top border */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/5" />

        <div className="relative z-10 mx-auto w-full max-w-5xl px-4">

          {/* Section header */}
          <div className="flex items-end gap-6 mb-10 sm:mb-14">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                <span
                  className="text-xs tracking-[0.25em] text-green-500 uppercase"
                  style={{ fontWeight: 600 }}
                >
                  SLB Designs · Boston, MA
                </span>
              </div>
              <h2
                className="leading-[0.88] text-white"
                style={{
                  fontSize: "clamp(2.5rem, 12vw, 5rem)",
                  fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "-0.01em",
                }}
              >
                The Shop
              </h2>
            </div>
          </div>

          {error && (
            <p className="text-sm text-white/30 mb-8">{error}</p>
          )}

          {/* Product grid */}
          <div
            className={cn(
              "grid gap-4 sm:gap-5",
              isCentered
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            )}
          >
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col bg-white/5 animate-pulse"
                    style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 100%, 0 100%)" }}
                  >
                    <div className="h-72 w-full bg-white/5" />
                    <div className="p-4 flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="h-2.5 w-20 rounded bg-white/10" />
                        <div className="h-5 w-14 rounded bg-white/10" />
                      </div>
                      <div className="size-10 bg-white/10" />
                    </div>
                  </div>
                ))
              : products.map((product) => {
                  const image = product.images.edges[0]?.node;
                  const { amount, currencyCode } =
                    product.priceRange.minVariantPrice;

                  return (
                    <a
                      key={product.id}
                      href={`/products/${product.handle}`}
                      className="group relative flex flex-col bg-white/5 transition-all duration-300 hover:bg-white/10"
                      style={{
                        textDecoration: "none",
                        clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 100%, 0 100%)",
                      }}
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden">
                        {image && (
                          <img
                            src={image.url}
                            alt={image.altText ?? product.title}
                            className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                        {/* Image overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Info row */}
                      <div className="flex items-center justify-between gap-3 px-4 py-4">
                        <div className="flex flex-col gap-0.5">
                          <p
                            className="text-xs tracking-[0.1em] text-white/40 uppercase"
                            style={{ fontWeight: 500 }}
                          >
                            {product.title}
                          </p>
                          <p
                            className="text-xl text-white"
                            style={{
                              fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                              fontWeight: 700,
                              letterSpacing: "0.02em",
                            }}
                          >
                            {formatPrice(amount, currencyCode)}
                          </p>
                        </div>
                        <div className="flex size-10 shrink-0 items-center justify-center border border-white/15 text-white/40 transition-all duration-300 group-hover:border-green-500 group-hover:green-500 group-hover:bg-green-500/10">
                          <ArrowRightIcon className="size-4 -rotate-45 stroke-[1.5]" />
                        </div>
                      </div>
                    </a>
                  );
                })}
          </div>

          {/* View All — below grid */}
          <div className="mt-8 flex">
            <a
              href="/products"
              className="group inline-flex items-center gap-2 border border-white/15 px-5 py-2.5 text-white/50 transition-all duration-300 hover:border-white/40 hover:text-white/80"
              style={{
                fontWeight: 600,
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 100%, 8px 100%)",
              }}
            >
              <span>View All</span>
              <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </Fragment>
  );
};

export { ShopPreview };