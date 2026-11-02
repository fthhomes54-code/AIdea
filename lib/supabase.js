import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export const MOODS = ["Dangerous", "Chill", "Cocky", "Sleek", "Raw"];

export const TAGS = [
  "cyberpunk", "anime", "realistic", "abstract", "surreal", "fantasy",
  "sci-fi", "horror", "portrait", "landscape", "3d", "pixel", "retro",
];