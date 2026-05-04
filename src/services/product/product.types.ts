export interface IProduct {
  id: string;
  name: string;
  labelColor: string;
  createdBy: string;
}

export type IFindOneProductResponse = IProduct;
export type IFindProductsResponse = IProduct[];
