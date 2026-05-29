"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Mail, Calendar, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/hooks/useSupabase";

export default function ProfilePage() {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Profile</h1>
        <p className="mt-1 text-muted">Your account information.</p>
      </div>

      <Card>
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            {/* Avatar */}
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-400 text-2xl font-bold text-white shadow-glow">
              {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || "U"}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-foreground">
                {user?.user_metadata?.full_name || "User"}
              </h2>
              <p className="text-muted">{user?.email}</p>
              <Badge className="mt-2">Free Plan</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Mail className="h-4 w-4 text-primary" />
              Email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted">{user?.email || "No email set"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="h-4 w-4 text-primary" />
              Member Since
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted">
              {user?.created_at
                ? new Date(user.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })
                : "N/A"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Shield className="h-4 w-4 text-primary" />
              Account Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted mb-3">
              {user?.app_metadata?.provider === "email"
                ? "Email & Password"
                : `Signed in with ${user?.app_metadata?.provider || "email"}`}
            </p>
            <Button variant="outline" size="sm">
              Update Password
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="h-4 w-4 text-primary" />
              Account ID
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted font-mono break-all">
              {user?.id || "N/A"}
            </p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
