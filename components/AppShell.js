"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Home, Clapperboard, Flame, Users, Library, Upload, Search, Settings, Menu } from "lucide-react";
import AuthButton from "./AuthButton";
import Logo from "./Logo";

const NAV = [
  { href: "/", label: "Home", icon: Home },
  { href: "/?view=shorts", label: "Shorts", icon: Clapperboard },
  { href: "/?sort=trending", label: "Trending", icon: Flame },
  { href: "/?view=following", label: "Following", icon: Users },
  { href: "/profile", label: "Library", icon: Library },
  { href: "/upload", label: "Upload", icon: Upload },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function AppShell({ children }) {
  const path = usePathname();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const go = () => router.push(q.trim() ? `/?q=${encodeURIComponent(q.trim())}` : "/");
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <header className="sticky top-0 z-50 h-14 glass border-b border-white/5 px-3 flex items-center gap-3">
        <button className="lg:hidden p-1.5" onClick={() => setOpen(!open)} aria-label="Menu"><Menu className="w-5 h-5" /></button>
        <Link href="/" className="flex items-center gap-1.5 shrink-0">
          <Logo className="h-7 w-auto text-white" />
        </Link>
        <div className="flex-1 max-w-xl mx-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && go()} placeholder="Search AI videos and art"
            className="w-full bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-blue" />
        </div>
        <AuthButton />
      </header>
      <div className="flex">
        <aside className={`${open ? "block" : "hidden"} lg:block fixed lg:sticky top-14 z-40 h-[calc(100vh-3.5rem)] w-52 shrink-0 bg-[#0a0a0f] border-r border-white/5 p-2 overflow-y-auto`}>
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = href === path || (href === "/" && path === "/");
            return (
              <Link key={label} href={href} onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${active ? "bg-white/10 text-white" : "text-muted hover:bg-white/5"}`}>
                <Icon className="w-4 h-4" />{label}
              </Link>
            );
          })}
          <div className="mt-4 pt-4 border-t border-white/5 px-3 text-[11px] text-muted leading-relaxed">
            <Link href="/rules" className="hover:text-white">Rules & copyright</Link><br /><Link href="/privacy" className="hover:text-white">Privacy</Link><br /><Link href="/terms" className="hover:text-white">Terms</Link><br /><Link href="/admin/reports" className="hover:text-white">Admin</Link><br />stylegeniusnews@gmail.com
          </div>
        </aside>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
