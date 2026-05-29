"use client";

import { useEffect, useState } from "react";
import { Eye, Loader2, RefreshCw } from "lucide-react";

interface PixabayImage {
  id: number;
  url: string;
  webformatURL: string;
  tags: string;
  user: string;
  likes: number;
  views: number;
}

const artCards = [
  {
    title: "Crystal Robot Mascot Concept",
    tag: "3D Animation",
    query: "3d robot crystal neon",
  },
  {
    title: "Neon Samurai Genesis",
    tag: "Character Design",
    query: "samurai neon cyberpunk",
  },
  {
    title: "Void Walker - Series I",
    tag: "3D Sculpture",
    query: "dark fantasy 3d character",
  },
  {
    title: "Cyber Empress Collection",
    tag: "NFT Art",
    query: "cyberpunk woman futuristic",
  },
  {
    title: "Mecha Dragon Spirit",
    tag: "3D Animation",
    query: "mecha dragon robot",
  },
  {
    title: "Quantum Ape Reborn",
    tag: "Character Design",
    query: "cyber ape monkey futuristic",
  },
];

export default function Showcase() {
  const [images, setImages] = useState<(PixabayImage | null)[]>(
    Array(artCards.length).fill(null)
  );
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    setLoading(true);
    const results = await Promise.all(
      artCards.map(async (card) => {
        try {
          const res = await fetch(
            `/api/pixabay?q=${encodeURIComponent(card.query)}&per_page=3`
          );
          const data = await res.json();
          if (data.images && data.images.length > 0) {
            // Pick a random image from results for variety
            const randomIndex = Math.floor(
              Math.random() * data.images.length
            );
            return data.images[randomIndex];
          }
          return null;
        } catch {
          return null;
        }
      })
    );
    setImages(results);
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

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
            A curated collection of futuristic 3D characters, environments, and
            digital art pieces — powered by AI search.
          </p>

          {/* Refresh button */}
          <button
            onClick={fetchImages}
            disabled={loading}
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium glass neon-border-cyan text-neon-cyan hover:shadow-neon-cyan transition-all duration-300 disabled:opacity-50"
          >
            <RefreshCw
              size={12}
              className={loading ? "animate-spin" : ""}
            />
            {loading ? "Loading..." : "Refresh Art"}
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {artCards.map((art, index) => {
            const img = images[index];

            return (
              <div
                key={art.title}
                className="group relative rounded-2xl glass overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:shadow-glass-hover"
              >
                {/* Art Image */}
                <div className="aspect-[4/5] relative overflow-hidden bg-bg-secondary">
                  {loading || !img ? (
                    /* Loading Skeleton */
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neon-pink/5 to-neon-cyan/5">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2
                          size={24}
                          className="text-neon-pink/50 animate-spin"
                        />
                        <span className="text-[10px] text-gray-500 font-mono">
                          Fetching art...
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.url || img.webformatURL}
                        alt={art.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    </>
                  )}

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-bg-primary/20 to-transparent" />

                  {/* Neon border glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-neon-pink/30 rounded-2xl shadow-[inset_0_0_30px_rgba(255,42,133,0.1)]" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex items-center gap-2 px-5 py-2.5 rounded-full glass neon-border-pink transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      <Eye size={14} className="text-neon-pink" />
                      <span className="text-xs font-medium text-white">
                        View Project
                      </span>
                    </div>
                  </div>

                  {/* Pixabay credit badge */}
                  {img && (
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-md glass text-[8px] font-mono text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      📸 {img.user}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-white group-hover:text-neon-pink transition-colors duration-300">
                    {art.title}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/5 text-gray-400 border border-white/5">
                      {art.tag}
                    </span>
                    {img && (
                      <span className="text-[9px] text-gray-600 font-mono">
                        ❤️ {img.likes}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pixabay Attribution */}
        <p className="mt-8 text-center text-[10px] text-gray-600">
          Images powered by{" "}
          <a
            href="https://pixabay.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-cyan/50 hover:text-neon-cyan transition-colors"
          >
            Pixabay API
          </a>
        </p>
      </div>
    </section>
  );
}
