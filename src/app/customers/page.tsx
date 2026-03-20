import { AppLayout } from "@/components/layout/app-layout";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import fs from "fs";
import path from "path";
import Link from "next/link";

interface CustomerIndexEntry {
  id: string;
  companyName: string;
  shortName: string;
  industry: string;
  scale: string;
  rating: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface CustomerIndex {
  customers: CustomerIndexEntry[];
  updatedAt: string;
}

function getCustomerIndex(): CustomerIndex {
  const indexPath = path.join(process.cwd(), "docs", "customers", "index.json");
  if (!fs.existsSync(indexPath)) {
    return { customers: [], updatedAt: new Date().toISOString() };
  }
  try {
    const data = fs.readFileSync(indexPath, "utf-8");
    return JSON.parse(data);
  } catch {
    return { customers: [], updatedAt: new Date().toISOString() };
  }
}

function getStatusVariant(
  status: string,
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "已签约":
      return "default";
    case "跟进中":
      return "secondary";
    case "潜在客户":
      return "outline";
    case "已关闭":
      return "destructive";
    default:
      return "outline";
  }
}

function getRatingColor(rating: string): string {
  const ratingValue = rating.replace(/[^A-]/g, "");
  if (ratingValue.startsWith("A")) return "text-green-600 dark:text-green-400";
  if (ratingValue.startsWith("B"))
    return "text-yellow-600 dark:text-yellow-400";
  return "text-red-600 dark:text-red-400";
}

export default function CustomersPage() {
  const index = getCustomerIndex();
  const { customers } = index;

  return (
    <AppLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-medium tracking-wide">
              客户档案
            </h1>
            <p className="text-muted-foreground mt-1">
              管理和查看所有客户的数字化档案
            </p>
          </div>
          <Button>新建客户</Button>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="max-w-sm">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索客户..."
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer List */}
        {customers.length === 0 ? (
          <Card className="p-12">
            <CardContent className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="text-muted-foreground text-6xl">📁</div>
              <h3 className="text-xl font-medium">暂无客户档案</h3>
              <p className="text-muted-foreground max-w-md">
                使用{" "}
                <code className="bg-muted px-2 py-1 rounded text-sm">
                  /profile
                </code>{" "}
                skill 创建第一个客户档案
              </p>
              <Button className="mt-4">创建第一个客户</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {customers.map((customer) => (
              <Card
                key={customer.id}
                className="group hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium truncate group-hover:text-primary transition-colors">
                        {customer.shortName}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate mt-1">
                        {customer.companyName}
                      </p>
                    </div>
                    <Badge variant={getStatusVariant(customer.status)}>
                      {customer.status}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">行业</span>
                      <span>{customer.industry}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">规模</span>
                      <span>{customer.scale}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">评级</span>
                      <span
                        className={`font-medium ${getRatingColor(customer.rating)}`}
                      >
                        {customer.rating}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t text-xs text-muted-foreground space-y-1">
                    <div className="flex justify-between">
                      <span>创建于</span>
                      <span>
                        {new Date(customer.createdAt).toLocaleDateString(
                          "zh-CN",
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>更新于</span>
                      <span>
                        {new Date(customer.updatedAt).toLocaleDateString(
                          "zh-CN",
                        )}
                      </span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/customers/${customer.id}`}>查看详情 →</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
