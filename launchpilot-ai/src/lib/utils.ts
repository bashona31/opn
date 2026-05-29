import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function truncate(str: string, length: number) {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function generateId() {
  return Math.random().toString(36).substring(2, 15);
}

export function exportToMarkdown(data: Record<string, unknown>, title: string): string {
  let md = `# ${title}\n\n`;
  
  Object.entries(data).forEach(([key, value]) => {
    const heading = key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
    md += `## ${heading}\n\n`;
    
    if (Array.isArray(value)) {
      value.forEach((item) => {
        md += `- ${item}\n`;
      });
    } else if (typeof value === "object" && value !== null) {
      Object.entries(value).forEach(([k, v]) => {
        md += `**${k}:** ${v}\n\n`;
      });
    } else {
      md += `${value}\n`;
    }
    md += "\n";
  });

  return md;
}

export function exportToText(data: Record<string, unknown>, title: string): string {
  let text = `${title}\n${"=".repeat(title.length)}\n\n`;
  
  Object.entries(data).forEach(([key, value]) => {
    const heading = key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
    text += `${heading}\n${"-".repeat(heading.length)}\n`;
    
    if (Array.isArray(value)) {
      value.forEach((item) => {
        text += `  * ${item}\n`;
      });
    } else if (typeof value === "object" && value !== null) {
      Object.entries(value).forEach(([k, v]) => {
        text += `  ${k}: ${v}\n`;
      });
    } else {
      text += `  ${value}\n`;
    }
    text += "\n";
  });

  return text;
}
