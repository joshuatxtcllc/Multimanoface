export type TaskInput = {
  objective: string;
  constraints?: string[];
  audience?: string;
  location?: string;
};

export type PlanStep = { id: string; kind: "search"|"visit"|"compile"|"outreach"|"schedule"|"log"; detail: string; };

export type ResearchItem = { stepId: string; source: string; title?: string; snippet?: string; url?: string; content?: string; };

export type OrchestratorResult = {
  plan: PlanStep[];
  research: ResearchItem[];
  actions: { type: string; payload: any; status: "ok"|"error"; }[];
  artifacts: Record<string, any>;
};
