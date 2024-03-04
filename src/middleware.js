import { NextResponse } from "next/server";
import { verify } from "./utils/getUserFromToken";

const middleware = async (request) => {
    const path = request.nextUrl.pathname;
    const token = request.cookies?.get('token')?.value || '';
    const user = await verify(token);

    const authPath = ['/sign-in', '/sign-up'];
    const securePath = ['/'];

    if (user && authPath.includes(path)) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if (!user && securePath.includes(path)) {
        return NextResponse.redirect(new URL('/sign-in', request.nextUrl));
    }

};

export const config = {
    matcher: ['/', '/:path*']
}

export default middleware;