"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Map,
  DollarSign,
  Users,
  Presentation,
  LayoutDashboard,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Startup Planner AI",
    description:
      "Generate complete startup plans with AI-powered analysis of your idea, market, and competition.",
  },
  {
    icon: Map,
    title: "Roadmap Generator",
    description:
      "Create detailed milestones and timelines for your startup journey from MVP to scale.",
  },
  {
    icon: DollarSign,
    title: "Revenue Model Builder",
    description:
      "Generate proven revenue strategies, pricing tiers, and monetization plans.",
  },
  {
    icon: Users,
    title: "Competitor Analyzer",
    description:
      "Understand your market landscape with AI-driven competitor research and positioning.",
  },
  {
    icon: Presentation,
    title: "Investor Pitch Generator",
    description:
      "Create compelling investor-ready pitches and presentation outlines in seconds.",
  },
  {
    icon: LayoutDashboard,
    title: "Project Execution Dashboard",
    description:
      "Track your startup progress, manage milestones, and stay on course to launch.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-primary to-primary-400 bg-clip-text text-transparent">
              Launch
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Powerful AI tools designed to transform your startup idea into an
            execution-ready business plan.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-3xl border border-primary-100/50 bg-white p-8 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
