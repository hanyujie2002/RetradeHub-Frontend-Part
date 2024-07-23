import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";

export async function middleware(request, response) {
    const headersList = headers();
    const host = headersList.get("host");
    const requestUrl = `http://${host}`

    try {
      const response = await fetch(new URL('/api/users/me', requestUrl), {
        method: "GET",
        headers: {
          Accept: "application/json",
          Cookie: cookies().toString() ,
        }
      })

      if (response.status==200) {
        return NextResponse.next()
      } else {
        return NextResponse.redirect(new URL('/user/login', requestUrl));
      }
    } catch (error) {
        return new NextResponse(error);
    }
}

export const config = {
  matcher: [
    '/',
    '/me',
    '/product/:path*',
    '/transactions/buy',
    '/transactions/sell'
  ]
}
