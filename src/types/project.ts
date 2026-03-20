// Project Types

export interface Project {
  id: string;
  name: string;
  clientName: string;
  status: ProjectStatus;
  progress: number;
  manager: string;
  startDate: string;
  endDate: string;
  value: number;
  description: string;
  milestones: Milestone[];
  team: TeamMember[];
  createdAt: string;
  updatedAt: string;
}

export type ProjectStatus =
  | "planning"
  | "in-progress"
  | "on-hold"
  | "completed"
  | "cancelled";

export interface Milestone {
  id: string;
  name: string;
  dueDate: string;
  status: "pending" | "in-progress" | "completed" | "overdue";
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar?: string;
}

export interface ProjectStatusConfig {
  value: ProjectStatus;
  label: string;
  color: string;
}

export const projectStatuses: ProjectStatusConfig[] = [
  { value: "planning", label: "规划中", color: "gray" },
  { value: "in-progress", label: "进行中", color: "blue" },
  { value: "on-hold", label: "已暂停", color: "yellow" },
  { value: "completed", label: "已完成", color: "green" },
  { value: "cancelled", label: "已取消", color: "red" },
];

export function getProjectStatusLabel(status: ProjectStatus): string {
  return projectStatuses.find((s) => s.value === status)?.label || status;
}

export function getProjectStatusColor(status: ProjectStatus): string {
  return projectStatuses.find((s) => s.value === status)?.color || "gray";
}
