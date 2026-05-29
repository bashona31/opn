import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 4096,
    responseMimeType: "application/json",
  },
});

export async function generateStartupPlan(idea: string) {
  const prompt = `You are an expert startup advisor and business strategist. Analyze the given startup idea and provide a comprehensive startup plan.

Return your response as a valid JSON object with EXACTLY this structure:
{
  "startupSummary": "Brief 2-3 sentence summary of the startup",
  "problemStatement": "Clear description of the problem being solved",
  "solution": "How the startup solves this problem",
  "targetAudience": "Detailed description of target users/customers",
  "keyFeatures": ["feature1", "feature2", "feature3", "feature4", "feature5"],
  "revenueModel": "Detailed revenue strategy including pricing tiers",
  "competitorAnalysis": "Analysis of top 3-5 competitors and differentiation",
  "marketingStrategy": "Go-to-market strategy with specific channels",
  "mvpFeatures": ["mvp1", "mvp2", "mvp3", "mvp4", "mvp5"],
  "techStack": "Recommended technology stack with justification",
  "investorPitch": "Elevator pitch suitable for investors (100 words)",
  "roadmap": {
    "month1": "Key milestones for month 1",
    "month2": "Key milestones for month 2",
    "month3": "Key milestones for month 3",
    "month6": "Key milestones for month 6",
    "month12": "Key milestones for month 12"
  }
}

Startup idea: "${idea}"

Respond ONLY with the JSON object, no additional text.`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  if (!text) throw new Error("No response from AI");

  return JSON.parse(text);
}

export async function generateRoadmap(idea: string, context?: string) {
  const prompt = `You are an expert startup advisor. Generate a detailed execution roadmap for the given startup idea.

Return your response as a valid JSON object with EXACTLY this structure:
{
  "title": "Roadmap title",
  "description": "Brief roadmap overview",
  "milestones": [
    {
      "month": 1,
      "title": "Month 1 Title",
      "description": "What to accomplish",
      "tasks": ["task1", "task2", "task3", "task4"],
      "deliverables": ["deliverable1", "deliverable2"]
    }
  ]
}

Include milestones for months 1, 2, 3, 6, and 12.

Startup idea: "${idea}"${context ? `\nAdditional context: ${context}` : ""}

Respond ONLY with the JSON object, no additional text.`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  if (!text) throw new Error("No response from AI");

  return JSON.parse(text);
}

export default genAI;
