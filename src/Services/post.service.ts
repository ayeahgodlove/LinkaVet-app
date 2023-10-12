import { IPost, IPostResponse, IPostResponses } from "models/post";
import { requestType } from "services";


export const PostService = {
  list: (): Promise<IPostResponses> => requestType.get("/api/posts"),
  details: (code: string): Promise<IPostResponse> =>
    requestType.get(`/api/posts/${code}`),
  create: async (post: FormData): Promise<IPostResponse> => {
    debugger
    return requestType.post(`/api/posts`, post)
  },
  update: (post: FormData): Promise<IPostResponse> =>
    requestType.put(`/api/posts`, post),
  delete: (post: IPost): Promise<IPostResponse> =>
    requestType.del(`/api/posts`, post),
};
