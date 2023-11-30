import { Col, Divider, Row, Typography } from "antd";
import PostList from "components/post/post-list.component";
import PageBannerComponent from "components/shared/page-banner/page-banner.component";
import GeneralAppShell from "layout/app/general-app-shell";
import React from "react";

const PostPage: React.FC = () => {
  return (
    <GeneralAppShell>
      {/* Dummy banner */}
      <PageBannerComponent
        title="Get excellent articles by professionals"
        description="Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Exercitationem corrupti mollitia quam dolorum nostrum natus?
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus ab illo libero quibusdam ipsa sapiente nobis, dicta
              quam inventore rerum!"
        linkCmd="Browse Course"
      />
      {/* post list */}
      <Row style={{ marginTop: 50, padding: "0 3rem" }}>
        <Col span={24}>
          <Typography.Title
            level={3}
            style={{ textAlign: "center", opacity: 0.8 }}
          >
            Blog Posts Listings
          </Typography.Title>
          <Divider />
        </Col>
      </Row>
      <PostList />
    </GeneralAppShell>
  );
};

export default PostPage;
