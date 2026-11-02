import "./globals.css";

export const metadata = {
  title: "AIdea — AI Art, AI Video, AI Shows",
  title: {
    default: "AIdea — Where AI Creation Is the Feature",
    template: "AIdea | %s",
  },
  description: "Showcase AI art, AI video, and AI-hosted shows. No demonetization. No penalties. Built for creators.",
  openGraph: {
    title: "AIdea — Where AI Creation Is the Feature",
    description: "Showcase AI art, AI video, and AI-hosted shows. No demonetization. No penalties. Built for creators.",
    url: "https://aidea.app",
    siteName: "AIdea",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIdea — Where AI Creation Is the Feature",
    description: "Showcase AI art, AI video, and AI-hosted shows. No demonetization. No penalties. Built for creators.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-base text-gray-100 font-sans antialiased">{children}</body>
    </html>
  );
}