import API from "../../config/api.config";

const BASE_URL = "/api/contact-registry";

const add = (data: unknown): Promise<void> => {
  return API.post(BASE_URL, data);
};

export const contactRegistryService = {
  add,
};
