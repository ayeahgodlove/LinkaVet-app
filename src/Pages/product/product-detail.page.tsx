import { Col, Row } from "antd";
import ProductDetailComponent from "components/admin/product/product-detail.component";
import ProductBannerComponent, {
  ProductBanner,
} from "components/product/product-banner.component";
import ProductDetail from "components/product/product-detail.component";
import BackButton from "components/shared/back-button.component";
import PageBreadCrumbs from "components/shared/page-breadcrumb/page-breadcrumb.component";
import GeneralAppShell from "layout/app/general-app-shell";
import React from "react";

const ProductDetailPage: React.FC = () => {
  return (
    <GeneralAppShell>
      <ProductBanner />
      <Row justify={"center"} align={"middle"}>
        <Col span={23}>
          <PageBreadCrumbs items={["Pages", "Products", "Details"]} />
          <BackButton title="Products" />
        </Col>
      </Row>
      <Row justify={"center"} align={"middle"}>
        <Col span={23}>
          <ProductDetail />
        </Col>
      </Row>
    </GeneralAppShell>
  );
};

export default ProductDetailPage;
