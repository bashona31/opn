import { NextRequest, NextResponse } from "next/server";
import { generateStartupPlan } from "@/lib/gemini";
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

    const { idea } = await request.json();

    if (!idea || typeof idea !== "string" || idea.trim().length < 10) {
      return NextResponse.json(
        { error: "Please provide a detailed startup idea (at least 10 characters)" },
        { status: 400 }
      );
    }

    if (idea.length > 2000) {
      return NextResponse.json(
        { error: "Idea must be under 2000 characters" },
        { status: 400 }
      );
    }

    // Generate the plan
    const plan = await generateStartupPlan(idea.trim());

    // Save to database
    await supabase.from("generated_results").insert({
      user_id: user.id,
      type: "startup_plan",
      title: plan.startupSummary?.substring(0, 100) || "Startup Plan",
      content: plan,
    });

    // Log activity
    await supabase.from("activity_logs").insert({
      user_id: user.id,
      action: "generated_plan",
      description: `Generated startup plan for: ${idea.substring(0, 50)}...`,
    });

    return NextResponse.json({ plan });
  } catch (error) {
    console.error("AI Generate Error:", error);
    return NextResponse.json(
      { error: "Failed to generate startup plan. Please try again." },
      { status: 500 }
    );
  }
}
