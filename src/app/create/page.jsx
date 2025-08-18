"use client"
import {useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function CreatePost() {
    // name, description, category, imageUrl, price
    const router = useRouter();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [price, setPrice] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !category || !price) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const res = await fetch(`${ process.env.NEXT_PUBLIC_APP_URL_APP_URL }/api/menus`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, description, category, imageUrl, price })
            })

            if (res.ok) {
                router.push("/")
            } else {
                throw new Error("Failed to create post")
            }

        } catch(error) {
            console.log(error)
        }
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold py-4 border-b border-gray-200 mb-4">
                Create post
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-1/3">
                <input onChange={(e) => setName(e.target.value)} type="text" className="border border-gray-300 p-2 rounded-md" placeholder="name" />
                <input onChange={(e) => setDescription(e.target.value)} type="text" className="border border-gray-300 p-2 rounded-md" placeholder="desc" />
                <input onChange={(e) => setCategory(e.target.value)} type="text" className="border border-gray-300 p-2 rounded-md" placeholder="category" />
                <input onChange={(e) => setImageUrl(e.target.value)} type="text" className="border border-gray-300 p-2 rounded-md" placeholder="image url" />
                <input onChange={(e) => setPrice(e.target.value)} type="text" className="border border-gray-300 p-2 rounded-md" placeholder="price" />
                
                <div className="flex gap-2 justify-end">
                    <Link href="/" className="text-white p-2 bg-gray-400 rounded-lg">
                        Back
                    </Link>
                    <button type="submit" className="text-white p-2 bg-green-600 rounded-lg cursor-pointer">Create</button>
                </div>
            </form>
        </div>
    )
}