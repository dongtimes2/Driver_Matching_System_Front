import { UserType } from "../../types/accounts";
import { IGetAccount, IPatchAccount } from "../../types/api";
import { request } from "../config/axios";

export const getAccount = async () => {
  const res = await request<IGetAccount>({
    method: "get",
    url: "/accounts",
  });

  return res.data;
};

export const patchAccount = async (payload: { type: UserType }) => {
  const res = await request<IPatchAccount>({
    method: "patch",
    url: "/accounts",
    data: payload,
  });

  return res.data;
};
