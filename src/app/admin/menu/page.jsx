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
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            width: "8%",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            align: "center",

        },
        {
            title: "Create date",
            dataIndex: "create",
            key: "create",
            align: "center",

        },
        {
            title: "Update date",
            dataIndex: "update",
            key: "update",
            align: "center",

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
                  image: (item.imageUrl !== null ?
                      <div className="flex justify-center">
                          <Image
                              src={item.imageUrl}
                              width={50}
                              height={50}
                              className="object-cover w-full h-14 rounded-md"
                              alt={item.name}
                          />
                      </div> :
                      <div className="flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 32 32"><path fill="#a6a6a6" d="M30 3.414L28.586 2L2 28.586L3.414 30l2-2H26a2.003 2.003 0 0 0 2-2V5.414zM26 26H7.414l7.793-7.793l2.379 2.379a2 2 0 0 0 2.828 0L22 19l4 3.997zm0-5.832l-2.586-2.586a2 2 0 0 0-2.828 0L19 19.168l-2.377-2.377L26 7.414zM6 22v-3l5-4.997l1.373 1.374l1.416-1.416l-1.375-1.375a2 2 0 0 0-2.828 0L6 16.172V6h16V4H6a2 2 0 0 0-2 2v16z"/></svg>
                      </div>
                  ),
                  name: item.name,
                  category: item.category,
                  status:
                      item.status === 1 ? (
                          <Button color="cyan" variant="filled">
                              Published
                          </Button>
                      ) : (
                          <Button color="default" variant="filled">
                              Unpublished
                          </Button>
                      ),
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
