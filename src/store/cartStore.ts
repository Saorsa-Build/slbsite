import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";

interface CartLine {
  id: string;
  merchandiseId: string;
  quantity: number;
  title: string;
  variantTitle: string;
  price: string;
  image?: string;
  handle: string;
}

interface CartStore {
  cartId: string | null;
  checkoutUrl: string | null;
  lines: CartLine[];
  isOpen: boolean;
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartLine, "id">) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
}

const STOREFRONT_API_URL = `https://${import.meta.env.PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;
const STOREFRONT_TOKEN = import.meta.env.PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

const storefrontFetch = async (query: string, variables = {}) => {
  const res = await fetch(STOREFRONT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  const data = await res.json();
  return data;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartId: null,
      checkoutUrl: null,
      lines: [],
      isOpen: false,
      isLoading: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      clearCart: () => set({ cartId: null, checkoutUrl: null, lines: [] }),

      addItem: async (item) => {
        set({ isLoading: true });
        const { cartId, lines } = get();

        try {
          // Check if this variant is already in the cart
          const existingLine = lines.find(
            (l) => l.merchandiseId === item.merchandiseId
          );

          if (existingLine) {
            // Increment quantity instead of adding a duplicate
            await get().updateItem(existingLine.id, existingLine.quantity + item.quantity);
            set({ isOpen: true });
            return;
          }

          if (!cartId) {
            const { data, errors } = await storefrontFetch(`
              mutation cartCreate($input: CartInput!) {
                cartCreate(input: $input) {
                  cart {
                    id
                    checkoutUrl
                    lines(first: 100) {
                      edges {
                        node {
                          id
                          quantity
                          merchandise {
                            ... on ProductVariant {
                              id
                            }
                          }
                        }
                      }
                    }
                  }
                  userErrors {
                    field
                    message
                  }
                }
              }
            `, {
              input: {
                lines: [{ merchandiseId: item.merchandiseId, quantity: item.quantity }],
              },
            });

            if (errors || data.cartCreate.userErrors?.length) {
              throw new Error(data.cartCreate.userErrors?.[0]?.message ?? "Failed to create cart");
            }

            const cart = data.cartCreate.cart;
            set({
              cartId: cart.id,
              checkoutUrl: cart.checkoutUrl,
              lines: [{ ...item, id: cart.lines.edges[0].node.id }],
              isOpen: true,
            });
          } else {
            const { data, errors } = await storefrontFetch(`
              mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
                cartLinesAdd(cartId: $cartId, lines: $lines) {
                  cart {
                    id
                    checkoutUrl
                    lines(first: 100) {
                      edges {
                        node {
                          id
                          quantity
                          merchandise {
                            ... on ProductVariant {
                              id
                            }
                          }
                        }
                      }
                    }
                  }
                  userErrors {
                    field
                    message
                  }
                }
              }
            `, {
              cartId,
              lines: [{ merchandiseId: item.merchandiseId, quantity: item.quantity }],
            });

            if (errors || data.cartLinesAdd.userErrors?.length) {
              throw new Error(data.cartLinesAdd.userErrors?.[0]?.message ?? "Failed to add item");
            }

            const cart = data.cartLinesAdd.cart;
            const newLineId = cart.lines.edges.find(
              (e: any) => e.node.merchandise.id === item.merchandiseId
            )?.node.id;

            set((state) => ({
              checkoutUrl: cart.checkoutUrl,
              lines: [...state.lines, { ...item, id: newLineId }],
              isOpen: true,
            }));
          }
        } catch (err: any) {
          toast.error(err.message ?? "Something went wrong adding to cart.");
        } finally {
          set({ isLoading: false });
        }
      },

      removeItem: async (lineId) => {
        set({ isLoading: true });
        const { cartId } = get();
        try {
          const { data, errors } = await storefrontFetch(`
            mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
              cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
                cart { id }
                userErrors {
                  field
                  message
                }
              }
            }
          `, { cartId, lineIds: [lineId] });

          if (errors || data.cartLinesRemove.userErrors?.length) {
            throw new Error(data.cartLinesRemove.userErrors?.[0]?.message ?? "Failed to remove item");
          }

          set((state) => ({
            lines: state.lines.filter((l) => l.id !== lineId),
          }));
        } catch (err: any) {
          toast.error(err.message ?? "Something went wrong removing the item.");
        } finally {
          set({ isLoading: false });
        }
      },

      updateItem: async (lineId, quantity) => {
        if (quantity <= 0) return get().removeItem(lineId);
        set({ isLoading: true });
        const { cartId } = get();
        try {
          const { data, errors } = await storefrontFetch(`
            mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
              cartLinesUpdate(cartId: $cartId, lines: $lines) {
                cart { id }
                userErrors {
                  field
                  message
                }
              }
            }
          `, { cartId, lines: [{ id: lineId, quantity }] });

          if (errors || data.cartLinesUpdate.userErrors?.length) {
            throw new Error(data.cartLinesUpdate.userErrors?.[0]?.message ?? "Failed to update item");
          }

          set((state) => ({
            lines: state.lines.map((l) =>
              l.id === lineId ? { ...l, quantity } : l
            ),
          }));
        } catch (err: any) {
          toast.error(err.message ?? "Something went wrong updating the item.");
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "slb-cart",
      partialize: (state) => ({
        cartId: state.cartId,
        checkoutUrl: state.checkoutUrl,
        lines: state.lines,
      }),
    }
  )
);