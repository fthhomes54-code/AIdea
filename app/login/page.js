import AppShell from "@/components/AppShell";
import AuthForm from "@/components/AuthForm";
export const metadata = {
  title: "Sign in",
  description: "Sign in to AIdea to post and follow AI creators.",
  alternates: { canonical: "/login" },
  openGraph: {
    title: "AIdea | Sign in",
    description: "Sign in to AIdea to post and follow AI creators.",
    url: "/login",
    siteName: "AIdea",
    type: "website",
    images: [{ url: "/og.png" }],
  },
};
export default function Page() {
  return (
    <AppShell>
      <AuthForm mode="login" />
    </AppShell>
  );
}
