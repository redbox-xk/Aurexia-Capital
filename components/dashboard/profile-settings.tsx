'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Mail, Shield, Bell } from 'lucide-react'

interface ProfileSettingsProps {
  user: any
}

export function ProfileSettings({ user }: ProfileSettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your profile and security preferences</p>
      </div>

      <div className="grid gap-6">
        {/* Profile Section */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium">Email Address</label>
              <p className="text-lg font-semibold mt-2">{user?.email}</p>
              <Badge variant="outline" className="mt-2">Verified</Badge>
            </div>

            <div className="pt-4">
              <Button variant="outline">Change Email</Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Section */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security
            </CardTitle>
            <CardDescription>Keep your account secure</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Enable Two-Factor Authentication
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Manage Sessions
            </Button>
          </CardContent>
        </Card>

        {/* Notifications Section */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
            <CardDescription>Choose how we contact you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-border/50 rounded">
              <label className="font-medium">Email Notifications</label>
              <Badge variant="default">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border border-border/50 rounded">
              <label className="font-medium">Transaction Alerts</label>
              <Badge variant="default">Enabled</Badge>
            </div>
            <Button variant="outline" className="w-full">
              Manage Preferences
            </Button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" className="w-full">
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
