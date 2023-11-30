import { IEnrollment, IEnrollmentResponse, IEnrollmentResponses } from "models/lms/enrollment";
import { requestType } from "services";

export const EnrollmentService = {
    list: (): Promise<IEnrollmentResponses> => requestType.get("/api/enrollments"),
    details: (code: string): Promise<IEnrollmentResponse> => requestType.get(`/api/enrollments/${code}`),
    create: (user: IEnrollment): Promise<IEnrollmentResponse> => requestType.post(`/api/enrollments`, user),
    update: (user: IEnrollment): Promise<IEnrollmentResponse> => requestType.put(`/api/enrollments`, user),
    delete: (user: IEnrollment): Promise<IEnrollmentResponse> => requestType.del(`/api/enrollments`, user),
} 