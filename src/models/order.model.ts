import { IBaseState } from "./base-state.model";
import { IResponseBase } from "./response-base.model";

export interface IOrder {
  id: string;
  userId: string;
  productId: string;
  unitPrice: number;
  total: number;
  status: string;
  orderNo: string;
}

export const emptyOrder: IOrder = {
  id: "",
  userId: "",
  productId: "",
  unitPrice: 0,
  total: 0,
  status: "",
  orderNo: "",
};

export interface IOrderState extends IBaseState {
  readonly orders: IOrder[];
  readonly order: IOrder;
}

export interface IOrderResponse extends IResponseBase {
  data: IOrder;
}
