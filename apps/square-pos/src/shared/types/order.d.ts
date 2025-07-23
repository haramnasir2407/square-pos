export type OrderDiscount = {
  name: string;
  percentage?: string;
  amount?: number;
  scope: "ORDER" | "LINE_ITEM";
  type: "FIXED_PERCENTAGE" | "FIXED_AMOUNT";
  uid: string;
};

export type OrderTax = {
  name: string;
  percentage: string;
  scope: "ORDER" | "LINE_ITEM";
  type: "ADDITIVE" | "INCLUSIVE";
  uid: string;
};

export type OrderResult = {
  order: {
    id?: string;
    location_id: string;
    state: string;
    discounts: OrderDiscount[];
    taxes: OrderTax[];
    line_items: line_item[];
    total_money: {
      amount: number;
      currency: string;
    };
    total_tax_money: {
      amount: number;
      currency: string;
    };
    total_discount_money: {
      amount: number;
      currency: string;
    };
  };
};

export type line_item = {
  item_type: string;
  uid: string;
  name: string;
  quantity: string;
  base_price_money: {
    amount: number;
    currency: string;
  };
  total_money: {
    amount: number;
    currency: string;
  };
  catalog_object_id: string;
  gross_sales_money: {
    amount: number;
    currency: string;
  };
  applied_discounts: {
    uid: string;
    discount_uid: string;
    applied_money: {
      amount: number;
      currency: string;
    };
  }[];
  applied_taxes: {
    uid: string;
    tax_uid: string;
    applied_money: {
      amount: number;
      currency: string;
    };
  }[];
};

export type OrderPreview = {
  order: {
    location_id: string;
    state: string;
    discounts: OrderDiscount[];
    taxes: OrderTax[];
    line_items: line_item[];
    total_money: {
      amount: number;
      currency: string;
    };
    total_tax_money: {
      amount: number;
      currency: string;
    };
    total_discount_money: {
      amount: number;
      currency: string;
    };
  };
};
