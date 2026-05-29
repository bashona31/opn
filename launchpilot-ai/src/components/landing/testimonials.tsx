"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Founder",
    company: "TechFlow",
    content: "LaunchPilot AI saved me weeks of research. The startup plan it generated was incredibly detailed and actionable. I went from idea to MVP in record time.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "CEO",
    company: "GrowthLab",
    content: "The roadmap generator alone is worth it. It helped me prioritize features and set realistic milestones. My investors were impressed with the structured approach.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Product Lead",
    company: "InnovateCo",
    content: "As a student entrepreneur, this tool was a game-changer. The competitor analysis and pitch generator helped me win my university's startup competition.",
    rating: 5,
  },
  {
    name: "David Park",
    role: "Co-founder",
    company: "BuildFast",
    content: "We used LaunchPilot for 3 different product ideas before settling on one. The AI analysis helped us identify the most viable opportunity with the best market fit.",
    rating: 5,
  },
  {
    name: "Lisa Thompson",
    role: "Indie Maker",
    company: "SoloStack",
    content: "Finally, an AI tool that understands startups. The revenue model suggestions were spot-on and the tech stack recommendations saved me from making costly mistakes.",
    rating: 5,
  },
  {
    name: "Alex Kim",
    role: "Startup Advisor",
    company: "VentureFirst",
    content: "I recommend LaunchPilot to all my mentees. It provides the structured thinking framework that first-time founders need to validate and plan their ventures.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative bg-background py-24 sm:py-32 overflow-hidden">
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
            Loved by{" "}
            <span className="bg-gradient-to-r from-primary to-primary-400 bg-clip-text text-transparent">
              Builders
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            See what founders and entrepreneurs are saying about LaunchPilot AI.
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-3xl border border-primary-100/50 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover"
            >
              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="mb-6 text-sm leading-relaxed text-muted">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-400 text-sm font-bold text-white">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
