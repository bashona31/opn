"use client";

import { Eye } from "lucide-react";
import Image from "next/image";

const artworks = [
  {
    title: "Crystal Robot Mascot Concept",
    tag: "3D Animation",
    image: "https://cdn.pixabay.com/photo/2024/03/04/16/38/ai-generated-8612487_1280.jpg",
  },
  {
    title: "Neon Samurai Genesis",
    tag: "Character Design",
    image: "https://cdn.pixabay.com/photo/2024/05/09/15/13/ai-generated-8751050_1280.jpg",
  },
  {
    title: "Void Walker - Series I",
    tag: "3D Sculpture",
    image: "https://cdn.pixabay.com/photo/2024/02/28/11/04/ai-generated-8601965_1280.jpg",
  },
  {
    title: "Cyber Empress Collection",
    tag: "NFT Art",
    image: "https://cdn.pixabay.com/photo/2024/03/15/17/23/ai-generated-8635189_1280.jpg",
  },
  {
    title: "Mecha Dragon Spirit",
    tag: "3D Animation",
    image: "https://cdn.pixabay.com/photo/2024/01/18/18/16/ai-generated-8516531_1280.jpg",
  },
  {
    title: "Quantum Ape Reborn",
    tag: "Character Design",
    image: "https://cdn.pixabay.com/photo/2024/04/17/17/10/ai-generated-8703089_1280.png",
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
              {/* Art Image */}
              <div className="aspect-[4/5] relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={art.image}
                  alt={art.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-bg-primary/20 to-transparent" />

                {/* Neon border glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-neon-pink/30 rounded-2xl shadow-[inset_0_0_30px_rgba(255,42,133,0.1)]" />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-full glass neon-border-pink transform scale-90 group-hover:scale-100 transition-transform duration-300">
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
