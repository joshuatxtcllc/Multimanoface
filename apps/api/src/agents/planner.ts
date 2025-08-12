import { chat } from "../llm/openai";
import type { TaskInput, PlanStep } from "../orchestrator/state";
import { randomUUID } from "crypto";

export async function plan(input: TaskInput): Promise<PlanStep[]> {
  const sys = `You are a ruthless operations planner. Output 5-8 JSON steps max.
Only use these kinds: search, visit, compile, outreach, schedule, log.`;
  const user = `Objective: ${input.objective}
Constraints: ${(input.constraints||[]).join("; ")}
Location/Audience (optional): ${input.location||""} ${input.audience||""}
Return JSON array of {kind, detail}.`;

  const text = await chat(sys, user);
  let steps: Omit<PlanStep,"id">[] = [];
  try { steps = JSON.parse(text); } catch {
    steps = [
      { kind: "search",  detail: "Find 5-10 high intent leads." },
      { kind: "visit",   detail: "Open and extract contact details." },
      { kind: "compile", detail: "Summarize and rank A/B/C." },
      { kind: "outreach",detail: "Email A-tier with tailored pitch." },
      { kind: "log",     detail: "Write to Notion with status." },
    ];
  }
  return steps.map(s => ({...s, id: randomUUID()}));
}
