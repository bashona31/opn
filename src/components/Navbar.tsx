"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Hero", href: "#hero" },
  { label: "Showcase", href: "#showcase" },
  { label: "Ecosystem", href: "#ecosystem" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-neon flex items-center justify-center">
              <span className="text-sm font-black text-white">O</span>
            </div>
            <span className="text-lg font-bold tracking-tight">
              <span className="text-white">OPN</span>{" "}
              <span className="text-gray-400 font-medium">Builders</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-400 transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Connect Button */}
          <div className="hidden md:block">
            <button className="relative px-5 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-neon-pink to-neon-cyan transition-all duration-300 hover:shadow-neon-pink hover:scale-105">
              Connect
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-glass-border animate-slide-up">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button className="w-full mt-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-neon-pink to-neon-cyan">
              Connect
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
