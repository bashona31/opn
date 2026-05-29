"use client";

import React from "react";
import { motion } from "framer-motion";
import { Download, FileText, Map, Presentation } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockResults = [
  {
    id: "1",
    type: "startup_plan",
    title: "AI Fitness Coach Platform",
    date: "2024-01-15",
    icon: FileText,
  },
  {
    id: "2",
    type: "roadmap",
    title: "SaaS Analytics Tool - 12 Month Roadmap",
    date: "2024-01-12",
    icon: Map,
  },
  {
    id: "3",
    type: "pitch",
    title: "EdTech Marketplace Investor Pitch",
    date: "2024-01-10",
    icon: Presentation,
  },
];

export default function SavedResultsPage() {
  const handleExport = (format: "pdf" | "md" | "txt") => {
    // Export logic would go here
    alert(`Exporting as ${format.toUpperCase()}...`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Exports</h1>
        <p className="mt-1 text-muted">
          View and export your generated results.
        </p>
      </div>

      {/* Export Format Options */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-foreground mb-4">Export Formats</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => handleExport("pdf")}>
              <Download className="mr-2 h-4 w-4" />
              Export as PDF
            </Button>
            <Button variant="outline" onClick={() => handleExport("md")}>
              <Download className="mr-2 h-4 w-4" />
              Export as Markdown
            </Button>
            <Button variant="outline" onClick={() => handleExport("txt")}>
              <Download className="mr-2 h-4 w-4" />
              Export as Text
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results List */}
      <div className="space-y-4">
        {mockResults.map((result) => (
          <Card key={result.id}>
            <CardContent className="flex items-center gap-4 p-4 sm:p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                <result.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{result.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary">{result.type.replace("_", " ")}</Badge>
                  <span className="text-xs text-muted">{result.date}</span>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
