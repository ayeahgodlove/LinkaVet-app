import {
  Button,
  Card,
  Col,
  Collapse,
  Descriptions,
  List,
  Row,
  Typography,
} from "antd";
import BackButton from "components/shared/back-button.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useCourse } from "hooks/lms/course.hook";
import { useLesson } from "hooks/lms/lesson.hook";
import { useUser } from "hooks/user.hook";
import GeneralAppShell from "layout/app/general-app-shell";
import React from "react";
import "./course-detail.style.scss";
import { FiPlayCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";

const courseDetailPage: React.FC = () => {
  const { course } = useCourse();
  const { getUser } = useUser();
  const { lessons } = useLesson();
  const navigate = useNavigate()

  const onEnrollCourse = () => {
    navigate(`/courses/${slugify(course.title, { lower: true })}/enrollment`)
  }
  return (
    <GeneralAppShell>
      <Row
        justify={"center"}
        style={{ marginTop: "1rem" }}
        gutter={[16, 16]}
        className="course-container"
      >
        <Col span={23}>
          <PageBreadCrumbs items={["Pages", "Course", "Details"]} />
          <BackButton title="Course" />
        </Col>
        <Col xs={18} md={15}>
          <Card size="small">
            <div
              style={{ display: "flex", justifyContent: "flex-start" }}
              className="course-banner"
            >
              <img
                alt={course.title}
                src={`http://localhost:8000/uploads/courses/${course.courseImage}`}
                style={{
                  width: "100%",
                  maxHeight: "55vh",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              <div className="overlay">
                <FiPlayCircle size={80} color="#f0ecec" />
              </div>
            </div>

            <div
              className="text"
              style={{ paddingLeft: "2rem", color: "#333" }}
            >
              <Typography.Title
                level={3}
                style={{ marginTop: 30, textAlign: "center" }}
              >
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

          <Card
            size="small"
            title={
              <Typography.Title style={{ textAlign: "center" }} level={3}>
                Lessons
              </Typography.Title>
            }
            style={{ marginTop: 15 }}
          >
            <Collapse accordion>
              {lessons.map((lesson, index) => {
                return (
                  <Collapse.Panel
                    header={
                      <Typography.Title level={5}>
                        {lesson.title}
                      </Typography.Title>
                    }
                    key={index}
                  >
                    <Typography.Text>{lesson.description}</Typography.Text>
                  </Collapse.Panel>
                );
              })}
            </Collapse>
          </Card>
        </Col>
        <Col xs={6} md={7}>
          <Card
            size="small"
            // style={{ background: "transparent" }}
            // bodyStyle={{ background: "transparent" }}
            title={
              <Typography.Title level={3} style={{ marginBottom: 0 }}>
                Course Progress
              </Typography.Title>
            }
          >
            {/* course obvious details */}
            <Descriptions title="Course Info" layout="horizontal" size="small">
              <Descriptions.Item label="Author" span={12}>
                <Typography.Text style={{ opacity: 0.6 }}>
                  {getUser(course.authorId).firstname +
                    " " +
                    getUser(course.authorId).lastname}
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label="Telephone" span={12}>
                <Typography.Text style={{ opacity: 0.6 }}>
                  {getUser(course.authorId).phoneNumber}
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={12}>
                <Typography.Text style={{ opacity: 0.6 }}>
                  {getUser(course.authorId).email}
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label="Address" span={12}>
                <Typography.Text style={{ opacity: 0.6 }}>
                  {getUser(course.authorId).address}
                </Typography.Text>
              </Descriptions.Item>
            </Descriptions>
            <Button type="primary" block onClick={onEnrollCourse}>
              Enroll for this course
            </Button>
          </Card>
        </Col>
      </Row>
    </GeneralAppShell>
  );
};

export default courseDetailPage;
