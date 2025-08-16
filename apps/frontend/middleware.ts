import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    const token = true

    if (pathname === "/login" || pathname === "/singup") {
        // console.log("public routes")
        //   return NextResponse.redirect(new URL('/home', request.url))
    }
    else {
        // console.log("private routes")
        //   return NextResponse.redirect(new URL('/home', request.url))
    }
}

export const config = {
    matcher: '/:path*',
}