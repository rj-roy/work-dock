import { headers } from "next/headers";
import { auth } from "./lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const pathname = request.nextUrl.pathname;

    if (session && pathname === '/auth/signin') {
        return NextResponse.redirect(new URL("/", request.url));
    };

    if (session && pathname === '/auth/signup') {
        return NextResponse.redirect(new URL("/", request.url));
    };

    if (pathname.startsWith("/dashboard") && !session) {
        return NextResponse.redirect(
            new URL("/auth/signin", request.url)
        );
    };

    return NextResponse.next();
};

export const config = { matcher: ["/auth/signin", "/auth/signup", "/dashboard/:path*",], };