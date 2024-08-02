import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "./utils/supabase/server";

export async function middleware(request: NextRequest) {
	const { pathname, origin } = request.nextUrl;
	await updateSession(request);
	const supabase = createClient();
	const { data } = await supabase.auth.getUser();
	const allowedPages = [
		"/login",
		"/signup",
		"/api/Providers/email/signup",
		"/api/Providers/github",
		"/api/callback",
	];
	if (
		!allowedPages.some((page) => page === pathname) &&
		!data.user &&
		origin !== "https://wwmqajtqreqlejynvabz.supabase.co"
	) {
		return NextResponse.redirect(new URL("/login", request.url));
	}
	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
