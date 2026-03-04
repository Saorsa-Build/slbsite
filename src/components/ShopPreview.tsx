"use client";

import { ArrowRightIcon } from "lucide-react";
import { useEffect, useState } from "react";

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

  const res = await fetch(
    `https://${domain}/api/2024-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({ query }),
    }
  );

  const data = await res.json();
  return data.data.products.edges.map((edge: { node: ShopifyProduct }) => edge.node);
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

  return (
    <section className={cn("overflow-hidden py-32", className)}>
      <div className="container w-full">
        {error && (
          <p className="text-center text-sm text-destructive">{error}</p>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? // Skeleton placeholders
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col border border-border bg-muted/60 p-2 animate-pulse"
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
            : products.map((product) => {
                const image = product.images.edges[0]?.node;
                const { amount, currencyCode } =
                  product.priceRange.minVariantPrice;

                return (
                  <a
                    key={product.id}
                    href={`/${product.handle}`}
                    className="group relative flex flex-col border border-border bg-muted/60 p-2 cursor-pointer transition-colors hover:border-foreground"
                  >
                    {image && (
                      <img
                        src={image.url}
                        alt={image.altText ?? product.title}
                        className="h-72 w-full object-cover"
                      />
                    )}
                    <div className="mt-3 flex items-center justify-between gap-3 px-2 pb-3">
                      <div>
                        <p className="text-sm tracking-tighter text-muted-foreground">
                          {product.title}
                        </p>
                        <h3 className="text-2xl font-semibold tracking-tight">
                          {formatPrice(amount, currencyCode)}
                        </h3>
                      </div>
                      <div className="flex size-12 items-center justify-center gap-2 border border-border bg-muted/10 text-sm transition-colors group-hover:bg-foreground group-hover:text-background">
                        <ArrowRightIcon className="size-7 -rotate-45 stroke-1" />
                      </div>
                    </div>
                  </a>
                );
              })}
        </div>
      </div>
    </section>
  );
};

export { ShopPreview };