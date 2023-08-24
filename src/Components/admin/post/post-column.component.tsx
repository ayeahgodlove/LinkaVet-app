import { ColumnsType } from "antd/es/table";
import { IPost } from "models/post";
import { format } from "utils/format";

export const postTableColumns: ColumnsType<IPost> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: "5rem",
    filtered: true,
  },
  {
    title: "SLUD",
    dataIndex: "slud",
    key: "slud",
    width: "5rem",
    filtered: true,
  },
  {
    title: "TITLE",
    dataIndex: "title",
    key: "title",
    width: "5rem",
    filtered: true,
  },
  {
    title: "CONTENT",
    dataIndex: "content",
    key: "content",
  },
  {
    title: "PUBLISHED AT",
    dataIndex: "publishedAt",
    key: "publishedAt",
    render: (_, record) => format.date(record.publishedAt),
  },
  {
    title: "AUTHOR",
    dataIndex: "author",
    key: "author",
  },
  {
    title: "CATEGORY",
    dataIndex: "category",
    key: "category",
    filtered: true,
  },
];
