import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const token = request.cookies.get("token")?.value;

    // console.log(isAuth)

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next();

}

export const config = {
    matcher: ["/", "/profile", "/friend-request", "/add-friend"],
}