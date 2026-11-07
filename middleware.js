import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Keeps people signed in: refreshes the Supabase session cookie on every visit.
export async function middleware(request) {
  let response = NextResponse.next({ request });
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => {
        list.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        list.forEach(({ name, value, options }) => response.cookies.set(name, value, { ...options, maxAge: options?.maxAge ?? 60 * 60 * 24 * 400 }));
      },
    },
  });
  await supabase.auth.getUser();
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon|badge/|og.png|.*\\.(?:png|jpg|jpeg|webp|gif|svg|txt|xml)$).*)"],
};
