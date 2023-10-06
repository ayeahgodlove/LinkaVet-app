import { IProduct, IProductResponse } from "models/product.model";
import { requestType } from "services";

export const ProductService = {
  list: (): Promise<IProduct[]> => requestType.get("/api/products"),
  details: (code: string): Promise<IProductResponse> =>
    requestType.get(`/api/products/${code}`),
  create: (user: IProduct): Promise<IProductResponse> =>
    requestType.post(`/api/products`, user),
  update: (user: IProduct): Promise<IProductResponse> =>
    requestType.put(`/api/products`, user),
  delete: (user: IProduct): Promise<IProductResponse> =>
    requestType.del(`/api/products`, user),
  search: (value: string): Promise<IProduct[]> =>
    requestType.get(`/api/products/search/?searchTerm=${value}`),
};
