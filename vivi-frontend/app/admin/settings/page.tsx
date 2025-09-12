"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, Globe, MessageSquare, Shield, Bell } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState("")

  const [organizationSettings, setOrganizationSettings] = useState({
    name: "VIVI Corporation",
    description: "Leading enterprise solutions provider",
    website: "https://vivi.com",
    supportEmail: "support@vivi.com",
    timezone: "America/New_York",
    language: "English",
  })

  const [chatbotSettings, setChatbotSettings] = useState({
    welcomeMessage: "Hello! I'm your VIVI assistant. How can I help you today?",
    fallbackMessage: "I'm sorry, I don't have information about that. Please contact support for assistance.",
    maxConversationLength: 50,
    responseTimeout: 30,
    enableMultilingual: true,
    enableFileUploads: true,
    enableVoiceInput: false,
  })

  const [securitySettings, setSecuritySettings] = useState({
    requireEmailVerification: true,
    enableTwoFactor: false,
    sessionTimeout: 480,
    passwordMinLength: 8,
    enableAuditLog: true,
    restrictDomains: false,
    allowedDomains: "vivi.com, company.com",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    slackIntegration: false,
    webhookUrl: "",
    dailyReports: true,
    weeklyReports: true,
    alertThreshold: 10,
  })

  const handleSaveSettings = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setSuccess("Settings saved successfully!")
      setIsLoading(false)
      setTimeout(() => setSuccess(""), 3000)
    }, 1000)
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
          <h1 className="text-xl font-semibold">Organization Settings</h1>
        </div>

        <Button onClick={handleSaveSettings} disabled={isLoading} className="gap-2">
          <Save className="w-4 h-4" />
          {isLoading ? "Saving..." : "Save All Changes"}
        </Button>
      </header>

      <div className="container mx-auto p-6 max-w-4xl space-y-6">
        {success && (
          <Alert className="border-green-200 bg-green-50">
            <Save className="w-4 h-4 text-green-600" />
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        {/* Organization Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Organization Information
            </CardTitle>
            <CardDescription>Basic information about your organization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="orgName">Organization Name</Label>
                <Input
                  id="orgName"
                  value={organizationSettings.name}
                  onChange={(e) => setOrganizationSettings({ ...organizationSettings, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={organizationSettings.website}
                  onChange={(e) => setOrganizationSettings({ ...organizationSettings, website: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={organizationSettings.description}
                onChange={(e) => setOrganizationSettings({ ...organizationSettings, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="supportEmail">Support Email</Label>
                <Input
                  id="supportEmail"
                  type="email"
                  value={organizationSettings.supportEmail}
                  onChange={(e) => setOrganizationSettings({ ...organizationSettings, supportEmail: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select
                  value={organizationSettings.timezone}
                  onValueChange={(value) => setOrganizationSettings({ ...organizationSettings, timezone: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                    <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                    <SelectItem value="Europe/London">London (GMT)</SelectItem>
                    <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                    <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chatbot Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Chatbot Configuration
            </CardTitle>
            <CardDescription>Customize your AI assistant behavior and responses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="welcomeMessage">Welcome Message</Label>
              <Textarea
                id="welcomeMessage"
                value={chatbotSettings.welcomeMessage}
                onChange={(e) => setChatbotSettings({ ...chatbotSettings, welcomeMessage: e.target.value })}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fallbackMessage">Fallback Message</Label>
              <Textarea
                id="fallbackMessage"
                value={chatbotSettings.fallbackMessage}
                onChange={(e) => setChatbotSettings({ ...chatbotSettings, fallbackMessage: e.target.value })}
                rows={2}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxLength">Max Conversation Length</Label>
                <Input
                  id="maxLength"
                  type="number"
                  value={chatbotSettings.maxConversationLength}
                  onChange={(e) =>
                    setChatbotSettings({ ...chatbotSettings, maxConversationLength: Number.parseInt(e.target.value) })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeout">Response Timeout (seconds)</Label>
                <Input
                  id="timeout"
                  type="number"
                  value={chatbotSettings.responseTimeout}
                  onChange={(e) =>
                    setChatbotSettings({ ...chatbotSettings, responseTimeout: Number.parseInt(e.target.value) })
                  }
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="multilingual" className="font-medium">
                    Enable Multilingual Support
                  </Label>
                  <p className="text-sm text-muted-foreground">Allow conversations in multiple languages</p>
                </div>
                <Switch
                  id="multilingual"
                  checked={chatbotSettings.enableMultilingual}
                  onCheckedChange={(checked) => setChatbotSettings({ ...chatbotSettings, enableMultilingual: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="fileUploads" className="font-medium">
                    Enable File Uploads
                  </Label>
                  <p className="text-sm text-muted-foreground">Allow users to upload files in conversations</p>
                </div>
                <Switch
                  id="fileUploads"
                  checked={chatbotSettings.enableFileUploads}
                  onCheckedChange={(checked) => setChatbotSettings({ ...chatbotSettings, enableFileUploads: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="voiceInput" className="font-medium">
                    Enable Voice Input
                  </Label>
                  <p className="text-sm text-muted-foreground">Allow voice messages and speech-to-text</p>
                </div>
                <Switch
                  id="voiceInput"
                  checked={chatbotSettings.enableVoiceInput}
                  onCheckedChange={(checked) => setChatbotSettings({ ...chatbotSettings, enableVoiceInput: checked })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security & Access Control
            </CardTitle>
            <CardDescription>Manage security policies and access restrictions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailVerification" className="font-medium">
                  Require Email Verification
                </Label>
                <p className="text-sm text-muted-foreground">
                  Users must verify their email before accessing the system
                </p>
              </div>
              <Switch
                id="emailVerification"
                checked={securitySettings.requireEmailVerification}
                onCheckedChange={(checked) =>
                  setSecuritySettings({ ...securitySettings, requireEmailVerification: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="twoFactor" className="font-medium">
                  Enable Two-Factor Authentication
                </Label>
                <p className="text-sm text-muted-foreground">Require 2FA for all admin accounts</p>
              </div>
              <Switch
                id="twoFactor"
                checked={securitySettings.enableTwoFactor}
                onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, enableTwoFactor: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auditLog" className="font-medium">
                  Enable Audit Logging
                </Label>
                <p className="text-sm text-muted-foreground">Track all administrative actions and changes</p>
              </div>
              <Switch
                id="auditLog"
                checked={securitySettings.enableAuditLog}
                onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, enableAuditLog: checked })}
              />
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={securitySettings.sessionTimeout}
                  onChange={(e) =>
                    setSecuritySettings({ ...securitySettings, sessionTimeout: Number.parseInt(e.target.value) })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passwordLength">Minimum Password Length</Label>
                <Input
                  id="passwordLength"
                  type="number"
                  value={securitySettings.passwordMinLength}
                  onChange={(e) =>
                    setSecuritySettings({ ...securitySettings, passwordMinLength: Number.parseInt(e.target.value) })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="restrictDomains" className="font-medium">
                  Restrict Email Domains
                </Label>
                <Switch
                  id="restrictDomains"
                  checked={securitySettings.restrictDomains}
                  onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, restrictDomains: checked })}
                />
              </div>
              {securitySettings.restrictDomains && (
                <Input
                  placeholder="example.com, company.org"
                  value={securitySettings.allowedDomains}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, allowedDomains: e.target.value })}
                />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications & Integrations
            </CardTitle>
            <CardDescription>Configure alerts and external integrations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifs" className="font-medium">
                  Email Notifications
                </Label>
                <p className="text-sm text-muted-foreground">Send email alerts for important events</p>
              </div>
              <Switch
                id="emailNotifs"
                checked={notificationSettings.emailNotifications}
                onCheckedChange={(checked) =>
                  setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dailyReports" className="font-medium">
                  Daily Reports
                </Label>
                <p className="text-sm text-muted-foreground">Receive daily activity summaries</p>
              </div>
              <Switch
                id="dailyReports"
                checked={notificationSettings.dailyReports}
                onCheckedChange={(checked) =>
                  setNotificationSettings({ ...notificationSettings, dailyReports: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="weeklyReports" className="font-medium">
                  Weekly Reports
                </Label>
                <p className="text-sm text-muted-foreground">Receive weekly analytics reports</p>
              </div>
              <Switch
                id="weeklyReports"
                checked={notificationSettings.weeklyReports}
                onCheckedChange={(checked) =>
                  setNotificationSettings({ ...notificationSettings, weeklyReports: checked })
                }
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="alertThreshold">Alert Threshold (unresolved queries)</Label>
              <Input
                id="alertThreshold"
                type="number"
                value={notificationSettings.alertThreshold}
                onChange={(e) =>
                  setNotificationSettings({ ...notificationSettings, alertThreshold: Number.parseInt(e.target.value) })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="webhookUrl">Webhook URL (Optional)</Label>
              <Input
                id="webhookUrl"
                placeholder="https://your-webhook-url.com/endpoint"
                value={notificationSettings.webhookUrl}
                onChange={(e) => setNotificationSettings({ ...notificationSettings, webhookUrl: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
