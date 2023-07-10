import { MenuOutlined } from "@ant-design/icons";
import { Button, ConfigProvider } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import LeftMenu from "./left-menu";
import RightMenu from "./right-menu";
import { Header } from "antd/es/layout/layout";
import { ThemeConfig } from "antd/es/config-provider/context";
import { useTheme } from "hooks/shared/theme.hook";

interface IProps {
  showMenuIcon?: boolean;
  handleShow?: () => void;
}
const theme: ThemeConfig = {
  token: {},
};
const Navbar: React.FC<IProps> = ({ showMenuIcon = false, handleShow }) => {
  const { isDarkMode } = useTheme();
  return (
    <>
      <Header
        style={{ background: isDarkMode ? "" : "#fff", position: "sticky" }}
        className="menuBar"
      >
        <div className="logo">
          <Link to="/" style={{ marginLeft: 1 }}>
            <img
              src="/logo.png"
              height={50}
              width={50}
              alt="honeyman logo"
            />
          </Link>
        </div>
        <div className="menuCon">
          {/* other things */}
          <div className="leftMenu">
            <LeftMenu />
          </div>
          <div className="rightMenu">
            <RightMenu />
          </div>

          {showMenuIcon && (
            <Button
              type="default"
              icon={<MenuOutlined size={25} style={{ fontSize: "18px" }} />}
              onClick={handleShow}
              className="app-shell-baricon"
            />
          )}
        </div>
      </Header>
    </>
  );
};

export default Navbar;
