"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-primary-100/30 bg-white/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/25">
            <Rocket className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold text-foreground">LaunchPilot AI</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="#features" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
            How It Works
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="#faq" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
            FAQ
          </Link>
        </nav>

        {/* CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/auth/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/signup">Start Free</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl md:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-primary-100/30 bg-white px-4 py-4 md:hidden"
        >
          <nav className="flex flex-col gap-3">
            <Link href="#features" className="rounded-xl px-4 py-2 text-sm font-medium text-muted hover:bg-primary-50">
              Features
            </Link>
            <Link href="#how-it-works" className="rounded-xl px-4 py-2 text-sm font-medium text-muted hover:bg-primary-50">
              How It Works
            </Link>
            <Link href="#pricing" className="rounded-xl px-4 py-2 text-sm font-medium text-muted hover:bg-primary-50">
              Pricing
            </Link>
            <Link href="#faq" className="rounded-xl px-4 py-2 text-sm font-medium text-muted hover:bg-primary-50">
              FAQ
            </Link>
            <hr className="border-primary-100/50" />
            <Button variant="ghost" asChild className="justify-start">
              <Link href="/auth/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/signup">Start Free</Link>
            </Button>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
