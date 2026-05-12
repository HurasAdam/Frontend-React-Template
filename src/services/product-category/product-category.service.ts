import API from "../../config/api.config";

const BASE_URL = "/api/product-categories";

const create = (data: { name: string; productId: string }) => {
  return API.post(`${BASE_URL}`, {
    name: data.name,
    productId: data.productId,
  });
};
export const productCategoryService = {
  create,
};
