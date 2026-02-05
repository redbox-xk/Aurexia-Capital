import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    // Check if Supabase credentials are configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      // Allow request to pass if not configured
      return NextResponse.next();
    }

    // Dynamically import updateSession only if Supabase is configured
    const { updateSession } = await import("@/lib/supabase/proxy");
    return await updateSession(request);
  } catch (error) {
    console.error("[v0] Middleware error:", error);
    // Continue with request even if middleware fails
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|logo|api/health).*)",
  ],
};
