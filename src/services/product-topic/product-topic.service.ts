import API from "../../config/api.config";

const BASE_URL = "/api/product-topics";

const create = (data: { name: string; product: string }) => {
  return API.post(`${BASE_URL}`, {
    name: data.name,
    product: data.product,
  });
};

export const productTopicService = {
  create,
};
