"use client";
import React from "react";
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
    Image as AntdImage
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
            const res = await fetch(`${ process.env.NEXT_PUBLIC_APP_URL_APP_URL }/api/menus/${id}`, {
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

    const getBase64WithCompression = (file, maxWidth = 800, quality = 0.7) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const objImage = new Image();
                
                objImage.src = event.target.result;
                objImage.onload = () => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    let width = objImage.width;
                    let height = objImage.height;

                    if (width > maxWidth) {
                        height = height * (maxWidth / width);
                        width = maxWidth;
                    }

                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(objImage, 0, 0, width, height);
                    const dataUrl = canvas.toDataURL("image/webp", quality);
                    resolve(dataUrl);
                };

                objImage.onerror = (error) => reject(error);
            };

            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });

    const onFinish = async (values) => {
        // console.log("Success:", values);
        const newValues = { ...values };

        if (
            values.imageUrl &&
            Array.isArray(values.imageUrl) &&
            values.imageUrl.length > 0
        ) {
            try {
                const file = values.imageUrl[0].originFileObj;
                const base64String = await getBase64WithCompression(
                    file,
                    800,
                    0.7
                );
                // console.log("Converted Image to Base64:", base64String);
                newValues.imageUrl = base64String;
            } catch (error) {
                console.error("Failed to convert file:", error);
                return;
            }
        } else if (values.imageUrl && typeof values.imageUrl === "string") {
            
        } else {
            newValues.imageUrl = null;
        }

        try {
            const res = await fetch(`${ process.env.NEXT_PUBLIC_APP_URL_APP_URL }/api/menus/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newValues),
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
            </Form.Item>
                {menuData.imageUrl ? (
                    <div className="mb-4 w-fit">
                        <AntdImage
                            width={160}
                            height={160}
                            className="object-cover"
                            src={menuData.imageUrl}
                        />
                    </div>
                ) : (
                    <></>
                )}
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
