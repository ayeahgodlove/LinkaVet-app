import { ICourse, ICourseResponse, ICourseResponses } from "models/lms/course";
import { requestType } from "services";

export const CourseService = {
    list: (): Promise<ICourseResponses> => requestType.get("/api/courses"),
    details: (code: string): Promise<ICourseResponse> => requestType.get(`/api/courses/${code}`),
    create: (user: FormData): Promise<ICourseResponse> => requestType.post(`/api/courses`, user),
    update: (user: FormData): Promise<ICourseResponse> => requestType.put(`/api/courses`, user),
    delete: (user: ICourse): Promise<ICourseResponse> => requestType.del(`/api/courses`, user),
} 