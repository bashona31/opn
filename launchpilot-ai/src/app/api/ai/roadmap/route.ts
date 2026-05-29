import { NextRequest, NextResponse } from "next/server";
import { generateRoadmap } from "@/lib/openai";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { idea, context } = await request.json();

    if (!idea || typeof idea !== "string" || idea.trim().length < 10) {
      return NextResponse.json(
        { error: "Please provide a detailed idea (at least 10 characters)" },
        { status: 400 }
      );
    }

    // Generate roadmap
    const roadmap = await generateRoadmap(idea.trim(), context);

    // Save to database
    await supabase.from("roadmaps").insert({
      user_id: user.id,
      title: roadmap.title || "Startup Roadmap",
      description: roadmap.description || "",
      milestones: roadmap.milestones || [],
    });

    // Log activity
    await supabase.from("activity_logs").insert({
      user_id: user.id,
      action: "generated_roadmap",
      description: `Generated roadmap for: ${idea.substring(0, 50)}...`,
    });

    return NextResponse.json({ roadmap });
  } catch (error) {
    console.error("Roadmap Generate Error:", error);
    return NextResponse.json(
      { error: "Failed to generate roadmap. Please try again." },
      { status: 500 }
    );
  }
}
