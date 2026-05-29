export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  title: string;
  description: string;
  idea: string;
  status: "draft" | "active" | "completed" | "archived";
  generated_plan?: StartupPlan;
  created_at: string;
  updated_at: string;
}

export interface StartupPlan {
  startupSummary: string;
  problemStatement: string;
  solution: string;
  targetAudience: string;
  keyFeatures: string[];
  revenueModel: string;
  competitorAnalysis: string;
  marketingStrategy: string;
  mvpFeatures: string[];
  techStack: string;
  investorPitch: string;
  roadmap: RoadmapTimeline;
}

export interface RoadmapTimeline {
  month1: string;
  month2: string;
  month3: string;
  month6: string;
  month12: string;
}

export interface Roadmap {
  id: string;
  project_id: string;
  user_id: string;
  title: string;
  description: string;
  milestones: Milestone[];
  created_at: string;
  updated_at: string;
}

export interface Milestone {
  month: number;
  title: string;
  description: string;
  tasks: string[];
  deliverables: string[];
}

export interface GeneratedResult {
  id: string;
  user_id: string;
  project_id?: string;
  type: "startup_plan" | "roadmap" | "pitch" | "analysis";
  title: string;
  content: Record<string, unknown>;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan: "free" | "pro" | "business" | "enterprise";
  status: "active" | "canceled" | "expired";
  credits_used: number;
  credits_limit: number;
  current_period_start: string;
  current_period_end: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  description: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface Settings {
  id: string;
  user_id: string;
  notifications_email: boolean;
  notifications_push: boolean;
  theme: "light" | "dark" | "system";
  language: string;
  ai_model: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}
