import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware(req) {
  const token = await getToken({ req });

  if (token) {
    return NextResponse.redirect(new URL ('/Home', req.url));
  }

  return NextResponse.next();
}

// Routes
export const config = {
  matcher: [
    "/",
  ]
};