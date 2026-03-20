import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-serif font-medium tracking-wide">
            CRM Demo
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light">
            客户关系管理系统演示
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link href="/dashboard">
              <Button size="lg">进入系统</Button>
            </Link>
            <Link href="/customers">
              <Button size="lg" variant="outline">查看客户</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="text-4xl mb-2">🎯</div>
              <CardTitle>仪表盘</CardTitle>
              <CardDescription>
                销售漏斗可视化、机会概览和关键指标一目了然
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-4xl mb-2">🚀</div>
              <CardTitle>销售机会</CardTitle>
              <CardDescription>
                跟踪销售机会全生命周期，从初步接触到成交
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-4xl mb-2">👥</div>
              <CardTitle>联系人管理</CardTitle>
              <CardDescription>
                管理客户联系人信息，记录沟通历史和偏好
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-serif font-medium text-center mb-8">
          功能模块
        </h2>
        <div className="max-w-2xl mx-auto space-y-4">
          <Link href="/dashboard">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <h3 className="font-medium mb-1">仪表盘</h3>
                  <p className="text-sm text-muted-foreground">
                    查看销售漏斗、机会概览和关键指标
                  </p>
                </div>
                <span className="text-muted-foreground">→</span>
              </CardContent>
            </Card>
          </Link>

          <Link href="/customers">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <h3 className="font-medium mb-1">客户管理</h3>
                  <p className="text-sm text-muted-foreground">
                    浏览和管理所有客户的数字化档案
                  </p>
                </div>
                <span className="text-muted-foreground">→</span>
              </CardContent>
            </Card>
          </Link>

          <Link href="/opportunities">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <h3 className="font-medium mb-1">销售机会</h3>
                  <p className="text-sm text-muted-foreground">
                    跟踪和管理销售机会的全生命周期
                  </p>
                </div>
                <span className="text-muted-foreground">→</span>
              </CardContent>
            </Card>
          </Link>

          <Link href="/contacts">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <h3 className="font-medium mb-1">联系人</h3>
                  <p className="text-sm text-muted-foreground">
                    管理客户联系人和沟通记录
                  </p>
                </div>
                <span className="text-muted-foreground">→</span>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
