// Contact Types

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  title: string;
  department?: string;
  accountId?: string;
  accountName?: string;
  email: string;
  phone?: string;
  mobile?: string;
  wechat?: string;
  status: ContactStatus;
  importance: ContactImportance;
  source: string;
  avatar?: string;
  address?: ContactAddress;
  preferences?: ContactPreferences;
  notes?: string;
  lastContactDate?: string;
  createdAt: string;
  updatedAt: string;
}

export type ContactStatus = "active" | "inactive" | "blocked";
export type ContactImportance = "high" | "medium" | "low";

export interface ContactAddress {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface ContactPreferences {
  preferredContactMethod?: "email" | "phone" | "wechat";
  preferredTime?: string;
  doNotCall?: boolean;
  doNotEmail?: boolean;
}

export function getStatusLabel(status: ContactStatus): string {
  const labels = {
    active: "活跃",
    inactive: "非活跃",
    blocked: "已屏蔽",
  };
  return labels[status] || status;
}

export function getImportanceLabel(importance: ContactImportance): string {
  const labels = {
    high: "高",
    medium: "中",
    low: "低",
  };
  return labels[importance] || importance;
}

export function getImportanceColor(importance: ContactImportance): string {
  const colors = {
    high: "red",
    medium: "yellow",
    low: "gray",
  };
  return colors[importance] || "gray";
}
