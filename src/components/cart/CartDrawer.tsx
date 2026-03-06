"use client";

import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

const CartDrawer = () => {
  const { isOpen, closeCart, lines, removeItem, updateItem, checkoutUrl, isLoading } = useCartStore();

  const total = lines.reduce((acc, line) => {
    return acc + parseFloat(line.price) * line.quantity;
  }, 0);

  const itemCount = lines.reduce((acc, line) => acc + line.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        className="dark flex h-full w-full flex-col bg-background p-0 sm:max-w-md [&>button]:hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <SheetTitle className="font-display text-base font-semibold uppercase tracking-widest text-foreground">
            Cart {itemCount > 0 && `(${itemCount})`}
          </SheetTitle>
          <button
            onClick={closeCart}
            className="text-muted-foreground transition-opacity hover:opacity-50"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Empty state */}
        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="size-10 stroke-muted-foreground opacity-30" />
            <p className="font-text text-sm text-muted-foreground">Your cart is empty</p>
            <button
              onClick={closeCart}
              className="border border-border px-6 py-2 font-display text-xs uppercase tracking-widest text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart lines */}
            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
              <ul className="flex flex-col divide-y divide-border">
                {lines.map((line) => (
                  <li key={line.id} className="flex gap-4 py-5 first:pt-0">
                    {/* Image */}
                    {line.image && (
                      <img
                        src={line.image}
                        alt={line.title}
                        className="h-20 w-20 flex-shrink-0 object-cover"
                      />
                    )}

                    {/* Details */}
                    <div className="flex flex-1 flex-col justify-between gap-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-col gap-1">
                          <a
                            href={`/products/${line.handle}`}
                            className="font-display text-sm font-medium uppercase tracking-wide text-foreground transition-opacity hover:opacity-60"
                            onClick={closeCart}
                          >
                            {line.title}
                          </a>
                          {line.variantTitle !== "Default Title" && (
                            <p className="font-text text-xs text-muted-foreground">
                              {line.variantTitle}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(line.id)}
                          className="mt-0.5 flex-shrink-0 text-muted-foreground transition-opacity hover:opacity-50"
                          disabled={isLoading}
                        >
                          <X className="size-3.5" />
                        </button>
                      </div>

                      {/* Quantity + price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() => updateItem(line.id, line.quantity - 1)}
                            disabled={isLoading}
                            className="flex h-7 w-7 items-center justify-center text-foreground transition-colors hover:bg-muted"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="flex h-7 w-8 items-center justify-center border-x border-border font-text text-sm text-foreground">
                            {line.quantity}
                          </span>
                          <button
                            onClick={() => updateItem(line.id, line.quantity + 1)}
                            disabled={isLoading}
                            className="flex h-7 w-7 items-center justify-center text-foreground transition-colors hover:bg-muted"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                        <span className="font-text text-sm font-medium text-foreground">
                          ${(parseFloat(line.price) * line.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-4 border-t border-border bg-muted/20 px-6 py-6">
              <div className="flex items-center justify-between">
                <span className="font-text text-sm text-muted-foreground">Subtotal</span>
                <span className="font-display text-base font-semibold text-foreground">
                  ${total.toFixed(2)}
                </span>
              </div>
              <p className="font-text text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>
              <a
                href={checkoutUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => closeCart()}
                className={`flex w-full items-center justify-center border px-6 py-4 font-display text-sm font-medium uppercase tracking-widest transition-colors ${
                  isLoading || !checkoutUrl
                    ? "pointer-events-none border-border text-muted-foreground"
                    : "border-foreground bg-foreground text-background hover:bg-background hover:text-foreground"
                }`}
              >
                Checkout
              </a>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export { CartDrawer };