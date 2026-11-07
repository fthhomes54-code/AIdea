"use client";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase";
// Counts one view per post per browser session.
export default function ViewCounter({ postId }) {
  useEffect(() => {
    const k = `viewed:${postId}`;
    if (sessionStorage.getItem(k)) return;
    sessionStorage.setItem(k, "1");
    createClient().rpc("increment_view", { pid: postId });
  }, [postId]);
  return null;
}
