import { IBaseState } from "./base-state.model";
import { IResponseBase } from "./response-base.model";

export interface IInitPayment {
  amount: string;
  operator: string;
  telephone: string;
  name: string;
  email: string;
  address: string;
}

export const emptyInitPayment: IInitPayment = {
  amount: "",
  operator: "",
  telephone: "",
  name: "",
  email: "",
  address: "",
};

export interface IInitPaymentState extends IBaseState {
  readonly initPayments: IInitPayment[];
  readonly initPayment: IInitPayment;
}

export interface IInitPaymentResponse extends IResponseBase {
  data: IInitPayment;
}
