import { Col, Divider, Row, Typography } from "antd";
import CourseList from "components/course/course-list.component";
import PageBannerComponent from "components/shared/page-banner/page-banner.component";
import GeneralAppShell from "layout/app/general-app-shell";
import React from "react";

const CoursePage: React.FC = () => {
  return (
    <GeneralAppShell>
      {/* Dummy banner */}
      <PageBannerComponent
        title="Get excellent courses by professionals"
        description="Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Exercitationem corrupti mollitia quam dolorum nostrum natus?
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus ab illo libero quibusdam ipsa sapiente nobis, dicta
              quam inventore rerum!"
        linkCmd="Browse Course"
      />
      {/* course list */}
      <Row style={{ marginTop: 50, padding: "0 3rem" }}>
        <Col span={24}>
          <Typography.Title
            level={3}
            style={{ textAlign: "center", opacity: 0.8 }}
          >
            Courses
          </Typography.Title>
          <Divider />
        </Col>
      </Row>
      <CourseList />
    </GeneralAppShell>
  );
};

export default CoursePage;
