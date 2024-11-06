import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { getUserId } from "./lib/getUserId";

export async function middleware(request: NextRequest) {
	const { pathname, origin } = request.nextUrl;
	await updateSession(request);

	const id = await getUserId();
	const allowedPages = [
		"/login",
		"/signup",
		"/api/checkHandle",
		"/api/callback",
	];
	if (
		!allowedPages.some((page) => page === pathname) &&
		!id &&
		origin !== "https://wwmqajtqreqlejynvabz.supabase.co"
	) {
		return NextResponse.rewrite(new URL("/login", request.url));
	}

	if (
		allowedPages.some((page) => page === pathname) &&
		id &&
		origin !== "https://wwmqajtqreqlejynvabz.supabase.co"
	) {
		return NextResponse.redirect(new URL("/", request.url));
	}
	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
