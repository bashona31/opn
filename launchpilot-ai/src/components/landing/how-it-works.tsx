"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, Brain, FileText, Rocket } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    title: "Describe Your Idea",
    description: "Enter your startup idea in plain language. Be as detailed or brief as you want.",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Our AI analyzes your idea across 12+ dimensions including market, competition, and feasibility.",
    color: "from-primary to-primary-400",
  },
  {
    icon: FileText,
    title: "Generate Blueprint",
    description: "Receive a complete startup blueprint with roadmap, business model, and execution plan.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: Rocket,
    title: "Start Building",
    description: "Use your personalized plan to start executing. Track progress with our dashboard.",
    color: "from-primary-400 to-primary",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative bg-white py-24 sm:py-32">
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
            How It{" "}
            <span className="bg-gradient-to-r from-primary to-primary-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            From idea to execution in four simple steps.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative text-center"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-10 hidden h-0.5 w-full translate-x-1/2 bg-gradient-to-r from-primary/20 to-primary/5 lg:block" />
              )}

              {/* Step number */}
              <div className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {index + 1}
              </div>

              {/* Icon */}
              <div className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-lg`}>
                <step.icon className="h-8 w-8 text-white" />
              </div>

              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
