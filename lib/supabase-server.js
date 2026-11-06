import { createServerClient } from "@supabase/ssr";
import { createClient as createPlain } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function createServer() {
  const store = await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => { try { list.forEach(({ name, value, options }) => store.set(name, value, options)); } catch {} },
    },
  });
}

// Cookie-free anon client for public reads (OG pages, feeds)
export function createPublic() {
  return createPlain(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, { auth: { persistSession: false } });
}
