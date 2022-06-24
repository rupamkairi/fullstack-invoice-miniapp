export type invoiceForm = {
  invoiceNo: string;
  invoiceDate: Date;
  customer: customerType;
  products: productListingType[];
  payments: payementModesType;
};

export type customerType = {
  name: string;
  mobile?: string;
};

export type productType = {
  name: string;
  author: string;
  code: string;
  price: number;
};

export type productListingType = {
  quantity: number;
} & productType;

export type payementModesType = string[];
