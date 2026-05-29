"use client";

import React from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "5,000+", label: "Ideas Generated" },
  { value: "1,200+", label: "Builders" },
  { value: "300+", label: "Projects Launched" },
  { value: "95%", label: "User Satisfaction" },
];

export function TrustSection() {
  return (
    <section className="relative border-y border-primary-100/30 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                <span className="bg-gradient-to-r from-primary to-primary-400 bg-clip-text text-transparent">
                  {stat.value}
                </span>
              </div>
              <p className="mt-2 text-sm font-medium text-muted sm:text-base">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
