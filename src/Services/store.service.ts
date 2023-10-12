import { IStore, IStoreResponse, IStoreResponses } from "models/store";
import { requestType } from ".";

export const storeService = {
  list: (): Promise<IStoreResponses> => requestType.get("/api/stores"),
  details: (code: string): Promise<IStoreResponse> =>
    requestType.get(`/api/stores/${code}`),
  create: async (store: FormData): Promise<IStoreResponse> =>
    requestType.post(`/api/stores`, store),
  update: (store: FormData): Promise<IStoreResponse> =>
    requestType.put(`/api/stores`, store),
  delete: (store: IStore): Promise<IStoreResponse> =>
    requestType.del(`/api/stores`, store),
};
