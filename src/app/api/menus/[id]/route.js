import { connectMongoDB } from "../../../../../lib/mongodb";
import MenuItem from "../../../../../models/menu";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { id } = params;
    await connectMongoDB();
    const menu = await MenuItem.findOne({ _id: id });
    return NextResponse.json({ menu }, { status: 200 });
}

export async function PUT(req, { params }) {
    const { id } = params;
    await connectMongoDB();
    const {
        newTitle: title,
        newImg: img,
        newContent: content
    } = await req.json();
    await MenuItem.findByIdAndUpdate(id, {title, img, content})
    return NextResponse.json({ message: "Post update"} , { status: 200 })
}