import React, { useState } from "react";
import { Menu, Divider, Switch, ConfigProvider } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  BellOutlined,
  InfoCircleTwoTone,
  LogoutOutlined,
  ShoppingCartOutlined,
  TranslationOutlined,
} from "@ant-design/icons";
import { BsSun } from "react-icons/bs";
import { Avatar, Badge, Space } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { useTheme } from "hooks/shared/theme.hook";
import { MdDarkMode } from "react-icons/md";
import { useAuth } from "hooks/auth/auth.hook";

const RightMenu = () => {
  const [language, setLanguage] = useState("en");
  const { handleSetTheme, isDarkMode } = useTheme();

  const router = useNavigate();
  const toggleLanguage = (key: string) => {
    setLanguage(key);
    console.log(language);
  };

  const redirectToCart = () => {
    router("/shopping-cart")
  }
  const { logoutUserFunction, isAuthenticated, user } = useAuth();

  const items: ItemType[] = [
    {
      label: <Link to={"/auth/login"}>Signin</Link>,
      key: "signin",
      style: {
        display: isAuthenticated ? "none" : "",
      },
    }, // remember to pass the key prop
    {
      label: (
        <b
          style={{
            fontSize: 20,
            color: "#317610",
            position: "absolute",
            right: 5,
            bottom: 15,
          }}
        >
          0
        </b>
      ),
      icon: (
        <span>
          <ShoppingCartOutlined
            className="app-header__icon"
            size={30}
            style={{ fontSize: 25 }}
          />
        </span>
      ),
      key: "shopping-cart",
      onClick: redirectToCart
    }, // remember to pass the key prop
    {
      label: (
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#08a30a",
            },
          }}
        >
          <Switch
            defaultChecked={isDarkMode}
            // size="small"
            onChange={handleSetTheme}
            checkedChildren={<BsSun size={18} />}
            unCheckedChildren={<MdDarkMode size={18} color="#333" />}
          />
        </ConfigProvider>
      ),
      key: "theme",
      style: {
        padding: 0,
      },
    }, // remember to pass the key prop
    {
      label: "",
      key: "notification",
      icon: (
        <Badge dot color="#f77908" count={1} className="app-header__link">
          <BellOutlined className="app-header__icon" style={{ fontSize: 23 }} />
        </Badge>
      ),
      children: [
        {
          label: (
            <>
              <Link to="/">
                <Space size="middle" align="start">
                  <InfoCircleTwoTone
                    twoToneColor="#52c41a"
                    style={{ fontSize: 23 }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "wrap",
                    }}
                  >
                    <h3>Notification title</h3>
                    <p style={{ flex: 1 }}>
                      Lorem ipsum dolor sit, amet consectetur
                    </p>
                  </div>
                </Space>
              </Link>
            </>
          ),
          key: "notification-key",
          style: {
            display: !isAuthenticated ? "none" : "",
          },
        },
        {
          label: <Link to="/">mark all as read</Link>,
          key: "mark-as-read",
        },
      ],
      style: {
        display: !isAuthenticated ? "none" : "",
      },
    }, // which is required
    {
      label: "",
      key: "language",
      icon: (
        <TranslationOutlined
          className="app-header__icon"
          style={{ fontSize: 23 }}
        />
      ),
      children: [
        {
          label: `English`,
          key: "en",
          icon: (
            <>
              <img
                src="/en.png"
                alt="English"
                style={{
                  maxWidth: "100%",
                  height: "18px",
                  marginRight: "8px",
                }}
              />
            </>
          ),
          onClick: () => toggleLanguage("en"),
        },
        {
          label: `French`,
          key: "fr",
          icon: (
            <>
              <img
                src="/fr.png"
                alt="English"
                style={{
                  maxWidth: "100%",
                  height: "18px",
                  marginRight: "8px",
                }}
              />
            </>
          ),
          onClick: () => toggleLanguage("fr"),
        },
      ],
    }, // which is required
    {
      label: "",
      key: "avatar",
      icon: (
        <Avatar
          style={{
            color: "#fff",
            backgroundColor: "#08a30a",
            fontWeight: "bold",
            fontSize: 14,
          }}
          // src={user?.picture}
        >
          {user?.username?.charAt(0).toUpperCase()}
        </Avatar>
      ),
      children: [
        {
          label: <strong>{user?.username}</strong>,
          key: "profile_name",
        },
        {
          label: (
            <>
              <p
                style={{
                  letterSpacing: 1.875,
                  marginBottom: 0,
                  color: "#2D3239",
                  fontSize: ".75rem",
                }}
              >
                {"My Profile".toUpperCase()}
              </p>
              <Divider style={{ margin: 2 }} />
            </>
          ),
          key: "profile_path",
          type: "group",
          children: [
            {
              label: (
                <Link
                  to="/profile/tab?=settings"
                  // onClick={() => handleRoute('settings')}
                >
                  My Settings
                </Link>
              ),
              key: "my-settings",
            },
            {
              label: (
                <>
                  <Link
                    to="#"
                    onClick={() => {
                      logoutUserFunction();
                      router("/");
                    }}
                  >
                    Logout
                  </Link>
                </>
              ),
              key: "logout",
              icon: <LogoutOutlined />,
            },
          ],
        },
      ],
      style: {
        display: !isAuthenticated ? "none" : "",
      },
    }, // which is required
  ];

  return (
    <Menu
      theme={isDarkMode ? "dark" : "light"}
      className="right_navigation"
      mode={"horizontal"}
      style={{
        width: isAuthenticated ? "300px" : "200px",
        background: "inherit",
      }}
      items={items}
    />
  );
};

export default RightMenu;
