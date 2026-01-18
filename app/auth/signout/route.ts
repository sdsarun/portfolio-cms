// core
import { NextResponse, type NextRequest } from "next/server";

// utils
import { removeToken } from "@/features/auth/utils/remove-token";

export async function GET(request: NextRequest) {
  await removeToken();
  const redirectUrl = new URL("/", request.url);
  return NextResponse.redirect(redirectUrl);
}
