"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  FolderOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProjects } from "@/hooks/useProjects";
import { formatDate } from "@/lib/utils";

export default function ProjectsPage() {
  const { projects, loading, deleteProject, duplicateProject } = useProjects();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const filtered = projects.filter(
    (p) =>
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase())
  );

  const statusColors = {
    draft: "secondary",
    active: "default",
    completed: "success",
    archived: "outline",
  } as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Projects</h1>
          <p className="mt-1 text-muted">Manage your startup projects and generated plans.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <Input
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="space-y-3 animate-pulse">
                  <div className="h-4 w-3/4 rounded-full bg-primary-100/50" />
                  <div className="h-3 w-1/2 rounded-full bg-primary-100/30" />
                  <div className="h-3 w-full rounded-full bg-primary-100/20" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <FolderOpen className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">No projects yet</h3>
            <p className="mt-2 text-sm text-muted">
              Go to AI Workspace to generate your first startup plan.
            </p>
            <Button className="mt-6">
              <Plus className="mr-2 h-4 w-4" />
              Create Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <Card key={project.id} className="group relative">
              <CardContent className="p-6">
                {/* Menu */}
                <div className="absolute right-4 top-4">
                  <button
                    onClick={() => setMenuOpen(menuOpen === project.id ? null : project.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full opacity-0 transition-opacity group-hover:opacity-100 hover:bg-primary-50"
                  >
                    <MoreVertical className="h-4 w-4 text-muted" />
                  </button>
                  {menuOpen === project.id && (
                    <div className="absolute right-0 top-10 z-10 w-40 rounded-2xl border border-primary-100/50 bg-white p-1 shadow-lg">
                      <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-primary-50">
                        <Edit className="h-3.5 w-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => duplicateProject(project)}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-primary-50"
                      >
                        <Copy className="h-3.5 w-3.5" /> Duplicate
                      </button>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    </div>
                  )}
                </div>

                <Badge variant={statusColors[project.status] || "secondary"} className="mb-3">
                  {project.status}
                </Badge>
                <h3 className="text-lg font-semibold text-foreground line-clamp-1">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-muted line-clamp-2">
                  {project.description || project.idea}
                </p>
                <p className="mt-4 text-xs text-muted">
                  {formatDate(project.created_at)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  );
}
