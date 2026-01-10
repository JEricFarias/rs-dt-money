import AsyncStorage from "@react-native-async-storage/async-storage";
import type { AxiosInstance } from "axios";

import type { IAuthenticateResponse } from "@/shared/interfaces/https/authenticate-response";

export function addTokenToRequest(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.request.use(async (config) => {
    const useData = await AsyncStorage.getItem("dt-money-user");

    if (useData) {
      const { token } = JSON.parse(useData) as IAuthenticateResponse;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  });
}
