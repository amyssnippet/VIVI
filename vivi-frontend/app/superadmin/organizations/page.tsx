"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Users,
  MessageSquare,
  Building2,
  Globe,
  Mail,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Organization {
  id: string
  name: string
  domain: string
  adminEmail: string
  userCount: number
  conversationCount: number
  plan: "starter" | "professional" | "enterprise"
  status: "active" | "suspended" | "trial" | "inactive"
  joinDate: Date
  lastActivity: Date
  monthlyUsage: number
  logo?: string
}

export default function SuperAdminOrganizationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterPlan, setFilterPlan] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isAddOrgOpen, setIsAddOrgOpen] = useState(false)

  const organizations: Organization[] = [
    {
      id: "1",
      name: "VIVI Corporation",
      domain: "vivi.com",
      adminEmail: "admin@vivi.com",
      userCount: 847,
      conversationCount: 12450,
      plan: "enterprise",
      status: "active",
      joinDate: new Date("2023-01-15"),
      lastActivity: new Date("2024-12-15T16:30:00"),
      monthlyUsage: 89.2,
    },
    {
      id: "2",
      name: "TechCorp Solutions",
      domain: "techcorp.com",
      adminEmail: "it@techcorp.com",
      userCount: 245,
      conversationCount: 3456,
      plan: "professional",
      status: "active",
      joinDate: new Date("2024-03-10"),
      lastActivity: new Date("2024-12-15T14:15:00"),
      monthlyUsage: 67.8,
    },
    {
      id: "3",
      name: "Global Industries",
      domain: "globalind.com",
      adminEmail: "admin@globalind.com",
      userCount: 189,
      conversationCount: 2134,
      plan: "professional",
      status: "active",
      joinDate: new Date("2024-05-22"),
      lastActivity: new Date("2024-12-14T11:45:00"),
      monthlyUsage: 45.3,
    },
    {
      id: "4",
      name: "StartupXYZ",
      domain: "startupxyz.com",
      adminEmail: "founder@startupxyz.com",
      userCount: 23,
      conversationCount: 156,
      plan: "starter",
      status: "trial",
      joinDate: new Date("2024-12-05"),
      lastActivity: new Date("2024-12-13T09:30:00"),
      monthlyUsage: 12.7,
    },
    {
      id: "5",
      name: "Enterprise Solutions",
      domain: "entsol.com",
      adminEmail: "admin@entsol.com",
      userCount: 623,
      conversationCount: 9876,
      plan: "enterprise",
      status: "active",
      joinDate: new Date("2023-08-12"),
      lastActivity: new Date("2024-12-15T13:20:00"),
      monthlyUsage: 78.9,
    },
    {
      id: "6",
      name: "Inactive Corp",
      domain: "inactive.com",
      adminEmail: "admin@inactive.com",
      userCount: 45,
      conversationCount: 234,
      plan: "professional",
      status: "suspended",
      joinDate: new Date("2024-02-18"),
      lastActivity: new Date("2024-11-20T10:15:00"),
      monthlyUsage: 0,
    },
  ]

  const filteredOrganizations = organizations.filter((org) => {
    const matchesSearch =
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.adminEmail.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPlan = filterPlan === "all" || org.plan === filterPlan
    const matchesStatus = filterStatus === "all" || org.status === filterStatus

    return matchesSearch && matchesPlan && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "trial":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "suspended":
        return "bg-red-100 text-red-800 border-red-200"
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "enterprise":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "professional":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "starter":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
        <Link href="/superadmin/dashboard">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="flex-1">
          <h1 className="text-xl font-semibold">Organization Management</h1>
        </div>

        <Dialog open={isAddOrgOpen} onOpenChange={setIsAddOrgOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Organization
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Organization</DialogTitle>
              <DialogDescription>Add a new organization to the VIVI platform.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="orgName">Organization Name</Label>
                <Input id="orgName" placeholder="Acme Corporation" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="domain">Domain</Label>
                <Input id="domain" placeholder="acme.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adminEmail">Admin Email</Label>
                <Input id="adminEmail" type="email" placeholder="admin@acme.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="plan">Plan</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="starter">Starter</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea id="description" placeholder="Brief description of the organization..." rows={3} />
              </div>
              <div className="flex gap-2 pt-4">
                <Button className="flex-1">Create Organization</Button>
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsAddOrgOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      <div className="container mx-auto p-6 max-w-7xl">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search organizations by name, domain, or admin email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Select value={filterPlan} onValueChange={setFilterPlan}>
              <SelectTrigger className="w-32">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="starter">Starter</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="trial">Trial</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Total Organizations</span>
              </div>
              <p className="text-2xl font-bold">{organizations.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm text-muted-foreground">Active</span>
              </div>
              <p className="text-2xl font-bold">{organizations.filter((o) => o.status === "active").length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="text-sm text-muted-foreground">Trial</span>
              </div>
              <p className="text-2xl font-bold">{organizations.filter((o) => o.status === "trial").length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Total Users</span>
              </div>
              <p className="text-2xl font-bold">
                {organizations.reduce((sum, org) => sum + org.userCount, 0).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Organizations List */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Organizations</CardTitle>
            <CardDescription>Manage all organizations on the VIVI platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredOrganizations.length === 0 ? (
                <div className="text-center py-8">
                  <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No organizations found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
                </div>
              ) : (
                filteredOrganizations.map((org) => (
                  <div
                    key={org.id}
                    className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={org.logo || "/placeholder.svg"} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {org.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{org.name}</h3>
                        <Badge className={`text-xs ${getPlanColor(org.plan)}`}>{org.plan}</Badge>
                        <Badge className={`text-xs ${getStatusColor(org.status)}`}>{org.status}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          {org.domain}
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {org.adminEmail}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {org.userCount} users
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          {org.conversationCount.toLocaleString()} conversations
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right text-sm">
                        <p className="font-medium">{org.monthlyUsage}%</p>
                        <p className="text-muted-foreground">usage</p>
                      </div>

                      <div className="text-right text-sm">
                        <p className="font-medium">Last active</p>
                        <p className="text-muted-foreground">
                          {org.lastActivity.toLocaleDateString()} at{" "}
                          {org.lastActivity.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Organization
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Users className="w-4 h-4 mr-2" />
                            Manage Users
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageSquare className="w-4 h-4 mr-2" />
                            View Analytics
                          </DropdownMenuItem>
                          {org.status === "active" ? (
                            <DropdownMenuItem>
                              <Building2 className="w-4 h-4 mr-2" />
                              Suspend Organization
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>
                              <Building2 className="w-4 h-4 mr-2" />
                              Activate Organization
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Organization
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
