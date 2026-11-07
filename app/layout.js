import "./globals.css";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://aidea-six.vercel.app"),
  title: {
    default: "AIdea — Where AI Creation Is the Feature",
    template: "AIdea | %s",
  },
  alternates: { canonical: "/" },
  description: "Showcase AI art, AI video, and AI-hosted shows. AI work isn't penalized for being AI. Built for creators.",
  openGraph: {
    title: "AIdea — Where AI Creation Is the Feature",
    description: "Showcase AI art, AI video, and AI-hosted shows. AI work isn't penalized for being AI. Built for creators.",
    url: "/",
    siteName: "AIdea",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIdea — Where AI Creation Is the Feature",
    description: "Showcase AI art, AI video, and AI-hosted shows. AI work isn't penalized for being AI. Built for creators.",
    images: ["/og.png"],
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } } : {}),
  keywords: ["AI art", "AI video", "AI creators", "AI art community", "AI shows"],
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-base text-gray-100 font-sans antialiased">
        {children}
        <div className="flex justify-center py-6">
          <a href="https://altern.ai/ai/aidea" target="_blank" rel="noopener"><img src="https://data.altern.ai/alternbadge.png" alt="Featured on Altern" width="200" height="43" /></a>
        </div>
      </body>
    </html>
  );
}