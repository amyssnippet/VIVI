"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Users,
  MessageSquare,
  Clock,
  BarChart3,
  Calendar,
  Download,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")

  const metrics = {
    totalConversations: { value: 1429, change: 8.2, trend: "up" },
    activeUsers: { value: 247, change: 12.1, trend: "up" },
    avgResponseTime: { value: "1.2s", change: -15.3, trend: "down" },
    resolutionRate: { value: "94.2%", change: 2.1, trend: "up" },
  }

  const topQueries = [
    { query: "How to submit expense reports?", count: 145, percentage: 18.2 },
    { query: "Company holiday schedule", count: 132, percentage: 16.5 },
    { query: "IT support contact information", count: 98, percentage: 12.3 },
    { query: "Remote work policy details", count: 87, percentage: 10.9 },
    { query: "Benefits enrollment process", count: 76, percentage: 9.5 },
  ]

  const languageStats = [
    { language: "English", percentage: 78.5, count: 1122 },
    { language: "Spanish", percentage: 12.3, count: 176 },
    { language: "French", percentage: 5.2, count: 74 },
    { language: "German", percentage: 2.8, count: 40 },
    { language: "Other", percentage: 1.2, count: 17 },
  ]

  const userActivity = [
    { hour: "00:00", conversations: 12 },
    { hour: "02:00", conversations: 8 },
    { hour: "04:00", conversations: 5 },
    { hour: "06:00", conversations: 15 },
    { hour: "08:00", conversations: 45 },
    { hour: "10:00", conversations: 78 },
    { hour: "12:00", conversations: 92 },
    { hour: "14:00", conversations: 85 },
    { hour: "16:00", conversations: 67 },
    { hour: "18:00", conversations: 34 },
    { hour: "20:00", conversations: 28 },
    { hour: "22:00", conversations: 18 },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
        <Link href="/admin/dashboard">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="flex-1">
          <h1 className="text-xl font-semibold">Analytics & Insights</h1>
        </div>

        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </header>

      <div className="container mx-auto p-6 max-w-7xl space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
              <MessageSquare className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalConversations.value.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                {metrics.totalConversations.trend === "up" ? (
                  <TrendingUp className="w-3 h-3 text-green-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-500" />
                )}
                {Math.abs(metrics.totalConversations.change)}% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.activeUsers.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                {metrics.activeUsers.trend === "up" ? (
                  <TrendingUp className="w-3 h-3 text-green-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-500" />
                )}
                {Math.abs(metrics.activeUsers.change)}% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <Clock className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.avgResponseTime.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                {metrics.avgResponseTime.trend === "down" ? (
                  <TrendingDown className="w-3 h-3 text-green-500" />
                ) : (
                  <TrendingUp className="w-3 h-3 text-red-500" />
                )}
                {Math.abs(metrics.avgResponseTime.change)}% improvement
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.resolutionRate.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                {metrics.resolutionRate.trend === "up" ? (
                  <TrendingUp className="w-3 h-3 text-green-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-500" />
                )}
                {Math.abs(metrics.resolutionRate.change)}% from last period
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top Queries */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Most Asked Questions
              </CardTitle>
              <CardDescription>Popular queries from your users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topQueries.map((query, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate flex-1 mr-2">{query.query}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {query.count}
                      </Badge>
                      <span className="text-xs text-muted-foreground w-12 text-right">{query.percentage}%</span>
                    </div>
                  </div>
                  <Progress value={query.percentage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Language Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Language Distribution
              </CardTitle>
              <CardDescription>Conversation languages breakdown</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {languageStats.map((lang, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{lang.language}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {lang.count}
                      </Badge>
                      <span className="text-xs text-muted-foreground w-12 text-right">{lang.percentage}%</span>
                    </div>
                  </div>
                  <Progress value={lang.percentage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* User Activity Heatmap */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Daily Activity Pattern
            </CardTitle>
            <CardDescription>Conversation volume throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-12 gap-2">
              {userActivity.map((activity, index) => (
                <div key={index} className="text-center">
                  <div
                    className="w-full bg-muted rounded mb-2 flex items-end justify-center"
                    style={{ height: "100px" }}
                  >
                    <div
                      className="w-full bg-primary rounded-sm"
                      style={{
                        height: `${Math.max((activity.conversations / 100) * 100, 5)}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.hour}</p>
                  <p className="text-xs font-medium">{activity.conversations}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Insights */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Response Quality</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Helpful Responses</span>
                  <span>92.3%</span>
                </div>
                <Progress value={92.3} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Accurate Information</span>
                  <span>89.7%</span>
                </div>
                <Progress value={89.7} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>User Satisfaction</span>
                  <span>94.8%</span>
                </div>
                <Progress value={94.8} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Conversation Outcomes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Resolved</span>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-sm font-medium">1,347 (94.2%)</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Escalated</span>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <span className="text-sm font-medium">58 (4.1%)</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Unresolved</span>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="text-sm font-medium">24 (1.7%)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Document Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">HR Policies</span>
                <span className="text-sm font-medium">342 refs</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">IT Guidelines</span>
                <span className="text-sm font-medium">287 refs</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Finance Docs</span>
                <span className="text-sm font-medium">198 refs</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Operations</span>
                <span className="text-sm font-medium">156 refs</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
