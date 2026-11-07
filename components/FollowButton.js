"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default function FollowButton({ userId }) {
  const [me, setMe] = useState(undefined);
  const [following, setFollowing] = useState(false);
  useEffect(() => {
    const sb = createClient();
    sb.auth.getUser().then(async ({ data }) => {
      setMe(data.user || null);
      if (data.user) {
        const { data: f } = await sb.from("follows").select("follower_id").eq("follower_id", data.user.id).eq("following_id", userId).maybeSingle();
        setFollowing(!!f);
      }
    });
  }, [userId]);
  if (me === undefined) return null;
  if (me?.id === userId) return <Link href="/settings" className="px-4 py-1.5 rounded-full text-sm glass">Edit channel</Link>;
  if (!me) return <Link href="/signup" className="px-4 py-1.5 rounded-full text-sm bg-red-600 text-white font-medium">Subscribe</Link>;
  const toggle = async () => {
    const sb = createClient();
    if (following) await sb.from("follows").delete().eq("follower_id", me.id).eq("following_id", userId);
    else await sb.from("follows").insert({ follower_id: me.id, following_id: userId });
    setFollowing(!following);
  };
  return <button onClick={toggle} className={`px-4 py-1.5 rounded-full text-sm font-medium ${following ? "glass" : "bg-red-600 text-white"}`}>{following ? "Subscribed" : "Subscribe"}</button>;
}
