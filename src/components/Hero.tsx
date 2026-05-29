"use client";

import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-neon-pink/10 blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-neon-cyan/8 blur-[100px] animate-float-delayed" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-bg-secondary/50 blur-[80px]" />
        
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass neon-border-pink mb-8 animate-fade-in">
          <Sparkles size={14} className="text-neon-pink" />
          <span className="text-xs font-medium text-gray-300">Web3 & 3D Art Studio</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight animate-slide-up">
          <span className="text-white">Shaping the Next Gen of</span>
          <br />
          <span className="gradient-text">Web3 & 3D Art</span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-gray-400 leading-relaxed animate-slide-up" style={{ animationDelay: "0.2s" }}>
          Crafting futuristic 3D character designs and navigating tokenized
          ecosystems, gamified reputation systems, and decentralized
          infrastructure.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <a
            href="#showcase"
            className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-neon-pink to-neon-pink/80 transition-all duration-300 hover:shadow-neon-pink hover:scale-105"
          >
            Explore Showcase
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#ecosystem"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white glass neon-border-cyan transition-all duration-300 hover:shadow-neon-cyan hover:scale-105"
          >
            Enter Ecosystem
          </a>
        </div>

        {/* Floating Stats */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-md mx-auto animate-fade-in" style={{ animationDelay: "0.6s" }}>
          {[
            { value: "50+", label: "3D Models" },
            { value: "Web3", label: "Native" },
            { value: "∞", label: "Vision" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-3 text-center">
              <p className="text-xl font-bold gradient-text">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
