import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/lib/sessions";
import { cookies } from "next/headers";

export default async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // `/admin/signUp` の処理
  if (pathname === "/admin/signUp") {
    const token = searchParams.get("token");
    if (!token) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    try {
      const decrypted = await decrypt(token);
      if (decrypted) {
        return NextResponse.next();
      }
    } catch (error: any) {
      console.error(error);
    }
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  const cookie = (await cookies()).get("session")?.value;
  const sesssion = await decrypt(cookie);

  if (!sesssion || !sesssion.isAdmin) {
    return NextResponse.redirect(new URL("/admin/signIn", req.url));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/admin/signUp", "/admin"], // 正しい matcher 設定
};
