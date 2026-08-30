import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import type { DownloadItem } from "@/lib/data";
import { addActivity } from "@/lib/activity-store";
import { MAX_PDF_UPLOAD_BYTES, PUBLIC_DOCUMENT_BUCKET, getPublicDocumentUrl, getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

type DownloadRow = { id: string; title: string; description: string; type: string; date: string; file_size: string; storage_path: string | null };

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const rateLimitEntries = new Map<string, { count: number; resetAt: number }>();

async function resolveDocumentBucket(supabase: ReturnType<typeof getSupabaseAdmin>) {
  for (const bucket of [PUBLIC_DOCUMENT_BUCKET, "documents"]) {
    const { error } = await supabase.storage.getBucket(bucket);
    if (!error) return bucket;
  }
  return PUBLIC_DOCUMENT_BUCKET;
}

function enforceRateLimit(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "unknown";
  const clientIp = forwardedFor.split(",")[0].trim() || "unknown";
  const now = Date.now();
  const current = rateLimitEntries.get(clientIp);

  if (current && now < current.resetAt) {
    if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
      return { allowed: false, message: "Too many upload attempts. Please try again in a minute." };
    }
    current.count += 1;
    return { allowed: true };
  }

  rateLimitEntries.set(clientIp, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
  return { allowed: true };
}

const toDownload = (item: DownloadRow): DownloadItem => ({
  id: item.id,
  title: item.title,
  description: item.description,
  type: item.type,
  date: item.date,
  fileSize: item.file_size,
  fileUrl: item.storage_path ? getPublicDocumentUrl(item.storage_path) : "",
});

export async function GET() {
  try {
    const { data, error } = await getSupabaseAdmin().from("downloads").select("id, title, description, type, date, file_size, storage_path").order("date", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ data: (data as DownloadRow[]).map(toDownload) }, { headers: { "Cache-Control": "no-store, max-age=0" } });
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "Unable to load downloads." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const rateLimit = enforceRateLimit(request);
    if (!rateLimit.allowed) {
      return NextResponse.json({ message: rateLimit.message }, { status: 429 });
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const title = String(formData.get("title") ?? "").trim();

    if (!title) return NextResponse.json({ message: "A title is required." }, { status: 400 });

    let storagePath: string | null = null;
    let fileSize = String(formData.get("fileSize") ?? "");
    const supabase = getSupabaseAdmin();

    if (file instanceof File && file.size > 0) {
      const isPdfMimeType = file.type === "application/pdf";
      const isPdfExtension = file.name.toLowerCase().endsWith(".pdf");

      if (!isPdfMimeType && !isPdfExtension) {
        return NextResponse.json({ message: "Only PDF files are supported." }, { status: 400 });
      }

      if (file.size > MAX_PDF_UPLOAD_BYTES) {
        return NextResponse.json({ message: "PDF file exceeds the 10 MB upload limit." }, { status: 413 });
      }

      const bucket = await resolveDocumentBucket(supabase);
      storagePath = `${randomUUID()}.pdf`;
      const { error } = await supabase.storage.from(bucket).upload(storagePath, Buffer.from(await file.arrayBuffer()), {
        contentType: "application/pdf",
        upsert: false,
      });

      if (error) throw error;
      fileSize = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;
    }

    const { data, error } = await supabase.from("downloads").insert({
      title,
      description: String(formData.get("description") ?? ""),
      type: "PDF",
      date: String(formData.get("date") ?? new Date().toISOString().slice(0, 10)),
      file_size: fileSize,
      storage_path: storagePath,
    }).select("id, title, description, type, date, file_size, storage_path").single();

    if (error) throw error;
    await addActivity(`Report added: ${title}`);
    return NextResponse.json({ data: toDownload(data as DownloadRow) }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "Unable to add report." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json() as { id?: string };
    const supabase = getSupabaseAdmin();
    const { data: item, error: findError } = await supabase.from("downloads").select("title, storage_path").eq("id", id).single();
    if (findError) throw findError;

    const bucket = await resolveDocumentBucket(supabase);
    if (item.storage_path) {
      const { error } = await supabase.storage.from(bucket).remove([item.storage_path]);
      if (error) throw error;
    }

    const { error } = await supabase.from("downloads").delete().eq("id", id);
    if (error) throw error;
    await addActivity(`Report deleted: ${item.title}`);
    return NextResponse.json({ message: "Report deleted successfully." });
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "Unable to delete report." }, { status: 500 });
  }
}
