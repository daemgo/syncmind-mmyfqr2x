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
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ContactStatus, ContactImportance } from "@/types/contact";

export default function CreateContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    department: "",
    accountName: "",
    email: "",
    phone: "",
    mobile: "",
    wechat: "",
    status: "active" as ContactStatus,
    importance: "medium" as ContactImportance,
    source: "",
    notes: "",
    preferredContactMethod: "email",
    preferredTime: "",
    doNotCall: false,
    doNotEmail: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a database
    console.log("Creating contact:", formData);
    // Navigate back to list
    router.push("/contacts");
  };

  return (
    <AppLayout>
      <div className="space-y-6 p-6 max-w-3xl">
        {/* Back Button */}
        <Button variant="ghost" asChild>
          <Link href="/contacts">
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回列表
          </Link>
        </Button>

        {/* Header */}
        <div>
          <h1 className="text-3xl font-serif font-medium tracking-wide">
            新建联系人
          </h1>
          <p className="text-muted-foreground mt-1">
            添加一个新的联系人
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} id="contact-form">
          <Card>
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="lastName">姓氏 *</Label>
                  <Input
                    id="lastName"
                    placeholder="例如：张"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firstName">名字 *</Label>
                  <Input
                    id="firstName"
                    placeholder="例如：明"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">职位 *</Label>
                  <Input
                    id="title"
                    placeholder="例如：销售总监"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">部门</Label>
                  <Input
                    id="department"
                    placeholder="例如：销售部"
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountName">客户</Label>
                <Input
                  id="accountName"
                  placeholder="选择或输入客户"
                  value={formData.accountName}
                  onChange={(e) =>
                    setFormData({ ...formData, accountName: e.target.value })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>联系信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">邮箱 *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="例如：zhang.ming@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">电话</Label>
                  <Input
                    id="phone"
                    placeholder="例如：0755-12345678"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">手机</Label>
                  <Input
                    id="mobile"
                    placeholder="例如：13800138000"
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="wechat">微信</Label>
                <Input
                  id="wechat"
                  placeholder="例如：zhang_ming"
                  value={formData.wechat}
                  onChange={(e) =>
                    setFormData({ ...formData, wechat: e.target.value })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>其他信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="status">状态 *</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(v) =>
                      setFormData({ ...formData, status: v as ContactStatus })
                    }
                  >
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">活跃</SelectItem>
                      <SelectItem value="inactive">非活跃</SelectItem>
                      <SelectItem value="blocked">已屏蔽</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="importance">重要性 *</Label>
                  <Select
                    value={formData.importance}
                    onValueChange={(v) =>
                      setFormData({ ...formData, importance: v as ContactImportance })
                    }
                  >
                    <SelectTrigger id="importance">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">高</SelectItem>
                      <SelectItem value="medium">中</SelectItem>
                      <SelectItem value="low">低</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="source">来源</Label>
                  <Input
                    id="source"
                    placeholder="例如：客户推荐"
                    value={formData.source}
                    onChange={(e) =>
                      setFormData({ ...formData, source: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">备注</Label>
                <Textarea
                  id="notes"
                  placeholder="添加备注信息..."
                  rows={3}
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>联系偏好</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="preferredContactMethod">首选联系方式</Label>
                  <Select
                    value={formData.preferredContactMethod}
                    onValueChange={(v) =>
                      setFormData({ ...formData, preferredContactMethod: v })
                    }
                  >
                    <SelectTrigger id="preferredContactMethod">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">邮箱</SelectItem>
                      <SelectItem value="phone">电话</SelectItem>
                      <SelectItem value="wechat">微信</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredTime">偏好联系时间</Label>
                  <Input
                    id="preferredTime"
                    placeholder="例如：工作日下午"
                    value={formData.preferredTime}
                    onChange={(e) =>
                      setFormData({ ...formData, preferredTime: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="doNotCall"
                    checked={formData.doNotCall}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, doNotCall: checked as boolean })
                    }
                  />
                  <Label htmlFor="doNotCall" className="cursor-pointer">
                    请勿致电
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="doNotEmail"
                    checked={formData.doNotEmail}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, doNotEmail: checked as boolean })
                    }
                  />
                  <Label htmlFor="doNotEmail" className="cursor-pointer">
                    请勿发邮件
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" asChild>
              <Link href="/contacts">取消</Link>
            </Button>
            <Button type="submit">
              <Check className="h-4 w-4 mr-2" />
              创建联系人
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
