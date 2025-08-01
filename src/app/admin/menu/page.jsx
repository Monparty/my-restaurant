"use client";
import React from "react";
import { useState, useEffect } from "react";
import AdminLayout from "@/app/components/AdminLayout";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import { Table, Button, message } from "antd";

function page() {
    const [menuData, setMenuData] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const success = (message) => {
        messageApi.success(message);
    };

    const getMenus = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/menus", {
                method: "GET",
                caches: "no-store",
            });

            if (!res.ok) {
                throw new Error("Failed to fetch posts!");
            }

            const data = await res.json();
            setMenuData(data.menus);
        } catch (error) {
            console.log("Error loadind post: ", error);
        }
    };

    const handleDelete = async (id, name) => {
        const confirmed = confirm(`Are you sure you want to delete ${name}?`);

        if (confirmed) {
            try {
                const res = await fetch(
                    `http://localhost:3000/api/menus?id=${id}`,
                    {
                        method: "DELETE",
                    }
                );

                if (!res.ok) {
                    throw new Error("Failed to delete menu item!");
                }

                await getMenus();
                success("Delete data successfully");
                setTimeout(async () => {
                    router.push("/admin/menu");
                }, 1000);
            } catch (error) {
                console.error("Error deleting menu item:", error);
            }
        }
    };

    const columns = [
        {
            title: "#",
            dataIndex: "key",
            key: "key",
            align: "center",
            width: "8%",
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            align: "center",
            width: "10%",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: "16%",
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            width: "16%",
        },
        {
            title: "Create date",
            dataIndex: "create",
            key: "create",
            width: "16%",
        },
        {
            title: "Update date",
            dataIndex: "update",
            key: "update",
            width: "16%",
        },
        {
            title: "",
            dataIndex: "test",
            key: "test",
        },
    ];

    let count = 1;
    const data =
        menuData && menuData.length > 0
            ? menuData.map((item) => ({
                  key: count++,
                  image: (
                      <div className="flex justify-center">
                          <Image
                              src={item.imageUrl}
                              width={50}
                              height={50}
                              className="object-cover w-full h-14 rounded-md"
                              alt={item.name}
                              unoptimized
                          />
                      </div>
                  ),
                  name: item.name,
                  category: item.category,
                  create: format(item.createdAt, "dd/MM/yyyy - HH:mm:ss"),
                  update: format(item.updatedAt, "dd/MM/yyyy - HH:mm:ss"),
                  test: (
                      <div className="flex gap-2 justify-center">
                          <Link href={`/admin/menu/edit/${item._id}`}>
                              <Button color="primary" variant="filled">
                                  Edit
                              </Button>
                          </Link>
                          <Button
                              color="danger"
                              variant="filled"
                              onClick={() => handleDelete(item._id, item.name)}
                          >
                              Delete
                          </Button>
                      </div>
                  ),
              }))
            : [];

    useEffect(() => {
        getMenus();
    }, []);

    const table = (
        <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 10 }}
        />
    );
    return (
        <>
            {contextHolder}
            <AdminLayout
                showBtn={true}
                title={"Menu Management"}
                mainComponent={table}
            />
        </>
    );
}

export default page;
