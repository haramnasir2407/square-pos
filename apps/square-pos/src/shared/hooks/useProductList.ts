import { fetchProducts } from "@/shared/services/productService";
// this is a hook that fetches products from the Square API

import { useQuery } from "@tanstack/react-query";
import type { paramsType } from "../types/catalog";

/**
 * Hook to fetch products from the Square API
 * @param access_token - The access token for the Square API
 * @param params - The parameters for the query
 * @returns The products
 */
export function useProductList(access_token: string, params?: paramsType) {
  // * useQuery is used for get requests
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => fetchProducts(access_token, params),
    enabled: !!access_token,
  });
}
