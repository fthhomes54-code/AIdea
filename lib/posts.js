import { publicUrl } from "./storage";

export function fmtCount(n) {
  n = n || 0;
  return n >= 1e6 ? (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M" : n >= 1e3 ? (n / 1e3).toFixed(1).replace(/\.0$/, "") + "k" : String(n);
}
export function fmtDur(s) {
  if (!s) return "";
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
// Maps a posts row (with profiles join) to the card shape used by the feed
export function toCard(p) {
  const isVideo = p.media_type === "video";
  return {
    id: p.id,
    real: true,
    title: p.title || p.caption || "Untitled",
    creator: p.profiles?.display_name || p.profiles?.username || "creator",
    username: p.profiles?.username,
    time: isVideo ? fmtDur(p.duration_s) : "Art",
    likes: fmtCount(p.likes_count),
    views: fmtCount(p.views || 0),
    comments: fmtCount(p.comments_count),
    tag: p.tags?.[0] ? p.tags[0][0].toUpperCase() + p.tags[0].slice(1) : isVideo ? "Video" : "Art",
    thumb: publicUrl(p.thumb_key || p.thumbnail_url || (isVideo ? null : p.storage_key || p.media_url)) || "/og.png",
    mediaType: p.media_type,
  };
}
export const POST_SELECT = "id,title,caption,media_type,media_url,storage_key,thumb_key,thumbnail_url,tags,nsfw,likes_count,comments_count,views,duration_s,created_at,author_id,profiles!posts_author_id_fkey(username,display_name,avatar_url)";
