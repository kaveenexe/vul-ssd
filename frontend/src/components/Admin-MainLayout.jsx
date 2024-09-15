import "../styles/admin.css";
import { Search } from "@mui/icons-material";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineSetting,
  AiOutlineLogout,
  AiOutlineShop,
  AiOutlineUser,
} from "react-icons/ai";

import { MdNotificationsNone } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import { FiUsers } from "react-icons/fi";
import { Outlet } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {IconButton, InputBase} from "@mui/material";
//import Logo from "../images/LOGO.png";

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "orders",
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: "Orders",
            },
            {
              key: "customers",
              icon: <FiUsers className="fs-4" />,
              label: "Customers",
            },
            {
              key: "vendors",
              icon: <AiOutlineShop className="fs-4" />,
              label: "Vendors",
            },
            {
              key: "settings",
              icon: <AiOutlineSetting className="fs-4" />,
              label: "Settings",
            },
            {
              key: "signout",
              icon: <AiOutlineLogout className="fs-4" />,
              label: "Logout",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-4"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="search-bar">
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </div>
          <div className="d-flex gap-3 align-items-center">
            <GrLanguage className="fs-5-language" />
            <MdNotificationsNone className="fs-4-notification" />
            <AiOutlineUser className="fs-4-user" />
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
