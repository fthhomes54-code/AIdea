import AppShell from "@/components/AppShell";
export const metadata = { title: "Privacy Policy", description: "How AIdea collects, uses and protects your information.", alternates: { canonical: "/privacy" }, openGraph: { title: "AIdea | Privacy Policy", description: "How AIdea collects, uses and protects your information.", url: "/privacy", siteName: "AIdea", type: "website", images: [{ url: "/og.png" }] } };
export default function Privacy() {
  return (
    <AppShell>
      <div className="max-w-2xl px-4 sm:px-6 py-6 text-sm text-gray-300 space-y-3">
        <h1 className="text-xl font-bold text-white">Privacy Policy</h1>
        <p className="text-gray-500">Effective November 6, 2026</p>
        <p>AIdea is a free membership platform for sharing AI videos and AI art. Nothing is sold, and we never sell your data.</p>
        <p>What we collect: your email address, your profile name and picture, and the posts, comments, likes and follows you make. If you sign in with Google, we receive only your basic profile and email address.</p>
        <p>How we use it: to run your account, show your posts and channel, keep the community safe (reports and spam limits), and send account emails such as sign-up confirmation.</p>
        <p>Storage: accounts and uploads are stored with our hosting providers (Supabase and Vercel).</p>
        <p>Your choices: you can edit your profile in Settings. To delete your account or content, email stylegeniusnews@gmail.com and we will remove it.</p>
        <p>Questions: stylegeniusnews@gmail.com</p>
      </div>
    </AppShell>
  );
}
