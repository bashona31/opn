"use client";

import { Cpu, Layers, Zap } from "lucide-react";

const cards = [
  {
    icon: Cpu,
    title: "OPN Chain Insights",
    description:
      "Deep dive into decentralized infrastructure. Exploring layer-1 innovations, consensus mechanisms, and cross-chain interoperability built for the next era of Web3.",
    accent: "pink" as const,
    tag: "Infrastructure",
  },
  {
    icon: Layers,
    title: "Nexus Hub Integration",
    description:
      "Exploring gamified systems and interaction layers. Connect with decentralized communities through immersive hubs, social tokens, and collaborative governance.",
    accent: "cyan" as const,
    tag: "Integration",
  },
  {
    icon: Zap,
    title: "Reputation & XP Systems",
    description:
      "Tracking tokenized ecosystems and REP/XP points. Build verifiable on-chain reputation through contributions, achievements, and community engagement.",
    accent: "pink" as const,
    tag: "Gamification",
  },
];

export default function Ecosystem() {
  return (
    <section id="ecosystem" className="relative py-24 sm:py-32">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-neon-pink/5 rounded-full blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-neon-cyan mb-3">
            Ecosystem
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            <span className="text-white">OPN & Nexus</span>{" "}
            <span className="gradient-text">Ecosystem Hub</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Navigating the decentralized future through infrastructure, gamification, and reputation.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={card.title}
              className={`group relative rounded-2xl glass p-6 sm:p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-glass-hover ${
                card.accent === "pink" ? "hover:neon-border-pink" : "hover:neon-border-cyan"
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Glow on hover */}
              <div
                className={`absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm ${
                  card.accent === "pink"
                    ? "bg-gradient-to-br from-neon-pink/20 to-transparent"
                    : "bg-gradient-to-br from-neon-cyan/20 to-transparent"
                }`}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                    card.accent === "pink"
                      ? "bg-neon-pink/10 border border-neon-pink/20"
                      : "bg-neon-cyan/10 border border-neon-cyan/20"
                  }`}
                >
                  <card.icon
                    size={22}
                    className={
                      card.accent === "pink" ? "text-neon-pink" : "text-neon-cyan"
                    }
                  />
                </div>

                {/* Tag */}
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider mb-4 ${
                    card.accent === "pink"
                      ? "bg-neon-pink/10 text-neon-pink border border-neon-pink/20"
                      : "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20"
                  }`}
                >
                  {card.tag}
                </span>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-3 group-hover:gradient-text transition-all duration-300">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {card.description}
                </p>

                {/* Bottom accent line */}
                <div
                  className={`mt-6 h-0.5 w-12 rounded-full transition-all duration-500 group-hover:w-full ${
                    card.accent === "pink" ? "bg-neon-pink/40" : "bg-neon-cyan/40"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
