"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { OpportunityStage } from "@/types/opportunity";

export default function CreateOpportunityPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    opportunityName: "",
    accountName: "",
    contactName: "",
    stage: "prospecting" as OpportunityStage,
    value: "",
    currency: "CNY",
    expectedCloseDate: "",
    source: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a database
    console.log("Creating opportunity:", formData);
    // Navigate back to list
    router.push("/opportunities");
  };

  return (
    <AppLayout>
      <div className="space-y-6 p-6 max-w-3xl">
        {/* Back Button */}
        <Button variant="ghost" asChild>
          <Link href="/opportunities">
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回列表
          </Link>
        </Button>

        {/* Header */}
        <div>
          <h1 className="text-3xl font-serif font-medium tracking-wide">
            新建销售机会
          </h1>
          <p className="text-muted-foreground mt-1">
            创建一个新的销售机会
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} id="opportunity-form">
          <Card>
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="opportunityName">机会名称 *</Label>
                <Input
                  id="opportunityName"
                  placeholder="例如：ERP系统升级项目"
                  value={formData.opportunityName}
                  onChange={(e) =>
                    setFormData({ ...formData, opportunityName: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountName">客户名称 *</Label>
                <Input
                  id="accountName"
                  placeholder="选择或输入客户"
                  value={formData.accountName}
                  onChange={(e) =>
                    setFormData({ ...formData, accountName: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contactName">联系人</Label>
                  <Input
                    id="contactName"
                    placeholder="选择或输入联系人"
                    value={formData.contactName}
                    onChange={(e) =>
                      setFormData({ ...formData, contactName: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stage">阶段 *</Label>
                  <Select
                    value={formData.stage}
                    onValueChange={(v) =>
                      setFormData({ ...formData, stage: v as OpportunityStage })
                    }
                  >
                    <SelectTrigger id="stage">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prospecting">初步接触</SelectItem>
                      <SelectItem value="qualification">需求确认</SelectItem>
                      <SelectItem value="proposal">方案报价</SelectItem>
                      <SelectItem value="negotiation">商务谈判</SelectItem>
                      <SelectItem value="closed-won">赢单</SelectItem>
                      <SelectItem value="closed-lost">输单</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="value">金额 *</Label>
                  <Input
                    id="value"
                    type="number"
                    placeholder="0.00"
                    value={formData.value}
                    onChange={(e) =>
                      setFormData({ ...formData, value: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">货币</Label>
                  <Select
                    value={formData.currency}
                    onValueChange={(v) =>
                      setFormData({ ...formData, currency: v })
                    }
                  >
                    <SelectTrigger id="currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CNY">人民币 (CNY)</SelectItem>
                      <SelectItem value="USD">美元 (USD)</SelectItem>
                      <SelectItem value="EUR">欧元 (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectedCloseDate">预计成交日期 *</Label>
                  <Input
                    id="expectedCloseDate"
                    type="date"
                    value={formData.expectedCloseDate}
                    onChange={(e) =>
                      setFormData({ ...formData, expectedCloseDate: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="source">来源</Label>
                <Input
                  id="source"
                  placeholder="例如：客户推荐、市场活动、主动开发"
                  value={formData.source}
                  onChange={(e) =>
                    setFormData({ ...formData, source: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">描述</Label>
                <Textarea
                  id="description"
                  placeholder="详细描述这个销售机会..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" asChild>
              <Link href="/opportunities">取消</Link>
            </Button>
            <Button type="submit">
              <Check className="h-4 w-4 mr-2" />
              创建机会
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
