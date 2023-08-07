import { UserType } from "./accounts";
import { ICoordinate } from "./map";

export interface IPostSignin {
  accessToken: string;
}

export interface IPostRefreshToken {
  accessToken: string;
}

export interface IGetAccount {
  name: string;
  type: UserType;
}

export interface IPatchAccount {
  name: string;
  type: UserType;
}

export interface ICall {
  uuid: string;
  coordinate: ICoordinate;
  passengerName: string;
  passengerSid: string;
}
