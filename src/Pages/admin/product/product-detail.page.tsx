import { ProductForm } from "components/admin/product/product-form.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect } from "react";

const AdminProductDetailPage: React.FC = () => {
  const { isLoading } = useAuth();
  const { setContent, setTitle, setShow } = useModalContext();

  const editProduct = () => {
    setTitle("Edit new product");
    setContent(<ProductForm formMode={UpdateMode.EDIT} />);
    setShow(true);
  };
  
  useEffect(() => {}, [isLoading]);
  return (
    <>
      <div style={{ margin: "1rem" }}>
        <h1 style={{ padding: 30 }}> Product Page</h1>
      </div>
    </>
  );
};

export default AdminProductDetailPage;
