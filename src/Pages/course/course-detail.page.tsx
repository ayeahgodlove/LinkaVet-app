import { Card, Col, Collapse, Row, Typography } from "antd";
import BackButton from "components/shared/back-button.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useCourse } from "hooks/lms/course.hook";
import { useLesson } from "hooks/lms/lesson.hook";
import GeneralAppShell from "layout/app/general-app-shell";
import React from "react";

const courseDetailPage: React.FC = () => {
  const { course } = useCourse();
  const { lessons } = useLesson();

  return (
    <GeneralAppShell>
      <Row align={"middle"} justify={"center"} style={{ marginTop: "2rem" }}>
        <Col span={23}>
          <PageBreadCrumbs items={["Pages", "Course", "Details"]} />
          <BackButton title="Course" />
        </Col>
        <Col lg={23}>
          <Card size="small">
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <img
                alt={course.title}
                src={`http://localhost:8000/uploads/courses/${course.courseImage}`}
                style={{
                  width: "100%",
                  maxHeight: "65vh",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            <div
              className="text"
              style={{ paddingLeft: "2rem", color: "#333" }}
            >
              <Typography.Title level={3} style={{ marginTop: 30 }}>
                {course.title}
              </Typography.Title>
              <p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: course.description,
                  }}
                />
              </p>
              <br />
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify={"center"}>
        <Col lg={13}>
          <Card size="small" title={<Typography.Title level={3}>Lessons</Typography.Title>}>
            <Collapse defaultActiveKey={0} accordion>
              {lessons.map((lesson, index) => {
                return (
                  <Collapse.Panel header={<Typography.Title level={5}>{lesson.title}</Typography.Title>} key={index}>
                    <Typography.Text>{lesson.description}</Typography.Text>
                  </Collapse.Panel>
                );
              })}
            </Collapse>
          </Card>
        </Col>
        <Col lg={10}>
          <Card
            size="small"
            style={{ background: "transparent" }}
            bodyStyle={{ background: "transparent" }}
            title={<Typography.Title level={3}>Course Progress</Typography.Title>}
          >
            <h1>Great Progress!</h1>
          </Card>
        </Col>
      </Row>
    </GeneralAppShell>
  );
};

export default courseDetailPage;
