"use client";
import React from "react";
import Link from "next/link";
import {
    BarChartOutlined,
    UserOutlined,
    ContainerOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Button, Table } from "antd";
const { Header, Content, Footer, Sider } = Layout;
// const items = [
//     UserOutlined,
//     VideoCameraOutlined,
//     UploadOutlined,
//     UserOutlined,
// ].map((icon, index) => ({
//     key: String(index + 1),
//     icon: React.createElement(icon),
//     label: `nav ${index + 1}`,
// }));
const items = [
    {
        key: 1,
        icon: <BarChartOutlined />,
        label: (
            <Link href="/" className="text-black!">
                Dashboard
            </Link>
        ),
    },
    {
        key: 2,
        icon: <ContainerOutlined />,
        label: (
            <Link href="/" className="text-black!">
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

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
];

const App = () => {
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
                className="bg-white! w-[400]!"
            >
                <div className="px-4 pt-4">
                    <h3 className="font-bold">Suniti sukontaprapun</h3>
                    <h3>Admin</h3>
                </div>
                <Menu
                    theme="white"
                    mode="inline"
                    defaultSelectedKeys={["4"]}
                    items={items}
                    className="p-4!"
                />
            </Sider>
            <Layout>
                <Header className="flex justify-between items-center bg-white! px-6!">
                        <h3 className="text-xl font-bold">Menu Management</h3>
                        <Button color="default" variant="filled">
                            Add Item
                        </Button>
                </Header>
                <Content className="mx-6 mt-6">
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: "white",
                            borderRadius: "10px",
                        }}
                    >
                        <Table columns={columns} dataSource={data} />
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};
export default App;
