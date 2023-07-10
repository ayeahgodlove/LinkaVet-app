import { Card, Col, Row, Typography } from "antd";
import GeneralAppShell from "layout/app/general-app-shell";
import React from "react";
import { PiStudent } from "react-icons/pi";
import { GiArchiveResearch, GiFarmer } from "react-icons/gi";
import { FaLaptopMedical } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "hooks/auth/auth.hook";

const WhoAreYouPage: React.FC = () => {
  const { Paragraph, Title } = Typography;
  const { user } = useAuth();
  const router = useNavigate()
  return (
    <GeneralAppShell>
      <Row
        gutter={[16, 16]}
        justify={"center"}
        align={"middle"}
        style={{ padding: "8rem" }}
      >
        <Col span={24}>
          <Title style={{ fontSize: 30, color: "#2980b9", marginBottom: 0 }}>Who are you?</Title>
          <Paragraph>Please tell us who you are</Paragraph>
        </Col>
        <Col sm={12} md={12} xl={12}>
          <Card
            bordered={false}
            bodyStyle={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => router(`/user-dashboard/${user.username}`)}
          >
            <PiStudent size={40} color="#3498db" />
            <span style={{ fontSize: 30, marginLeft: 10 }}> STUDENT</span>
          </Card>
        </Col>
        <Col sm={12} md={12} xl={12}>
          <Card
            bordered={false}
            bodyStyle={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => router(`/user-dashboard/${user.username}`)}
          >
            <GiFarmer size={40} color="#3498db" />{" "}
            <span style={{ fontSize: 30, marginLeft: 10 }}> FARMERS</span>
          </Card>
        </Col>
        <Col sm={12} md={12} xl={12}>
          <Card
            bordered={false}
            bodyStyle={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={(event) => console.log(event)}
          >
            <FaLaptopMedical size={40} color="#3498db" />{" "}
            <span style={{ fontSize: 30, marginLeft: 10 }}> DOCTORS</span>
          </Card>
        </Col>
        <Col sm={12} md={12} xl={12}>
          <Card
            bordered={false}
            bodyStyle={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => router(`/user-dashboard/${user.username}`)}
          >
            <GiArchiveResearch size={40} color="#3498db" />{" "}
            <span style={{ fontSize: 30, marginLeft: 10 }}> RESEARCHERS</span>
          </Card>
        </Col>
      </Row>
    </GeneralAppShell>
  );
};

export default WhoAreYouPage;
