"use client";

import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import type { Project } from "@/types";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProjects(data);
    }
    setLoading(false);
  };

  const createProject = async (project: Partial<Project>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from("projects")
      .insert({ ...project, user_id: user.id })
      .select()
      .single();

    if (!error && data) {
      setProjects((prev) => [data, ...prev]);
      return data;
    }
    return null;
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    const { data, error } = await supabase
      .from("projects")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (!error && data) {
      setProjects((prev) => prev.map((p) => (p.id === id ? data : p)));
      return data;
    }
    return null;
  };

  const deleteProject = async (id: string) => {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (!error) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      return true;
    }
    return false;
  };

  const duplicateProject = async (project: Project) => {
    const newProject = {
      title: `${project.title} (Copy)`,
      description: project.description,
      idea: project.idea,
      status: "draft" as const,
      generated_plan: project.generated_plan,
    };
    return createProject(newProject);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    createProject,
    updateProject,
    deleteProject,
    duplicateProject,
    refetch: fetchProjects,
  };
}
