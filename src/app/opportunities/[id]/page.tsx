"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { opportunitiesMock, formatCurrency } from "@/mock/opportunities";
import { getStageLabel, getStageBadgeClass, opportunityStages } from "@/types/opportunity";
import { ArrowLeft, Edit, Phone, Mail, Calendar } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function OpportunityDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const opportunity = opportunitiesMock.find((o) => o.id === params.id);

  if (!opportunity) {
    notFound();
  }

  const currentIndex = opportunityStages.findIndex((s) => s.value === opportunity.stage);

  return (
    <AppLayout>
      <div className="space-y-6 p-6">
        {/* Back Button */}
        <Button variant="ghost" asChild>
          <Link href="/opportunities">
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回列表
          </Link>
        </Button>

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-serif font-medium tracking-wide">
              {opportunity.opportunityName}
            </h1>
            <p className="text-muted-foreground mt-1">{opportunity.accountName}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/opportunities/${opportunity.id}/edit`}>
                <Edit className="h-4 w-4 mr-2" />
                编辑
              </Link>
            </Button>
            <Button>更新阶段</Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key Info */}
            <Card>
              <CardHeader>
                <CardTitle>基本信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">阶段</p>
                    <p className="font-medium mt-1">
                      <Badge
                        variant="outline"
                        className={getStageBadgeClass(opportunity.stage)}
                      >
                        {getStageLabel(opportunity.stage)}
                      </Badge>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">成交概率</p>
                    <p className="font-medium mt-1">{opportunity.probability}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">机会金额</p>
                    <p className="font-medium text-lg mt-1">
                      {formatCurrency(opportunity.value)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">预计成交日期</p>
                    <p className="font-medium mt-1">
                      {new Date(opportunity.expectedCloseDate).toLocaleDateString("zh-CN")}
                    </p>
                  </div>
                </div>

                {opportunity.description && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground">描述</p>
                      <p className="mt-1">{opportunity.description}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Stage Progress */}
            <Card>
              <CardHeader>
                <CardTitle>销售流程</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  {opportunityStages.map((stage, index) => (
                    <div key={stage.value} className="flex flex-col items-center flex-1">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium ${
                          index <= currentIndex
                            ? stage.value === "closed-lost"
                              ? "bg-destructive text-destructive-foreground"
                              : "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <p className="text-xs text-center mt-2 hidden sm:block">
                        {stage.label}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex mt-[-20px]">
                  {opportunityStages.slice(0, -1).map((stage, index) => (
                    <div
                      key={stage.value}
                      className={`flex-1 h-0.5 mt-5 ${
                        index < currentIndex ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activity Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>活动记录</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <div className="w-0.5 flex-1 bg-border mt-2" />
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-medium">更新阶段</p>
                      <p className="text-sm text-muted-foreground">
                        阶段从"需求确认"变更为"{getStageLabel(opportunity.stage)}"
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(opportunity.updatedAt).toLocaleString("zh-CN")}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-muted" />
                    <div>
                      <p className="font-medium">创建机会</p>
                      <p className="text-sm text-muted-foreground">
                        销售机会已创建
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(opportunity.createdAt).toLocaleString("zh-CN")}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>联系信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {opportunity.contactName && (
                  <div>
                    <p className="text-sm text-muted-foreground">联系人</p>
                    <p className="font-medium">{opportunity.contactName}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">来源</p>
                  <p className="font-medium">{opportunity.source}</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>快速操作</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  联系客户
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  发送邮件
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  安排会议
                </Button>
              </CardContent>
            </Card>

            {/* Metadata */}
            <Card>
              <CardHeader>
                <CardTitle>详细信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">创建时间</span>
                  <span>
                    {new Date(opportunity.createdAt).toLocaleDateString("zh-CN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">更新时间</span>
                  <span>
                    {new Date(opportunity.updatedAt).toLocaleDateString("zh-CN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">货币</span>
                  <span>{opportunity.currency}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
