import { connectMongoDB } from "../../../../../lib/mongodb";
import MenuItem from "../../../../../models/menu";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { id } = params;
    await connectMongoDB();
    const menu = await MenuItem.findOne({ _id: id });
    return NextResponse.json({ menu }, { status: 200 });
}

export async function PUT(req, { params, values }) {
    const { id } = params;
    await connectMongoDB();
    const {name, price, category, description, imageUrl} = await req.json();
    await MenuItem.findByIdAndUpdate(id, {name, price, category, description, imageUrl})
    return NextResponse.json({ message: "Menu update"} , { status: 200 })
}