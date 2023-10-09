import { IBaseState } from "./base-state.model";
import { IResponseBase } from "./response-base.model";

// name, description, "createdAt", "updatedAt", "deletedAt", quantity, "shortDescription", amount, "categoryId
export interface IProduct {
  id: number;
  name: string;
  amount: number;
  description: string;
  categoryId: string;
  storeId: string;
  shortDescription: string;
  productImages: string[];
  rating: number;
  quantity: number;
  reviews: string[];
  userId: string

  // createdAt: Date;
  // updatedAt: Date;
  // deletedAt: Date;
}

export const emptyProduct: IProduct = {
  id: 0,
  name: "",
  amount: 0,
  description: "",
  rating: 0,
  categoryId: "",
  storeId: "",
  shortDescription: "",
  productImages: [],
  quantity: 0,
  reviews: [],
  userId: ""
};

export interface IProductState extends IBaseState {
  readonly products: IProduct[];
  readonly product: IProduct;
}

export interface IProductResponse extends IResponseBase {
  data: IProduct;
}
