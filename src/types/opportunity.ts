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

export function getStageBadgeClass(stage: OpportunityStage): string {
  const map: Record<string, string> = {
    gray: "border-gray-300 text-gray-600 bg-gray-50",
    blue: "border-blue-300 text-blue-700 bg-blue-50",
    yellow: "border-yellow-300 text-yellow-700 bg-yellow-50",
    orange: "border-orange-300 text-orange-700 bg-orange-50",
    green: "border-green-300 text-green-700 bg-green-50",
    red: "border-red-300 text-red-700 bg-red-50",
  };
  const color = getStageColor(stage);
  return map[color] || map.gray;
}
