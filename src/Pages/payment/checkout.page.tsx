import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import GeneralAppShell from "layout/app/general-app-shell";
import React from "react";
import "./checkout.style.scss";

export const CheckoutPage = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <GeneralAppShell>
      <Row className="checkout-container">
        <Col xs={24} md={14} className="checkout-form">
          <Typography.Title level={2}>Checkout</Typography.Title>
          <Form
            form={form}
            name="checkout-form"
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not a valid email!",
                },
                { required: true, message: "Please input your email!" },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" block htmlType="submit" size="large">
                Place Order
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col xs={24} md={10} className="checkout-summary">
          <Typography.Title level={3}>Order details summary</Typography.Title>

        </Col>
      </Row>
    </GeneralAppShell>
  );
};
