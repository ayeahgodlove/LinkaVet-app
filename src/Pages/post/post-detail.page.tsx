import { Avatar, Button, Card, Col, Image, List, Row, Typography } from "antd";
import CommentComponent from "components/comment/comment.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { SpinnerComponent } from "components/shared/spinner";
import { useCategory } from "hooks/category.hook";
import { useComment } from "hooks/comment.hook";
import { usePost } from "hooks/post.hook";
import { useUser } from "hooks/user.hook";
import GeneralAppShell from "layout/app/general-app-shell";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { format } from "utils/format";

const postDetailPage: React.FC = () => {
  const { post } = usePost();
  const { users, getUser } = useUser();
  const { categories } = useCategory();
  const { loadComments, comments, errors } = useComment();
  const [commentId, setCommentId] = useState("");
  const [select, setSelect] = useState(false);
  const handleReplyComment = (parentId: string) => {
    setSelect(true);
    setCommentId(parentId);
  };
  const inputRef = useRef<any>(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const lists = comments.map((c) => {
    return {
      id: c.id,
      username: getUser(c.userId).firstname + " " + getUser(c.userId).lastname,
      email: getUser(c.userId).email,
      content: c.content,
      publishDate: c.publishedAt,
      parentComment: c.parent_id,
      replies: c.replies,
    };
  });
  const load = useCallback(async () => {
    await loadComments(post.id);
  }, []);
  useEffect(() => {
    load();
  }, []);
  return (
    <GeneralAppShell>
      <Row className="post-detail-container">
        <Col xs={24} md={24} className="post-detail-img-container">
          <Image
            style={{
              objectFit: "cover",
              overflow: "hidden",
            }}
            preview={false}
            alt={post.title}
            src={`http://localhost:8000/uploads/posts/${post.imageUrl}`}
            className="post-detail-img"
          />
          <div className="overlay"></div>
        </Col>
        <Col lg={23}>
          <PageBreadCrumbs items={["Pages", "Post", "Details"]} />
        </Col>
      </Row>
      <Row align={"middle"} justify={"center"} style={{ marginTop: "2rem" }}>
        <Col lg={23}>
          <Card size="small">
            <h1 style={{ fontSize: 30, textDecoration: "underline" }}>
              {post.title}
            </h1>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <img
                alt={post.title}
                src={`http://localhost:8000/uploads/posts/${post.imageUrl}`}
                width={400}
                height={400}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div
              className="text"
              style={{ paddingLeft: "2rem", color: "#333" }}
            >
              <p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.content,
                  }}
                />
              </p>
              <br />
              <p style={{ marginBottom: 0 }}>
                Category:{" "}
                {categories && categories.length
                  ? categories.find((u) => u.id === post.categoryId)?.name
                  : "Unclassified"}
              </p>
              <p style={{ marginBottom: 0 }}>
                Published By:{" "}
                {users && users.length
                  ? users.find((u) => u.id === post.authorId)?.username
                  : "John Doe"}
              </p>
              <p>Published On: {format.date(post.publishedAt)}</p>
            </div>

            <Row
              justify={"start"}
              style={{ paddingLeft: "2rem" }}
              className="comments"
            >
              <Col xs={23} md={18} lg={15}>
                {/* comment form */}
                <CommentComponent parentId={undefined} post={post} />
                {errors.length > 0 ? (
                  <SpinnerComponent message={""} height={""} />
                ) : (
                  <List
                    className="demo-loadmore-list"
                    // loading={initLoading}
                    itemLayout="horizontal"
                    // loadMore={loadMore}
                    dataSource={lists}
                    renderItem={(item: any) => (
                      <List.Item
                        actions={[
                          <Button
                            key="list-loadmore-edit"
                            type="link"
                            onClick={() => {
                              handleReplyComment(item.id);
                              focusInput();
                            }}
                          >
                            Reply
                          </Button>,
                        ]}
                        key={item.id}
                      >
                        <List.Item.Meta
                          avatar={<Avatar size="large">{item.username}</Avatar>}
                          title={
                            <Typography.Title level={5}>
                              {item.username}
                            </Typography.Title>
                          }
                          description={item.content}
                        />
                        {select && (
                          <CommentComponent
                            post={post}
                            parentId={
                              commentId.length > 0 ? commentId : undefined
                            }
                          />
                        )}
                      </List.Item>
                    )}
                  />
                )}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </GeneralAppShell>
  );
};

export default postDetailPage;
