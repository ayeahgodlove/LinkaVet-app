import { IProduct, IProductResponse, IProductResponses } from "models/product.model";
import { requestType } from "services";

export const ProductService = {
  list: (): Promise<IProductResponses> => requestType.get("/api/products"),
  details: (code: string): Promise<IProductResponse> =>
    requestType.get(`/api/products/${code}`),
  create: (user: FormData): Promise<IProductResponse> =>
    requestType.post(`/api/products`, user),
  update: (user: FormData): Promise<IProductResponse> =>
    requestType.put(`/api/products`, user),
  delete: (user: IProduct): Promise<IProductResponse> =>
    requestType.del(`/api/products`, user),
  search: (value: string): Promise<IProduct[]> =>
    requestType.get(`/api/products/search/?searchTerm=${value}`),
};
