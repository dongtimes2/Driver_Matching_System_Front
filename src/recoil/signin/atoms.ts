import { atom } from "recoil";
import { TokenController } from "../../utils/tokenController";

const tokenController = new TokenController();

export const $signinState = atom({
  key: "signinAtom",
  default:
    !!tokenController.getAccessToken() && !tokenController.isTokenExpired(),
});
