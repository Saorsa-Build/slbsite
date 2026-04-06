"use client";

import { ArrowRightIcon } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const domain = import.meta.env.PUBLIC_SHOPIFY_STORE_DOMAIN;
const token = import.meta.env.PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  productType: string;
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

async function fetchAllProducts(): Promise<ShopifyProduct[]> {
  const query = `{
    products(first: 100) {
      edges {
        node {
          id
          title
          handle
          productType
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

const ProductsPage = ({ className }: { className?: string }) => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [filtered, setFiltered] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [filters, setFilters] = useState<string[]>(["All"]);

  useEffect(() => {
    fetchAllProducts()
      .then((data) => {
        setProducts(data);
        setFiltered(data);
        const types = Array.from(
          new Set(data.map((p) => p.productType).filter(Boolean))
        );
        setFilters(["All", ...types]);
      })
      .catch(() => setError("Failed to load products."))
      .finally(() => setLoading(false));
  }, []);

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
    setFiltered(filter === "All" ? products : products.filter((p) => p.productType === filter));
  };

  return (
    <Fragment>
      <div
        className={cn("relative w-full min-h-screen bg-zinc-950 overflow-hidden", className)}
        style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
      >
        {/* Orange glow */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-orange-600/8 rounded-full blur-[120px] pointer-events-none" />

        {/* Diagonal accent stripes */}
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

        {/* Top border */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/5" />

        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-12 sm:py-20">

          {/* Header */}
          <div className="flex flex-col gap-3 mb-10 sm:mb-14">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-orange-500" />
              <span
                className="text-xs tracking-[0.25em] text-orange-500 uppercase"
                style={{ fontWeight: 600 }}
              >
                SLB Designs · Boston, MA
              </span>
            </div>
            <h1
              className="text-left leading-[0.88] text-white"
              style={{
                fontSize: "clamp(2.5rem, 12vw, 6rem)",
                fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
              }}
            >
              The <span className="text-orange-500">Shop</span>
            </h1>
            <p
              className="text-sm text-white/40 leading-relaxed max-w-sm mt-1"
              style={{ fontWeight: 400 }}
            >
              Custom snowboard and skateboard vinyl wraps, based in Boston, MA.
            </p>
          </div>

          {/* Filters */}
          {!loading && filters.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleFilter(filter)}
                  className={cn(
                    "px-4 py-1.5 text-xs uppercase tracking-widest transition-all duration-200",
                    activeFilter === filter
                      ? "bg-white text-black"
                      : "border border-white/15 text-white/40 hover:border-white/40 hover:text-white/70"
                  )}
                  style={{
                    fontWeight: 600,
                    clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)",
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}

          {/* Error */}
          {error && (
            <p className="text-sm text-white/30 mb-8">{error}</p>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {loading
              ? Array.from({ length: 9 }).map((_, i) => (
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
              : filtered.map((product) => {
                  const image = product.images.edges[0]?.node;
                  const { amount, currencyCode } = product.priceRange.minVariantPrice;

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
                      <div className="relative overflow-hidden">
                        {image ? (
                          <img
                            src={image.url}
                            alt={image.altText ?? product.title}
                            className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-72 w-full items-center justify-center bg-white/5">
                            <span className="text-xs text-white/20 uppercase tracking-widest">No image</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

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
                        <div className="flex size-10 shrink-0 items-center justify-center border border-white/15 text-white/40 transition-all duration-300 group-hover:border-orange-500 group-hover:text-orange-500 group-hover:bg-orange-500/10">
                          <ArrowRightIcon className="size-4 -rotate-45 stroke-[1.5]" />
                        </div>
                      </div>
                    </a>
                  );
                })}
          </div>

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
              <p className="text-sm text-white/30 uppercase tracking-widest" style={{ fontWeight: 500 }}>
                No products found.
              </p>
              <button
                onClick={() => handleFilter("All")}
                className="inline-flex items-center gap-2 border border-white/15 px-6 py-2.5 text-white/50 transition-all duration-300 hover:border-white/40 hover:text-white/80"
                style={{
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 100%, 8px 100%)",
                }}
              >
                Clear Filter
              </button>
            </div>
          )}

        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </Fragment>
  );
};

export { ProductsPage };