import crypto from "crypto";
import { NextResponse } from "next/server";

export async function GET() {
  const res = crypto.randomBytes(16).toString("hex");

  return NextResponse.json({ data: res });
}
