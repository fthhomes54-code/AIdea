import AppShell from "@/components/AppShell";
export const metadata = { title: "Terms of Service", description: "The terms for using AIdea, the home for AI art, AI video and AI shows.", alternates: { canonical: "/terms" }, openGraph: { title: "AIdea | Terms of Service", description: "The terms for using AIdea, the home for AI art, AI video and AI shows.", url: "/terms", siteName: "AIdea", type: "website", images: [{ url: "/og.png" }] } };
export default function Terms() {
  return (
    <AppShell>
      <div className="max-w-2xl px-4 sm:px-6 py-6 text-sm text-gray-300 space-y-3">
        <h1 className="text-xl font-bold text-white">Terms of Service</h1>
        <p className="text-gray-500">Effective November 6, 2026</p>
        <p>AIdea is free to join. By creating an account you agree to these terms and to our Rules & copyright page.</p>
        <p>Your content: you own what you upload. You must have the right to share it, and you give AIdea permission to host and display it on the platform.</p>
        <p><strong>Our pledge to AI creators:</strong> AIdea is a home where AI art belongs. We will never penalize, demote, hide or shadow ban a post or account because it was made with AI. Popular and trending AI work is welcome here and ranks on the same terms as everything else. The only reason content is limited or removed is a clear break of the rules below, and we will tell you when that happens.</p>
        <p>Not allowed: illegal content, anything involving minors in a sexual or harmful way, threats, hate speech, and sexual or deceptive deepfakes of real people.</p>
        <p>Moderation: members can report posts, and we may remove content or accounts that break the rules.</p>
        <p>The service is provided as is, without warranties, and may change over time.</p>
        <p>Contact: stylegeniusnews@gmail.com</p>
      </div>
    </AppShell>
  );
}
