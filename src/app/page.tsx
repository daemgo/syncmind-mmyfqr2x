import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, Target, User, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/30" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/10 blur-3xl translate-y-1/2 -translate-x-1/4" />

        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              syncMind CRM
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight">
              AI 客户管理
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
              数据驱动的客户关系管理，让每个销售动作都有据可依
            </p>
            <div className="flex items-center justify-center gap-4 pt-2">
              <Link href="/dashboard">
                <Button size="lg" className="shadow-lg shadow-primary/25 px-8">
                  进入系统
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <Link href="/customers">
                <Button size="lg" variant="outline" className="px-8">
                  查看客户
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="card-elevated group border-0">
            <CardHeader className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                <LayoutDashboard className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">仪表盘</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                销售漏斗可视化、机会概览和关键指标一目了然
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="card-elevated group border-0">
            <CardHeader className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-chart-2/10 flex items-center justify-center group-hover:bg-chart-2/15 transition-colors">
                <Target className="h-6 w-6 text-chart-2" />
              </div>
              <CardTitle className="text-lg">销售机会</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                跟踪销售机会全生命周期，从初步接触到成交
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="card-elevated group border-0">
            <CardHeader className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-chart-3/10 flex items-center justify-center group-hover:bg-chart-3/15 transition-colors">
                <Users className="h-6 w-6 text-chart-3" />
              </div>
              <CardTitle className="text-lg">联系人管理</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                管理客户联系人信息，记录沟通历史和偏好
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="section-gradient">
        <div className="container mx-auto px-4 py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground text-center mb-3">
            Quick Access
          </p>
          <h2 className="text-2xl font-serif font-medium text-center mb-10">
            功能模块
          </h2>
          <div className="max-w-2xl mx-auto space-y-3">
            {[
              { href: "/dashboard", title: "仪表盘", desc: "查看销售漏斗、机会概览和关键指标", icon: LayoutDashboard },
              { href: "/customers", title: "客户管理", desc: "浏览和管理所有客户的数字化档案", icon: Users },
              { href: "/opportunities", title: "销售机会", desc: "跟踪和管理销售机会的全生命周期", icon: Target },
              { href: "/contacts", title: "联系人", desc: "管理客户联系人和沟通记录", icon: User },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <Card className="card-elevated group cursor-pointer border-0">
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className="h-10 w-10 rounded-lg bg-primary/8 flex items-center justify-center shrink-0 group-hover:bg-primary/12 transition-colors">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
