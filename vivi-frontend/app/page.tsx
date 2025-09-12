import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Users, MessageSquare, BarChart3 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">V</span>
            </div>
            <span className="text-2xl font-bold text-foreground">VIVI</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge variant="secondary" className="mb-6">
          Enterprise Management Platform
        </Badge>
        <h1 className="text-5xl font-bold text-balance mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          Streamline Your Business Operations with VIVI
        </h1>
        <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
          A comprehensive multi-role platform designed for Super Admins, Admins, and Users to manage organizations,
          documents, analytics, and multilingual chat assistance.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/register">
            <Button size="lg" className="gap-2">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg">
              Sign In
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Powerful Features for Every Role</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From super admin oversight to user-friendly interfaces, VIVI provides the tools you need to succeed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardHeader>
              <Shield className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Super Admin Control</CardTitle>
              <CardDescription>
                Complete oversight of organizations, users, and system settings with advanced analytics.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardHeader>
              <Users className="w-10 h-10 text-secondary mb-2" />
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Efficiently manage users, roles, permissions, and organizational structures.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardHeader>
              <MessageSquare className="w-10 h-10 text-accent mb-2" />
              <CardTitle>Multilingual Chat</CardTitle>
              <CardDescription>
                AI-powered chat assistant with document integration and conversation history.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardHeader>
              <BarChart3 className="w-10 h-10 text-chart-1 mb-2" />
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>
                Comprehensive insights into usage patterns, performance metrics, and trends.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Role-based Access */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Built for Every Role</h2>
          <p className="text-muted-foreground text-lg">
            Tailored experiences for different user types and responsibilities.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Super Admin
              </CardTitle>
              <CardDescription>Global platform oversight and management</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Organization management</li>
                <li>• Global user oversight</li>
                <li>• System configuration</li>
                <li>• Platform analytics</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-accent"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Admin
              </CardTitle>
              <CardDescription>Organization-level management and control</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• User management</li>
                <li>• Document ingestion</li>
                <li>• Usage analytics</li>
                <li>• Organization settings</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-chart-1"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                User
              </CardTitle>
              <CardDescription>Streamlined interface for daily tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Chat assistance</li>
                <li>• Document access</li>
                <li>• Conversation history</li>
                <li>• Profile management</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">V</span>
              </div>
              <span className="font-semibold">VIVI</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2024 VIVI. Enterprise Management Platform.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
