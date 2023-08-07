import { IPostSignin } from "../../types/api";
import { request } from "../config/axios";

export const postSignin = async (idToken: string) => {
  const res = await request<IPostSignin>({
    method: "post",
    url: "/auth/signin",
    headers: {
      Authentication: `Bearer ${idToken}`,
    },
  });

  return res.data;
};

export const postSignout = async () => {
  const res = await request({
    method: "post",
    url: "/auth/signout",
  });

  return res.data;
};
