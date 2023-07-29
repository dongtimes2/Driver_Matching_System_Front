import { IPostSignin } from "../../types/api";
import { request } from "../config/axios";

export const temp = {};

export const postSignin = async (idToken: string) => {
  const customHeader = {
    Authentication: `Bearer ${idToken}`,
  };

  const res = await request<IPostSignin>(
    {
      method: "post",
      url: "/auth/signin",
    },
    customHeader
  );

  return res.data;
};
