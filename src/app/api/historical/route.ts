import ServiceFactory from "@/utils/serviceFactory";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // Check if the request is a GET request
  if (req.method !== "GET") {
    return NextResponse.json(
      { error: "This has to be a GET request" },
      { status: 400 }
    );
  }
  const url = new URL(req.url);

  const refreshToken = url.searchParams.get("refreshToken");

  if (!refreshToken) {
    return NextResponse.json(
      { error: "No refresh token provided" },
      { status: 404 }
    );
  }

  const service = ServiceFactory.getInstance().historicalService;

  try {
    const { userData, error } = await service.getHistoricalData({
      token: refreshToken,
    });

    if (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }

    // Return a success message
    return NextResponse.json({ data: userData }, { status: 200 });

    // Catch any errors
  } catch (e) {
    return NextResponse.json({ error: JSON.stringify(e) }, { status: 500 });
  }
}
