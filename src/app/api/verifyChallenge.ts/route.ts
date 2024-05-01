import { NextResponse } from "next/server";
import { verifyChallenge } from "../../../services/crypto/crypto";

export default async function GET(req: Request) {
  if (req.method !== "GET") {
    return NextResponse.json(
      { error: "This has to be a GET request" },
      { status: 500 }
    );
  }

  let address, currentData, targetChallenge;

  try {
    // Extract data from request
    const { walletAddress, data, challenge } = await req.json();

    address = walletAddress;
    if (!address) {
      return NextResponse.json(
        { error: "No address provided" },
        { status: 400 }
      );
    }

    currentData = data;
    if (!currentData) {
      return NextResponse.json(
        { error: "User has no current data" },
        { status: 400 }
      );
    }

    targetChallenge = challenge;
    if (!targetChallenge) {
      return NextResponse.json(
        { error: "No target challenge provided" },
        { status: 400 }
      );
    }

    const hasMetConditions = verifyChallenge(walletAddress, data, challenge);

    return NextResponse.json({ data: hasMetConditions }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: JSON.stringify(e) }, { status: 500 });
  }
}
