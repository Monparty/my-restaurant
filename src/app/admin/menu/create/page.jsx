"use client";
import React from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/app/components/AdminLayout";
import { Button, Form, Input, InputNumber, Select, message } from "antd";

function page() {
    const router = useRouter();

    const [messageApi, contextHolder] = message.useMessage();
    const success = (message) => { messageApi.success(message) };

    const onFinish = async (values) => {
        console.log("Success:", values);
        try {
            const res = await fetch("http://localhost:3000/api/menus", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (res.ok) {
                success('Data added successfully');
                setTimeout(async () => {
                    router.push("/admin/menu");
                }, 1000);
            } else {
                throw new Error("Failed to create post");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const formData = (
        <Form
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
            <Form.Item label="Image Url" name="imageUrl">
                <Input />
            </Form.Item>

            <Form.Item label={""}>
                <Button type="primary" htmlType="submit">
                    Create
                </Button>
            </Form.Item>
        </Form>
    );

    return (
        <>
            {contextHolder}
            <AdminLayout title={"Create menu"} mainComponent={formData} />
        </>
    );
}

export default page;
