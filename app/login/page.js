import AppShell from "@/components/AppShell";
import AuthForm from "@/components/AuthForm";
export const metadata = { title: "Sign in" };
export default function Page() { return (<AppShell><AuthForm mode="login" /></AppShell>); }
