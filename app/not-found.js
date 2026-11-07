import Link from "next/link";
export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold mb-2">This page wandered off</h1>
      <p className="text-muted mb-6">It may have been deleted, or the link is wrong.</p>
      <Link href="/" className="bg-blue text-white rounded-full px-5 py-2 text-sm">Back to AIdea</Link>
    </div>
  );
}
