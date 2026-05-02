import axios, { type CreateAxiosDefaults } from "axios";
import { FORBIDDEN, UNAUTHORIZED } from "../constants/http";

const options: CreateAxiosDefaults<unknown> = {
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  withCredentials: true, // to ensure cookies like refreshToken are sent
  headers: {
    "Access-Control-Allow-Origin": import.meta.env.VITE_BACKEND_BASE_URL,
  },
};

// create a separate client for refreshing the access token
// to avoid infinite loops with the error interceptor
const TokenRefreshClient = axios.create(options);
TokenRefreshClient.interceptors.response.use((response) => response.data);

const API = axios.create(options);

API.interceptors.response.use(
  (response) => {
    // jeśli status 204, zwracamy minimalny obiekt z samym status
    if (response.status === 204) {
      return { status: response.status };
    }
    // w pozostałych przypadkach zwracamy .data jak dotychczas
    return response.data;
  },
  async (error) => {
    const { config, response } = error;
    const { status, data } = response || {};

    console.log("Interceptor error response:", response);
    console.log("Error status:", status);
    console.log("Error data:", data);
    // Sprawdź, czy access token wygasł

    if (status === FORBIDDEN && data?.errorCode === "Forbidden") {
      window.location.replace("/login");
    }

    if (status === UNAUTHORIZED && data?.errorCode === "InvalidAccessToken") {
      console.log("Access token expired, trying to refresh the token...");

      try {
        // Spróbuj odświeżyć access token za pomocą refresh tokena
        await TokenRefreshClient.get("/api/auth/refresh");
        console.log("ODSWIEŻAM TOKEN");
        // Powtórz oryginalne żądanie z nowym tokenem
        return API(config);
      } catch (refreshError) {
        console.error("Error during token refresh:", refreshError);

        // Jeżeli refresh token również zwróci 401 (Unauthorized)

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject({ status, ...data });
  },
);

export default API;
