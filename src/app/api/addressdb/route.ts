// app/api/addressdb/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/libs/mogodb";
import Address from "@/models/address";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();

    const body = await req.json();
    const { addressUrl, extractedText, addressList } = body;

    if (!addressUrl || !Array.isArray(extractedText) || !Array.isArray(addressList)) {
      return NextResponse.json({ message: "Missing or invalid fields" }, { status: 400 });
    }

    const newAddress = new Address({ addressUrl, extractedText, addressList });
    await newAddress.save();

    return NextResponse.json({ message: "Address saved successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error saving address:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
