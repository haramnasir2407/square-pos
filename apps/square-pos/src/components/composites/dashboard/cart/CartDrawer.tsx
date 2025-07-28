"use client";

import CustomSelect from "@/components/primitives/derived/CustomSelect";
import {
  ORDER_LEVEL_DISCOUNTS,
  ORDER_LEVEL_TAXES,
} from "@/shared/constants/order_discounts_taxes";
import { type CartItem, useCartStore } from "@/shared/store/useCartStore";
import {
  getDrawerOrderSummary,
  handleDiscountSelect,
  handleDiscountToggle,
  handleItemLevelChange,
  handleOrderLevelChange,
  handleTaxSelect,
  handleTaxToggle,
} from "@/shared/utils/cart/cartDrawerUtils";
import { useState } from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { css, cx } from "~/styled-system/css";
import { OrderSummary } from "../order/OrderSummary";
import CartItemCard from "./CartItemCard";

/**
 * Drawer component for displaying and managing the shopping cart.
 * Handles item-level and order-level discounts/taxes, inventory, and checkout.
 */
export default function CartDrawer({
  accessToken,
  cartInventoryInfo,
}: CartDrawerProps) {
  // Use zustand store instead of CartContext
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const toggleItemTax = useCartStore((state) => state.toggleItemTax);
  const getOrderSummary = useCartStore((state) => state.getOrderSummary);
  const clearCart = useCartStore((state) => state.clearCart);
  const applyItemDiscount = useCartStore((state) => state.applyItemDiscount);
  const removeItemDiscount = useCartStore((state) => state.removeItemDiscount);
  const setItemTaxRate = useCartStore((state) => state.setItemTaxRate);

  const [open, setOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  // * store selected discount per item
  const [selectedDiscounts, setSelectedDiscounts] = useState<
    Record<string, SelectedDiscount>
  >({});

  // * store selected taxes per item
  const [selectedTaxes, setSelectedTaxes] = useState<
    Record<string, SelectedTax>
  >({});

  // * store selected order-level discount/tax
  const [selectedOrderDiscount, setSelectedOrderDiscount] =
    useState<SelectedOrderDiscount | null>(null);
  const [selectedOrderTax, setSelectedOrderTax] =
    useState<SelectedOrderTax | null>(null);

  // * exclusivity logic: if order-level is selected, disable item-level, and vice versa
  const isOrderLevelActive = !!selectedOrderDiscount || !!selectedOrderTax;
  const isItemLevelActive = items.some(
    (item) =>
      item.itemDiscount || (item.is_taxable && item.itemTaxRate !== undefined)
  );

  const drawerOrderSummary = getDrawerOrderSummary({
    isOrderLevelActive,
    items,
    selectedOrderDiscount,
    selectedOrderTax,
    getOrderSummary,
  });

  return (
    <>
      <button
        type="button"
        className={css({
          position: "fixed",
          top: "3",
          right: "6",
          zIndex: 50,
          bg: "blue.600",
          color: "white",
          px: "4",
          py: "2",
          borderRadius: "md",
          fontWeight: "bold",
          _hover: { bg: "blue.700" },
          display: "flex",
          alignItems: "center",
          gap: "2",
        })}
        onClick={() => setOpen(true)}
        aria-label={`Open cart with ${items.length} items`}
      >
        <MdOutlineAddShoppingCart size={22} />
        <span>({items.length})</span>
      </button>
      <div
        className={cx(
          css({
            position: "fixed",
            top: 0,
            right: 0,
            height: "100vh",
            width: "96",
            bg: "white",
            boxShadow: "lg",
            zIndex: 100,
            transform: open ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            display: "flex",
            flexDirection: "column",
            p: "6",
          })
        )}
        style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}
      >
        <button
          type="button"
          className={css({
            alignSelf: "flex-end",
            mb: "4",
            color: "gray.600",
            fontSize: "xl",
            cursor: "pointer",
          })}
          onClick={() => {
            setOpen(false);
            setShowCheckout(false);
          }}
        >
          &times;
        </button>

        {!showCheckout ? (
          <>
            <h2
              className={css({ fontSize: "2xl", fontWeight: "bold", mb: "4" })}
            >
              Shopping Cart
            </h2>
            {items.length === 0 ? (
              <p className={css({ color: "gray.500" })}>Your cart is empty.</p>
            ) : (
              <div className={css({ flex: 1, overflowY: "auto" })}>
                {items.map((item, idx) => {
                  const inventory = cartInventoryInfo[item.id];
                  const quantity = inventory?.quantity ?? "-";
                  const discounts = item.discounts || [];
                  const taxes = item.taxes || [];
                  const inventoryQty =
                    typeof quantity === "string"
                      ? Number.parseInt(quantity, 10)
                      : (quantity ?? 0);
                  const atMaxQty = item.quantity >= inventoryQty;
                  return (
                    <CartItemCard
                      key={item.id}
                      item={item}
                      inventory={inventory}
                      atMaxQty={atMaxQty}
                      selectedDiscount={selectedDiscounts[item.id]}
                      selectedTax={{
                        name: item.name,
                        percentage: selectedTaxes[item.id]?.itemTaxRate ?? 0,
                      }}
                      discounts={discounts}
                      taxes={taxes}
                      onQtyChange={(qty) => updateQuantity(item.id, qty)}
                      onRemove={() => removeItem(item.id)}
                      onDiscountToggle={(checked) =>
                        handleDiscountToggle({
                          item,
                          checked,
                          handleItemLevelChange: () =>
                            handleItemLevelChange({
                              setSelectedOrderDiscount,
                              setSelectedOrderTax,
                            }),
                          selectedDiscounts,
                          applyItemDiscount,
                          removeItemDiscount,
                        })
                      }
                      onDiscountSelect={(discount) =>
                        handleDiscountSelect({
                          setSelectedDiscounts,
                          item,
                          discount,
                        })
                      }
                      onTaxToggle={(checked) =>
                        handleTaxToggle({
                          item,
                          checked,
                          handleItemLevelChange: () =>
                            handleItemLevelChange({
                              setSelectedOrderDiscount,
                              setSelectedOrderTax,
                            }),
                          toggleItemTax,
                        })
                      }
                      onTaxSelect={(value) =>
                        handleTaxSelect({
                          setSelectedTaxes,
                          item,
                          value,
                          setItemTaxRate,
                        })
                      }
                    />
                  );
                })}
              </div>
            )}

            <div
              className={css({
                mt: "auto",
                pt: "4",
                borderTop: "none",
                display: "flex",
                flexDirection: "column",
                gap: "2",
              })}
            >
              <div
                className={css({
                  bg: "white",
                  boxShadow: "sm",
                  borderRadius: "lg",
                  p: "4",
                  mb: "2",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2",
                })}
              >
                {/* Order-level discount/tax controls */}
                <label
                  htmlFor="order-discount"
                  className={css({
                    fontSize: "sm",
                    fontWeight: "bold",
                    mr: "2",
                  })}
                >
                  Order Discount:
                </label>
                <CustomSelect
                  id="order-discount"
                  value={selectedOrderDiscount?.name || ""}
                  onChange={(value) => {
                    const discount =
                      ORDER_LEVEL_DISCOUNTS.find((d) => d.name === value) ||
                      null;
                    handleOrderLevelChange({
                      type: "discount",
                      value: discount as SelectedOrderDiscount,
                      setSelectedOrderDiscount,
                      setSelectedOrderTax,
                      items,
                      removeItemDiscount,
                      toggleItemTax,
                      setItemTaxRate,
                    });
                  }}
                  disabled={isItemLevelActive}
                  options={[
                    { value: "", label: "Select Discount" },
                    ...ORDER_LEVEL_DISCOUNTS.map((discount) => ({
                      value: discount.name,
                      label: `${discount.name} (${discount.percentage}%)`,
                    })),
                  ]}
                  placeholder="Select Discount"
                  size="sm"
                  className={css({ mr: "2" })}
                />
                <label
                  htmlFor="order-tax"
                  className={css({
                    fontSize: "sm",
                    fontWeight: "bold",
                    mr: "2",
                  })}
                >
                  Order Tax:
                </label>
                <CustomSelect
                  id="order-tax"
                  value={selectedOrderTax?.name || ""}
                  onChange={(value) => {
                    const tax =
                      ORDER_LEVEL_TAXES.find((t) => t.name === value) || null;
                    handleOrderLevelChange({
                      type: "tax",
                      value: tax,
                      setSelectedOrderDiscount,
                      setSelectedOrderTax,
                      items,
                      removeItemDiscount,
                      toggleItemTax,
                      setItemTaxRate,
                    });
                  }}
                  disabled={isItemLevelActive}
                  options={[
                    { value: "", label: "Select Tax" },
                    ...ORDER_LEVEL_TAXES.map((tax) => ({
                      value: tax.name,
                      label: `${tax.name} (${tax.percentage}%)`,
                    })),
                  ]}
                  placeholder="Select Tax"
                  size="sm"
                />
                {isItemLevelActive && (
                  <span
                    className={css({
                      color: "red.500",
                      fontSize: "xs",
                      ml: "2",
                    })}
                  >
                    (Disable item-level discounts/taxes to use order-level)
                  </span>
                )}
                {/* Show order-level discount/tax if active */}
                {isOrderLevelActive && (
                  <div
                    className={css({
                      fontSize: "xs",
                      color: "gray.700",
                      mb: "1",
                    })}
                  >
                    {selectedOrderDiscount && (
                      <div>
                        <b>Order Discount:</b> {selectedOrderDiscount.name} (-
                        {selectedOrderDiscount.percentage}%)
                      </div>
                    )}
                    {selectedOrderTax && (
                      <div>
                        <b>Order Tax:</b> {selectedOrderTax.name} (+
                        {selectedOrderTax.percentage}%)
                      </div>
                    )}
                  </div>
                )}
                <div
                  className={css({
                    fontWeight: "bold",
                    fontSize: "lg",
                    mb: "1",
                  })}
                >
                  Total: ${(drawerOrderSummary.total / 100).toFixed(2)}
                </div>
              </div>
              <button
                type="button"
                className={css({
                  w: "full",
                  bg: "gray.200",
                  color: "black",
                  py: "2",
                  borderRadius: "md",
                  fontWeight: "semibold",
                  fontSize: "sm",
                  _hover: { bg: "gray.300" },
                })}
                disabled={items.length === 0}
                onClick={() => {
                  clearCart();
                  setShowCheckout(false);
                }}
              >
                Clear Cart
              </button>
              <button
                type="button"
                className={css({
                  w: "full",
                  bg: "green.600",
                  color: "white",
                  py: "3",
                  borderRadius: "md",
                  fontWeight: "bold",
                  fontSize: "md",
                  _hover: { bg: "green.700" },
                })}
                disabled={items.length === 0}
                onClick={() => setShowCheckout(true)}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        ) : (
          <OrderSummary
            items={items}
            accessToken={accessToken || ""}
            onGoBack={() => setShowCheckout(false)}
            clearCart={clearCart}
            setShowCheckout={setShowCheckout}
            setOpen={setOpen}
          />
        )}
      </div>

      {open && (
        // * creates the background overlay
        <div
          className={css({
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.2)",
            zIndex: 99,
          })}
          onClick={() => setOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setOpen(false);
            }
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setOpen(false);
            }
          }}
        />
      )}
    </>
  );
}
