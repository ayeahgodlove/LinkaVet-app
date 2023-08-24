import React from "react";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import { postTableColumns } from "./post-column.component";
import { usePost } from "hooks/post.hook";
import { NoContent } from "components/shared/no-content/no-content.component";
import { IPost } from "models/post";

type Prop = {
  createPost: () => void
}
const PostTable: React.FC<Prop> = ({ createPost }) => {
  const { posts, setPost } = usePost();
  const router = useNavigate();
  // const route = use
  const handleRowClick = (post: IPost) => {
    setPost(post);
    router(`/admin/posts/${post.id}`);
  };

  return (
    <>
      {posts && posts.length ? (
        <Table<IPost>
          dataSource={posts}
          columns={postTableColumns}
          size={"small"}
          rowKey={"id"}
          onRow={(record: IPost) => {
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
          title="No data for post"
          showButton={true}
          buttonLabel="Add Post"
          handleClick={createPost}
        />
      )}
    </>
  );
};

export default PostTable;
