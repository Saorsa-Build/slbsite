"use client";

import { ArrowRightIcon } from "lucide-react";
import { useEffect, useState } from "react";

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

        // Build filter list from productType
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
    if (filter === "All") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((p) => p.productType === filter));
    }
  };

  return (
    <section className={cn("py-24", className)}>
      <div className="container">

        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 border-b border-border pb-8">
          <h1 className="font-display text-4xl font-semibold uppercase tracking-tight text-foreground md:text-5xl">
            Products
          </h1>
          <p className="font-text text-sm text-muted-foreground">
            Custom snowboard and skateboard vinyl wraps, based in Boston, MA.
          </p>
        </div>

        {/* Filters */}
        {!loading && filters.length > 1 && (
          <div className="mb-10 flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilter(filter)}
                className={cn(
                  "border px-4 py-1.5 font-display text-xs uppercase tracking-widest transition-colors",
                  activeFilter === filter
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-sm text-destructive">{error}</p>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="flex animate-pulse flex-col border border-border bg-muted/60 p-2"
                >
                  <div className="h-72 w-full bg-muted" />
                  <div className="mt-3 flex items-center justify-between gap-3 px-2 pb-3">
                    <div className="space-y-2">
                      <div className="h-3 w-24 rounded bg-muted" />
                      <div className="h-6 w-16 rounded bg-muted" />
                    </div>
                    <div className="size-12 bg-muted" />
                  </div>
                </div>
              ))
            : filtered.map((product) => {
                const image = product.images.edges[0]?.node;
                const { amount, currencyCode } =
                  product.priceRange.minVariantPrice;

                return (
                  <a
                    key={product.id}
                    href={`/products/${product.handle}`}
                    className="group relative flex cursor-pointer flex-col border border-border bg-muted/60 p-2 transition-colors hover:border-foreground"
                  >
                    {image ? (
                      <img
                        src={image.url}
                        alt={image.altText ?? product.title}
                        className="h-72 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-72 w-full items-center justify-center bg-muted">
                        <span className="font-text text-xs text-muted-foreground">
                          No image
                        </span>
                      </div>
                    )}
                    <div className="mt-3 flex items-center justify-between gap-3 px-2 pb-3">
                      <div>
                        <p className="font-text text-sm tracking-tighter text-muted-foreground">
                          {product.title}
                        </p>
                        <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                          {formatPrice(amount, currencyCode)}
                        </h3>
                      </div>
                      <div className="flex size-12 items-center justify-center border border-border bg-muted/10 transition-colors group-hover:bg-foreground group-hover:text-background">
                        <ArrowRightIcon className="size-7 -rotate-45 stroke-1" />
                      </div>
                    </div>
                  </a>
                );
              })}
        </div>

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
            <p className="font-text text-sm text-muted-foreground">
              No products found.
            </p>
            <button
              onClick={() => handleFilter("All")}
              className="border border-border px-6 py-2 font-display text-xs uppercase tracking-widest text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              Clear Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export { ProductsPage };