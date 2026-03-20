"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { projectsMock, formatCurrency } from "@/mock/projects";
import {
  getProjectStatusLabel,
  getProjectStatusColor,
  ProjectStatus,
} from "@/types/project";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  AlertCircle,
  Users,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

function StatusBadge({ status }: { status: ProjectStatus }) {
  const label = getProjectStatusLabel(status);
  const color = getProjectStatusColor(status);
  const variantMap: Record<
    string,
    "default" | "secondary" | "destructive" | "outline"
  > = {
    green: "default",
    blue: "secondary",
    yellow: "outline",
    gray: "outline",
    red: "destructive",
  };
  return <Badge variant={variantMap[color] || "outline"}>{label}</Badge>;
}

function MilestoneIcon({ status }: { status: string }) {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case "in-progress":
      return <Clock className="h-5 w-5 text-blue-500" />;
    case "overdue":
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    default:
      return <Circle className="h-5 w-5 text-muted-foreground" />;
  }
}

function getMilestoneStatusLabel(status: string): string {
  const map: Record<string, string> = {
    pending: "待开始",
    "in-progress": "进行中",
    completed: "已完成",
    overdue: "已逾期",
  };
  return map[status] || status;
}

export default function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const project = projectsMock.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  const completedMilestones = project.milestones.filter(
    (m) => m.status === "completed"
  ).length;
  const totalMilestones = project.milestones.length;

  return (
    <AppLayout>
      <div className="space-y-6 p-6">
        {/* Back Button */}
        <Button variant="ghost" asChild>
          <Link href="/projects">
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回列表
          </Link>
        </Button>

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-serif font-medium tracking-wide">
              {project.name}
            </h1>
            <p className="text-muted-foreground mt-1">{project.clientName}</p>
          </div>
          <StatusBadge status={project.status} />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle>项目概览</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">项目金额</p>
                    <p className="font-medium text-lg mt-1">
                      {formatCurrency(project.value)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">项目经理</p>
                    <p className="font-medium mt-1">{project.manager}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">开始日期</p>
                    <p className="font-medium mt-1">
                      {new Date(project.startDate).toLocaleDateString("zh-CN")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">截止日期</p>
                    <p className="font-medium mt-1">
                      {new Date(project.endDate).toLocaleDateString("zh-CN")}
                    </p>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">整体进度</p>
                    <span className="text-sm font-medium">
                      {project.progress}%
                    </span>
                  </div>
                  <Progress value={project.progress} className="h-3" />
                </div>

                {project.description && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground">描述</p>
                      <p className="mt-1">{project.description}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Milestones */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>里程碑</CardTitle>
                  <span className="text-sm text-muted-foreground">
                    {completedMilestones}/{totalMilestones} 已完成
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {project.milestones.map((milestone, index) => (
                    <div key={milestone.id}>
                      <div className="flex gap-4 py-3">
                        <div className="flex flex-col items-center">
                          <MilestoneIcon status={milestone.status} />
                          {index < project.milestones.length - 1 && (
                            <div className="w-0.5 flex-1 bg-border mt-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-2">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{milestone.name}</p>
                            <Badge variant="outline" className="text-xs">
                              {getMilestoneStatusLabel(milestone.status)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {milestone.description}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                            <Calendar className="h-3 w-3" />
                            {new Date(milestone.dueDate).toLocaleDateString(
                              "zh-CN"
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Team */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <CardTitle>项目团队</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {project.team.map((member) => (
                    <div
                      key={member.name}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {member.name.slice(0, 1)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
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
                    {new Date(project.createdAt).toLocaleDateString("zh-CN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">更新时间</span>
                  <span>
                    {new Date(project.updatedAt).toLocaleDateString("zh-CN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">里程碑进度</span>
                  <span>
                    {completedMilestones}/{totalMilestones}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
