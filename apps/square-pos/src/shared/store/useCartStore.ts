import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Discount = {
  discount_name: string;
  discount_value: string | number | null;
};

export type TaxRate = {
  name: string;
  percentage: string | number | null;
};

export type CartItem = {
  id: string;
  name: string;
  price: number | null;
  imageUrl: string;
  quantity: number;
  is_taxable?: boolean;
  itemTaxRate?: number;
  category?: string;
  itemDiscount?: Discount;
  variantId?: string;
  discounts?: Discount[];
  taxes?: TaxRate[];
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyItemDiscount: (itemId: string, discount: Discount) => void;
  removeItemDiscount: (itemId: string) => void;
  toggleItemTax: (itemId: string, enabled: boolean) => void;
  setItemTaxRate: (itemId: string, taxRate: TaxRate) => void;
  getOrderSummary: () => OrderSummary;
};

export type OrderSummary = {
  subtotal: number; // * sub-total before discounts and taxes
  discountAmount: number;
  taxAmount: number;
  total: number;
  appliedDiscounts: Discount[];
  appliedTaxRates: TaxRate[];
};

export const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            // If item exists, update quantity and merge properties
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? {
                      ...i,
                      ...item,
                      quantity: i.quantity + (item.quantity || 1),
                    }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        });
      },
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (!item) return state;
          if (quantity <= 0) {
            return { items: state.items.filter((i) => i.id !== id) };
          }
          return {
            items: state.items.map((i) =>
              i.id === id ? { ...i, quantity } : i
            ),
          };
        }),
      getOrderSummary: () => {
        const items = get().items;
        let subtotal = 0;
        let discountAmount = 0;
        let taxAmount = 0;
        const appliedDiscounts: Discount[] = [];
        const appliedTaxRates: TaxRate[] = [];

        for (const item of items) {
          const itemPrice = item.price ?? 0;
          const itemSubtotal = itemPrice * item.quantity;
          let itemDiscountValue = 0;
          let itemTaxValue = 0;

          // Apply discount if present
          if (item.itemDiscount) {
            appliedDiscounts.push(item.itemDiscount);
            itemDiscountValue = calculateItemDiscountValue(item, itemSubtotal);
          }
          const discountedSubtotal = itemSubtotal - itemDiscountValue;
          discountAmount += itemDiscountValue;

          // Apply tax if present and enabled
          if (item.is_taxable && item.itemTaxRate !== undefined) {
            appliedTaxRates.push({
              name:
                item.taxes?.find(
                  (t) => Number(t.percentage) === item.itemTaxRate
                )?.name || "Tax",
              percentage: item.itemTaxRate,
            });
            itemTaxValue = (discountedSubtotal * item.itemTaxRate) / 100;
          }
          taxAmount += itemTaxValue;
          subtotal += discountedSubtotal;
        }
        const total = subtotal + taxAmount;
        return {
          subtotal,
          discountAmount,
          taxAmount,
          total,
          appliedDiscounts,
          appliedTaxRates,
        };
      },
      clearCart: () => set({ items: [] }),
      applyItemDiscount: (itemId: string, discount: Discount) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, itemDiscount: discount } : item
          ),
        })),
      removeItemDiscount: (itemId: string) =>
        set((state) => ({
          items: state.items.map((item) => {
            if (item.id === itemId) {
              const { itemDiscount, ...rest } = item;
              return rest;
            }
            return item;
          }),
        })),
      toggleItemTax: (itemId: string, enabled: boolean) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, is_taxable: enabled } : item
          ),
        })),
      setItemTaxRate: (itemId: string, taxRate: TaxRate) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId
              ? {
                  ...item,
                  itemTaxRate:
                    typeof taxRate.percentage === "number"
                      ? taxRate.percentage
                      : taxRate.percentage
                        ? Number(taxRate.percentage)
                        : undefined,
                }
              : item
          ),
        })),
    }),
    {
      name: "cart-storage", // name of the item in storage
      // getStorage: () => localStorage // use localStorage or sessionStorage for persistence
      // Optionally, customize storage (default is localStorage)
      // storage: createJSONStorage(() => sessionStorage),
    }
  )
);

// Helper for discount calculation
function calculateItemDiscountValue(
  item: CartItem,
  itemSubtotal: number
): number {
  const value = item.itemDiscount?.discount_value;
  if (!value) return 0;
  // Percentage discount
  if (typeof value === "string" && value.includes("%")) {
    const percent = Number.parseFloat(value);
    return !Number.isNaN(percent) ? (itemSubtotal * percent) / 100 : 0;
  }
  // Fixed amount discount (number)
  if (typeof value === "number") {
    return value * item.quantity;
  }
  // Fixed amount discount (string that parses to number)
  if (typeof value === "string") {
    const num = Number.parseFloat(value);
    return !Number.isNaN(num) ? num * item.quantity : 0;
  }
  return 0;
}
