import { ILesson, ILessonResponse, ILessonResponses } from "models/lms/lesson";
import { requestType } from "services";

export const LessonService = {
    list: (): Promise<ILessonResponses> => requestType.get("/api/lessons"),
    details: (code: string): Promise<ILessonResponse> => requestType.get(`/api/lessons/${code}`),
    create: (user: ILesson): Promise<ILessonResponse> => requestType.post(`/api/lessons`, user),
    update: (user: ILesson): Promise<ILessonResponse> => requestType.put(`/api/lessons`, user),
    delete: (user: ILesson): Promise<ILessonResponse> => requestType.del(`/api/lessons`, user),
} 