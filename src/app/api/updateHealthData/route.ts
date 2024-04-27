import { updateHealthData } from "@/lib/crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { error: "This has to be a POST request" },
      { status: 400 }
    );
  }

  try {
    // Extract data from request
    const { walletAddress, newData, currentData } = await req.json();

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address not provided" },
        { status: 400 }
      );
    }

    if (!newData) {
      return NextResponse.json(
        { error: "No new data provided" },
        { status: 400 }
      );
    }

    if (!currentData) {
      console.log("User has no current health data");
    }

    const newEncryptedData = updateHealthData(
      walletAddress,
      newData,
      currentData
    );

    // Respond with encrypted data
    return NextResponse.json({ data: newEncryptedData }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: JSON.stringify(e) }, { status: 500 });
  }
}
