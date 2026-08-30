import "server-only";
import { createClient } from "@supabase/supabase-js";

export const PUBLIC_DOCUMENT_BUCKET = "public-documents";
export const PRIVATE_DOCUMENT_BUCKET = "private-documents";
export const MAX_PDF_UPLOAD_BYTES = 10 * 1024 * 1024;

export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !secretKey) throw new Error("Supabase server configuration is missing.");
  return createClient(url, secretKey, { auth: { autoRefreshToken: false, persistSession: false } });
}

export function getPublicFileUrl(bucket: "gallery" | "documents" | "public-documents" | "private-documents", path: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return "";
  return createClient(url, key).storage.from(bucket).getPublicUrl(path).data.publicUrl;
}

export function getPublicDocumentUrl(path: string) {
  const candidates = [PUBLIC_DOCUMENT_BUCKET, "documents"] as const;
  for (const bucket of candidates) {
    const publicUrl = getPublicFileUrl(bucket, path);
    if (publicUrl) return publicUrl;
  }
  return "";
}

export async function createPrivateSignedUrl(path: string, bucket = PRIVATE_DOCUMENT_BUCKET, expiresInSeconds = 60) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) return null;

  const { data, error } = await createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  }).storage.from(bucket).createSignedUrl(path, expiresInSeconds);

  if (error || !data) return null;
  return data.signedUrl;
}
