"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/app/components/AdminLayout";
import { UploadOutlined } from "@ant-design/icons";
import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
    message,
    Upload,
} from "antd";

function page() {
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const success = (message) => {
        messageApi.success(message);
    };

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const onFinish = async (values) => {
        console.log("Success:", values);
        const newValues = { ...values };

        if (values.imageUrl && values.imageUrl.length > 0) {
            try {
                const file = values.imageUrl[0].originFileObj;
                const base64String = await getBase64(file);
                console.log("Converted Image to Base64:", base64String);
                newValues.imageUrl = base64String;
                message.success("ข้อมูลพร้อมไฟล์ถูกประมวลผลสำเร็จ!");
            } catch (error) {
                console.error("Failed to convert file:", error);
                message.error("ไม่สามารถแปลงไฟล์เป็น Base64 ได้");
                return;
            }
        } else {
            newValues.imageUrl = null;
        }

        try {
            const res = await fetch("http://localhost:3000/api/menus", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newValues),
            });

            if (res.ok) {
                success("Data added successfully");
                setTimeout(async () => {
                    router.push("/admin/menu");
                }, 1000);
            } else {
                throw new Error("Failed to create post");
            }
        } catch (error) {
            message.error("Failed to submit data: " + error.message);
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
