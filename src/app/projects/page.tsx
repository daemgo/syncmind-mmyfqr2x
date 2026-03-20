"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { projectsMock, formatCurrency } from "@/mock/projects";
import {
  getProjectStatusLabel,
  getProjectStatusColor,
  ProjectStatus,
} from "@/types/project";
import { Search, Filter } from "lucide-react";
import Link from "next/link";

function StatusBadge({ status }: { status: ProjectStatus }) {
  const label = getProjectStatusLabel(status);
  const color = getProjectStatusColor(status);
  const variantMap: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    green: "default",
    blue: "secondary",
    yellow: "outline",
    gray: "outline",
    red: "destructive",
  };
  return <Badge variant={variantMap[color] || "outline"}>{label}</Badge>;
}

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">(
    "all"
  );

  const filteredProjects = projectsMock.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeCount = projectsMock.filter(
    (p) => p.status === "in-progress"
  ).length;
  const completedCount = projectsMock.filter(
    (p) => p.status === "completed"
  ).length;
  const totalValue = projectsMock.reduce((sum, p) => sum + p.value, 0);

  return (
    <AppLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-serif font-medium tracking-wide">
            项目管理
          </h1>
          <p className="text-muted-foreground mt-1">跟踪和管理所有交付项目</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{projectsMock.length}</div>
              <p className="text-sm text-muted-foreground">全部项目</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{activeCount}</div>
              <p className="text-sm text-muted-foreground">进行中</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{completedCount}</div>
              <p className="text-sm text-muted-foreground">已完成</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {formatCurrency(totalValue)}
              </div>
              <p className="text-sm text-muted-foreground">项目总金额</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索项目名称或客户..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={statusFilter}
                onValueChange={(v) =>
                  setStatusFilter(v as ProjectStatus | "all")
                }
              >
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="筛选状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="planning">规划中</SelectItem>
                  <SelectItem value="in-progress">进行中</SelectItem>
                  <SelectItem value="on-hold">已暂停</SelectItem>
                  <SelectItem value="completed">已完成</SelectItem>
                  <SelectItem value="cancelled">已取消</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>项目名称</TableHead>
                <TableHead>客户</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>进度</TableHead>
                <TableHead>项目经理</TableHead>
                <TableHead>开始日期</TableHead>
                <TableHead>截止日期</TableHead>
                <TableHead>金额</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="text-center py-8 text-muted-foreground"
                  >
                    没有找到匹配的项目
                  </TableCell>
                </TableRow>
              ) : (
                filteredProjects.map((project) => (
                  <TableRow
                    key={project.id}
                    className="group hover:bg-muted/50"
                  >
                    <TableCell className="font-medium">
                      <Link
                        href={`/projects/${project.id}`}
                        className="hover:text-primary hover:underline"
                      >
                        {project.name}
                      </Link>
                    </TableCell>
                    <TableCell>{project.clientName}</TableCell>
                    <TableCell>
                      <StatusBadge status={project.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 min-w-[120px]">
                        <Progress value={project.progress} className="h-2" />
                        <span className="text-sm text-muted-foreground w-10">
                          {project.progress}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{project.manager}</TableCell>
                    <TableCell>
                      {new Date(project.startDate).toLocaleDateString("zh-CN")}
                    </TableCell>
                    <TableCell>
                      {new Date(project.endDate).toLocaleDateString("zh-CN")}
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(project.value)}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/projects/${project.id}`}>详情</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </AppLayout>
  );
}
