export default function Rich({ text }) {
  const parts = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0, m, i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1]) parts.push(<a key={i++} href={m[2].replace("https://aidea-six.vercel.app", "") || "/"} className="text-gold underline">{m[1]}</a>);
    else parts.push(<strong key={i++}>{m[3]}</strong>);
    last = re.lastIndex;
  }
  parts.push(text.slice(last));
  return <>{parts}</>;
}
