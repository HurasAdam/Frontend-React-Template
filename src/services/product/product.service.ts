import API from "../../config/api.config";
import type { CreateProductPayload } from "../../features/products/validation/product.schema";
import type { IFindProductsResponse } from "./product.types";

const BASE_URL = "/api/products";

const create = (data: CreateProductPayload): Promise<void> => {
  return API.post(BASE_URL, data);
};

const find = (filters: { name?: string }): Promise<IFindProductsResponse> => {
  return API.get(BASE_URL, {
    params: filters.name ? { name: filters.name } : {},
  });
};
export const productService = {
  create,
  find,
};
