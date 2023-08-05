import { IPostRefreshToken, IPostSignin } from "../../types/api";
import { refreshRequest, request } from "../config/axios";

export const postSignin = async (idToken: string) => {
  const res = await request<IPostSignin>(
    {
      method: "post",
      url: "/auth/signin",
    },
    {
      Authentication: `Bearer ${idToken}`,
    }
  );

  return res.data;
};

export const postRefreshToken = async () => {
  const res = await refreshRequest
    .post<IPostRefreshToken>("/auth/refresh")
    .catch((error) => {
      throw new Error(error);
    });

  return res.data;
};
