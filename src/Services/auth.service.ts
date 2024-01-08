import { IUser, IUserResponse } from "models/user.model";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://linkavet-api.onrender.com", // Replace with your API server URL
});

export const authService = {
  register: async (user: IUser): Promise<IUserResponse> =>
    await instance.post(`/api/users`, user),
  login: async (user: {
    email: string;
    password: string;
  }): Promise<any> => await instance.post("/auth/login", user),
  logout: async (): Promise<any> => await instance.get("/auth/logout"),
};
