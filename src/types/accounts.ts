export type UserType = "driver" | "passenger";

export interface IUser {
  type: UserType;
  name: string;
}
