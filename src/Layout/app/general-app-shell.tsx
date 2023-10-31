import { Drawer, Layout, Menu } from "antd";
import React, {  useState } from "react";
import { ConfigProvider, theme, FloatButton } from "antd";

import Navbar from "components/navbar";
import "./AppShell.scss";
import { GeneralMenuItemsWithIcons } from "components/navbar/menu";
import { useTheme } from "hooks/shared/theme.hook";
import { FiArrowUp } from "react-icons/fi";
import useWindowSize from "hooks/shared/window-resize.hook";
// import { green } from '@ant-design/colors';

const { Sider, Content } = Layout;
const { defaultAlgorithm, darkAlgorithm } = theme;

interface IProps {
  children: any;
}
const GeneralAppShell: React.FC<IProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [show, setShow] = useState(false);
  const { isDarkMode } = useTheme();
  const { height } = useWindowSize();
  const handleShow = () => {
    setShow(true);
  };

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };
  const onClose = () => {
    setShow(false);
  }; 

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: "#08a30a",
          colorLink: "#214e0a",
          fontFamily: "Poppins"
        },
      }}
    >
      <Layout className="app-shell-layout">
       

        <Navbar showMenuIcon handleShow={handleShow} />
        <Layout>
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
                items={GeneralMenuItemsWithIcons}
              />
            </Sider>
          </Drawer>
          <Layout style={{ padding: 0 }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 0,
                margin: 0,
                minHeight: 280,
                background: "transparent",
              }}
            >
              {children}
            </Content>
            <FloatButton.BackTop icon={<FiArrowUp />} visibilityHeight={400} />
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default GeneralAppShell;
