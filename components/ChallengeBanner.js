import Link from "next/link";
export default function ChallengeBanner() {
  return (
    <Link href="/?q=goldenhour" className="block glass rounded-xl px-4 py-3 mb-4 border border-gold/30 hover:border-gold/60">
      <div className="text-sm font-semibold text-gold">Golden Hour Challenge, this weekend</div>
      <div className="text-xs text-muted mt-0.5">Post AI art or video with warm golden light and tag it #goldenhour by Sunday night to earn the Golden Hour badge. The first 50 creators to post get the Founding Creator badge for good.</div>
    </Link>
  );
}
