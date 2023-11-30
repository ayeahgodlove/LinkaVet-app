import { IQuiz, IQuizResponse, IQuizResponses } from "models/lms/quiz";
import { requestType } from "services";

export const QuizService = {
    list: (): Promise<IQuizResponses> => requestType.get("/api/quizs"),
    details: (code: string): Promise<IQuizResponse> => requestType.get(`/api/quizs/${code}`),
    create: (user: IQuiz): Promise<IQuizResponse> => requestType.post(`/api/quizs`, user),
    update: (user: IQuiz): Promise<IQuizResponse> => requestType.put(`/api/quizs`, user),
    delete: (user: IQuiz): Promise<IQuizResponse> => requestType.del(`/api/quizs`, user),
} 