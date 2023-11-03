import { Card, Col, Row, Typography } from "antd";
import GridView, {
  GridProductCard,
} from "components/product/product-card-grid.component";
import { NoContent } from "components/shared/no-content/no-content.component";
import { useProduct } from "hooks/product.hook";
import { useShoppingCart } from "hooks/shopping-cart/shopping-cart.hook";
import GeneralAppShell from "layout/app/general-app-shell";
import React from "react";

const ShoppingCartPage: React.FC = () => {
  const { cartItems, findMatchingProducts } = useShoppingCart();
  const { products } = useProduct();

  const matchingProducts = findMatchingProducts(products, cartItems);

  return (
    <GeneralAppShell>
      <Row gutter={[8, 16]} style={{ marginTop: 50, padding: "0 1rem" }}>
        <Col span={24}>
          <Typography.Title level={4} style={{ textAlign: "center", opacity: 0.89 }}>
            Product item currently in shopping-cart
          </Typography.Title>
        </Col>
        <Col xs={22} md={16}>
          {cartItems && cartItems.length > 0 ? (
            <GridView products={matchingProducts} resultProducts={[]} />
          ) : (
            <NoContent title="Your shopping cart is empty at the moment" />
          )}
        </Col>
        <Col xs={22} md={8}>
          <Card bordered={false}></Card>
        </Col>
      </Row>
    </GeneralAppShell>
  );
};

export default ShoppingCartPage;
