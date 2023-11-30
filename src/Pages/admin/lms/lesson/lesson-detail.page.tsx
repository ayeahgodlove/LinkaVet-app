import LessonDetailComponent from "components/admin/lms/lesson/lesson-detail.component";
import { LessonForm } from "components/admin/lms/lesson/lesson-form.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import BackButton from "components/shared/back-button.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect } from "react";
import { FiEdit } from "react-icons/fi";

const AdminLessonDetailPage: React.FC = () => {
  const { isLoading } = useAuth();
  const { setContent, setTitle, setShow, setWidth } = useModalContext();

  const editLesson = () => {
    setWidth("60rem");
    setTitle("Edit new lesson");
    setContent(<LessonForm formMode={UpdateMode.EDIT} />);
    setShow(true);
  };

  useEffect(() => {}, [isLoading]);
  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Lesson", "Details"]} />

        <TitleBar
          title={"Lessons"}
          subTitle={"View and edit a lesson"}
          showButton={true}
          buttonLabel={"Edit Record"}
          handleShow={editLesson}
          icon={<FiEdit />}
          showExtra
        />
        <BackButton title="Lessons" />
        <LessonDetailComponent />
      </div>
    </>
  );
};

export default AdminLessonDetailPage;
