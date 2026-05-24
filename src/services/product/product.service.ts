import API from "../../config/api.config";
import type { CreateProductPayload } from "../../features/products/validation/product.schema";
import type {
  IFindOneWithDetailsProductResponse,
  IFindProductsResponse,
} from "./product.types";

const BASE_URL = "/api/products";

const create = (data: CreateProductPayload): Promise<void> => {
  return API.post(BASE_URL, data);
};

const find = (filters: { name?: string }): Promise<IFindProductsResponse> => {
  return API.get(BASE_URL, {
    params: filters.name ? { name: filters.name } : {},
  });
};

const findOne = (id: string): Promise<IFindOneWithDetailsProductResponse> => {
  return API.get(`${BASE_URL}/${id}`);
};

const findOneWithDetails = (
  id: string,
): Promise<IFindOneWithDetailsProductResponse> => {
  return API.get(`${BASE_URL}/${id}/details`);
};

const updateOne = (id: string, payload: unknown) => {
  return API.patch(`${BASE_URL}/${id}`, payload);
};

export const productService = {
  create,
  find,
  findOne,
  findOneWithDetails,
  updateOne,
};
