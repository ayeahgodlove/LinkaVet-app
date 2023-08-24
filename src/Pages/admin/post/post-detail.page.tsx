import { PostForm } from "components/admin/post/post-form.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect } from "react";

const AdminPostDetailPage: React.FC = () => {
  const { isLoading } = useAuth();
  const { setContent, setTitle, setShow } = useModalContext();

  const editPost = () => {
    setTitle("Edit new post");
    setContent(<PostForm formMode={UpdateMode.EDIT} />);
    setShow(true);
  };
  
  useEffect(() => {}, [isLoading]);
  return (
    <>
      <div style={{ margin: "1rem" }}>
        <h1 style={{ padding: 30 }}> Post Page</h1>
      </div>
    </>
  );
};

export default AdminPostDetailPage;
