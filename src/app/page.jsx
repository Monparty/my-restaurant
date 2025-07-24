"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
// import DeleteBtn from "./components/DeleteBtn";
import { Flex, Splitter, Typography } from 'antd';
import Tab from "./components/Tab"
import CardItem from "./components/CardItem"
import OrderList from "./components/OrderList";

export default function Home() {
    const [postData, setPostData] = useState([])

    const getPosts = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/menus", {
                method: "GET",
                caches: "no-store"
            })

            if (!res.ok) {
                throw new Error("Failed to fetch posts!");
            }

            const data = await res.json();
            setPostData(data.menus);
        } catch (error) {
            console.log("Error loadind post: ", error);
        }
    }

    useEffect(() => {
        getPosts();
    }, []);
    const Desc = props => (
        <Typography.Title type="secondary" level={5}>
            {props.text}
        </Typography.Title>
    );

    const card = <CardItem />
    const order = <OrderList />
    const tabs = <Tab component={card} />


    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold py-4 border-b border-gray-200">
                my restaurant
            </h1>
            <Splitter className="h-dvh! shadow-xl bg-[#FCFBF7]" >
                <Splitter.Panel defaultSize="30%" min="20%" max="100%" className="p-4!">
                    <Desc text={tabs} />
                </Splitter.Panel>
                <Splitter.Panel className="p-4!">
                    <Desc text={order} />
                </Splitter.Panel>
            </Splitter>

            <div className="py-4">
                <Link href="/create" className="text-white p-2 bg-green-600 rounded-lg">
                    Create
                </Link>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {postData && postData.length > 0 ? (
                    postData.map(item => (
                        <div key={item._id} className="border border-gray-200 p-4 rounded-lg grid gap-4 shadow-md">
                            <h4>{item.name}</h4>
                            <Image className="w-full rounded-lg" width={100} height={100} src={item.imageUrl} alt={item.name} unoptimized />
                            <p>{item.description}</p>
                            <p>{item.price}</p>
                            <div className="flex gap-2 justify-end">
                                <Link href={`/edit/${item._id}`} className="text-white p-2 bg-blue-500 rounded-lg">
                                    Edit
                                </Link>
                                {/* <DeleteBtn id={item._id} /> */}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>
                        No posts
                    </p>
                )}
            </div>
        </div>
    );
}
