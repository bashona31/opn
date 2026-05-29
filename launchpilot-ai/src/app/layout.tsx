import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "LaunchPilot AI - Turn Startup Ideas Into Execution-Ready Businesses",
    template: "%s | LaunchPilot AI",
  },
  description:
    "Generate startup plans, roadmaps, business models and execution strategies in seconds with AI-powered planning.",
  keywords: [
    "startup",
    "AI",
    "business plan",
    "roadmap",
    "entrepreneur",
    "startup planner",
    "business model",
    "MVP",
    "pitch deck",
  ],
  authors: [{ name: "LaunchPilot AI" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://launchpilot.ai",
    siteName: "LaunchPilot AI",
    title: "LaunchPilot AI - Turn Startup Ideas Into Execution-Ready Businesses",
    description:
      "Generate startup plans, roadmaps, business models and execution strategies in seconds.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LaunchPilot AI",
    description:
      "Turn your startup idea into an execution-ready roadmap with AI.",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#FF4FD8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
