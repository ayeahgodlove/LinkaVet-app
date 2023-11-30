import { ColumnsType } from "antd/es/table";
import { IQuiz } from "models/lms/quiz";

export const useQuizColumns = () => {

  const quizTableColumns: ColumnsType<IQuiz> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
    },
    {
      title: "Answers",
      dataIndex: "answers",
      key: "answers",
    },
    {
      title: "Corrent Answer Index",
      dataIndex: "correctAnswerIndex",
      key: "correctAnswerIndex",
    },
  ];

  return {
    quizTableColumns,
  };
};
