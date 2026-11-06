import { NextResponse } from "next/server";
import { createServer } from "@/lib/supabase-server";

export async function GET(req) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") || "/";
  if (code) {
    const supabase = await createServer();
    await supabase.auth.exchangeCodeForSession(code);
  }
  return NextResponse.redirect(new URL(next.startsWith("/") ? next : "/", url.origin));
}
