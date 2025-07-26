"use client";
import React from "react";
import Link from "next/link";
import {
    BarChartOutlined,
    UserOutlined,
    ContainerOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";

const { Header, Content, Footer, Sider } = Layout;
const items = [
    {
        key: 1,
        icon: <BarChartOutlined />,
        label: (
            <Link href="/admin" className="text-black!">
                Dashboard
            </Link>
        ),
    },
    {
        key: 2,
        icon: <ContainerOutlined />,
        label: (
            <Link href="/admin/menu" className="text-black!">
                Menu
            </Link>
        ),
    },
    {
        key: 3,
        icon: <UserOutlined />,
        label: (
            <Link href="/" className="text-black!">
                User
            </Link>
        ),
    },
];

function AdminLayout({ showBtn, title, mainComponent }) {
    return (
        <Layout className="h-dvh bg-white!">
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
                className="bg-white! p-4"
            >
                <div className="mb-4">
                    <h3 className="font-bold">Suniti sukontaprapun</h3>
                    <h3>Admin</h3>
                </div>
                <Menu
                    defaultSelectedKeys={["4"]}
                    items={items}
                    className="border-0!"
                />
            </Sider>
            <Layout>
                <Header className="flex justify-between items-center bg-white! px-6!">
                    <h3 className="text-xl font-bold">{title}</h3>
                    {showBtn && (
                        <Link href="/admin/menu/create">
                            <Button color="default" variant="filled">
                                Add Item
                            </Button>
                        </Link>
                    )}
                </Header>
                <Content className="mx-6 mt-6">
                    <div className="p-4 bg-white rounded-lg overflow-y-scroll h-full">
                        {mainComponent}
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
}

export default AdminLayout;
