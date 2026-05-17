import API from "../../config/api.config";
import type { IFindOneProductCategoryResponse } from "./product-category.types";

const BASE_URL = "/api/product-categories";

const create = (data: { name: string; productId: string }) => {
  return API.post(`${BASE_URL}`, {
    name: data.name,
    productId: data.productId,
  });
};

const findOne = (id: string): Promise<IFindOneProductCategoryResponse> => {
  return API.get(`${BASE_URL}/${id}`);
};

const updateOne = (id: string, payload: unknown) => {
  return API.patch(`${BASE_URL}/${id}`, payload);
};

export const productCategoryService = {
  create,
  findOne,
  updateOne,
};
