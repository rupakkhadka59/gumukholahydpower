import "server-only";
import { createClient } from "@supabase/supabase-js";

export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !secretKey) throw new Error("Supabase server configuration is missing.");
  return createClient(url, secretKey, { auth: { autoRefreshToken: false, persistSession: false } });
}

export function getPublicFileUrl(bucket: "gallery" | "documents", path: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return "";
  return createClient(url, key).storage.from(bucket).getPublicUrl(path).data.publicUrl;
}
