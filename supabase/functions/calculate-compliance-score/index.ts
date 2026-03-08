import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Validate JWT
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
    }

    const anonClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await anonClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
    }

    // Derive user_id from verified token — never trust caller-supplied user_id
    const user_id = claimsData.claims.sub;
    if (!user_id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
    }

    // Use service role client for data operations
    const supabase = createClient(supabaseUrl, serviceKey);

    // Get assigned report types for user
    const { data: assignedTypes } = await supabase
      .from("institution_report_types")
      .select("report_type")
      .eq("user_id", user_id)
      .eq("is_active", true);

    if (!assignedTypes || assignedTypes.length === 0) {
      return new Response(JSON.stringify({ score: 100, breakdown: [] }), { headers: corsHeaders });
    }

    // Get all reports for user
    const { data: reports } = await supabase
      .from("reports")
      .select("report_type, status, created_at, reporting_period_start, reporting_period_end")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const currentPeriodStart = new Date(currentYear, currentMonth - 1, 1);
    const previousPeriodStart = new Date(currentYear, currentMonth - 2, 1);

    let score = 100;
    const breakdown: Array<{
      report_type: string;
      last_submission: string | null;
      status: string;
      points_deducted: number;
      reason: string;
    }> = [];

    for (const { report_type } of assignedTypes) {
      const typeReports = (reports || []).filter((r) => r.report_type === report_type);
      const latestReport = typeReports[0] || null;

      const hasCurrentSubmission = typeReports.some((r) => {
        const created = new Date(r.created_at);
        return created >= currentPeriodStart;
      });

      const hasPreviousSubmission = typeReports.some((r) => {
        const created = new Date(r.created_at);
        return created >= previousPeriodStart && created < currentPeriodStart;
      });

      let pointsDeducted = 0;
      let reason = "On track";

      if (latestReport && latestReport.status === "Failed") {
        pointsDeducted += 10;
        reason = "Most recent submission failed";
      }

      if (!hasCurrentSubmission) {
        pointsDeducted += 15;
        reason = pointsDeducted > 15 ? reason + "; no current period submission" : "No submission in current period";

        if (!hasPreviousSubmission) {
          pointsDeducted += 5;
          reason += "; missing two consecutive periods";
        }
      }

      score -= pointsDeducted;

      breakdown.push({
        report_type,
        last_submission: latestReport ? latestReport.created_at : null,
        status: latestReport ? latestReport.status : "Never submitted",
        points_deducted: pointsDeducted,
        reason,
      });
    }

    score = Math.max(0, score);

    const statusLabel =
      score >= 90 ? "Excellent standing" : score >= 70 ? "Needs attention" : "Critical — action required";

    // Upsert compliance score
    const { data: existing } = await supabase
      .from("compliance_scores")
      .select("id")
      .eq("user_id", user_id)
      .maybeSingle();

    if (existing) {
      await supabase
        .from("compliance_scores")
        .update({
          score,
          status_label: statusLabel,
          score_breakdown: breakdown,
          calculated_at: now.toISOString(),
          updated_at: now.toISOString(),
        })
        .eq("user_id", user_id);
    } else {
      await supabase.from("compliance_scores").insert({
        user_id,
        score,
        status_label: statusLabel,
        score_breakdown: breakdown,
        calculated_at: now.toISOString(),
      });
    }

    return new Response(JSON.stringify({ score, breakdown }), { headers: corsHeaders });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500, headers: corsHeaders });
  }
});
