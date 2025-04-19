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


export async function PATCH(req: NextRequest) {
  try {
    await connectMongoDB();
    
    const { addressUrl, correctAddress } = await req.json();

    if (!addressUrl || !correctAddress) {
      return NextResponse.json(
        { message: "Missing addressUrl or correctAddress" },
        { status: 400 }
      );
    }

    const updated = await Address.findOneAndUpdate(
      { addressUrl }, // or use _id if available
      { correctAddress },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { message: "Address not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Correct address updated successfully", updated },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating correct address:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}