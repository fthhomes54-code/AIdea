"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

const GOOGLE_ON = process.env.NEXT_PUBLIC_ENABLE_GOOGLE_AUTH === "true";

export default function AuthForm({ mode }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const isSignup = mode === "signup";
  const callback = () => `${window.location.origin}/auth/callback`;

  const submit = async () => {
    setBusy(true); setMsg("");
    const sb = createClient();
    try {
      if (!password) {
        const { error } = await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: callback() } });
        if (error) throw error;
        setMsg("Check your email for a sign-in link.");
      } else if (isSignup) {
        const { data, error } = await sb.auth.signUp({ email, password, options: { emailRedirectTo: callback() } });
        if (error) throw error;
        if (data.session) router.push("/profile");
        else setMsg("Almost done — confirm your email from the link we sent.");
      } else {
        const { error } = await sb.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push("/");
      }
    } catch (e) { setMsg(e.message); }
    setBusy(false);
  };

  const google = async () => {
    await createClient().auth.signInWithOAuth({ provider: "google", options: { redirectTo: callback() } });
  };

  return (
    <div className="max-w-sm mx-auto px-4 py-12">
      <div className="glass rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-1">{isSignup ? "Join AIdea" : "Sign in"}</h1>
        <p className="text-sm text-muted mb-5">{isSignup ? "Free for AI video and AI art creators." : "Welcome back."}</p>
        {GOOGLE_ON && (
          <>
            <button onClick={google} className="w-full bg-white text-black rounded-full py-2 text-sm font-medium mb-4">Continue with Google</button>
            <div className="text-center text-xs text-muted mb-4">or</div>
          </>
        )}
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:border-blue" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password (leave blank for an email link)"
          onKeyDown={(e) => e.key === "Enter" && submit()}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none focus:border-blue" />
        <button disabled={busy || !email} onClick={submit} className="w-full bg-blue hover:bg-blue-600 disabled:opacity-50 text-white rounded-full py-2 text-sm font-medium">
          {busy ? "…" : isSignup ? (password ? "Create account" : "Email me a link") : password ? "Sign in" : "Email me a link"}
        </button>
        {msg && <p className="text-sm mt-4 text-gold">{msg}</p>}
        <p className="text-xs text-muted mt-5 text-center">
          {isSignup ? <>Have an account? <Link href="/login" className="text-blue">Sign in</Link></> : <>New here? <Link href="/signup" className="text-blue">Sign up free</Link></>}
        </p>
      </div>
    </div>
  );
}
