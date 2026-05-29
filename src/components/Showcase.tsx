"use client";

import { Eye } from "lucide-react";

const artworks = [
  {
    title: "Crystal Robot Mascot Concept",
    tag: "3D Animation",
    gradient: "from-neon-pink/20 to-purple-900/20",
  },
  {
    title: "Neon Samurai Genesis",
    tag: "Character Design",
    gradient: "from-neon-cyan/20 to-blue-900/20",
  },
  {
    title: "Void Walker - Series I",
    tag: "3D Sculpture",
    gradient: "from-violet-600/20 to-neon-pink/20",
  },
  {
    title: "Cyber Empress Collection",
    tag: "NFT Art",
    gradient: "from-neon-cyan/20 to-emerald-900/20",
  },
  {
    title: "Mecha Dragon Spirit",
    tag: "3D Animation",
    gradient: "from-orange-600/20 to-neon-pink/20",
  },
  {
    title: "Quantum Ape Reborn",
    tag: "Character Design",
    gradient: "from-neon-pink/20 to-neon-cyan/20",
  },
];

export default function Showcase() {
  return (
    <section id="showcase" className="relative py-24 sm:py-32">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-neon-pink/5 rounded-full blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-neon-pink mb-3">
            Portfolio
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            <span className="text-white">3D & Anime Art</span>{" "}
            <span className="gradient-text">Showcase</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            A curated collection of futuristic 3D characters, environments, and digital art pieces.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {artworks.map((art, index) => (
            <div
              key={art.title}
              className="group relative rounded-2xl glass overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:shadow-glass-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Art Placeholder */}
              <div
                className={`aspect-[4/5] bg-gradient-to-br ${art.gradient} flex items-center justify-center relative`}
              >
                {/* Decorative elements */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-4 left-4 w-16 h-16 border border-white/10 rounded-full" />
                  <div className="absolute bottom-8 right-8 w-24 h-24 border border-white/5 rounded-xl rotate-12" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rounded-2xl" />
                </div>

                {/* Placeholder icon */}
                <div className="relative z-10 w-20 h-20 rounded-2xl glass flex items-center justify-center">
                  <span className="text-3xl font-black gradient-text">
                    {art.title.charAt(0)}
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full glass neon-border-pink">
                    <Eye size={14} className="text-neon-pink" />
                    <span className="text-xs font-medium text-white">View Project</span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-white group-hover:text-neon-pink transition-colors duration-300">
                  {art.title}
                </h3>
                <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/5 text-gray-400 border border-white/5">
                  {art.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
