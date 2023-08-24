import { IBaseState } from "./base-state.model";
import { IResponseBase } from "./response-base.model";

export interface ICategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISubCategory extends ICategory {
  categoryId: string;
}

export const emptyCategory: ICategory = {
  id: "",
  name: "",
  slug: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  description: ""
};

export const emptySubCategory: ISubCategory = {
  ...emptyCategory,
  categoryId: "",
};


export interface ICategoryState extends IBaseState {
  readonly categories: ICategory[]
  readonly category: ICategory
} 
export interface ISubCategoryState extends IBaseState {
  readonly subCategories: ISubCategory[]
  readonly subCategory: ISubCategory
} 

export interface ICategoryResponse extends IResponseBase {
  data: ICategory;
}

export interface ICategoryResponses extends IResponseBase {
  data: ICategory[];
}

export interface ISubCategoryResponse extends IResponseBase {
  data: ISubCategory;
}


