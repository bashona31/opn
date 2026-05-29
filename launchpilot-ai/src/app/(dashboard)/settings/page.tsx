"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, CreditCard, Key, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "subscription", label: "Subscription", icon: CreditCard },
  { id: "api", label: "API Settings", icon: Key },
  { id: "theme", label: "Appearance", icon: Palette },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Settings</h1>
        <p className="mt-1 text-muted">Manage your account preferences.</p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Tabs */}
        <nav className="flex lg:w-56 lg:flex-col gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted hover:bg-primary-50 hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden lg:inline">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="flex-1">
          {activeTab === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Full Name</label>
                  <Input placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <Input type="email" placeholder="john@example.com" disabled />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Bio</label>
                  <Input placeholder="Tell us about yourself" />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          )}

          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {["Email notifications", "Push notifications", "Weekly digest", "Product updates"].map(
                  (item) => (
                    <div key={item} className="flex items-center justify-between rounded-2xl border border-primary-100/50 p-4">
                      <span className="text-sm font-medium text-foreground">{item}</span>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" className="peer sr-only" defaultChecked />
                        <div className="h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-primary transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full" />
                      </label>
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === "subscription" && (
            <Card>
              <CardHeader>
                <CardTitle>Subscription</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-primary-200/10 p-6">
                  <p className="text-sm text-muted">Current Plan</p>
                  <p className="text-2xl font-bold text-foreground">Free</p>
                  <p className="mt-1 text-sm text-muted">3 AI generations per month</p>
                </div>
                <Button>Upgrade to Pro</Button>
              </CardContent>
            </Card>
          )}

          {activeTab === "api" && (
            <Card>
              <CardHeader>
                <CardTitle>API Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">AI Model</label>
                  <Input value="gpt-4o-mini" disabled />
                  <p className="text-xs text-muted">Default model used for generation</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">API Key (Optional)</label>
                  <Input type="password" placeholder="sk-..." />
                  <p className="text-xs text-muted">Use your own OpenAI API key for unlimited generations</p>
                </div>
                <Button>Save Settings</Button>
              </CardContent>
            </Card>
          )}

          {activeTab === "theme" && (
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {["Light", "Dark", "System"].map((theme) => (
                    <button
                      key={theme}
                      className={`rounded-2xl border p-4 text-center text-sm font-medium transition-all ${
                        theme === "Light"
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-primary-100/50 text-muted hover:border-primary/20"
                      }`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </motion.div>
  );
}
