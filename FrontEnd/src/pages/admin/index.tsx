import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  BookOutlined,
  ClusterOutlined,
  DesktopOutlined,
  FileOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, Space, Divider } from "antd";
import { useDispatch } from "react-redux";
import { getAllProduct } from "../../redux/apiRequest";
import { AnyAction } from "@reduxjs/toolkit";
import { useEffect } from "react";
import type { MenuProps } from 'antd';
import { UserNavigation } from "../../components/layout/UserNavigation";

const { Header, Sider, Content } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem;
}

const MenuAdmin = [
  getItem(
    <Link to={"/admin/dash-board"}>Dash Board</Link>,
    "dardboad",
    <DesktopOutlined />,
  ),
  getItem(
    <Link to={"/admin/user"}>Manage Users</Link>,
    "managerUser",
    <UserOutlined />
  ),
  getItem(
    <Link to={"/admin/books"}>Manage Books</Link>,
    "manageBooks",
    <BookOutlined />
  ),
  getItem(
    <Link to={"/admin/order"}>Manage Orders</Link>,
    "manageOrders",
    <FileOutlined />
  ),
];

const Index = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAllProduct() as unknown as AnyAction);
    }, []);

  return (
    <Layout className="layout">
      <Sider
        style={{ background: "#ffff" }}
        width={200}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <Space className="p-4 flex justify-center items-center text-2xl">
          <ClusterOutlined />
          {collapsed ? "" : "Quản trị"}
        </Space>
        <Divider className="mt-0" />
        <Menu
          mode="inline"
          defaultSelectedKeys={["dardboad"]}
          defaultOpenKeys={["dardboad"]}
          style={{ height: "100%" }}
          items={MenuAdmin}
        />
      </Sider>
      <Content>
        <Layout>
          <Header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 24px",
              background: '#fff',
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <UserNavigation /> 
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: "100%",
            }}
          >
            {<Outlet />}
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default Index;
