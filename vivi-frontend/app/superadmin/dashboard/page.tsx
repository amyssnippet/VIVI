"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Building2,
  Users,
  Globe,
  Settings,
  Bell,
  Search,
  TrendingUp,
  Activity,
  MessageSquare,
  Shield,
  AlertTriangle,
  Menu,
  LogOut,
  Plus,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

export default function SuperAdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const globalMetrics = {
    totalOrganizations: { value: 47, change: 15.2, trend: "up" },
    totalUsers: { value: 12847, change: 8.7, trend: "up" },
    totalConversations: { value: 89432, change: 12.3, trend: "up" },
    systemUptime: { value: "99.97%", change: 0.02, trend: "up" },
  }

  const recentOrganizations = [
    {
      id: 1,
      name: "TechCorp Solutions",
      users: 245,
      status: "active",
      plan: "enterprise",
      joinDate: "2024-12-10",
    },
    {
      id: 2,
      name: "Global Industries",
      users: 189,
      status: "active",
      plan: "professional",
      joinDate: "2024-12-08",
    },
    {
      id: 3,
      name: "StartupXYZ",
      users: 23,
      status: "trial",
      plan: "starter",
      joinDate: "2024-12-05",
    },
  ]

  const systemAlerts = [
    {
      id: 1,
      type: "warning",
      message: "High API usage detected for Organization #23",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "info",
      message: "Scheduled maintenance completed successfully",
      time: "6 hours ago",
    },
    {
      id: 3,
      type: "error",
      message: "Failed login attempts from suspicious IP",
      time: "1 day ago",
    },
  ]

  const topPerformingOrgs = [
    { name: "VIVI Corporation", users: 847, conversations: 12450, satisfaction: 96.2 },
    { name: "Enterprise Solutions", users: 623, conversations: 9876, satisfaction: 94.8 },
    { name: "Global Tech", users: 445, conversations: 7234, satisfaction: 93.5 },
    { name: "Innovation Labs", users: 334, conversations: 5678, satisfaction: 92.1 },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-64 bg-sidebar border-r border-sidebar-border transform transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-2 px-6 border-b border-sidebar-border">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <span className="text-sidebar-primary-foreground font-bold text-lg">V</span>
            </div>
            <span className="text-xl font-bold text-sidebar-foreground">VIVI Super</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <Link href="/superadmin/dashboard">
              <Button
                variant="secondary"
                className="w-full justify-start gap-3 bg-sidebar-accent text-sidebar-accent-foreground"
              >
                <Globe className="w-4 h-4" />
                Global Dashboard
              </Button>
            </Link>
            <Link href="/superadmin/organizations">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <Building2 className="w-4 h-4" />
                Organizations
              </Button>
            </Link>
            <Link href="/superadmin/users">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <Users className="w-4 h-4" />
                Global Users
              </Button>
            </Link>
            <Link href="/superadmin/settings">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <Settings className="w-4 h-4" />
                Platform Settings
              </Button>
            </Link>
          </nav>

          {/* User Menu */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/super-admin-avatar.png" />
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">Super Admin</p>
                <p className="text-xs text-sidebar-foreground/70 truncate">superadmin@vivi.com</p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" className="flex-1 text-sidebar-foreground hover:bg-sidebar-accent">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="flex-1 text-sidebar-foreground hover:bg-sidebar-accent">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </Button>

          <div className="flex-1">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search organizations, users..." className="pl-10 bg-muted/50" />
            </div>
          </div>

          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs bg-destructive">
              7
            </Badge>
          </Button>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 space-y-6">
          {/* Welcome Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-balance">Global Platform Overview</h1>
              <p className="text-muted-foreground mt-1">Monitor and manage the entire VIVI platform ecosystem.</p>
            </div>
            <div className="flex gap-2">
              <Link href="/superadmin/organizations">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Plus className="w-4 h-4" />
                  Add Organization
                </Button>
              </Link>
              <Button className="gap-2">
                <Shield className="w-4 h-4" />
                System Health
              </Button>
            </div>
          </div>

          {/* Global Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Organizations</CardTitle>
                <Building2 className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{globalMetrics.totalOrganizations.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />+{globalMetrics.totalOrganizations.change}% this
                  month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{globalMetrics.totalUsers.value.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />+{globalMetrics.totalUsers.change}% this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{globalMetrics.totalConversations.value.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />+{globalMetrics.totalConversations.change}% this
                  month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
                <Activity className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{globalMetrics.systemUptime.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />+{globalMetrics.systemUptime.change}% improvement
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Organizations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Recent Organizations
                </CardTitle>
                <CardDescription>Newly joined organizations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentOrganizations.map((org) => (
                  <div
                    key={org.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {org.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{org.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {org.users} users • {org.joinDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={org.status === "active" ? "default" : org.status === "trial" ? "secondary" : "outline"}
                      >
                        {org.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {org.plan}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Separator />
                <Link href="/superadmin/organizations">
                  <Button variant="ghost" className="w-full">
                    View All Organizations
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* System Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  System Alerts
                </CardTitle>
                <CardDescription>Recent platform notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {systemAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        alert.type === "error"
                          ? "bg-destructive"
                          : alert.type === "warning"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                ))}
                <Separator />
                <Button variant="ghost" className="w-full">
                  View All Alerts
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Top Performing Organizations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Top Performing Organizations
              </CardTitle>
              <CardDescription>Organizations with highest engagement and satisfaction</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformingOrgs.map((org, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-lg border">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold">{org.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span>{org.users} users</span>
                        <span>{org.conversations.toLocaleString()} conversations</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{org.satisfaction}%</div>
                      <div className="text-xs text-muted-foreground">satisfaction</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Platform Health */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Health & Performance</CardTitle>
              <CardDescription>Real-time system status and performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">API Response Time</span>
                    <span className="text-sm text-muted-foreground">145ms avg</span>
                  </div>
                  <Progress value={92} className="h-2" />
                  <p className="text-xs text-muted-foreground">Excellent performance</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Database Performance</span>
                    <span className="text-sm text-muted-foreground">99.2%</span>
                  </div>
                  <Progress value={99.2} className="h-2" />
                  <p className="text-xs text-muted-foreground">All systems operational</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Storage Usage</span>
                    <span className="text-sm text-muted-foreground">67.3%</span>
                  </div>
                  <Progress value={67.3} className="h-2" />
                  <p className="text-xs text-muted-foreground">Within normal limits</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Administration</CardTitle>
              <CardDescription>Common super admin tasks and system management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/superadmin/organizations">
                  <Button variant="outline" className="h-20 flex-col gap-2 w-full bg-transparent">
                    <Plus className="w-6 h-6" />
                    <span className="text-sm">Add Organization</span>
                  </Button>
                </Link>
                <Link href="/superadmin/users">
                  <Button variant="outline" className="h-20 flex-col gap-2 w-full bg-transparent">
                    <Users className="w-6 h-6" />
                    <span className="text-sm">Manage Users</span>
                  </Button>
                </Link>
                <Button variant="outline" className="h-20 flex-col gap-2 w-full bg-transparent">
                  <Shield className="w-6 h-6" />
                  <span className="text-sm">Security Audit</span>
                </Button>
                <Link href="/superadmin/settings">
                  <Button variant="outline" className="h-20 flex-col gap-2 w-full bg-transparent">
                    <Settings className="w-6 h-6" />
                    <span className="text-sm">Platform Settings</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
