import { Card, Col, Divider, Row, Typography } from "antd";
import CategoryList from "components/admin/category/category-list.component";
import TagList from "components/admin/tag/tag-list.component";
import BannerIndexComponent from "components/product/banner.component";
import FilterComponent from "components/product/filter.component";
import ProductList from "components/product/product-list.component";
import GeneralAppShell from "layout/app/general-app-shell";
import React from "react";

const ProductPage: React.FC = () => {
  return (
    <GeneralAppShell>
      {/* search component */}
      <FilterComponent />
      {/* banner */}
      <BannerIndexComponent />
      {/* Branding Information */}

      {/* product list */}
      <Row
        justify={"space-between"}
        align={"top"}
        style={{ marginTop: 20, padding: "0 2rem" }}
        gutter={[8, 8]}
      >
        <Col xs={24} md={20}>
          <ProductList />
        </Col>
        <Col xs={24} md={4}>
          <Card bordered={false} size="small">
            <Typography.Text style={{ marginBottom: 0 }}>
              Filter By
            </Typography.Text>
            <Typography.Title level={5} style={{ marginTop: 2 }}>
              CATEGORIES
            </Typography.Title>
            <Divider style={{ margin: "10px 0" }} />
            {/* Categories display */}
            <CategoryList />
            
            <Divider style={{ margin:"25px 0"}} />
            <Typography.Text style={{ marginBottom: 0, marginTop: 5 }}>
              Filter By
            </Typography.Text>
            <Typography.Title level={5} style={{ marginTop: 2 }}>
              TAGS
            </Typography.Title>
            <Divider style={{ margin: "10px 0" }} />
            <TagList />
            <Divider />
          </Card>
        </Col>
      </Row>
    </GeneralAppShell>
  );
};

export default ProductPage;
