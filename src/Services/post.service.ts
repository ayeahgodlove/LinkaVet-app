import { IPost, IPostResponse } from "models/post";
import { requestType } from "services";

export const PostService = {
    list: (): Promise<IPost[]> => requestType.get("/api/posts"),
    details: (code: string): Promise<IPostResponse> => requestType.get(`/api/posts/${code}`),
    create: (user: IPost): Promise<IPostResponse> => requestType.post(`/api/posts`, user),
    update: (user: IPost): Promise<IPostResponse> => requestType.put(`/api/posts`, user),
    delete: (user: IPost): Promise<IPostResponse> => requestType.del(`/api/posts`, user),
}