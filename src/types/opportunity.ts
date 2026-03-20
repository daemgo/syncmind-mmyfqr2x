// Sales Opportunity Types

export interface Opportunity {
  id: string;
  opportunityName: string;
  accountName: string;
  contactName?: string;
  stage: OpportunityStage;
  value: number;
  currency: string;
  expectedCloseDate: string;
  probability: number;
  source: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export type OpportunityStage =
  | "prospecting"
  | "qualification"
  | "proposal"
  | "negotiation"
  | "closed-won"
  | "closed-lost";

export interface OpportunityStageConfig {
  value: OpportunityStage;
  label: string;
  color: string;
  probability: number;
}

export const opportunityStages: OpportunityStageConfig[] = [
  { value: "prospecting", label: "初步接触", color: "gray", probability: 10 },
  { value: "qualification", label: "需求确认", color: "blue", probability: 30 },
  { value: "proposal", label: "方案报价", color: "yellow", probability: 50 },
  { value: "negotiation", label: "商务谈判", color: "orange", probability: 70 },
  { value: "closed-won", label: "赢单", color: "green", probability: 100 },
  { value: "closed-lost", label: "输单", color: "red", probability: 0 },
];

export function getStageLabel(stage: OpportunityStage): string {
  return opportunityStages.find((s) => s.value === stage)?.label || stage;
}

export function getStageColor(stage: OpportunityStage): string {
  return opportunityStages.find((s) => s.value === stage)?.color || "gray";
}
