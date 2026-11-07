import AppShell from "@/components/AppShell";
import AuthForm from "@/components/AuthForm";
export const metadata = { title: "Sign up", description: "Join AIdea to post your AI art, AI videos and AI shows.", alternates: { canonical: "/signup" }, openGraph: { title: "AIdea | Sign up", description: "Join AIdea to post your AI art, AI videos and AI shows.", url: "/signup", siteName: "AIdea", type: "website", images: [{ url: "/og.png" }] } };
export default function Page() { return (<AppShell><AuthForm mode="signup" /></AppShell>); }
