"use client";

import { useState } from "react";
import {
  Upload,
  Image as ImageIcon,
  Video,
  Tv,
  Share2,
  Sparkles,
  Folder,
  TrendingUp,
  Clock,
  Users,
} from "lucide-react";

const SHARE_LINKS = [
  {
    name: "Facebook",
    color: "bg-blue-600 hover:bg-blue-500",
    url: (u) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}`,
  },
  {
    name: "X",
    color: "bg-black hover:bg-gray-800 border border-gray-700",
    url: (u, t) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}`,
  },
  {
    name: "Reddit",
    color: "bg-orange-600 hover:bg-orange-500",
    url: (u, t) =>
      `https://www.reddit.com/submit?url=${encodeURIComponent(u)}&title=${encodeURIComponent(t)}`,
  },
  {
    name: "WhatsApp",
    color: "bg-green-600 hover:bg-green-500",
    url: (u, t) =>
      `https://wa.me/?text=${encodeURIComponent(t + " " + u)}`,
  },
  {
    name: "Telegram",
    color: "bg-sky-600 hover:bg-sky-500",
    url: (u, t) =>
      `https://t.me/share/url?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}`,
  },
];

const CONTENT_TYPES = [
  { name: "Art", icon: ImageIcon },
  { name: "Video", icon: Video },
  { name: "Show", icon: Tv },
  { name: "Project", icon: Folder },
];

const DISCOVERY = [
  { name: "Newest", icon: Clock },
  { name: "Trending", icon: TrendingUp },
  { name: "Following", icon: Users },
];

export default function LandingPage() {
  const [copied, setCopied] = useState(false);
  const siteUrl = "https://aidea.app";
  const siteTitle = "AIdea — Where AI Creation Is the Feature";

  const handleShare = (link) => {
    window.open(link.url(siteUrl, siteTitle), "_blank", "width=600,height=400");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(siteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="glass fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-gold" />
            <span className="text-xl font-bold tracking-tight">AIdea</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted">
            <a href="#art" className="hover:text-blue transition-colors">Art</a>
            <a href="#video" className="hover:text-blue transition-colors">Video</a>
            <a href="#shows" className="hover:text-blue transition-colors">Shows</a>
            <a href="#share" className="hover:text-blue transition-colors">Share</a>
          </div>
          <button className="bg-blue hover:bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors">
            Sign Up Free
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 text-sm">
            <Sparkles className="w-4 h-4 text-gold" />
            <span>No demonetization. No AI penalties. No shadow-bans.</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Your AI art. Your AI video.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue to-gold">
              Your AI show.
            </span>
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto mb-10">
            AIdea is the social network built for AI creators. Upload, showcase,
            and grow an audience — on your terms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-colors flex items-center justify-center gap-2">
              <Upload className="w-5 h-5" /> Start Uploading
            </button>
            <button className="glass hover:border-blue text-white px-8 py-4 rounded-full text-lg font-medium transition-colors">
              Explore the Feed
            </button>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="glass card-hover rounded-2xl p-8">
            <div className="w-12 h-12 rounded-xl bg-blue/20 flex items-center justify-center mb-6">
              <ImageIcon className="w-6 h-6 text-blue" />
            </div>
            <h3 className="text-2xl font-bold mb-3">AI Art Gallery</h3>
            <p className="text-muted">
              Upload images, add tags, and showcase your style. Realistic, anime, cyberpunk — your art, your rules.
            </p>
          </div>
          <div className="glass card-hover rounded-2xl p-8">
            <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center mb-6">
              <Video className="w-6 h-6 text-gold" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Daily Video Feed</h3>
            <p className="text-muted">
              Post AI videos every day. Thumbnails, captions, tags — full creator control.
            </p>
          </div>
          <div className="glass card-hover rounded-2xl p-8">
            <div className="w-12 h-12 rounded-xl bg-blue/20 flex items-center justify-center mb-6">
              <Tv className="w-6 h-6 text-blue" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Launch Your Show</h3>
            <p className="text-muted">
              Build episodic AI shows with seasons and episodes. A real channel for AI storytelling.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Preview */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Browse by Type</h2>
          <p className="text-muted mb-10">
            Find exactly what you want. Art, video, shows, or projects.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {CONTENT_TYPES.map((type) => {
              const Icon = type.icon;
              return (
                <div
                  key={type.name}
                  className="glass rounded-full px-6 py-3 text-sm font-medium flex items-center gap-2 hover:border-blue transition-colors cursor-pointer"
                >
                  <Icon className="w-4 h-4" />
                  {type.name}
                </div>
              );
            })}
          </div>

          <h3 className="text-2xl font-bold mb-6">Discovery</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {DISCOVERY.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="glass rounded-full px-6 py-3 text-sm font-medium flex items-center gap-2 hover:border-gold transition-colors cursor-pointer"
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Share Section */}
      <section id="share" className="py-20 px-6 bg-gradient-to-b from-base to-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Spread the Word</h2>
          <p className="text-muted mb-10">
            Share AIdea instantly across every major platform. One click.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {SHARE_LINKS.map((link) => (
              <button
                key={link.name}
                onClick={() => handleShare(link)}
                className={`share-btn text-white ${link.color}`}
              >
                <Share2 className="w-4 h-4" />
                {link.name}
              </button>
            ))}
          </div>
          <button
            onClick={handleCopy}
            className="glass rounded-full px-6 py-3 text-sm hover:border-gold transition-colors"
          >
            {copied ? "✓ Copied!" : "Copy Link: aidea.app"}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold" />
            <span className="font-bold">AIdea</span>
          </div>
          <p className="text-sm text-muted">
            © 2026 AIdea. AI creation is the feature, not the liability.
          </p>
          <div className="flex gap-6 text-sm text-muted">
            <a href="#" className="hover:text-blue">Terms</a>
            <a href="#" className="hover:text-blue">Privacy</a>
            <a href="#" className="hover:text-blue">Safety</a>
          </div>
        </div>
      </footer>
    </div>
  );
}