import fetch from "node-fetch";
import * as cheerio from "cheerio";

export async function smartFetch(url: string) {
  const res = await fetch(url, { headers: { "User-Agent":"Mozilla/5.0" }});
  const html = await res.text();
  const $ = cheerio.load(html);
  const title = $("title").first().text();
  const text = $("p").map((_,el)=>$(el).text()).get().join("\n");
  return { title, text };
}
