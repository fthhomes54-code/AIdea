import AppShell from "@/components/AppShell";
export const metadata = { title: "Terms of Service" };
export default function Terms() {
  return (
    <AppShell>
      <div className="max-w-2xl px-4 sm:px-6 py-6 text-sm text-gray-300 space-y-3">
        <h1 className="text-xl font-bold text-white">Terms of Service</h1>
        <p className="text-gray-500">Effective November 6, 2026</p>
        <p>AIdea is free to join. By creating an account you agree to these terms and to our Rules & copyright page.</p>
        <p>Your content: you own what you upload. You must have the right to share it, and you give AIdea permission to host and display it on the platform.</p>
        <p>Not allowed: illegal content, anything involving minors in a sexual or harmful way, threats, hate speech, and sexual or deceptive deepfakes of real people.</p>
        <p>Moderation: members can report posts, and we may remove content or accounts that break the rules.</p>
        <p>The service is provided as is, without warranties, and may change over time.</p>
        <p>Contact: stylegeniusnews@gmail.com</p>
      </div>
    </AppShell>
  );
}
