import CourseDetailComponent from "components/admin/lms/course/course-detail.component";
import CourseForm from "components/admin/lms/course/course-form.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import BackButton from "components/shared/back-button.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect } from "react";
import { FiEdit } from "react-icons/fi";

const AdminCourseDetailPage: React.FC = () => {
  const { isLoading } = useAuth();
  const { setContent, setTitle, setShow, setWidth } = useModalContext();

  const editCourse = () => {
    setWidth("60rem");
    setTitle("Edit new course");
    setContent(<CourseForm formMode={UpdateMode.EDIT} />);
    setShow(true);
  };

  useEffect(() => {}, [isLoading]);
  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Course", "Details"]} />

        <TitleBar
          title={"Courses"}
          subTitle={"View and edit a course"}
          showButton={true}
          buttonLabel={"Edit Record"}
          handleShow={editCourse}
          icon={<FiEdit />}
          showExtra
        />
        <BackButton title="Courses" />
        <CourseDetailComponent />
      </div>
    </>
  );
};

export default AdminCourseDetailPage;
