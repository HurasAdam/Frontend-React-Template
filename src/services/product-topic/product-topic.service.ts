import API from "../../config/api.config";
import type { IFindOneProductTopicResponse } from "./product-topic.types";

const BASE_URL = "/api/product-topics";

const create = (data: { name: string; product: string }) => {
  return API.post(`${BASE_URL}`, {
    name: data.name,
    product: data.product,
  });
};

const find = () => {
  return API.get(`${BASE_URL}`);
};

const findOne = (id: string): Promise<IFindOneProductTopicResponse> => {
  return API.get(`${BASE_URL}/${id}`);
};

const updateOne = (id: string, payload: unknown) => {
  return API.patch(`${BASE_URL}/${id}`, payload);
};

const deleteOne = (id: string): Promise<void> => {
  return API.delete(`${BASE_URL}/${id}`);
};
export const productTopicService = {
  create,
  find,
  findOne,
  updateOne,
  deleteOne,
};
