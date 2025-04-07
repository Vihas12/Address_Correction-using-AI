// app/api/extract/route.ts
import { NextResponse } from "next/server";
import { Client } from "@gradio/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { imageUrl } = body;

    if (!imageUrl) {
      return NextResponse.json({ error: "No image URL provided" }, { status: 400 });
    }

    const client = await Client.connect("warl/textextraction");
    const result = await client.predict("predict", [imageUrl]);
    const extractedText = result.data as string;

    return NextResponse.json({ extractedText });
  } catch (error) {
    console.error("Gradio error:", error);
    return NextResponse.json({ error: "Failed to extract text" }, { status: 500 });
  }
}
