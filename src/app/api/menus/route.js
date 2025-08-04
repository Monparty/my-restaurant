import { connectMongoDB } from "../../../../lib/mongodb";
import MenuItem from "../../../../models/menu";
import { NextResponse } from "next/server";

export async function POST(req) {
    const menuData = await req.json();
    await connectMongoDB();
    await MenuItem.create(menuData);
    return NextResponse.json({ message: "Menu created" }, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const menus = await MenuItem.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ menus })
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await MenuItem.findByIdAndDelete(id);
    return NextResponse.json({ message: "Menu deleted" }, { status: 200 })
}