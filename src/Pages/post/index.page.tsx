import { Col, Divider, Row, Typography } from "antd";
import PostBannerComponent from "components/post/post-banner.component";
import PostList from "components/post/post-list.component";
import GeneralAppShell from "layout/app/general-app-shell";
import React from "react";

const PostPage: React.FC = () => {
  return (
    <GeneralAppShell>
      {/* Dummy banner */}
      <PostBannerComponent />
      {/* post list */}
      <Row style={{ marginTop: 50, padding: "0 3rem"}}>
        <Col span={24}>
          <Typography.Title level={3} style={{ textAlign: "center", opacity: 0.8}}>Blog Posts Listings</Typography.Title>
          <Divider />
        </Col>
      </Row>
      <PostList />
    </GeneralAppShell>
  );
};

export default PostPage;
