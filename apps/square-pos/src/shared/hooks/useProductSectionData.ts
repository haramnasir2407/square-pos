import { useDiscounts } from "@/shared/hooks/useDiscounts";
import { useInventoryData } from "@/shared/hooks/useInventoryData";
import { usePricingRules } from "@/shared/hooks/usePricingRules";
import { useProductList } from "@/shared/hooks/useProductList";
import { useProductSets } from "@/shared/hooks/useProductSets";
import { useMemo, useState } from "react";
import {
  extractCategories,
  extractDiscounts,
  extractImages,
  extractItemIds,
  extractItems,
  extractPricingRules,
  extractProductSets,
  extractTaxes,
  extractVariationIds,
} from "../utils/dataExtractionUtils";
import {
  createDiscountToProductSetMap,
  transformCategories,
  transformDiscounts,
  transformPricingRules,
  transformProductSets,
  transformTaxes,
} from "../utils/productDataTransformers";

import type {
  UseProductSectionDataProps,
  UseProductSectionDataReturn,
  paramsType,
} from "@/shared/types/catalog";
import { createDiscountApplications } from "@/shared/utils/discount/discountApplicationUtils";
import { buildImageMap } from "@/shared/utils/image/imageUtils";
import {
  buildCartInventoryInfo,
  buildInventoryMap,
} from "../utils/inventory/inventoryUtils";

/**
 * Custom hook to manage and aggregate all product section data for the dashboard.
 * Handles fetching, transforming, and mapping of products, inventory, discounts, pricing rules, and categories.
 * Uses server-side data if provided, otherwise fetches client-side.
 */
export function useProductSectionData({
  accessToken,
  products,
  inventory,
}: UseProductSectionDataProps): UseProductSectionDataReturn {
  // * set params for fetching products
  const [params, setParams] = useState<paramsType>({
    types: "item, image, category, tax, discount, pricing_rule, product_set",
  });

  // * custom hook for fetching products - only run when there's a query
  const { data, isPending, error } = useProductList(
    params.query ? accessToken : "",
    params
  );

  // * custom hook for fetching discounts - only run when there's a query
  const { discounts: fetchedDiscounts } = useDiscounts(
    params.query ? accessToken : ""
  );

  // * custom hook for fetching pricing rules - only run when there's a query
  const { pricingRules: fetchedPricingRules } = usePricingRules(
    params.query ? accessToken : ""
  );

  // * custom hook for fetching product sets - only run when there's a query
  const { productSets: fetchedProductSets } = useProductSets(
    params.query ? accessToken : ""
  );

  // * use server-side products if provided, otherwise use client-fetched data
  const productData = useMemo(() => {
    // * if search/filter then use client rendered data
    if (params.query) {
      return data;
    }
    return products;
  }, [data, products, params.query]);

  // * get the items
  const items = extractItems(productData);

  // * get the taxes and discounts
  const taxes = extractTaxes(productData);

  // * variation ids are used for fetching inventory counts
  const variationIds = extractVariationIds(items);

  // * get the categories for use in filter functionality
  const categories = extractCategories(productData);

  // * get all item IDs
  const allItemIds = extractItemIds(items);

  // * build image map for quick lookup of image URLs by image id
  const images = extractImages(productData);
  const imageMap = buildImageMap(images);

  // * use fetched discounts if available, otherwise fall back to product data
  const discounts =
    fetchedDiscounts.length > 0
      ? fetchedDiscounts
      : extractDiscounts(productData);

  // * retrieve the pricing rule and products sets array
  const pricing_rules =
    fetchedPricingRules.length > 0
      ? fetchedPricingRules
      : extractPricingRules(productData);

  const product_sets =
    fetchedProductSets.length > 0
      ? fetchedProductSets
      : extractProductSets(productData);

  // * convert raw data to a structured data
  const taxes_data = transformTaxes(taxes);
  const discounts_data = transformDiscounts(discounts);
  const pricing_rules_data = transformPricingRules(pricing_rules);
  const product_sets_data = transformProductSets(product_sets);
  const categoryObjects = transformCategories(categories); // * save this to a json file

  // * maps discount IDs to the product set IDs they apply to
  const discountToProductSetMap =
    createDiscountToProductSetMap(pricing_rules_data);

  // * apply discount to product ids
  const discountApplications = createDiscountApplications(
    discountToProductSetMap,
    discounts_data,
    product_sets_data,
    allItemIds
  );

  // console.log(discountApplications);

  // * custom hook for fetching inventory
  const { data: clientInventory } = useInventoryData(
    variationIds,
    params.query ? accessToken : ""
  );
  // * use server-side inventory if provided, otherwise use client-fetched data
  const inventoryData = inventory || clientInventory;

  // * build a map from variation id to inventory info, for quick lookup
  const inventoryMap = buildInventoryMap(inventoryData);

  // * builds a map from item id to { state, quantity }, used in cart drawer
  const cartInventoryInfo = buildCartInventoryInfo(items, inventoryMap);

  return {
    params,
    setParams,
    isPending,
    error,
    items,
    taxes_data,
    cartInventoryInfo,
    inventoryMap,
    imageMap,
    variationIds,
    discountApplications,
    categoryObjects,
    catalogObjects: productData?.objects ?? [],
  };
}
