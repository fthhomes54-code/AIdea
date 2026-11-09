"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase";

export default function AuthButton() {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    const sb = createClient();
    sb.auth.getUser().then(({ data }) => setUser(data.user || null));
    const { data: sub } = sb.auth.onAuthStateChange((_e, s) => setUser(s?.user || null));
    return () => sub.subscription.unsubscribe();
  }, []);
  if (user === undefined) return <div className="w-24" />;
  if (!user)
    return (
      <Link href="/signup" className="bg-blue hover:bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium">
        Join AIdea
      </Link>
    );
  return (
    <div className="flex items-center gap-2">
      <Link href="/upload" className="bg-blue hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1">
        <Plus className="w-4 h-4" /> Upload
      </Link>
      <Link href="/profile" className="w-9 h-9 rounded-full bg-gradient-to-br from-blue to-gold flex items-center justify-center text-xs font-bold">
        {(user.email || "U").slice(0, 2).toUpperCase()}
      </Link>
    </div>
  );
}
