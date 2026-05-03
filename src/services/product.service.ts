import API from "../config/api.config";
import type { CreateProductPayload } from "../features/products/validation/product.schema";

const BASE_URL = "/api/products";

const create = (data: CreateProductPayload) => {
  return API.post(BASE_URL, data);
};

const find = () => {
  return API.get(BASE_URL);
};

export const productService = {
  create,
  find,
};
