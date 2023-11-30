import { ColumnsType } from "antd/es/table";
import { ILesson } from "models/lms/lesson";

export const useLessonColumn = () => {
  const lessonTableColumns: ColumnsType<ILesson> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "6rem",
      filtered: true,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
    },
  ];

  return {
    lessonTableColumns,
  };
};
