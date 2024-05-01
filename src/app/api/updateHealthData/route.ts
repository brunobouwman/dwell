import { ServiceFactory } from "@/services/factory/factory";
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
    const { walletAddress, reference } = await req.json();

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address not provided" },
        { status: 400 }
      );
    }

    // if (!newData) {
    //   return NextResponse.json(
    //     { error: "No new data provided" },
    //     { status: 400 }
    //   );
    // }

    // if (!currentData) {
    //   console.log("User has no current health data");
    // }

    const serviceFactory = new ServiceFactory();

    const updated = await serviceFactory.updateHealthData({
      address: walletAddress,
      reference,
    });

    // Respond with encrypted data
    return NextResponse.json(
      { data: updated, message: "Data Updated!" },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ error: JSON.stringify(e) }, { status: 500 });
  }
}
