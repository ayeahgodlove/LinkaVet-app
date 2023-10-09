import StoreForm from "components/admin/store/store-form.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect } from "react";

const AdminStoreDetailPage: React.FC = () => {
  const { isLoading } = useAuth();
  const { setContent, setTitle, setShow } = useModalContext();

  const editStore = () => {
    setTitle("Edit new store");
    setContent(<StoreForm formMode={UpdateMode.EDIT} />);
    setShow(true);
  };
  
  useEffect(() => {}, [isLoading]);
  return (
    <>
      <div style={{ margin: "1rem" }}>
        <h1 style={{ padding: 30 }}> Store Page</h1>
      </div>
    </>
  );
};

export default AdminStoreDetailPage;
