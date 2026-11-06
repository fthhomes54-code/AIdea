import AppShell from "@/components/AppShell";
export const metadata = { title: "Rules & copyright" };
export default function Rules() {
  return (
    <AppShell>
      <div className="max-w-2xl px-4 sm:px-6 py-6 text-sm text-gray-300 space-y-3">
        <h1 className="text-xl font-bold text-white">Rules & copyright</h1>
        <p>AIdea is for AI-made videos and art. Post your own work or work you have the right to share.</p>
        <p>Not allowed: anything involving minors in a sexual or harmful way, threats, hate speech, and sexual or deceptive deepfakes of real people. Accounts posting these are removed.</p>
        <p>Adult (18+) content must be tagged as adult when uploading. It is hidden unless a member turns it on in Settings.</p>
        <p>Copyright takedowns and contact: email stylegeniusnews@gmail.com with the link to the post and proof you own the work. Repeat infringers lose their account.</p>
      </div>
    </AppShell>
  );
}
