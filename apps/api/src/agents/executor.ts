import type { TaskInput, PlanStep, ResearchItem } from "../orchestrator/state";
import { sendEmail } from "../tools/email";
import { createEvent } from "../tools/calendar";
import { logNotion } from "../tools/notion";
import { chat } from "../llm/openai";

export async function execute(ctx: { input: TaskInput; planSteps: PlanStep[]; researchResults: ResearchItem[]; }) {
  const actions: any[] = [];
  const artifacts: any = {};

  // compile summary
  const summary = await chat(
    "You are a sharp analyst. Summarize and rank leads.",
    "Use the research below to produce a ranked list with contact info if present:\n" +
    JSON.stringify(ctx.researchResults).slice(0, 15000)
  );
  artifacts.summary = summary;

  // outreach if requested
  if (ctx.planSteps.some(s => s.kind === "outreach")) {
    const pitch = await chat("Write a concise, outcomes-first cold email. Max 120 words.", 
      `Objective: ${ctx.input.objective}\nAudience: ${ctx.input.audience||"general"}\nSummary:\n${summary}`);
    const sent = await sendEmail({
      toList: extractEmails(ctx.researchResults).slice(0, 5),
      subject: "Quick idea for boosting your art displays",
      html: `<p>${pitch.replace(/\n/g,"<br/>")}</p>`
    });
    actions.push({ type: "email", payload: sent, status: "ok" });
  }

  // schedule if requested
  if (ctx.planSteps.some(s => s.kind === "schedule")) {
    const ev = await createEvent({
      title: "Outreach Review",
      description: "Review responses + plan follow-ups",
      start: new Date(Date.now()+36*3600*1000), // +36h
      durationMins: 30
    });
    actions.push({ type: "calendar", payload: ev, status: "ok" });
  }

  // log to Notion
  if (ctx.planSteps.some(s => s.kind === "log")) {
    const log = await logNotion({ title: ctx.input.objective, summary });
    actions.push({ type: "notion", payload: log, status: "ok" });
  }

  return { actions, artifacts };
}

function extractEmails(items: ResearchItem[]): string[] {
  const emails = new Set<string>();
  const rx = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
  for (const it of items) {
    const txt = `${it.title||""}\n${it.snippet||""}\n${it.content||""}`;
    (txt.match(rx)||[]).forEach(e=>emails.add(e));
  }
  return [...emails];
}
