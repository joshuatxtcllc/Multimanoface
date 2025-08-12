import fetch from "node-fetch";

const TAVILY = process.env.TAVILY_API_KEY;
export async function searchWeb(q: string, k = 8) {
  const r = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: { "Content-Type":"application/json", "Authorization": `Bearer ${TAVILY}`},
    body: JSON.stringify({ query: q, max_results: k })
  });
  const j = await r.json();
  return (j.results||[]).map((x:any)=>({ title:x.title, snippet:x.snippet, url:x.url }));
}
