import { Card, Col, Image, Row } from "antd";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useCategory } from "hooks/category.hook";
import { usePost } from "hooks/post.hook";
import { useUser } from "hooks/user.hook";
import GeneralAppShell from "layout/app/general-app-shell";
import React from "react";
import { format } from "utils/format";

const postDetailPage: React.FC = () => {
  const { post } = usePost();
  const { users } = useUser();
  const { categories } = useCategory();

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
      {/* <Row align={"middle"} justify={"center"} style={{ marginTop: "2rem" }}>
        
        <Col lg={23}>
          <Card size="small">
            <h1 style={{ fontSize: 30, textDecoration: "underline" }}>
              {post.title}
            </h1>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <img
                alt={post.title}
                src={`http://localhost:8000/uploads/posts/${post.imageUrl}`}
              />
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

              <div className="comments"></div>
            </div>
          </Card>
        </Col>
      </Row> */}
    </GeneralAppShell>
  );
};

export default postDetailPage;
