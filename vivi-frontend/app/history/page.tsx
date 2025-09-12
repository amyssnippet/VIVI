"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Search,
  Filter,
  Calendar,
  MessageSquare,
  Clock,
  MoreVertical,
  Download,
  Trash2,
  Eye,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Conversation {
  id: string
  title: string
  preview: string
  date: Date
  messageCount: number
  status: "resolved" | "ongoing" | "archived"
  language: string
  duration: string
}

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterLanguage, setFilterLanguage] = useState("all")

  const conversations: Conversation[] = [
    {
      id: "1",
      title: "How to submit expense reports?",
      preview: "I need help understanding the process for submitting monthly expense reports...",
      date: new Date("2024-12-15T10:30:00"),
      messageCount: 8,
      status: "resolved",
      language: "English",
      duration: "12 min",
    },
    {
      id: "2",
      title: "Company holiday schedule inquiry",
      preview: "Can you provide me with the updated holiday schedule for next year?",
      date: new Date("2024-12-14T14:15:00"),
      messageCount: 5,
      status: "resolved",
      language: "English",
      duration: "7 min",
    },
    {
      id: "3",
      title: "IT support - Password reset",
      preview: "I'm having trouble accessing my email account and need to reset my password...",
      date: new Date("2024-12-13T09:45:00"),
      messageCount: 12,
      status: "resolved",
      language: "English",
      duration: "18 min",
    },
    {
      id: "4",
      title: "Política de trabajo remoto",
      preview: "Necesito información sobre las nuevas políticas de trabajo remoto...",
      date: new Date("2024-12-12T16:20:00"),
      messageCount: 6,
      status: "ongoing",
      language: "Spanish",
      duration: "9 min",
    },
    {
      id: "5",
      title: "Benefits enrollment questions",
      preview: "I have questions about the health insurance options available during open enrollment...",
      date: new Date("2024-12-11T11:00:00"),
      messageCount: 15,
      status: "archived",
      language: "English",
      duration: "25 min",
    },
    {
      id: "6",
      title: "Project timeline clarification",
      preview: "Could you help me understand the timeline for the Q1 product launch?",
      date: new Date("2024-12-10T13:30:00"),
      messageCount: 9,
      status: "resolved",
      language: "English",
      duration: "14 min",
    },
  ]

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.preview.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || conv.status === filterStatus
    const matchesLanguage = filterLanguage === "all" || conv.language === filterLanguage

    return matchesSearch && matchesStatus && matchesLanguage
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200"
      case "ongoing":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "archived":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="flex-1">
          <h1 className="text-xl font-semibold">Conversation History</h1>
        </div>

        <Button variant="outline" className="gap-2 bg-transparent">
          <Download className="w-4 h-4" />
          Export All
        </Button>
      </header>

      <div className="container mx-auto p-6 max-w-6xl">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterLanguage} onValueChange={setFilterLanguage}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Spanish">Spanish</SelectItem>
                <SelectItem value="French">French</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Total</span>
              </div>
              <p className="text-2xl font-bold">{conversations.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm text-muted-foreground">Resolved</span>
              </div>
              <p className="text-2xl font-bold">{conversations.filter((c) => c.status === "resolved").length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="text-sm text-muted-foreground">Ongoing</span>
              </div>
              <p className="text-2xl font-bold">{conversations.filter((c) => c.status === "ongoing").length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Avg. Duration</span>
              </div>
              <p className="text-2xl font-bold">13m</p>
            </CardContent>
          </Card>
        </div>

        {/* Conversations List */}
        <div className="space-y-4">
          {filteredConversations.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No conversations found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
              </CardContent>
            </Card>
          ) : (
            filteredConversations.map((conversation) => (
              <Card key={conversation.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-10 h-10 mt-1">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <MessageSquare className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-semibold text-lg leading-tight">{conversation.title}</h3>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              View Conversation
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Export
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <p className="text-muted-foreground mb-3 line-clamp-2">{conversation.preview}</p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {conversation.date.toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {conversation.messageCount} messages
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {conversation.duration}
                        </div>
                        {conversation.language !== "English" && (
                          <Badge variant="outline" className="text-xs">
                            {conversation.language}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <Badge className={`text-xs ${getStatusColor(conversation.status)}`}>{conversation.status}</Badge>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Load More */}
        {filteredConversations.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline">Load More Conversations</Button>
          </div>
        )}
      </div>
    </div>
  )
}
