import React from "react";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import { tagTableColumns } from "./tag-column.component";
import { ITag } from "models/tag.model";
import { useTag } from "hooks/tag.hook";
import { NoContent } from "components/shared/no-content/no-content.component";
import slugify from "slugify";

type Prop = {
  createTag: () => void
}
const TagTable: React.FC<Prop> = ({ createTag }) => {
  const { tags, setTag } = useTag();
  const router = useNavigate();
  // const route = use
  const handleRowClick = (tag: ITag) => {
    setTag(tag);
    router(`/admin/tags/${slugify(tag.name, "-")}`);
  };

  return (
    <>
      {tags && tags.length ? (
        <Table<ITag>
          dataSource={tags}
          columns={tagTableColumns}
          size={"small"}
          rowKey={"id"}
          onRow={(record: ITag) => {
            return {
              onClick: (e) => {
                console.log(e)
                handleRowClick(record);
              },
            };
          }}
        />
      ) : (
        <NoContent
          title="No data for tag"
          showButton={true}
          buttonLabel="Add Tag"
          handleClick={createTag}
        />
      )}
    </>
  );
};

export default TagTable;
