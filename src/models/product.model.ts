import { IBaseState } from "./base-state.model";
import { IResponseBase } from "./response-base.model";

// name, description, "createdAt", "updatedAt", "deletedAt", qtty, "shortDescription", amount, "categoryId
export interface IProduct {
  id: string;
  name: string;
  amount: number;
  description: string;
  categoryId: string;
  storeId: string;
  shortDescription: string;
  productImages: string[];
  qtty: number;
  reviews: string[];
  tags: string[];
}

export const emptyProduct: IProduct = {
  id: "",
  name: "",
  amount: 0,
  description: "",
  categoryId: "",
  storeId: "",
  shortDescription: "",
  productImages: [],
  qtty: 0,
  reviews: [],
  tags: [],
};

export interface IProductState extends IBaseState {
  readonly products: IProduct[];
  readonly product: IProduct;
}

export interface IProductResponse extends IResponseBase {
  data: IProduct;
}
