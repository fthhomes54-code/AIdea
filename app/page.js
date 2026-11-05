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
  Play,
  Heart,
  MessageCircle,
  Bookmark,
  Link as LinkIcon,
} from "lucide-react";

const OUTBOUND_SHARE = [
  { name: "Facebook", color: "bg-blue-600 hover:bg-blue-500", url: (u, t) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}` },
  { name: "Instagram", color: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90", url: (u) => `https://www.instagram.com/` }, // Instagram has limited web share; opens app/site
  { name: "TikTok", color: "bg-black hover:bg-gray-800 border border-gray-700", url: (u) => `https://www.tiktok.com/` },
  { name: "YouTube", color: "bg-red-600 hover:bg-red-500", url: (u) => `https://www.youtube.com/` },
  { name: "X", color: "bg-black hover:bg-gray-800 border border-gray-700", url: (u, t) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}` },
  { name: "WhatsApp", color: "bg-green-600 hover:bg-green-500", url: (u, t) => `https://wa.me/?text=${encodeURIComponent(t + " " + u)}` },
  { name: "Telegram", color: "bg-sky-600 hover:bg-sky-500", url: (u, t) => `https://t.me/share/url?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}` },
  { name: "Reddit", color: "bg-orange-600 hover:bg-orange-500", url: (u, t) => `https://www.reddit.com/submit?url=${encodeURIComponent(u)}&title=${encodeURIComponent(t)}` },
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
  const [showShare, setShowShare] = useState(false);
  const siteUrl = "https://aidea.app";
  const samplePostUrl = "https://aidea.app/post/sample-video";
  const sampleTitle = "Check out my new AI video on AIdea";

  const handleOutboundShare = (link) => {
    window.open(link.url(samplePostUrl, sampleTitle), "_blank", "width=600,height=400");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(samplePostUrl);
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
            <a href="#feed" className="hover:text-blue transition-colors">Feed</a>
            <a href="#share" className="hover:text-blue transition-colors">Share</a>
            <a href="#art" className="hover:text-blue transition-colors">Art</a>
            <a href="#video" className="hover:text-blue transition-colors">Video</a>
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
            AIdea is the hub for AI creators. Post here, then share your videos and art to Facebook, Instagram, TikTok, YouTube, and everywhere else.
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

      {/* Sample Video-First Feed Preview */}
      <section id="feed" className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Video-First Social Feed</h2>
          <p className="text-muted text-center mb-10">
            YouTube-style video cards. Facebook-style social actions. Share out to every platform.
          </p>

          {/* Sample post card */}
          <div className="glass rounded-2xl overflow-hidden mb-6">
            <div className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue to-gold flex items-center justify-center text-sm font-bold">
                AI
              </div>
              <div>
                <div className="font-medium">AI Creator</div>
                <div className="text-xs text-muted">2 hours ago · Video</div>
              </div>
            </div>

            <div className="px-4 pb-3 text-sm">
              New AI-generated short. Full creator control, no penalties.
            </div>

            <div className="relative bg-black aspect-video flex items-center justify-center cursor-pointer group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue/20 to-gold/20" />
              <div className="relative z-10 w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-white fill-white" />
              </div>
              <div className="absolute bottom-3 right-3 text-xs bg-black/70 px-2 py-1 rounded">1:24</div>
            </div>

            <div className="flex items-center justify-between px-4 py-3 border-t border-white/5">
              <div className="flex items-center gap-6 text-sm text-muted">
                <button className="flex items-center gap-1 hover:text-white transition-colors">
                  <Heart className="w-5 h-5" /> 124
                </button>
                <button className="flex items-center gap-1 hover:text-white transition-colors">
                  <MessageCircle className="w-5 h-5" /> 18
                </button>
                <button
                  onClick={() => setShowShare(!showShare)}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  <Share2 className="w-5 h-5" /> Share
                </button>
              </div>
              <button className="text-muted hover:text-white transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>

            {/* Inline share menu for this post */}
            {showShare && (
              <div className="px-4 pb-4 border-t border-white/5 pt-3">
                <p className="text-xs text-muted mb-3">Share this video to:</p>
                <div className="flex flex-wrap gap-2">
                  {OUTBOUND_SHARE.map((link) => (
                    <button
                      key={link.name}
                      onClick={() => handleOutboundShare(link)}
                      className={`share-btn text-white text-xs ${link.color}`}
                    >
                      {link.name}
                    </button>
                  ))}
                  <button
                    onClick={handleCopy}
                    className="share-btn glass text-xs"
                  >
                    <LinkIcon className="w-3 h-3" />
                    {copied ? "Copied" : "Copy Link"}
                  </button>
                </div>
              </div>
            )}
          </div>

          <p className="text-center text-sm text-muted">
            Post on AIdea. Share anywhere. The hub that connects creators to every platform.
          </p>
        </div>
      </section>

      {/* Outbound Share Hub Section */}
      <section id="share" className="py-20 px-6 bg-gradient-to-b from-base to-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Share Your Creations Everywhere</h2>
          <p className="text-muted mb-10">
            AIdea is the hub. Post once, then push your videos and art to Facebook, Instagram, TikTok, YouTube, X, WhatsApp, and more in one click.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {OUTBOUND_SHARE.map((link) => (
              <button
                key={link.name}
                onClick={() => handleOutboundShare(link)}
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
            {copied ? "✓ Copied!" : "Copy Post Link"}
          </button>
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
              Post AI videos every day. Big thumbnails, play buttons, full creator control.
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