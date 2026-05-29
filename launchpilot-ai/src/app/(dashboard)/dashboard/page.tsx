"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FolderOpen,
  Brain,
  Map,
  Zap,
  TrendingUp,
  Clock,
  ArrowRight,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "Total Projects", value: "12", icon: FolderOpen, change: "+3 this week" },
  { label: "AI Credits", value: "47/50", icon: Zap, change: "Resets in 5 days" },
  { label: "Roadmaps", value: "8", icon: Map, change: "+2 this month" },
  { label: "Success Rate", value: "94%", icon: TrendingUp, change: "+5% vs last month" },
];

const recentActivity = [
  { action: "Generated startup plan", project: "AI Fitness Coach", time: "2 hours ago" },
  { action: "Created roadmap", project: "SaaS Analytics", time: "5 hours ago" },
  { action: "Exported to PDF", project: "EdTech Platform", time: "1 day ago" },
  { action: "Updated project", project: "AI Fitness Coach", time: "2 days ago" },
  { action: "New project created", project: "FinTech App", time: "3 days ago" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Header */}
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Dashboard</h1>
          <p className="mt-1 text-muted">Welcome back! Here&apos;s your startup overview.</p>
        </div>
        <Button asChild>
          <Link href="/ai-workspace">
            <Plus className="mr-2 h-4 w-4" />
            New Generation
          </Link>
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <Badge variant="secondary">{stat.change}</Badge>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Quick Actions & Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/ai-workspace"
                className="flex items-center gap-3 rounded-2xl border border-primary-100/50 p-4 transition-all hover:bg-primary-50 hover:border-primary/20"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">AI Workspace</p>
                  <p className="text-xs text-muted">Generate plans</p>
                </div>
              </Link>
              <Link
                href="/roadmaps"
                className="flex items-center gap-3 rounded-2xl border border-primary-100/50 p-4 transition-all hover:bg-primary-50 hover:border-primary/20"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Map className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Roadmaps</p>
                  <p className="text-xs text-muted">Create timelines</p>
                </div>
              </Link>
              <Link
                href="/projects"
                className="flex items-center gap-3 rounded-2xl border border-primary-100/50 p-4 transition-all hover:bg-primary-50 hover:border-primary/20"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <FolderOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Projects</p>
                  <p className="text-xs text-muted">Manage all</p>
                </div>
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-3 rounded-2xl border border-primary-100/50 p-4 transition-all hover:bg-primary-50 hover:border-primary/20"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Upgrade</p>
                  <p className="text-xs text-muted">Get more credits</p>
                </div>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Activity</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/projects">
                  View all
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {activity.action}
                      </p>
                      <p className="text-xs text-muted">
                        {activity.project} &middot; {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
