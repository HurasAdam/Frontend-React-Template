export interface IProduct {
  id: string;
  name: string;
  labelColor: string;
  createdBy: string;
}

export interface IProductWithDetails {
  id: string;
  name: string;
  labelColor: string;
  createdBy: string;
  createdAt: string;

  categories: {
    id: string;
    name: string;
  }[];

  topics: {
    id: string;
    name: string;
  }[];
}

export type IFindOneProductResponse = IProduct;
export type IFindProductsResponse = IProduct[];
export type IFindOneWithDetailsProductResponse = IProductWithDetails;
