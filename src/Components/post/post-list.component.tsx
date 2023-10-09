import { Col, List } from "antd";
import React from "react";
import PostCard from "./post-card.component";
import { Link } from "react-router-dom";
import slugify from "slugify";
import { usePost } from "hooks/post.hook";
import { NoContent } from "components/shared/no-content/no-content.component";

interface Props {
  slice?: boolean;
}
const PostList: React.FC<Props> = ({ slice = false }) => {
  const { posts, setPost } = usePost();
  return (
    <>
      {posts && posts.length > 0 ? (
        <List
          className="post-list"
          grid={{
            gutter: 0,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 5,
          }}
          dataSource={slice ? posts.slice(0, 4) : posts}
          renderItem={(post) => {
            setPost(post);
            return (
              <Link
                key={post.id}
                to={`/posts/${slugify(post.title, { lower: true })}`}
              >
                <PostCard post={post} />
              </Link>
            );
          }}
        />
      ) : (
        <Col span={24}>
          <NoContent title="No posts to display at the moment" />
        </Col>
      )}
    </>
  );
};

export default PostList;