import { NextResponse } from "next/server";
import { getActivities } from "@/lib/activity-store";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(
    { data: await getActivities() },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}
