import { Col, Row, Typography } from "antd";
import { useAuth } from "hooks/auth/auth.hook";
import GeneralAppShell from "layout/app/general-app-shell";
import React from "react";

const UserDashboard: React.FC = () => {
  const { Title } = Typography;
  const { user } = useAuth();
  return (
    <GeneralAppShell>
      <Row
        gutter={[16, 16]}
        justify={"center"}
        align={"middle"}
        style={{ padding: "8rem" }}
      >
        <Col span={24}>
          <Title style={{ fontSize: 30,  marginBottom: 0 }}>
            Welcome dear <span style={{ color: "#2980b9", fontStyle: "italic"}}> ``{user.username}`` </span>to your
            dashboard, feel free to explore new things.
          </Title>
        </Col>
      </Row>
    </GeneralAppShell>
  );
};

export default UserDashboard;
