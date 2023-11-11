import { IOrder, IOrderResponse, IOrderResponses } from "models/order.model";
import { requestType } from "services";

export const OrderService = {
    list: (): Promise<IOrderResponses> => requestType.get("/api/orders"),
    details: (code: string): Promise<IOrderResponse> => requestType.get(`/api/orders/${code}`),
    create: (user: IOrder): Promise<IOrderResponse> => requestType.post(`/api/orders`, user),
    update: (user: IOrder): Promise<IOrderResponse> => requestType.put(`/api/orders`, user),
    delete: (user: IOrder): Promise<IOrderResponse> => requestType.del(`/api/orders`, user),
}