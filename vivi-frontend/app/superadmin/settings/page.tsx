"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, Globe, Shield, Database, Server } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SuperAdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState("")

  const [platformSettings, setPlatformSettings] = useState({
    platformName: "VIVI Platform",
    platformUrl: "https://platform.vivi.com",
    supportEmail: "support@vivi.com",
    maxOrganizations: 1000,
    defaultPlan: "starter",
    maintenanceMode: false,
  })

  const [securitySettings, setSecuritySettings] = useState({
    enforceSSL: true,
    enableRateLimit: true,
    maxLoginAttempts: 5,
    sessionTimeout: 720,
    enableAuditLog: true,
    requireMFA: false,
    allowedCountries: "all",
    ipWhitelist: "",
  })

  const [systemSettings, setSystemSettings] = useState({
    maxFileSize: 10,
    enableBackups: true,
    backupFrequency: "daily",
    retentionPeriod: 90,
    enableMonitoring: true,
    logLevel: "info",
    enableCaching: true,
    cacheTimeout: 3600,
  })

  const [integrationSettings, setIntegrationSettings] = useState({
    enableWebhooks: true,
    webhookTimeout: 30,
    enableAPIAccess: true,
    rateLimitPerHour: 1000,
    enableSSOIntegration: false,
    enableSlackIntegration: false,
    slackWebhookUrl: "",
  })

  const handleSaveSettings = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setSuccess("Platform settings saved successfully!")
      setIsLoading(false)
      setTimeout(() => setSuccess(""), 3000)
    }, 1000)
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
          <h1 className="text-xl font-semibold">Platform Settings</h1>
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

        {/* Platform Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Platform Configuration
            </CardTitle>
            <CardDescription>Global platform settings and configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="platformName">Platform Name</Label>
                <Input
                  id="platformName"
                  value={platformSettings.platformName}
                  onChange={(e) => setPlatformSettings({ ...platformSettings, platformName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="platformUrl">Platform URL</Label>
                <Input
                  id="platformUrl"
                  value={platformSettings.platformUrl}
                  onChange={(e) => setPlatformSettings({ ...platformSettings, platformUrl: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="supportEmail">Support Email</Label>
                <Input
                  id="supportEmail"
                  type="email"
                  value={platformSettings.supportEmail}
                  onChange={(e) => setPlatformSettings({ ...platformSettings, supportEmail: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxOrgs">Max Organizations</Label>
                <Input
                  id="maxOrgs"
                  type="number"
                  value={platformSettings.maxOrganizations}
                  onChange={(e) =>
                    setPlatformSettings({ ...platformSettings, maxOrganizations: Number.parseInt(e.target.value) })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="defaultPlan">Default Plan</Label>
                <Select
                  value={platformSettings.defaultPlan}
                  onValueChange={(value) => setPlatformSettings({ ...platformSettings, defaultPlan: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="starter">Starter</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between pt-6">
                <div>
                  <Label htmlFor="maintenanceMode" className="font-medium">
                    Maintenance Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">Temporarily disable platform access</p>
                </div>
                <Switch
                  id="maintenanceMode"
                  checked={platformSettings.maintenanceMode}
                  onCheckedChange={(checked) => setPlatformSettings({ ...platformSettings, maintenanceMode: checked })}
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
            <CardDescription>Platform-wide security policies and restrictions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enforceSSL" className="font-medium">
                  Enforce SSL/HTTPS
                </Label>
                <p className="text-sm text-muted-foreground">Require secure connections for all traffic</p>
              </div>
              <Switch
                id="enforceSSL"
                checked={securitySettings.enforceSSL}
                onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, enforceSSL: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableRateLimit" className="font-medium">
                  Enable Rate Limiting
                </Label>
                <p className="text-sm text-muted-foreground">Protect against API abuse and DDoS attacks</p>
              </div>
              <Switch
                id="enableRateLimit"
                checked={securitySettings.enableRateLimit}
                onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, enableRateLimit: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableAuditLog" className="font-medium">
                  Enable Audit Logging
                </Label>
                <p className="text-sm text-muted-foreground">Track all administrative actions and changes</p>
              </div>
              <Switch
                id="enableAuditLog"
                checked={securitySettings.enableAuditLog}
                onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, enableAuditLog: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="requireMFA" className="font-medium">
                  Require Multi-Factor Authentication
                </Label>
                <p className="text-sm text-muted-foreground">Enforce MFA for all admin and super admin accounts</p>
              </div>
              <Switch
                id="requireMFA"
                checked={securitySettings.requireMFA}
                onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, requireMFA: checked })}
              />
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                <Input
                  id="maxLoginAttempts"
                  type="number"
                  value={securitySettings.maxLoginAttempts}
                  onChange={(e) =>
                    setSecuritySettings({ ...securitySettings, maxLoginAttempts: Number.parseInt(e.target.value) })
                  }
                />
              </div>
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="ipWhitelist">IP Whitelist (Optional)</Label>
              <Textarea
                id="ipWhitelist"
                placeholder="192.168.1.0/24, 10.0.0.0/8"
                value={securitySettings.ipWhitelist}
                onChange={(e) => setSecuritySettings({ ...securitySettings, ipWhitelist: e.target.value })}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5" />
              System Configuration
            </CardTitle>
            <CardDescription>System performance and operational settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableBackups" className="font-medium">
                  Enable Automated Backups
                </Label>
                <p className="text-sm text-muted-foreground">Automatically backup platform data</p>
              </div>
              <Switch
                id="enableBackups"
                checked={systemSettings.enableBackups}
                onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, enableBackups: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableMonitoring" className="font-medium">
                  Enable System Monitoring
                </Label>
                <p className="text-sm text-muted-foreground">Monitor system health and performance</p>
              </div>
              <Switch
                id="enableMonitoring"
                checked={systemSettings.enableMonitoring}
                onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, enableMonitoring: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableCaching" className="font-medium">
                  Enable Caching
                </Label>
                <p className="text-sm text-muted-foreground">Improve performance with intelligent caching</p>
              </div>
              <Switch
                id="enableCaching"
                checked={systemSettings.enableCaching}
                onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, enableCaching: checked })}
              />
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
                <Input
                  id="maxFileSize"
                  type="number"
                  value={systemSettings.maxFileSize}
                  onChange={(e) =>
                    setSystemSettings({ ...systemSettings, maxFileSize: Number.parseInt(e.target.value) })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="retentionPeriod">Data Retention (days)</Label>
                <Input
                  id="retentionPeriod"
                  type="number"
                  value={systemSettings.retentionPeriod}
                  onChange={(e) =>
                    setSystemSettings({ ...systemSettings, retentionPeriod: Number.parseInt(e.target.value) })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="backupFrequency">Backup Frequency</Label>
                <Select
                  value={systemSettings.backupFrequency}
                  onValueChange={(value) => setSystemSettings({ ...systemSettings, backupFrequency: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="logLevel">Log Level</Label>
                <Select
                  value={systemSettings.logLevel}
                  onValueChange={(value) => setSystemSettings({ ...systemSettings, logLevel: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="warn">Warning</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="debug">Debug</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integration Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Integrations & API
            </CardTitle>
            <CardDescription>External integrations and API configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableWebhooks" className="font-medium">
                  Enable Webhooks
                </Label>
                <p className="text-sm text-muted-foreground">Allow organizations to configure webhook endpoints</p>
              </div>
              <Switch
                id="enableWebhooks"
                checked={integrationSettings.enableWebhooks}
                onCheckedChange={(checked) =>
                  setIntegrationSettings({ ...integrationSettings, enableWebhooks: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableAPIAccess" className="font-medium">
                  Enable API Access
                </Label>
                <p className="text-sm text-muted-foreground">Allow programmatic access to platform features</p>
              </div>
              <Switch
                id="enableAPIAccess"
                checked={integrationSettings.enableAPIAccess}
                onCheckedChange={(checked) =>
                  setIntegrationSettings({ ...integrationSettings, enableAPIAccess: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableSSOIntegration" className="font-medium">
                  Enable SSO Integration
                </Label>
                <p className="text-sm text-muted-foreground">Support SAML and OAuth single sign-on</p>
              </div>
              <Switch
                id="enableSSOIntegration"
                checked={integrationSettings.enableSSOIntegration}
                onCheckedChange={(checked) =>
                  setIntegrationSettings({ ...integrationSettings, enableSSOIntegration: checked })
                }
              />
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="webhookTimeout">Webhook Timeout (seconds)</Label>
                <Input
                  id="webhookTimeout"
                  type="number"
                  value={integrationSettings.webhookTimeout}
                  onChange={(e) =>
                    setIntegrationSettings({ ...integrationSettings, webhookTimeout: Number.parseInt(e.target.value) })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rateLimitPerHour">API Rate Limit (per hour)</Label>
                <Input
                  id="rateLimitPerHour"
                  type="number"
                  value={integrationSettings.rateLimitPerHour}
                  onChange={(e) =>
                    setIntegrationSettings({
                      ...integrationSettings,
                      rateLimitPerHour: Number.parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
