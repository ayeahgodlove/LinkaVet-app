import { IBaseState } from "./base-state.model";
import { IResponseBase } from "./response-base.model";

export interface IUser {
  id: string;
  firstname: string;
  authStrategy: string;
  lastname: string;
  username: string;
  email: string;
  avatar: string;
  phoneNumber: string;
  city: string; //town
  country: string;
  address: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  verified: boolean;
  isNormalUser: boolean
}

export const emptyUser: IUser = {
  id: "",
  username: "",
  lastname: "",
  firstname: "",
  email: "",
  password: "",
  address: "",
  phoneNumber: "",
  isNormalUser: true,
  authStrategy: "",
  avatar: "",
  city: "",
  country: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  verified: false
};

export interface IUserState extends IBaseState {
  readonly users: IUser[];
  readonly user: IUser;
}

export interface IUserResponse extends IResponseBase {
  data: IUser;
  message: string;
}
export interface IUserResponses extends IResponseBase {
  data: IUser[];
}