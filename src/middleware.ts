// /middleware/auth.js
import { NextRequest, NextResponse } from "next/server";

export const confif = {
  matcher: "/updat",
};

export function middleware(request: NextRequest) {
  // Spliting the actual token from the header (Bearer is at [0])
  // const authorization = request.headers.get("Authorization");

  // if (!authorization) {
  //   return Response.json("Unauthorized", { status: 401 });
  // }

  // const token = authorization.split(" ")[1];

  // const expectedToken = process.env.AUTH_TOKEN; // Ensure this is securely set in your environment variables

  // if (!token || token !== expectedToken) {
  //   return Response.json(
  //     { success: false, message: "Unauthorized" },
  //     { status: 401 }
  //   );
  // }

  return NextResponse.next();
}
