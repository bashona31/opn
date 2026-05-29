import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateStartupPlan(idea: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are an expert startup advisor and business strategist. Analyze the given startup idea and provide a comprehensive startup plan. Return your response as a valid JSON object with the following structure:
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
}`,
      },
      {
        role: "user",
        content: `Analyze this startup idea and create a comprehensive plan: "${idea}"`,
      },
    ],
    temperature: 0.7,
    max_tokens: 3000,
    response_format: { type: "json_object" },
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("No response from AI");

  return JSON.parse(content);
}

export async function generateRoadmap(idea: string, context?: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are an expert startup advisor. Generate a detailed execution roadmap for the given startup idea. Return your response as a valid JSON object:
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
Include milestones for months 1, 2, 3, 6, and 12.`,
      },
      {
        role: "user",
        content: `Create a detailed startup roadmap for: "${idea}"${context ? `\nAdditional context: ${context}` : ""}`,
      },
    ],
    temperature: 0.7,
    max_tokens: 2500,
    response_format: { type: "json_object" },
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("No response from AI");

  return JSON.parse(content);
}

export default openai;
