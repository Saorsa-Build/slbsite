"use client";

import { ArrowLeftIcon, ShoppingBagIcon } from "lucide-react";
import React, { useState } from "react";

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
    <div className="container py-12">
      <a
        href="/products"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeftIcon className="size-4" />
        Back to shop
      </a>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Image gallery */}
        <div className="flex flex-col gap-3">
          <div className="overflow-hidden border border-border bg-muted/40">
            <img
              src={images[selectedImage]?.url}
              alt={images[selectedImage]?.altText ?? product.title}
              className="h-[520px] w-full object-cover transition-opacity duration-300"
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "h-20 w-20 flex-shrink-0 overflow-hidden border transition-colors",
                    selectedImage === i
                      ? "border-foreground"
                      : "border-border hover:border-foreground/50"
                  )}
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
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              {product.title}
            </h1>
            <p className="mt-2 text-2xl tracking-tight">{price}</p>
            {selectedVariant && !selectedVariant.availableForSale && (
              <p className="mt-1 text-sm text-destructive">Out of stock</p>
            )}
          </div>

          {/* Options */}
          {options.map((option) => (
            <div key={option.name} className="flex flex-col gap-2">
              <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                {option.name}
              </p>
              <div className="flex flex-wrap gap-2">
                {option.values.map((value) => (
                  <button
                    key={value}
                    onClick={() =>
                      setSelectedOptions((prev) => ({
                        ...prev,
                        [option.name]: value,
                      }))
                    }
                    className={cn(
                      "border px-4 py-2 text-sm transition-colors",
                      selectedOptions[option.name] === value
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground"
                    )}
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
              "mt-2 flex items-center justify-center gap-3 border px-6 py-4 text-sm font-medium uppercase tracking-widest transition-colors",
              selectedVariant?.availableForSale
                ? "border-foreground bg-foreground text-background hover:bg-background hover:text-foreground"
                : "cursor-not-allowed border-border text-muted-foreground"
            )}
          >
            <ShoppingBagIcon className="size-4" />
            {adding ? "Adding..." : added ? "Added!" : "Add to Cart"}
          </button>

          {/* Description */}
          {product.descriptionHtml && (
            <div
              className="prose prose-sm mt-4 text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export { ProductDetail };