import { ProductForm } from "components/admin/product/product-form.component";
import ProductTable from "components/admin/product/product-table.component";
import TitleBar from "components/common/title-bar/title-bar.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import { useModalContext } from "context/app-modal.context";
import { useAuth } from "hooks/auth/auth.hook";
import { UpdateMode } from "models/shared/update-mode.enum";
import React, { useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { fetchProductsAsync } from "redux/product.slice";

const AdminProductPage: React.FC = () => {
  const { isLoading } = useAuth();
  const dispatch = useDispatch();
  const { setContent, setTitle, setShow } = useModalContext();

  const createProduct = () => {
    setContent(<ProductForm formMode={UpdateMode.ADD} />);
    setTitle("Create new product");
    setShow(true);
  };

  useEffect(() => {
    // dispatch(fetchProductsAsync() as any);
  }, [isLoading]);

  return (
    <>
      <div style={{ margin: "1rem" }}>
        <PageBreadCrumbs items={["Configurations", "Products"]} />
        <TitleBar
          title={"Products"}
          subTitle={"View and Create Products"}
          showButton={true}
          buttonLabel={"Add Record"}
          handleShow={createProduct}
          icon={<FiPlus />}
        />
        <ProductTable />
      </div>
    </>
  );
};

export default AdminProductPage;
