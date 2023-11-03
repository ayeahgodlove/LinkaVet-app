import { Button, Card, List, Typography } from "antd";
import React from "react";
import "./post.style.scss";
import { RiHeartFill } from "react-icons/ri";
import RaterComponent from "components/shared/rate.component";
import { IPost } from "models/post";

const { Meta } = Card;
interface IProp {
  post: IPost;
}
const PostCard: React.FC<IProp> = ({ post }) => {
  return (
    <List.Item
      key={post.id}
      className="post-list-item"
      style={{ padding: "4px 8px" }}
    >
      <Card
        bordered={false}
        style={{ padding: 0 }}
        bodyStyle={{ paddingTop: 10 }}
        cover={
          <img
            alt={post.title}
            src={`http://localhost:8000/uploads/posts/${post.imageUrl}`}
          />
        }
        className="post-card"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Meta
              title={post.title}
              description={
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.content.slice(50 , 400),
                  }}
                />
              }
            />
            <RaterComponent />
          </div>
        </div>
        <Button
          type="link"
          className="add-to-fav-btn"
          icon={<RiHeartFill size={30} className="add-to-fav" />}
        />
      </Card>
    </List.Item>
  );
};

export default PostCard;
