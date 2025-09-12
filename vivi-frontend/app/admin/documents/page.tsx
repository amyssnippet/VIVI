"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Search,
  Upload,
  FileText,
  File,
  ImageIcon,
  MoreVertical,
  Download,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  Filter,
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

interface Document {
  id: string
  name: string
  type: "pdf" | "doc" | "txt" | "image"
  size: string
  uploadDate: Date
  uploadedBy: string
  category: string
  status: "active" | "processing" | "archived"
  description?: string
}

export default function AdminDocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [isUploadOpen, setIsUploadOpen] = useState(false)

  const documents: Document[] = [
    {
      id: "1",
      name: "Employee Handbook 2024.pdf",
      type: "pdf",
      size: "2.4 MB",
      uploadDate: new Date("2024-12-15T10:30:00"),
      uploadedBy: "Sarah Johnson",
      category: "HR Policies",
      status: "active",
      description: "Complete employee handbook with updated policies and procedures",
    },
    {
      id: "2",
      name: "IT Security Guidelines.docx",
      type: "doc",
      size: "1.8 MB",
      uploadDate: new Date("2024-12-14T14:15:00"),
      uploadedBy: "Mike Chen",
      category: "IT Policies",
      status: "active",
      description: "Security protocols and best practices for all employees",
    },
    {
      id: "3",
      name: "Expense Report Template.pdf",
      type: "pdf",
      size: "456 KB",
      uploadDate: new Date("2024-12-13T09:45:00"),
      uploadedBy: "Emma Wilson",
      category: "Finance",
      status: "active",
      description: "Standard template for monthly expense reporting",
    },
    {
      id: "4",
      name: "Office Floor Plan.png",
      type: "image",
      size: "3.2 MB",
      uploadDate: new Date("2024-12-12T16:20:00"),
      uploadedBy: "David Brown",
      category: "Facilities",
      status: "processing",
      description: "Updated office layout with new seating arrangements",
    },
    {
      id: "5",
      name: "Remote Work Policy.txt",
      type: "txt",
      size: "24 KB",
      uploadDate: new Date("2024-12-11T11:00:00"),
      uploadedBy: "Sarah Johnson",
      category: "HR Policies",
      status: "archived",
      description: "Guidelines for remote work arrangements and expectations",
    },
  ]

  const categories = ["HR Policies", "IT Policies", "Finance", "Facilities", "Legal", "Operations"]

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || doc.type === filterType
    const matchesCategory = filterCategory === "all" || doc.category === filterCategory

    return matchesSearch && matchesType && matchesCategory
  })

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-5 h-5 text-red-500" />
      case "doc":
        return <File className="w-5 h-5 text-blue-500" />
      case "txt":
        return <FileText className="w-5 h-5 text-gray-500" />
      case "image":
        return <ImageIcon className="w-5 h-5 text-green-500" />
      default:
        return <File className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
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
        <Link href="/admin/dashboard">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="flex-1">
          <h1 className="text-xl font-semibold">Document Management</h1>
        </div>

        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Upload className="w-4 h-4" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
              <DialogDescription>Add a new document to your organization's knowledge base.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file">Select File</Label>
                <Input id="file" type="file" accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg" />
                <p className="text-xs text-muted-foreground">
                  Supported formats: PDF, DOC, DOCX, TXT, PNG, JPG (Max 10MB)
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea id="description" placeholder="Brief description of the document..." rows={3} />
              </div>
              <div className="flex gap-2 pt-4">
                <Button className="flex-1">Upload Document</Button>
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsUploadOpen(false)}>
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
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-32">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="doc">Document</SelectItem>
                <SelectItem value="txt">Text</SelectItem>
                <SelectItem value="image">Image</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Total Documents</span>
              </div>
              <p className="text-2xl font-bold">{documents.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm text-muted-foreground">Active</span>
              </div>
              <p className="text-2xl font-bold">{documents.filter((d) => d.status === "active").length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <span className="text-sm text-muted-foreground">Processing</span>
              </div>
              <p className="text-2xl font-bold">{documents.filter((d) => d.status === "processing").length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">This Week</span>
              </div>
              <p className="text-2xl font-bold">12</p>
            </CardContent>
          </Card>
        </div>

        {/* Documents List */}
        <Card>
          <CardHeader>
            <CardTitle>Organization Documents</CardTitle>
            <CardDescription>Manage your knowledge base documents and files</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredDocuments.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No documents found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
                </div>
              ) : (
                filteredDocuments.map((document) => (
                  <div
                    key={document.id}
                    className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-shrink-0">{getFileIcon(document.type)}</div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold truncate">{document.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {document.category}
                        </Badge>
                        <Badge className={`text-xs ${getStatusColor(document.status)}`}>{document.status}</Badge>
                      </div>
                      {document.description && (
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{document.description}</p>
                      )}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <File className="w-3 h-3" />
                          {document.size}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {document.uploadedBy}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {document.uploadDate.toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                        <Eye className="w-3 h-3" />
                        View
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Document
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Details
                          </DropdownMenuItem>
                          {document.status === "active" ? (
                            <DropdownMenuItem>
                              <FileText className="w-4 h-4 mr-2" />
                              Archive
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>
                              <FileText className="w-4 h-4 mr-2" />
                              Activate
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
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
