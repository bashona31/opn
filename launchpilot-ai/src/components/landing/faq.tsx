"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is LaunchPilot AI?",
    answer:
      "LaunchPilot AI is an AI-powered platform that helps founders, builders, and entrepreneurs transform raw startup ideas into comprehensive, execution-ready business plans. It uses advanced AI to analyze your idea and generate detailed strategies across 12+ dimensions.",
  },
  {
    question: "How does the AI generation work?",
    answer:
      "Simply describe your startup idea in plain language. Our AI analyzes it against market data, industry trends, and proven frameworks to generate a complete startup plan including problem analysis, solution design, revenue models, competitor research, and a detailed roadmap.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use enterprise-grade encryption and never share your ideas or generated content with third parties. Your startup plans are private and only accessible by you. We use Supabase with Row Level Security to ensure data isolation.",
  },
  {
    question: "Can I export my generated plans?",
    answer:
      "Yes! You can export your startup plans and roadmaps in multiple formats including PDF, Markdown, and plain text. This makes it easy to share with co-founders, advisors, or investors.",
  },
  {
    question: "What's included in the free plan?",
    answer:
      "The free plan includes 3 AI generations per month, 1 project slot, and basic startup plan generation. It's perfect for exploring the platform and generating your first startup blueprint.",
  },
  {
    question: "Can I upgrade or downgrade my plan anytime?",
    answer:
      "Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at the end of your current billing period. No long-term contracts required.",
  },
  {
    question: "Do you offer team features?",
    answer:
      "Our Business and Enterprise plans include team collaboration features, allowing multiple team members to work on projects together, share results, and collaborate in real-time.",
  },
  {
    question: "What AI model do you use?",
    answer:
      "We use OpenAI's latest models (GPT-4o) optimized for startup and business analysis. Our prompts are fine-tuned by startup advisors to ensure high-quality, actionable outputs.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="relative bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-primary to-primary-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Everything you need to know about LaunchPilot AI.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
