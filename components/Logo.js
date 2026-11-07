// AIdea wordmark: "A" = three square gold pixels in a triangle, then clean "Idea"
export default function Logo({ className = "h-7" }) {
  return (
    <svg className={className} viewBox="0 0 136 38" role="img" aria-label="AIdea" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
      <g fill="#f5c542"><rect x="11" y="6" width="11" height="11" /><rect x="2" y="24" width="11" height="11" /><rect x="20" y="24" width="11" height="11" /></g>
      <text x="38" y="35" fill="currentColor" fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" fontSize="40" fontWeight="700" letterSpacing="-1">Idea</text>
    </svg>
  );
}
