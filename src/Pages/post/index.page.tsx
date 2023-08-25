import { Col, Row } from "antd";
import PostList from "components/post/post-list.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import GeneralAppShell from "layout/app/general-app-shell";
import React from "react";

const PostPage: React.FC = () => {
  return (
    <GeneralAppShell>
      <Row align={"middle"} justify={"center"} style={{ marginTop: "2rem"}}>
        <Col lg={23}>
          <PageBreadCrumbs items={["Pages", "Posts", "Lists"]} />
        </Col>
      </Row>
      {/* post list */}
      <PostList />
    </GeneralAppShell>
  );
};

export default PostPage;
