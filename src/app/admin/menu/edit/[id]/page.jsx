"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AdminLayout from "@/app/components/AdminLayout";
import { Button, Form, Input, Select } from "antd";

function page({ params }) {
    const router = useRouter();
    const { id } = params;
    const [menuData, setMenuDatat] = useState("");
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
                router.push("/admin/menu");
            } else {
                throw new Error("Failed to create post");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getDataById = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/menus/${id}`, {
                method: "GET",
                cache: "no-store"
            })

            if (!res.ok) {
                throw new Error("Failed to fetch a post!");
            }
            const data = await res.json();
            setMenuDatat(data.menu);

        } catch (error) {
            console.log(error);
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const formData = (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout={"vertical"}
            size={"large"}
        >
            <Form.Item
                label="Menu name"
                name="name"
                rules={[
                    { required: true, message: "Please input your username!" },
                ]}
            >
                {/* {menuData.name} */}
                <Input placeholder={menuData.name} />
            </Form.Item>
            <Form.Item
                label="Price"
                name="price"
                rules={[
                    { required: true, message: "Please input your username!" },
                ]}
            >
                {menuData.price}
                <Input defaultValue={menuData.price} />
            </Form.Item>
            <Form.Item
                label="Category"
                name="category"
                rules={[
                    { required: true, message: "Please input your username!" },
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
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
    useEffect(() => {
        getDataById(id);
    }, []);

    return <AdminLayout title={"Create menu"} mainComponent={formData} />;
}

export default page;
