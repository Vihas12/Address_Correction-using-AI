// app/api/address-complete/route.ts
import { NextResponse } from "next/server";
import { Client } from "@gradio/client";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json({ error: "Missing query text" }, { status: 400 });
    }

    const client = await Client.connect("warl/IndianaddressCompletion");

    // Gradio client expects input as an array
    const result = await client.predict("/predict", [query]);

    // result.data[0] contains the DataFrame with address rows
    const dataframe = result.data[0];
    const completedAddresses = dataframe.data.map((row: string[]) => row[0]);

    return NextResponse.json({ completedAddresses });
  } catch (error) {
    console.error("Address completion error:", error);
    return NextResponse.json({ error: "Failed to complete address" }, { status: 500 });
  }
}
