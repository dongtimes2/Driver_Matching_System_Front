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

const tokenController = new TokenController();

export const BASE_URL = process.env.SERVER_URL;

export const setAccessToken = (accessToken: string) => {
  tokenController.setAccessToken(accessToken);
};

export const setRefreshToken = (refreshToken: string) => {
  tokenController.setRefreshToken(refreshToken);
};

const handleAxiosError = async (error: ICustomAxiosError) => {
  const { config, response } = error;
  if (
    response?.status === 401 &&
    response.data.message === "expired_access_token"
  ) {
    const {
      data: { accessToken, refreshToken },
    } = await refreshRequest.post<IPostRefreshToken>("/auth/refresh");

    tokenController.setAccessToken(accessToken);
    tokenController.setRefreshToken(refreshToken);

    const originalRequest = config!;
    originalRequest.headers.Authorization = `Bearer ${accessToken}`;

    return axios(originalRequest);
  } else {
    return Promise.reject(error);
  }
};

// refresh 요청 전용 로직
export const refreshRequest = axios.create({ baseURL: BASE_URL });

refreshRequest.interceptors.request.use((config) => {
  const accessToken = tokenController.getAccessToken();
  const refreshToken = tokenController.getRefreshToken();

  config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";
  config.headers.refresh = refreshToken ? `Bearer ${refreshToken}` : "";

  return config;
});

refreshRequest.interceptors.response.use((res) => res, handleAxiosError);

// 일반 요청 로직
export const request = async <T>(
  param: AxiosRequestConfig,
  customHeader?: unknown
) => {
  const headers = customHeader
    ? { ...param.headers, ...customHeader }
    : param.headers;

  return axios({
    baseURL: BASE_URL,
    ...param,
    headers,
  }).then((res: AxiosResponse<T>) => res);
};

axios.interceptors.request.use((config) => {
  const accessToken = tokenController.getAccessToken();

  config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";

  return config;
});

axios.interceptors.response.use((res) => res, handleAxiosError);
