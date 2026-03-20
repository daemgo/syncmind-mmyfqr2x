"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { contactsMock } from "@/mock/contacts";
import { getStatusLabel, getImportanceLabel, getImportanceColor, ContactStatus, ContactImportance } from "@/types/contact";
import { Plus, Search, Filter, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ContactStatus | "all">("all");
  const [importanceFilter, setImportanceFilter] = useState<ContactImportance | "all">("all");

  const filteredContacts = contactsMock.filter((contact) => {
    const matchesSearch =
      contact.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.accountName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || contact.status === statusFilter;
    const matchesImportance = importanceFilter === "all" || contact.importance === importanceFilter;
    return matchesSearch && matchesStatus && matchesImportance;
  });

  const getInitials = (firstName: string, lastName: string) => {
    return (lastName[0] + firstName[0]).toUpperCase();
  };

  return (
    <AppLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-medium tracking-wide">联系人</h1>
            <p className="text-muted-foreground mt-1">管理和查看所有联系人</p>
          </div>
          <Button asChild>
            <Link href="/contacts/create">
              <Plus className="h-4 w-4 mr-2" />
              新建联系人
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{contactsMock.length}</div>
              <p className="text-sm text-muted-foreground">全部联系人</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {contactsMock.filter((c) => c.status === "active").length}
              </div>
              <p className="text-sm text-muted-foreground">活跃</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {contactsMock.filter((c) => c.importance === "high").length}
              </div>
              <p className="text-sm text-muted-foreground">高重要性</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {contactsMock.filter((c) => c.lastContactDate).length}
              </div>
              <p className="text-sm text-muted-foreground">有联系记录</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索联系人、邮箱或客户..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as ContactStatus | "all")}>
                <SelectTrigger className="w-[150px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="状态筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="active">活跃</SelectItem>
                  <SelectItem value="inactive">非活跃</SelectItem>
                  <SelectItem value="blocked">已屏蔽</SelectItem>
                </SelectContent>
              </Select>
              <Select value={importanceFilter} onValueChange={(v) => setImportanceFilter(v as ContactImportance | "all")}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="重要性筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部重要性</SelectItem>
                  <SelectItem value="high">高</SelectItem>
                  <SelectItem value="medium">中</SelectItem>
                  <SelectItem value="low">低</SelectItem>
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
                <TableHead>姓名</TableHead>
                <TableHead>职位</TableHead>
                <TableHead>客户</TableHead>
                <TableHead>邮箱</TableHead>
                <TableHead>电话</TableHead>
                <TableHead>重要性</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>最后联系</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    没有找到匹配的联系人
                  </TableCell>
                </TableRow>
              ) : (
                filteredContacts.map((contact) => (
                  <TableRow key={contact.id} className="group hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {getInitials(contact.firstName, contact.lastName)}
                          </AvatarFallback>
                        </Avatar>
                        <Link
                          href={`/contacts/${contact.id}`}
                          className="font-medium hover:text-primary hover:underline"
                        >
                          {contact.fullName}
                        </Link>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{contact.title}</p>
                        {contact.department && (
                          <p className="text-xs text-muted-foreground">{contact.department}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {contact.accountName ? (
                        <Link
                          href={`/customers/${contact.accountId}`}
                          className="text-primary hover:underline"
                        >
                          {contact.accountName}
                        </Link>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-muted-foreground hover:text-primary flex items-center gap-1"
                      >
                        <Mail className="h-3 w-3" />
                        {contact.email}
                      </a>
                    </TableCell>
                    <TableCell>
                      {contact.phone || contact.mobile ? (
                        <a
                          href={`tel:${contact.mobile || contact.phone}`}
                          className="text-muted-foreground hover:text-primary flex items-center gap-1"
                        >
                          <Phone className="h-3 w-3" />
                          {contact.mobile || contact.phone}
                        </a>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`border-${getImportanceColor(contact.importance)} text-${getImportanceColor(contact.importance)}`}
                      >
                        {getImportanceLabel(contact.importance)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={contact.status === "active" ? "default" : "secondary"}>
                        {getStatusLabel(contact.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {contact.lastContactDate
                        ? new Date(contact.lastContactDate).toLocaleDateString("zh-CN")
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/contacts/${contact.id}`}>详情</Link>
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
