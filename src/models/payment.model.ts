import { IBaseState } from "./base-state.model";
import { IResponseBase } from "./response-base.model";

export interface IPayment {
  id: string;
  userId: string;
  orderNo: string;
  amount: number;
  status: string;
}

export const emptyPayment: IPayment = {
  id: "",
  userId: "",
  orderNo: "",
  amount: 0,
  status: "",
};

export interface IPaymentState extends IBaseState {
  readonly payments: IPayment[];
  readonly payment: IPayment;
}

export interface IPaymentResponse extends IResponseBase {
  data: IPayment
}