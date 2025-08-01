"use client";

import DashboardLoader from "@/components/primitives/derived/DashboardLoader";
import { useProductSectionData } from "@/shared/hooks/useProductSectionData";
import type { ProductSectionProps } from "@/shared/types/catalog";
import { css } from "~/styled-system/css";
import CartDrawer from "../cart/CartDrawer";

import { hasValidQuery } from "@/shared/hooks/useProductList";
import FilterButton from "../filter/FilterButton";
import SearchBar from "../search/SearchBar";
import ProductCard from "./ProductCard";

/**
 * Section component for displaying a grid of products with filtering, search, and cart drawer.
 * Handles data loading, error states, and product mapping.
 */

/* @compile */
export default function ProductSection({
  accessToken,
  products,
  inventory,
}: ProductSectionProps) {
  const {
    params,
    setParams,
    dataIsPending,
    error,
    items,
    taxes_data,
    cartInventoryInfo,
    inventoryMap,
    imageMap,
    variationIds,
    discountApplications,
  } = useProductSectionData({ accessToken, products, inventory });

  // * Render the main product section layout
  return (
    <div className={css({ w: "full", mt: "8" })}>
      {/* cart drawer */}
      <CartDrawer
        accessToken={accessToken}
        cartInventoryInfo={cartInventoryInfo}
        itemVariationIds={variationIds}
      />
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8",
          mb: "6",
          width: "100%",
        })}
      >
        {/* filter button and search bar */}
        <FilterButton
          setParams={(newParams) => setParams({ ...params, ...newParams })}
          prevParams={params}
        />
        <SearchBar
          setParams={(newParams) => setParams({ ...params, ...newParams })}
          prevParams={params}
        />
      </div>
      {hasValidQuery(params.query) && dataIsPending && <DashboardLoader />}
      {Boolean(error) && <div>Error loading products</div>}
      {!dataIsPending && !error && items.length === 0 && (
        <div style={{ textAlign: "center", margin: "2rem 0", color: "#888" }}>
          No items found
        </div>
      )}
      <div
        className={css({
          display: "grid",
          gridTemplateColumns: ["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"], // responsive: 1/2/3 columns
          gap: "4",
        })}
      >
        {items.map((item) => {
          // * Extract product and variation details
          const name = item.item_data?.name ?? "Name unknown";
          const variation =
            item.item_data?.variations?.[0]?.item_variation_data;
          const variationId = item.item_data?.variations?.[0]?.id;
          const price = variation?.price_money?.amount ?? null;
          const imageId = item.item_data?.image_ids?.[0];
          const imageUrl = imageId ? imageMap[imageId] : "/placeholder.jpg";
          const is_taxable = item.item_data?.is_taxable;
          const tax_ids = item.item_data?.tax_ids;
          const categoryId = item.item_data?.categories?.[0]?.id;

          // * Match tax ids with taxes_data
          const matchedTaxes = (tax_ids ?? []).map((tax_id: string) => {
            const tax = taxes_data.find((t) => t.id === tax_id);
            return tax ? { name: tax.name, percentage: tax.percentage } : null;
          });

          // * Build discounts array for each item
          const discounts = discountApplications
            .filter((app) => {
              if (app.applied_product_ids.includes(item.id)) return true;
              if (categoryId && app.applied_product_ids.includes(categoryId))
                return true;
              return false;
            })
            .map((app) => ({
              discount_name: app.discount_name,
              discount_value: app.discount_value,
            }));

          // * Inventory management
          const inventory = variationId ? inventoryMap[variationId] : undefined;
          const state = inventory?.state ?? "Unknown";
          const quantity = inventory?.quantity ?? "-";

          return (
            <div
              key={item.id}
              className={css({
                border: "1px solid token(colors.gray.200)",
                borderRadius: "md",
                p: "2",
                bg: "white",
                boxShadow: "sm",
              })}
            >
              <ProductCard
                id={item.id}
                name={name}
                price={price}
                imageUrl={imageUrl}
                state={state}
                quantity={quantity}
                is_taxable={is_taxable}
                variationId={variationId}
                discounts={discounts}
                taxes={matchedTaxes.filter(
                  (tax): tax is { name: string; percentage: string | number } =>
                    tax !== null
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
