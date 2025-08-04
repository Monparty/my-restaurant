"use client";
import React from "react";
import { Image } from "antd";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AdminLayout from "@/app/components/AdminLayout";
import { UploadOutlined } from "@ant-design/icons";
import {
    Button,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    message,
    Upload,
} from "antd";

function page({ params }) {
    const router = useRouter();
    const { id } = params;
    const [menuData, setMenuData] = useState([]);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const success = (message) => {
        messageApi.success(message);
    };

    const getDataById = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/menus/${id}`, {
                method: "GET",
                cache: "no-store",
            });

            if (!res.ok) {
                throw new Error("Failed to fetch a post!");
            }

            const data = await res.json();
            setMenuData(data.menu);

            form.setFieldsValue({
                name: data.menu.name,
                price: data.menu.price,
                category: data.menu.category,
                status: data.menu.status,
                description: data.menu.description,
                imageUrl: data.menu.imageUrl,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const onFinish = async (values) => {
        // console.log("Success:", values);
        try {
            const res = await fetch(`http://localhost:3000/api/menus/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (!res.ok) {
                throw new Error("Failed to update post");
            }

            success("Edit data successfully");
            setTimeout(async () => {
                router.push("/admin/menu");
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const formData = (
        <Form
            form={form}
            name="create_menu"
            style={{ maxWidth: 400 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout={"vertical"}
            size={"large"}
        >
            <Form.Item
                label="Menu name"
                name="name"
                rules={[{ required: true, message: "Please input menu name!" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Price"
                name="price"
                rules={[
                    { required: true, message: "Please input menu price!" },
                ]}
            >
                <InputNumber min={1} className="w-full!" />
            </Form.Item>
            <Form.Item
                label="Category"
                name="category"
                rules={[
                    { required: true, message: "Please input menu category!" },
                ]}
            >
                <Select
                    defaultValue="-"
                    className="w-full!"
                    options={[
                        { value: "food", label: "Food" },
                        { value: "drink", label: "Drink" },
                        { value: "snack", label: "Snack" },
                    ]}
                />
            </Form.Item>
            <Form.Item label="Description" name="description">
                <Input />
            </Form.Item>
            <Form.Item
                name="imageUrl"
                label="Menu Image"
                getValueFromEvent={(e) => {
                    if (Array.isArray(e)) {
                        return e;
                    }
                    return e?.fileList;
                }}
            >
                <Upload beforeUpload={() => false} maxCount={1}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
                {menuData.imageUrl ? (
                    <div className="mt-4">
                        <Image
                            width={160}
                            height={160}
                            className="object-cover"
                            src={menuData.imageUrl}
                        />
                    </div>
                ) : (
                    <></>
                )}
            </Form.Item>
            <Form.Item label="Status" name="status">
                <Radio.Group
                    name="statusGroup"
                    defaultValue={1}
                    options={[
                        { value: 1, label: "published" },
                        { value: 0, label: "unpublished" },
                    ]}
                />
            </Form.Item>
            <Form.Item label={""}>
                <Button type="primary" htmlType="submit">
                    Edit
                </Button>
            </Form.Item>
        </Form>
    );
    useEffect(() => {
        getDataById(id);
    }, []);

    return (
        <>
            {contextHolder}
            <AdminLayout title={"Edit menu"} mainComponent={formData} />
        </>
    );
}

export default page;
