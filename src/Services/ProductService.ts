import { IProduct, IProductResponse } from "Models/IProduct";
import { requestType } from "Services";

export const ProductService = {
    list: (): Promise<IProduct[]> => requestType.get("/api/products"),
    details: (code: string): Promise<IProductResponse> => requestType.get(`/api/products/${code}`),
    create: (user: IProduct): Promise<IProductResponse> => requestType.post(`/api/products`, user),
    update: (user: IProduct): Promise<IProductResponse> => requestType.put(`/api/products`, user),
    delete: (user: IProduct): Promise<IProductResponse> => requestType.del(`/api/products`, user),
}