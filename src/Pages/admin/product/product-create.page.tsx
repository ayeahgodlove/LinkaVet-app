import { Card, Col, Row } from "antd";
import { ProductForm } from "components/admin/product/product-form.component";
import { UpdateMode } from "models/shared/update-mode.enum";
import React from "react";

const ProductCreatePage = () => {
  return (
    <Row align={"top"} justify={"center"} style={{ margin: "4rem 0"}}>
      <Col xs={24} md={20} lg={16}>
        <Card bordered={false}>
          <ProductForm formMode={UpdateMode.ADD} />
        </Card>
      </Col>
    </Row>
  );
};

export default ProductCreatePage;
