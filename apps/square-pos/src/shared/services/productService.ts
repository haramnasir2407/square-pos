// this is a function that fetches products from the Square API
// it takes an access token and a params object
// the params object is an object with the query parameters
// the function returns the data from the API

export async function fetchProducts(
  accessToken: string,
  params?: Record<string, unknown>
) {
  if (!accessToken) {
    return null;
  }

  if (params) {
    const query = (
      params as { query?: { set_query?: unknown; text_query?: unknown } }
    ).query;
    const setQuery = query?.set_query; // * for filter by category
    const textQuery = query?.text_query; // * for search by keyword

    let queryObj = undefined;

    if (setQuery && textQuery) {
      // * combine both queries
      queryObj = {
        set_query: setQuery,
        text_query: textQuery,
      };
    } else if (setQuery) {
      queryObj = { set_query: setQuery };
    } else if (textQuery) {
      queryObj = { text_query: textQuery };
    }

    const types = (params as { types?: string }).types;
    const body = {
      object_types: types
        ? types.split(",").map((t: string) => t.trim().toUpperCase())
        : [],
      query: queryObj,
      include_related_objects: true,
    };

    const response = await fetch("/api/products/searchCatalog", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products(1)");
    }

    const data = await response.json();
    return data;
  }
  return null;
}
