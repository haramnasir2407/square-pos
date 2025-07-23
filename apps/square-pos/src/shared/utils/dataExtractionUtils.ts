import type {
  CatalogObject,
  Category,
  CategoryObject,
  Discount,
  Image,
  Item,
  PricingRule,
  ProductCatalog,
  ProductSet,
  Tax,
} from "@/shared/types/catalog";

/**
 * Extracts items from product data
 */
export function extractItems(productData: ProductCatalog): Item[] {
  return (
    productData?.objects?.filter((obj): obj is Item => obj.type === "ITEM") ||
    []
  );
}

/**
 * Extracts taxes from product data (both objects and related_objects)
 */
export function extractTaxes(productData: ProductCatalog): Tax[] {
  return [
    ...(productData?.objects?.filter((obj): obj is Tax => obj.type === "TAX") ??
      []),
    ...(productData?.related_objects?.filter(
      (obj): obj is Tax => obj.type === "TAX"
    ) ?? []),
  ];
}

/**
 * Extracts discounts from product data
 */
export function extractDiscounts(productData: ProductCatalog): Discount[] {
  return (
    productData?.objects?.filter(
      (obj): obj is Discount => obj.type === "DISCOUNT"
    ) || []
  );
}

/**
 * Extracts pricing rules from product data
 */
export function extractPricingRules(
  productData: ProductCatalog
): PricingRule[] {
  return (
    productData?.objects?.filter(
      (obj): obj is PricingRule => obj.type === "PRICING_RULE"
    ) || []
  );
}

/**
 * Extracts product sets from product data
 */
export function extractProductSets(productData: ProductCatalog): ProductSet[] {
  return (
    productData?.objects?.filter(
      (obj): obj is ProductSet => obj.type === "PRODUCT_SET"
    ) || []
  );
}

/**
 * Extracts categories from product data
 */
export function extractCategories(productData: ProductCatalog): Category[] {
  return (
    productData?.objects?.filter(
      (obj): obj is Category => obj.type === "CATEGORY"
    ) || []
  );
}

/**
 * Determines which data source to use based on whether there's a query
 */
// export function determineProductData(
//   data: any,
//   products: any,
//   params: { query?: string }
// ): any {
//   // If search/filter then use client data
//   if (params.query) {
//     return data;
//   }
//   return products;
// }

/**
 * Determines if client-side fetching is happening
 */
// export function isClientSideFetching(
//   params: { query?: string },
//   isPending: boolean
// ): boolean {
//   return Boolean(params.query && isPending);
// }

/**
 * Extracts all item IDs from items array
 */
export function extractItemIds(items: Item[]): string[] {
  return items.map((item) => item.id);
}

/**
 * Extracts variation IDs from items array
 */
export function extractVariationIds(items: Item[]): string[] {
  // * flatMap is used to return an array of arrays as a single array
  return items.flatMap(
    (item) => item.item_data?.variations?.map((v) => v.id) ?? []
  );
}

/**
 * Extracts all images from product data (both objects and related_objects)
 */
export function extractImages(productData: ProductCatalog): Image[] {
  return [
    ...(productData?.objects?.filter(
      (obj): obj is Image => obj.type === "IMAGE"
    ) ?? []),
    ...(productData?.related_objects?.filter(
      (obj): obj is Image => obj.type === "IMAGE"
    ) ?? []),
  ];
}
