import { Opportunity } from "@/types/opportunity";

export const opportunitiesMock: Opportunity[] = [
  {
    id: "1",
    opportunityName: "ERP系统升级项目",
    accountName: "华测检测技术有限公司",
    contactName: "张明",
    stage: "proposal",
    value: 280000,
    currency: "CNY",
    expectedCloseDate: "2026-04-30",
    probability: 50,
    source: "客户推荐",
    description: "现有ERP系统需要升级，希望引入更智能的报表分析功能",
    createdAt: "2026-02-15T10:00:00Z",
    updatedAt: "2026-03-18T14:30:00Z",
  },
  {
    id: "2",
    opportunityName: "CRM系统采购",
    accountName: "长机科技有限责任公司",
    contactName: "李华",
    stage: "negotiation",
    value: 150000,
    currency: "CNY",
    expectedCloseDate: "2026-04-15",
    probability: 70,
    source: "市场活动",
    description: "销售团队需要统一的客户管理系统，支持移动端访问",
    createdAt: "2026-01-20T09:00:00Z",
    updatedAt: "2026-03-19T16:00:00Z",
  },
  {
    id: "3",
    opportunityName: "数据中台建设",
    accountName: "三峡星云科技有限公司",
    contactName: "王强",
    stage: "qualification",
    value: 500000,
    currency: "CNY",
    expectedCloseDate: "2026-06-30",
    probability: 30,
    source: "主动开发",
    description: "整合多业务系统数据，建设统一数据中台",
    createdAt: "2026-03-01T11:00:00Z",
    updatedAt: "2026-03-17T10:00:00Z",
  },
  {
    id: "4",
    opportunityName: "供应链管理系统",
    accountName: "宜昌人福药业",
    contactName: "赵敏",
    stage: "prospecting",
    value: 350000,
    currency: "CNY",
    expectedCloseDate: "2026-07-31",
    probability: 10,
    source: "行业展会",
    description: "医药行业供应链管理，需要满足GSP认证要求",
    createdAt: "2026-03-10T08:30:00Z",
    updatedAt: "2026-03-10T08:30:00Z",
  },
  {
    id: "5",
    opportunityName: "HR数字化转型",
    accountName: "宜昌城投集团",
    contactName: "刘芳",
    stage: "closed-won",
    value: 180000,
    currency: "CNY",
    expectedCloseDate: "2026-03-15",
    probability: 100,
    source: "老客户增购",
    description: "人力资源全流程数字化，含招聘、考勤、绩效模块",
    createdAt: "2026-02-01T09:00:00Z",
    updatedAt: "2026-03-15T17:00:00Z",
  },
  {
    id: "6",
    opportunityName: "财务共享中心",
    accountName: "宜昌交旅投资集团",
    contactName: "陈伟",
    stage: "closed-lost",
    value: 420000,
    currency: "CNY",
    expectedCloseDate: "2026-03-10",
    probability: 0,
    source: "招标",
    description: "财务共享中心建设，含报销、费控、资金管理",
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-03-10T15:00:00Z",
  },
];

export function formatCurrency(amount: number, currency: string = "CNY"): string {
  if (currency === "CNY") {
    return `¥${amount.toLocaleString("zh-CN")}`;
  }
  return `${currency} ${amount.toLocaleString()}`;
}

export function calculatePipelineValue(opportunities: Opportunity[]): number {
  return opportunities
    .filter((o) => o.stage !== "closed-lost" && o.stage !== "closed-won")
    .reduce((sum, o) => sum + o.value, 0);
}

export function calculateWeightedPipeline(opportunities: Opportunity[]): number {
  return opportunities
    .filter((o) => o.stage !== "closed-lost" && o.stage !== "closed-won")
    .reduce((sum, o) => sum + (o.value * o.probability) / 100, 0);
}
