"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { opportunitiesMock, formatCurrency, calculatePipelineValue, calculateWeightedPipeline } from "@/mock/opportunities";
import { contactsMock } from "@/mock/contacts";
import { getStageLabel, getStageColor, opportunityStages } from "@/types/opportunity";
import { Users, Target, TrendingUp, DollarSign } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  // Calculate metrics
  const totalOpportunities = opportunitiesMock.length;
  const openOpportunities = opportunitiesMock.filter(
    (o) => o.stage !== "closed-won" && o.stage !== "closed-lost"
  ).length;
  const wonOpportunities = opportunitiesMock.filter((o) => o.stage === "closed-won").length;
  const totalValue = opportunitiesMock
    .filter((o) => o.stage === "closed-won")
    .reduce((sum, o) => sum + o.value, 0);
  const pipelineValue = calculatePipelineValue(opportunitiesMock);
  const weightedPipeline = calculateWeightedPipeline(opportunitiesMock);
  const totalContacts = contactsMock.length;
  const activeContacts = contactsMock.filter((c) => c.status === "active").length;

  // Stage distribution
  const stageDistribution = opportunityStages.map((stage) => ({
    ...stage,
    count: opportunitiesMock.filter((o) => o.stage === stage.value).length,
    value: opportunitiesMock
      .filter((o) => o.stage === stage.value)
      .reduce((sum, o) => sum + o.value, 0),
  }));

  // Recent opportunities
  const recentOpportunities = [...opportunitiesMock]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <AppLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-serif font-medium tracking-wide">仪表盘</h1>
          <p className="text-muted-foreground mt-1">CRM 系统概览</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                销售机会
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOpportunities}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {openOpportunities} 个进行中
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                本月成交
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{wonOpportunities}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {formatCurrency(totalValue)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                销售漏斗
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(pipelineValue)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                加权: {formatCurrency(weightedPipeline)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                联系人
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalContacts}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {activeContacts} 个活跃
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Pipeline Overview */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>销售漏斗分布</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stageDistribution.map((stage) => (
                  <div key={stage.value} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{stage.label}</span>
                      <span className="text-muted-foreground">
                        {stage.count} 个 · {formatCurrency(stage.value)}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{
                          width: `${(stage.count / totalOpportunities) * 100}%`,
                          backgroundColor: stage.color === "gray"
                            ? "hsl(var(--muted))"
                            : stage.color === "blue"
                            ? "hsl(var(--primary))"
                            : stage.color === "yellow"
                            ? "hsl(45, 93%, 47%)"
                            : stage.color === "orange"
                            ? "hsl(25, 95%, 53%)"
                            : stage.color === "green"
                            ? "hsl(142, 76%, 36%)"
                            : "hsl(var(--destructive))",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>最近更新</CardTitle>
                <Link
                  href="/opportunities"
                  className="text-sm text-primary hover:underline"
                >
                  查看全部 →
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOpportunities.map((opp) => (
                  <div
                    key={opp.id}
                    className="flex items-start justify-between gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{opp.opportunityName}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {opp.accountName}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge
                        variant="outline"
                        className={`border-${getStageColor(opp.stage)} text-${getStageColor(opp.stage)}`}
                      >
                        {getStageLabel(opp.stage)}
                      </Badge>
                      <span className="text-sm font-medium">
                        {formatCurrency(opp.value)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>快速操作</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Link
                href="/opportunities/create"
                className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">新建销售机会</p>
                  <p className="text-sm text-muted-foreground">创建新的商机</p>
                </div>
              </Link>

              <Link
                href="/contacts/create"
                className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">新建联系人</p>
                  <p className="text-sm text-muted-foreground">添加新的联系人</p>
                </div>
              </Link>

              <Link
                href="/customers"
                className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">浏览客户</p>
                  <p className="text-sm text-muted-foreground">查看客户档案</p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
