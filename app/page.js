import Feed from "@/components/Feed";

export default async function Page({ searchParams }) {
  const sp = (await searchParams) || {};
  const params = Object.fromEntries(["type", "sort", "view", "q"].filter((k) => typeof sp[k] === "string").map((k) => [k, sp[k]]));
  return <Feed params={params} />;
}
