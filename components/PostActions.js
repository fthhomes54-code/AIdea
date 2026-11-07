"use client";
import { useEffect, useState } from "react";
import { Heart, Bookmark } from "lucide-react";
import { createClient } from "@/lib/supabase";
import ReportButton from "./ReportButton";

export default function PostActions({ postId, initialLikes }) {
  const [me, setMe] = useState(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(initialLikes || 0);
  const [err, setErr] = useState("");
  useEffect(() => {
    const sb = createClient();
    sb.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      setMe(data.user);
      const [{ data: l }, { data: s }] = await Promise.all([
        sb.from("likes").select("post_id").eq("user_id", data.user.id).eq("post_id", postId).maybeSingle(),
        sb.from("saves").select("post_id").eq("user_id", data.user.id).eq("post_id", postId).maybeSingle(),
      ]);
      setLiked(!!l); setSaved(!!s);
    });
  }, [postId]);
  const need = () => { if (!me) { window.location.href = "/signup"; return true; } return false; };
  const like = async () => {
    if (need()) return;
    const sb = createClient();
    const { error } = liked
      ? await sb.from("likes").delete().eq("user_id", me.id).eq("post_id", postId)
      : await sb.from("likes").insert({ user_id: me.id, post_id: postId });
    if (error) return setErr(error.message);
    setLikes(likes + (liked ? -1 : 1)); setLiked(!liked);
  };
  const save = async () => {
    if (need()) return;
    const sb = createClient();
    const { error } = saved
      ? await sb.from("saves").delete().eq("user_id", me.id).eq("post_id", postId)
      : await sb.from("saves").insert({ user_id: me.id, post_id: postId });
    if (error) return setErr(error.message);
    setSaved(!saved);
  };
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button onClick={like} className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full ${liked ? "bg-red-600 text-white" : "glass"}`}>
        <Heart className={`w-4 h-4 ${liked ? "fill-white" : ""}`} /> {likes}
      </button>
      <button onClick={save} className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full ${saved ? "bg-white text-black" : "glass"}`}>
        <Bookmark className={`w-4 h-4 ${saved ? "fill-black" : ""}`} /> {saved ? "Saved" : "Save"}
      </button>
      <ReportButton postId={postId} />
      {err && <span className="text-xs text-gold">{err}</span>}
    </div>
  );
}
