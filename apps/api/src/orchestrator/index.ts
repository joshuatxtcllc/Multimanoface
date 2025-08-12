import { plan } from "../agents/planner";
import { research } from "../agents/researcher";
import { execute } from "../agents/executor";
import type { TaskInput, OrchestratorResult } from "./state";

export async function runTask(input: TaskInput): Promise<OrchestratorResult> {
  // 1) Plan
  const planSteps = await plan(input);

  // 2) Parallel research
  const researchResults = await research(planSteps);

  // 3) Execute actions based on plan+findings
  const exec = await execute({ input, planSteps, researchResults });

  return {
    plan: planSteps,
    research: researchResults,
    actions: exec.actions,
    artifacts: exec.artifacts,
  };
}
