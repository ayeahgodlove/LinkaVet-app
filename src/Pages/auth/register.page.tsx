import GeneralAppShell from "layout/app/general-app-shell";
import React, { useState } from "react";
import { LockOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, message } from "antd";
import "../../styles/login.style.scss";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { useUser } from "hooks/user.hook";
import { IUser, emptyUser } from "models/user.model";

const RegisterPage: React.FC = () => {
  const { addUser } = useUser();
  const [isSubmitting, setSubmitting] = useState(false);
  const onFinish = async (values: any) => {
    console.log(values);
    setSubmitting(true);
    const obj: IUser = {
      ...emptyUser,
      firstname: values.firstname,
      lastname: values.lastname,
      username: values.username,
      email: values.email,
      phoneNumber: values.phoneNumber,
      password: values.password,
    };

    const feedback = await addUser(obj);
    if (feedback) {
      message.success("User Registered Sucessfully!");
    } else {
      message.error("Registration failed!");
    }
    setSubmitting(false);
  };

  return (
    <GeneralAppShell>
      <Row
        justify={"center"}
        align="middle"
        className="form__container"
        style={{
          background: "url(./images/bg-1-removebg-preview.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right",
        }}
      >
        <Col
          xs={18}
          sm={12}
          lg={6}
          style={{
            background: "#fffff3",
            padding: "50px 20px",
            borderRadius: 10,
          }}
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Row justify={"space-between"} align={"middle"}>
              <Col span={12}>
                <Form.Item
                  name="firstname"
                  rules={[
                    { required: true, message: "Please input your Firstname!" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="firstname"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="lastname"
                  rules={[
                    { required: true, message: "Please input your Lastname!" },
                  ]}
                  style={{
                    marginLeft: 5,
                  }}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="lastname"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                prefix={<MdEmail className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              rules={[
                { required: true, message: "Please input your PhoneNumber!" },
              ]}
            >
              <Input
                prefix={<PhoneOutlined className="site-form-item-icon" />}
                placeholder="PhoneNumber"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: "100%" }}
                loading={isSubmitting}
              >
                Register
              </Button>{" "}
            </Form.Item>
            <span
              style={{
                display: "inline-block",
                width: "100%",
                textAlign: "center",
                marginTop: 10,
              }}
            >
              Or <Link to="/login">login now!</Link>
            </span>
          </Form>
        </Col>
      </Row>
    </GeneralAppShell>
  );
};

export default RegisterPage;
