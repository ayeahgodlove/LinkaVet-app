import { IUser, IUserResponse, IUserResponses } from "models/user.model";
import { requestType } from "services";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000", // Replace with your API server URL
});

export const UserService = {
  list: (): Promise<IUserResponses> => requestType.get("/api/users"),
  details: (code: string): Promise<IUserResponse> =>
    requestType.get(`/api/users/${code}`),
  create: (user: IUser): Promise<IUserResponse> => instance.post(`/api/users`, user),
  update: (user: IUser): Promise<IUserResponse> =>
    requestType.put(`/api/users`, user),
  delete: (user: IUser): Promise<IUserResponse> =>
    requestType.del(`/api/users`, user),
};
