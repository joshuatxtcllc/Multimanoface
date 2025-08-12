import type { PlanStep, ResearchItem } from "../orchestrator/state";
import { searchWeb } from "../tools/search";
import { smartFetch } from "../tools/fetch";

export async function research(steps: PlanStep[]): Promise<ResearchItem[]> {
  const out: ResearchItem[] = [];
  for (const s of steps) {
    if (s.kind === "search") {
      const hits = await searchWeb(s.detail, 8);
      out.push(...hits.map(h => ({ stepId: s.id, source: "search", ...h })));
    }
    if (s.kind === "visit") {
      // find previous search results for this step or detail as URL
      const toVisit = out.filter(r => r.stepId === s.id && r.url).slice(0, 6);
      for (const v of toVisit) {
        const page = await smartFetch(v.url!);
        out.push({ stepId: s.id, source: "visit", url: v.url, title: page.title, content: page.text?.slice(0, 5000) });
      }
    }
  }
  return out;
}
