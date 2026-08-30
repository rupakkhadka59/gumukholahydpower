import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

function unauthorized(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/")) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  return NextResponse.redirect(new URL("/admin/login", request.url));
}

export async function proxy(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return unauthorized(request);

  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const pathname = request.nextUrl.pathname;
  const isLoginPage = pathname === "/admin/login";
  const protectsWriteApi = pathname.startsWith("/api/") && request.method !== "GET" && request.method !== "HEAD" && request.method !== "OPTIONS";
  if (isLoginPage) return response;
  if (!pathname.startsWith("/admin/") && !pathname.startsWith("/api/admin/") && !protectsWriteApi) return response;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return unauthorized(request);
  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).maybeSingle();
  if (!profile?.is_admin) return unauthorized(request);
  return response;
}

export const config = { matcher: ["/admin/:path*", "/api/:path*"] };
