import { MenuProps } from "antd";
import { Link } from "react-router-dom";
import {
  MdOutlineArticle,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { FiHome, FiPhoneCall } from "react-icons/fi";
import React from "react";

const GeneralMenuItemsWithIcons: MenuProps["items"] = [
  {
    label: (
      <Link to="/home" style={{ padding: 0 }}>
        Home
      </Link>
    ),
    key: "home",
    icon: <FiHome size={21} color="#f77908" />,
  },
  {
    label: (
      <Link to="/products" style={{ padding: 0 }}>
        Products
      </Link>
    ),
    key: "products",
    icon: <MdOutlineProductionQuantityLimits size={21} color="#f77908" />,
  },

  {
    label: (
      <Link to="/posts" style={{ padding: 0 }}>
        Posts
      </Link>
    ),
    key: "posts",
    icon: <MdOutlineArticle size={21} color="#f77908" />,
  },
  {
    label: (
      <Link to="/contact-us" style={{ padding: 0 }}>
        Contact Us
      </Link>
    ),
    key: "contact-us",
    icon: <FiPhoneCall size={21} color="#f77908" />,
  },
];

const GeneralMenuItemsWithoutIcons: MenuProps["items"] = [
  {
    label: (
      <Link to="/home" style={{ padding: 0 }}>
        Home
      </Link>
    ),
    key: "home",
  },
  {
    label: (
      <Link to="/products" style={{ padding: 0 }}>
        Products
      </Link>
    ),
    key: "products",
  },

  {
    label: (
      <Link to="/posts" style={{ padding: 0 }}>
        Posts
      </Link>
    ),
    key: "posts",
  },
  {
    label: (
      <Link to="/contact-us" style={{ padding: 0 }}>
        Contact Us
      </Link>
    ),
    key: "contact-us",
  },
];
export {
  GeneralMenuItemsWithIcons,
  GeneralMenuItemsWithoutIcons
}