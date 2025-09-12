"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MessageSquare,
  History,
  User,
  Bell,
  Search,
  TrendingUp,
  Clock,
  FileText,
  Settings,
  LogOut,
  Menu,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

export default function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const recentChats = [
    { id: 1, title: "How to submit expense reports?", time: "2 hours ago", status: "resolved" },
    { id: 2, title: "Company holiday schedule", time: "1 day ago", status: "ongoing" },
    { id: 3, title: "IT support request", time: "3 days ago", status: "resolved" },
  ]

  const announcements = [
    { id: 1, title: "New HR Policy Updates", date: "Dec 15, 2024", priority: "high" },
    { id: 2, title: "Office Holiday Party", date: "Dec 20, 2024", priority: "medium" },
    { id: 3, title: "System Maintenance Notice", date: "Dec 22, 2024", priority: "low" },
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
            <span className="text-xl font-bold text-sidebar-foreground">VIVI</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <Link href="/dashboard">
              <Button
                variant="secondary"
                className="w-full justify-start gap-3 bg-sidebar-accent text-sidebar-accent-foreground"
              >
                <TrendingUp className="w-4 h-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/chat">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <MessageSquare className="w-4 h-4" />
                Chat Assistant
              </Button>
            </Link>
            <Link href="/history">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <History className="w-4 h-4" />
                Chat History
              </Button>
            </Link>
            <Link href="/profile">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <User className="w-4 h-4" />
                Profile
              </Button>
            </Link>
          </nav>

          {/* User Menu */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/diverse-user-avatars.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
                <p className="text-xs text-sidebar-foreground/70 truncate">john@company.com</p>
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
              <Input placeholder="Search conversations, documents..." className="pl-10 bg-muted/50" />
            </div>
          </div>

          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs bg-destructive">
              3
            </Badge>
          </Button>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 space-y-6">
          {/* Welcome Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-balance">Welcome back, John!</h1>
              <p className="text-muted-foreground mt-1">Here's what's happening with your workspace today.</p>
            </div>
            <Link href="/chat">
              <Button className="gap-2">
                <MessageSquare className="w-4 h-4" />
                Start New Chat
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+3 from last week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resolved Queries</CardTitle>
                <Clock className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">75% success rate</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Documents Accessed</CardTitle>
                <FileText className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Conversations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Recent Conversations
                </CardTitle>
                <CardDescription>Your latest chat interactions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentChats.map((chat) => (
                  <div
                    key={chat.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{chat.title}</p>
                      <p className="text-sm text-muted-foreground">{chat.time}</p>
                    </div>
                    <Badge variant={chat.status === "resolved" ? "default" : "secondary"}>{chat.status}</Badge>
                  </div>
                ))}
                <Separator />
                <Link href="/history">
                  <Button variant="ghost" className="w-full">
                    View All Conversations
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Announcements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Announcements
                </CardTitle>
                <CardDescription>Latest updates and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {announcements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        announcement.priority === "high"
                          ? "bg-destructive"
                          : announcement.priority === "medium"
                            ? "bg-chart-4"
                            : "bg-muted-foreground"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{announcement.title}</p>
                      <p className="text-sm text-muted-foreground">{announcement.date}</p>
                    </div>
                  </div>
                ))}
                <Separator />
                <Button variant="ghost" className="w-full">
                  View All Announcements
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used features and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/chat">
                  <Button variant="outline" className="h-20 flex-col gap-2 w-full bg-transparent">
                    <MessageSquare className="w-6 h-6" />
                    <span className="text-sm">New Chat</span>
                  </Button>
                </Link>
                <Link href="/history">
                  <Button variant="outline" className="h-20 flex-col gap-2 w-full bg-transparent">
                    <History className="w-6 h-6" />
                    <span className="text-sm">View History</span>
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="outline" className="h-20 flex-col gap-2 w-full bg-transparent">
                    <User className="w-6 h-6" />
                    <span className="text-sm">Edit Profile</span>
                  </Button>
                </Link>
                <Button variant="outline" className="h-20 flex-col gap-2 w-full bg-transparent">
                  <FileText className="w-6 h-6" />
                  <span className="text-sm">Documents</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
