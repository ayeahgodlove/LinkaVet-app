import { MenuOutlined } from "@ant-design/icons";
import { Button, ConfigProvider } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import LeftMenu from "./left-menu";
import RightMenu from "./right-menu";
import { Header } from "antd/es/layout/layout";
import { useTheme } from "hooks/shared/theme.hook";
import "./navbar.style.scss";

interface IProps {
  showMenuIcon?: boolean;
  handleShow?: () => void;
}

const Navbar: React.FC<IProps> = ({ showMenuIcon = false, handleShow }) => {
  const { isDarkMode } = useTheme();
  return (
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#08a30a",
        colorLink: "#214e0a",
        fontFamily: "Poppins",
        fontSize: 16,
        fontWeightStrong: 500,
      },
    }} 
  >
      <Header
        style={{ background: isDarkMode ? "" : "#fff", position: "sticky" }}
        className="menuBar header-box-shadow"
      >
        <div className="logo">
          <Link to="/" style={{ marginLeft: 1 }}>
            <img
              src="/logo/logo-2-removebg-preview.png"
              height={100}
              width={90}
              alt="honeyman logo"
              style={{ aspectRatio: 1/1, objectFit: "contain"}}
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
    </ConfigProvider>
  );
};

export default Navbar;
