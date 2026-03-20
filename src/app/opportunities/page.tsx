"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { opportunitiesMock, formatCurrency } from "@/mock/opportunities";
import { getStageLabel, getStageColor, OpportunityStage } from "@/types/opportunity";
import { Plus, Search, Filter } from "lucide-react";
import Link from "next/link";

export default function OpportunitiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [stageFilter, setStageFilter] = useState<OpportunityStage | "all">("all");

  const filteredOpportunities = opportunitiesMock.filter((opp) => {
    const matchesSearch =
      opp.opportunityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.accountName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = stageFilter === "all" || opp.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  return (
    <AppLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-medium tracking-wide">
              销售机会
            </h1>
            <p className="text-muted-foreground mt-1">
              管理和跟踪所有销售机会
            </p>
          </div>
          <Button asChild>
            <Link href="/opportunities/create">
              <Plus className="h-4 w-4 mr-2" />
              新建机会
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{opportunitiesMock.length}</div>
              <p className="text-sm text-muted-foreground">全部机会</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {
                  opportunitiesMock.filter(
                    (o) => o.stage !== "closed-won" && o.stage !== "closed-lost"
                  ).length
                }
              </div>
              <p className="text-sm text-muted-foreground">进行中</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {formatCurrency(
                  opportunitiesMock
                    .filter((o) => o.stage === "closed-won")
                    .reduce((sum, o) => sum + o.value, 0)
                )}
              </div>
              <p className="text-sm text-muted-foreground">已成交金额</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {Math.round(
                  opportunitiesMock.filter((o) => o.stage === "closed-won").length /
                    Math.max(opportunitiesMock.length, 1) * 100
                )}
                %
              </div>
              <p className="text-sm text-muted-foreground">成交率</p>
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
                  placeholder="搜索机会名称或客户..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={stageFilter} onValueChange={(v) => setStageFilter(v as OpportunityStage | "all")}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="筛选阶段" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部阶段</SelectItem>
                  <SelectItem value="prospecting">初步接触</SelectItem>
                  <SelectItem value="qualification">需求确认</SelectItem>
                  <SelectItem value="proposal">方案报价</SelectItem>
                  <SelectItem value="negotiation">商务谈判</SelectItem>
                  <SelectItem value="closed-won">赢单</SelectItem>
                  <SelectItem value="closed-lost">输单</SelectItem>
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
                <TableHead>机会名称</TableHead>
                <TableHead>客户</TableHead>
                <TableHead>阶段</TableHead>
                <TableHead>金额</TableHead>
                <TableHead>概率</TableHead>
                <TableHead>预计成交</TableHead>
                <TableHead>负责人</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOpportunities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    没有找到匹配的销售机会
                  </TableCell>
                </TableRow>
              ) : (
                filteredOpportunities.map((opp) => (
                  <TableRow key={opp.id} className="group hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <Link
                        href={`/opportunities/${opp.id}`}
                        className="hover:text-primary hover:underline"
                      >
                        {opp.opportunityName}
                      </Link>
                    </TableCell>
                    <TableCell>{opp.accountName}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`border-${getStageColor(opp.stage)} text-${getStageColor(opp.stage)}`}
                      >
                        {getStageLabel(opp.stage)}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(opp.value)}
                    </TableCell>
                    <TableCell>{opp.probability}%</TableCell>
                    <TableCell>
                      {new Date(opp.expectedCloseDate).toLocaleDateString("zh-CN")}
                    </TableCell>
                    <TableCell>{opp.contactName || "-"}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/opportunities/${opp.id}`}>详情</Link>
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
