"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { contactsMock } from "@/mock/contacts";
import { getStatusLabel, getImportanceLabel, getImportanceColor } from "@/types/contact";
import { ArrowLeft, Edit, Mail, Phone, MessageCircle, MapPin, Building, Briefcase } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function ContactDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const contact = contactsMock.find((c) => c.id === params.id);

  if (!contact) {
    notFound();
  }

  const getInitials = (firstName: string, lastName: string) => {
    return (lastName[0] + firstName[0]).toUpperCase();
  };

  return (
    <AppLayout>
      <div className="space-y-6 p-6">
        {/* Back Button */}
        <Button variant="ghost" asChild>
          <Link href="/contacts">
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回列表
          </Link>
        </Button>

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-xl">
                {getInitials(contact.firstName, contact.lastName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-serif font-medium tracking-wide">
                {contact.fullName}
              </h1>
              <p className="text-muted-foreground mt-1">
                {contact.title}
                {contact.department && ` · ${contact.department}`}
              </p>
              {contact.accountName && (
                <Link
                  href={`/customers/${contact.accountId}`}
                  className="text-primary hover:underline text-sm"
                >
                  {contact.accountName}
                </Link>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/contacts/${contact.id}/edit`}>
                <Edit className="h-4 w-4 mr-2" />
                编辑
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>联系信息</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {contact.email && (
                    <div className="flex items-center gap-3 p-3 rounded-lg border">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Mail className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-muted-foreground">邮箱</p>
                        <a
                          href={`mailto:${contact.email}`}
                          className="font-medium hover:text-primary truncate block"
                        >
                          {contact.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {contact.phone && (
                    <div className="flex items-center gap-3 p-3 rounded-lg border">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Phone className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-muted-foreground">电话</p>
                        <a
                          href={`tel:${contact.phone}`}
                          className="font-medium hover:text-primary"
                        >
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {contact.mobile && (
                    <div className="flex items-center gap-3 p-3 rounded-lg border">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Phone className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-muted-foreground">手机</p>
                        <a
                          href={`tel:${contact.mobile}`}
                          className="font-medium hover:text-primary"
                        >
                          {contact.mobile}
                        </a>
                      </div>
                    </div>
                  )}

                  {contact.wechat && (
                    <div className="flex items-center gap-3 p-3 rounded-lg border">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <MessageCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-muted-foreground">微信</p>
                        <p className="font-medium">{contact.wechat}</p>
                      </div>
                    </div>
                  )}
                </div>

                {contact.address && (contact.address.city || contact.address.state) && (
                  <>
                    <Separator className="my-4" />
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {[contact.address.city, contact.address.state]
                          .filter(Boolean)
                          .join(", ")}
                      </span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Professional Info */}
            <Card>
              <CardHeader>
                <CardTitle>职业信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">职位</p>
                    <p className="font-medium">{contact.title}</p>
                  </div>
                </div>
                {contact.department && (
                  <div className="flex items-center gap-3">
                    <Building className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">部门</p>
                      <p className="font-medium">{contact.department}</p>
                    </div>
                  </div>
                )}
                {contact.accountName && (
                  <div className="flex items-center gap-3">
                    <Building className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">公司</p>
                      <Link
                        href={`/customers/${contact.accountId}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {contact.accountName}
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Notes */}
            {contact.notes && (
              <Card>
                <CardHeader>
                  <CardTitle>备注</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap">{contact.notes}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status & Importance */}
            <Card>
              <CardHeader>
                <CardTitle>状态信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">状态</p>
                  <div className="mt-1">
                    <Badge variant={contact.status === "active" ? "default" : "secondary"}>
                      {getStatusLabel(contact.status)}
                    </Badge>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">重要性</p>
                  <div className="mt-1">
                    <Badge
                      variant="outline"
                      className={`border-${getImportanceColor(contact.importance)} text-${getImportanceColor(contact.importance)}`}
                    >
                      {getImportanceLabel(contact.importance)}重要性
                    </Badge>
                  </div>
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
                  <Mail className="h-4 w-4 mr-2" />
                  发送邮件
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  拨打电话
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  微信联系
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
                  <span className="text-muted-foreground">来源</span>
                  <span>{contact.source}</span>
                </div>
                {contact.lastContactDate && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">最后联系</span>
                    <span>
                      {new Date(contact.lastContactDate).toLocaleDateString("zh-CN")}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">创建时间</span>
                  <span>
                    {new Date(contact.createdAt).toLocaleDateString("zh-CN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">更新时间</span>
                  <span>
                    {new Date(contact.updatedAt).toLocaleDateString("zh-CN")}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            {contact.preferences && (
              <Card>
                <CardHeader>
                  <CardTitle>联系偏好</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {contact.preferences.preferredContactMethod && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">首选方式</span>
                      <span>
                        {contact.preferences.preferredContactMethod === "email" && "邮箱"}
                        {contact.preferences.preferredContactMethod === "phone" && "电话"}
                        {contact.preferences.preferredContactMethod === "wechat" && "微信"}
                      </span>
                    </div>
                  )}
                  {contact.preferences.preferredTime && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">偏好时间</span>
                      <span>{contact.preferences.preferredTime}</span>
                    </div>
                  )}
                  {(contact.preferences.doNotCall || contact.preferences.doNotEmail) && (
                    <>
                      <Separator />
                      <div className="space-y-2">
                        <p className="text-muted-foreground">限制</p>
                        {contact.preferences.doNotCall && (
                          <p className="text-destructive">● 请勿致电</p>
                        )}
                        {contact.preferences.doNotEmail && (
                          <p className="text-destructive">● 请勿发邮件</p>
                        )}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
