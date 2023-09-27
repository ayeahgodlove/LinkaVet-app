import { Drawer, Layout, Menu, MenuProps } from "antd";
import React, { useEffect, useState } from "react";
import { FaBlog, FaRegComments, FaUsersCog } from "react-icons/fa";
import { TiDocumentText } from "react-icons/ti";
import {
  MdOutlinePointOfSale,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import Navbar from "components/navbar";
import "./AppShell.scss";
import { Link } from "react-router-dom";

import { ConfigProvider, theme } from "antd";
import { useTheme } from "hooks/shared/theme.hook";
import { FiTag, FiUsers } from "react-icons/fi";
import { useAuth } from "hooks/auth/auth.hook";
import { useDispatch } from "react-redux";
import { initialDataAsync } from "redux/action/initial.action";

const { defaultAlgorithm, darkAlgorithm } = theme;

const { Sider, Content, Footer } = Layout;

const items2: MenuProps["items"] = [
  {
    label: (
      <Link to="/admin/categories" style={{ padding: 0 }}>
        Categories
      </Link>
    ),
    key: "categories",
    icon: <BiCategoryAlt size={21} color="#3498db" />,
  },
  {
    label: (
      <Link to="/admin/posts" style={{ padding: 0 }}>
        Posts
      </Link>
    ),
    key: "posts",
    icon: <FaBlog size={21} color="#3498db" />,
  },
  {
    label: (
      <Link to="/admin/documents" style={{ padding: 0 }}>
        Documents
      </Link>
    ),
    key: "documents",
    icon: <TiDocumentText size={21} color="#3498db" />,
  },
  {
    label: (
      <Link to="/admin/products" style={{ padding: 0 }}>
        Products
      </Link>
    ),
    key: "products",
    icon: <MdOutlineProductionQuantityLimits size={21} color="#3498db" />,
  },
  {
    label: (
      <Link to="/admin/tags" style={{ padding: 0 }}>
        Tags
      </Link>
    ),
    key: "tags",
    icon: <FiTag size={21} color="#3498db" />,
  },
  {
    label: (
      <Link to="/admin/users" style={{ padding: 0 }}>
        Users
      </Link>
    ),
    key: "users",
    icon: <FiUsers size={21} color="#3498db" />,
  }, // remember to pass the key prop
  {
    label: (
      <Link to="/admin/reviews" style={{ padding: 0 }}>
        Reviews
      </Link>
    ),
    key: "reviews",
    icon: <FaRegComments size={21} color="#3498db" />,
  },
  {
    label: (
      <Link to="/admin/payments" style={{ padding: 0 }}>
        Payments
      </Link>
    ),
    key: "payments",
    icon: <FaUsersCog size={21} color="#3498db" />,
  }, // remember to pass the key prop
];
interface IProps {
  children: any;
}
const AppShell: React.FC<IProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [show, setShow] = useState(false);
  const { isDarkMode } = useTheme();
  const { isAuthenticated, user } = useAuth();
  const dispatch = useDispatch();

  const handleShow = () => {
    setShow(true);
  };

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };
  const onClose = () => {
    setShow(false);
  };

  if (isAuthenticated && user) {
    setTimeout(() =>   {
      dispatch(initialDataAsync() as any);
    }, 3000);
  }

  useEffect(() => {}, []);
  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: "#3498db",
          colorLink: "#2980b9",
        },
      }}
    >
      <Layout className="app-shell-layout">
        <Navbar showMenuIcon handleShow={handleShow} />
        <Layout>
          {
            //Display Sidebar when it's admin
            user && user.roles && user.roles.map((r) => r.name).includes("doctor") ? (
              <>
                <Sider
                  width={200}
                  className={`site-layout-background ${
                    show ? "app-shell-sidebar_show" : "app-shell-sidebar_hide"
                  }`}
                  collapsible
                  collapsed={collapsed}
                  onCollapse={handleCollapse}
                >
                  <Menu
                    mode="inline"
                    style={{ height: "100vh", borderRight: 0 }}
                    items={items2}
                  />
                </Sider>
                <Drawer
                  title="LinkaVet"
                  placement="left"
                  closable={true}
                  onClose={onClose}
                  open={show}
                  width={200}
                >
                  <Sider
                    width={200}
                    className={`site-layout-background ${
                      show ? "app-shell-sidebar_show" : "app-shell-sidebar_hide"
                    }`}
                  >
                    <Menu
                      mode="inline"
                      defaultSelectedKeys={["1"]}
                      defaultOpenKeys={["sub1"]}
                      style={{ height: "100%", borderRight: 0 }}
                      items={items2}
                    />
                  </Sider>
                </Drawer>
              </>
            ) : (
              <></>
            )
          }

          {/* Display no sidebar when it's others */}

          <Content
            className="site-layout-background"
            style={{
              // padding: 24,
              margin: 0,
              minHeight: 400,
            }}
          >
            {children}
            {/* <Footer style={{ textAlign: "center" }}>
                Ant Design ©2018 Created by Ant UED
              </Footer> */}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default AppShell;
