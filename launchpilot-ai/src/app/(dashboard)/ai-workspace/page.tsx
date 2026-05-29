"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Sparkles,
  Download,
  Copy,
  Check,
  Loader2,
  FileText,
  Target,
  Users,
  DollarSign,
  Code,
  Presentation,
  Map,
  TrendingUp,
  Lightbulb,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { StartupPlan } from "@/types";

const sectionIcons: Record<string, React.ElementType> = {
  startupSummary: Lightbulb,
  problemStatement: Target,
  solution: Rocket,
  targetAudience: Users,
  keyFeatures: Sparkles,
  revenueModel: DollarSign,
  competitorAnalysis: TrendingUp,
  marketingStrategy: Brain,
  mvpFeatures: Code,
  techStack: Code,
  investorPitch: Presentation,
  roadmap: Map,
};

const sectionLabels: Record<string, string> = {
  startupSummary: "Startup Summary",
  problemStatement: "Problem Statement",
  solution: "Solution",
  targetAudience: "Target Audience",
  keyFeatures: "Key Features",
  revenueModel: "Revenue Model",
  competitorAnalysis: "Competitor Analysis",
  marketingStrategy: "Marketing Strategy",
  mvpFeatures: "MVP Features",
  techStack: "Technology Stack",
  investorPitch: "Investor Pitch",
  roadmap: "Launch Roadmap",
};

export default function AIWorkspacePage() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState<StartupPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!idea.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate");
      }

      const data = await res.json();
      setResult(data.plan);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportMarkdown = () => {
    if (!result) return;
    let md = "# Startup Plan\n\n";
    Object.entries(result).forEach(([key, value]) => {
      const label = sectionLabels[key] || key;
      md += `## ${label}\n\n`;
      if (Array.isArray(value)) {
        value.forEach((item) => (md += `- ${item}\n`));
      } else if (typeof value === "object" && value !== null) {
        Object.entries(value).forEach(([k, v]) => (md += `**${k}:** ${v}\n\n`));
      } else {
        md += `${value}\n`;
      }
      md += "\n";
    });

    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "startup-plan.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">AI Workspace</h1>
        <p className="mt-1 text-muted">
          Describe your startup idea and let AI generate a complete plan.
        </p>
      </div>

      {/* Input Section */}
      <Card className="overflow-hidden">
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Startup Idea</h2>
              <p className="text-sm text-muted">Be as detailed as you want</p>
            </div>
          </div>

          <Textarea
            placeholder="I want to build an AI platform that helps freelancers find clients..."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            className="min-h-[160px] text-base"
          />

          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-muted">
              {idea.length}/2000 characters
            </p>
            <Button
              onClick={handleGenerate}
              disabled={loading || !idea.trim()}
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Plan
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

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="relative">
            <div className="h-20 w-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            <Brain className="absolute inset-0 m-auto h-8 w-8 text-primary" />
          </div>
          <p className="mt-6 text-lg font-medium text-foreground">Analyzing your idea...</p>
          <p className="mt-2 text-sm text-muted">This usually takes 10-20 seconds</p>
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Actions Bar */}
          <div className="flex items-center justify-between">
            <Badge variant="success" className="text-sm">
              <Check className="mr-1 h-3 w-3" />
              Plan Generated
            </Badge>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? <Check className="mr-1 h-3 w-3" /> : <Copy className="mr-1 h-3 w-3" />}
                {copied ? "Copied" : "Copy"}
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportMarkdown}>
                <Download className="mr-1 h-3 w-3" />
                Export MD
              </Button>
            </div>
          </div>

          {/* Plan Sections */}
          <div className="grid gap-4 sm:grid-cols-2">
            {Object.entries(result).map(([key, value]) => {
              const Icon = sectionIcons[key] || FileText;
              const label = sectionLabels[key] || key;

              return (
                <Card key={key} className={key === "roadmap" ? "sm:col-span-2" : ""}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Icon className="h-4 w-4 text-primary" />
                      {label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {Array.isArray(value) ? (
                      <ul className="space-y-2">
                        {value.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted">
                            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : typeof value === "object" && value !== null ? (
                      <div className="space-y-3">
                        {Object.entries(value).map(([k, v]) => (
                          <div key={k} className="rounded-xl bg-primary-50/50 p-3">
                            <p className="text-xs font-medium text-primary uppercase">{k}</p>
                            <p className="mt-1 text-sm text-muted">{String(v)}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted leading-relaxed">{String(value)}</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
