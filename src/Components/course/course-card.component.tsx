import { Button, Card, List } from "antd";
import React from "react";
import "./course.style.scss";
import { RiHeartFill } from "react-icons/ri";
import RaterComponent from "components/shared/rate.component";
import { Link } from "react-router-dom";
import slugify from "slugify";
import { ICourse } from "models/lms/course";

const { Meta } = Card;
interface IProp {
  course: ICourse;
}
const CourseCard: React.FC<IProp> = ({ course }) => {
  return (
    <List.Item
      key={course.id}
      className="course-list-item"
      style={{ padding: "4px 8px" }}
    >
      <Card
        bordered={false}
        style={{ padding: 0 }}
        bodyStyle={{ paddingTop: 10 }}
        cover={
          <img
            alt={course.title}
            src={`http://localhost:8000/uploads/courses/${course.courseImage}`}
          />
        }
        className="course-card"
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
              title={
                <Link to={`/courses/${slugify(course.title, { lower: true })}`}>
                  {course.title}
                </Link>
              }
              description={
                <div
                  dangerouslySetInnerHTML={{
                    __html: course.description.slice(50, 400),
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

export default CourseCard;
