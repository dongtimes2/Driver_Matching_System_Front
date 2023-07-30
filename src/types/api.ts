export interface IPostSignin {
  accessToken: string;
}

export interface IGetAccount {
  name: string;
  type: string;
}

export interface IPatchAccount {
  type: string;
}
