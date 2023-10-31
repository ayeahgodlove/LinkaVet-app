import { Card, Col, List, Row, Typography } from "antd";
import { useOrder } from "hooks/order.hook";
import { useProduct } from "hooks/product.hook";
import { useUser } from "hooks/user.hook";
import React from "react";

const OrderDetailComponent: React.FC = () => {
  const { order } = useOrder();
  const { getProduct } = useProduct();
  const { getUser } = useUser();
  return (
    <Card bordered={false} size="small">
      <List
        size="small"
        dataSource={[
          {
            label: "ID",
            value: order.id,
          },
          {
            label: "PRODUCT",
            value: getProduct(order.productId).name,
          },
          {
            label: "USERNAME",
            value: getUser(order.userId).username,
          },
          {
            label: "UNIT PRICE",
            value: order.unitPrice,
          },
          {
            label: "TOTAL AMOUNT",
            value: order.total,
          },
          {
            label: "ORDER NO",
            value: order.orderNo,
          },
        ]}
        renderItem={(item) => (
          <List.Item>
            <Row style={{ width: "100%" }}>
              <Col md={4}>
                <Typography.Text>{item.label}</Typography.Text>
              </Col>
              <Col md={20}>
                <Typography.Text>{item.value}</Typography.Text>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default OrderDetailComponent;
