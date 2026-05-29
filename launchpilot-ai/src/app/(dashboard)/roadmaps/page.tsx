"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Map, Sparkles, Loader2, Calendar, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Milestone } from "@/types";

export default function RoadmapsPage() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<{
    title: string;
    description: string;
    milestones: Milestone[];
  } | null>(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!idea.trim()) return;
    setLoading(true);
    setError("");
    setRoadmap(null);

    try {
      const res = await fetch("/api/ai/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate roadmap");
      }

      const data = await res.json();
      setRoadmap(data.roadmap);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Roadmap Generator</h1>
        <p className="mt-1 text-muted">
          Generate a detailed execution timeline for your startup.
        </p>
      </div>

      {/* Input */}
      <Card>
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
              <Map className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Your Startup Idea</h2>
              <p className="text-sm text-muted">Describe what you&apos;re building</p>
            </div>
          </div>

          <Textarea
            placeholder="I want to build a marketplace for local artisans to sell handmade goods..."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            className="min-h-[120px]"
          />

          <div className="mt-4 flex justify-end">
            <Button onClick={handleGenerate} disabled={loading || !idea.trim()} size="lg">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Roadmap
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Error */}
      {error && (
        <div className="rounded-2xl bg-red-50 border border-red-100 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center py-16">
          <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          <p className="mt-6 font-medium text-foreground">Creating your roadmap...</p>
          <p className="mt-2 text-sm text-muted">Building milestones and timelines</p>
        </div>
      )}

      {/* Results - Timeline */}
      {roadmap && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-xl font-bold text-foreground">{roadmap.title}</h2>
            <p className="mt-1 text-sm text-muted">{roadmap.description}</p>
          </div>

          {/* Timeline */}
          <div className="relative space-y-6 pl-8 before:absolute before:left-3 before:top-2 before:h-[calc(100%-16px)] before:w-0.5 before:bg-gradient-to-b before:from-primary before:to-primary-200">
            {roadmap.milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                <Card>
                  <CardHeader className="pb-3">
                    <div className="absolute -left-[25px] flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/25">
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-primary uppercase">
                        Month {milestone.month}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{milestone.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted mb-4">{milestone.description}</p>
                    
                    {milestone.tasks && milestone.tasks.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs font-medium text-foreground mb-2">Tasks</p>
                        <ul className="space-y-1.5">
                          {milestone.tasks.map((task, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted">
                              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {milestone.deliverables && milestone.deliverables.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-foreground mb-2">Deliverables</p>
                        <div className="flex flex-wrap gap-2">
                          {milestone.deliverables.map((d, i) => (
                            <span
                              key={i}
                              className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
