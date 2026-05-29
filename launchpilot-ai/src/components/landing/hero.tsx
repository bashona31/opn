"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background pt-24">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary/20 via-primary-300/10 to-transparent blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-primary-200/20 via-primary/10 to-transparent blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-gradient-to-r from-primary/5 to-primary-200/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center pt-16 sm:pt-24 lg:pt-32">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-4 py-2 text-sm font-medium text-foreground backdrop-blur-sm shadow-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>AI-Powered Startup Planning</span>
              <ArrowRight className="h-3 w-3 text-primary" />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-4xl text-center text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Launch Your Startup{" "}
            <span className="bg-gradient-to-r from-primary via-primary-400 to-primary-300 bg-clip-text text-transparent">
              Faster With AI
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-2xl text-center text-lg text-muted sm:text-xl"
          >
            Generate startup plans, roadmaps, business models and execution
            strategies in seconds.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Button size="xl" asChild>
              <Link href="/auth/signup">
                Start Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <Link href="#how-it-works">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Link>
            </Button>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 w-full max-w-5xl"
          >
            <div className="relative rounded-3xl border border-primary-100/50 bg-white/80 p-2 shadow-2xl shadow-primary/10 backdrop-blur-xl">
              {/* Glowing border effect */}
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-primary/20 via-primary-300/20 to-primary/20 opacity-50 blur" />
              
              <div className="relative rounded-2xl bg-white p-6 sm:p-8">
                {/* Mock Dashboard Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-amber-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                  <div className="h-6 flex-1 rounded-full bg-primary-50/50" />
                </div>

                {/* Mock Content */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-primary-200/10 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10">
                        <Zap className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium">AI Analysis</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-full rounded-full bg-primary/10" />
                      <div className="h-2 w-3/4 rounded-full bg-primary/10" />
                      <div className="h-2 w-1/2 rounded-full bg-primary/10" />
                    </div>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-primary-200/10 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10">
                        <Target className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium">Roadmap</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-full rounded-full bg-primary/10" />
                      <div className="h-2 w-2/3 rounded-full bg-primary/10" />
                      <div className="h-2 w-4/5 rounded-full bg-primary/10" />
                    </div>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-primary-200/10 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10">
                        <Sparkles className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium">Insights</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-full rounded-full bg-primary/10" />
                      <div className="h-2 w-5/6 rounded-full bg-primary/10" />
                      <div className="h-2 w-2/3 rounded-full bg-primary/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
