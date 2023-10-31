import React from "react";
import { Button, Card, Col, Row, Space, Typography } from "antd";
import { FiPlayCircle } from "react-icons/fi";

const PostBannerComponent = () => {
  const { Title, Paragraph } = Typography;
  return (
    <Row
      className="post-banner"
      align={"middle"}
      justify={"center"}
    >
      <Col xs={24} md={14}>
        <Card
          bordered={false}
          style={{ background: "none", boxShadow: "none" }}
          className="post-banner-text"
        >
          <Title
            style={{
              color: "#fff",
              textShadow: "0px 5px 10px 0px rgba(177, 202, 215, 0.8)",
            }}
            level={2}
          >
            Get excellent articles by professionals
          </Title>
          <Paragraph>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Exercitationem corrupti mollitia quam dolorum nostrum natus? Lorem,
            ipsum dolor sit amet consectetur adipisicing elit. Temporibus ab
            illo libero quibusdam ipsa sapiente nobis, dicta quam inventore
            rerum!
          </Paragraph>
          <Button type="link" htmlType="button">
            <Space align="center">
              <FiPlayCircle size={23} style={{ marginTop: 5 }} />
              <span>Watch Video</span>
            </Space>
          </Button>
        </Card>
      </Col>
      <Col xs={24} md={10} className="post-column">
        <div style={{ background: "none" }} className="post-banner-photo">
          <div>
            <div className="box">
              <img src={`/images/dogs/cat.jpg`} alt="blog post banner image" />
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default PostBannerComponent;
