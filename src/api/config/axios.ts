/* eslint-disable */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { TokenController } from "../../utils/tokenController";
import { IPostRefreshToken } from "../../types/api";

interface ICustomAxiosResponse<T = any, D = any> extends AxiosResponse {
  data: { message: string };
}

interface ICustomAxiosError<T = unknown, D = any> extends AxiosError {
  response?: ICustomAxiosResponse<T, D>;
}

export const BASE_URL = process.env.SERVER_URL;

const tokenController = new TokenController();

const handleAxiosError = async (error: ICustomAxiosError) => {
  const { config: originalRequest, response } = error;

  if (
    response?.status === 401 &&
    response.data.message === "expired_access_token"
  ) {
    const {
      data: { accessToken },
    } = await request<IPostRefreshToken>({
      method: "post",
      url: "/auth/refresh",
    });

    tokenController.setAccessToken(accessToken);

    if (originalRequest) {
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return axios(originalRequest);
    }
  } else {
    return Promise.reject(error);
  }
};

export const request = async <T>(param: AxiosRequestConfig) => {
  return axios({
    baseURL: BASE_URL,
    ...param,
    withCredentials: true,
  }).then((res: AxiosResponse<T>) => res);
};

axios.interceptors.request.use((config) => {
  const accessToken = tokenController.getAccessToken();

  config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";

  return config;
});

axios.interceptors.response.use((res) => res, handleAxiosError);
