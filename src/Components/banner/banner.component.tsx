import React from "react";
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Row,
  Space,
  Typography,
} from "antd";
import "./banner.style.scss";

export const Banner: React.FC = () => {
  const { Title, Paragraph } = Typography;
  return (
    <Card
      bordered={false}
      style={{ borderRadius: 0,paddingTop: "8rem", paddingBottom: "8rem" }}
    >
      <Row justify={"center"} align={"middle"} gutter={[8, 8]}>
        <Col
          xs={12}
          sm={12}
          md={8}
          lg={8}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className=""
        >
          <div className="gallery">
            <img src="./images/banner.png" alt="landing page image" />
          </div>
        </Col>
        <Col xs={20} md={13} lg={13} className="banner__text">
          <Title style={{ fontSize: 25}}>
            <span style={{ color: "#3498db", fontSize: 40 }}>LinkaVet</span> <br /> Link to a
            Veterinary professional within and without the national territory.
          </Title>
          <Paragraph style={{ fontSize: 17, textAlign: "center" }}>
            <p>
              If you are a farmers owner, per owners, or looking for mentorship
              in the vetinary profession, this is the platform for you
            </p>
          </Paragraph>
          <Space
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#3498db",
                  colorLink: "#2980b9"
                },
              }}
            >
              <Button
                type="default"
                size="large"
                style={{ paddingLeft: 25, paddingRight: 25, fontSize: 18 }}
              >
                Get Started
              </Button>
            </ConfigProvider>
            <Button type="link" size="large">
              Learn more
            </Button>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};
