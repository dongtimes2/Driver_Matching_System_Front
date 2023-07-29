import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const BASE_URL = process.env.SERVER_URL;
let accessToken: string | null = null;

export const setAccessToken = (token: string) => {
  accessToken = token;
};

const handleAxiosError = (error: AxiosError) => {
  if (error.response?.status === 401) {
    return Promise.reject(error);
  }
  return Promise.reject(error);
};

axios.interceptors.request.use((config) => {
  // eslint-disable-next-line
  config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";

  return config;
});

axios.interceptors.response.use((res) => res, handleAxiosError);

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
