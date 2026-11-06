"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import { createClient } from "@/lib/supabase";

// Library: sends you to your own channel
export default function MyProfile() {
  const router = useRouter();
  useEffect(() => {
    const sb = createClient();
    sb.auth.getUser().then(async ({ data }) => {
      if (!data.user) return router.replace("/login");
      const { data: p } = await sb.from("profiles").select("username").eq("id", data.user.id).maybeSingle();
      router.replace(p ? `/u/${p.username}` : "/settings");
    });
  }, [router]);
  return <AppShell><div className="p-6 text-sm text-muted">Loading your channel…</div></AppShell>;
}
