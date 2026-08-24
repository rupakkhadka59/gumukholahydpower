"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Droplets, Eye, EyeOff, LoaderCircle, Lock } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [showPassword, setShowPassword] = useState(false); const [error, setError] = useState(""); const [loading, setLoading] = useState(false); const router = useRouter();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); setError(""); setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient(); const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError || !data.user) throw new Error("Invalid email or password");
      const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", data.user.id).maybeSingle();
      if (!profile?.is_admin) { await supabase.auth.signOut(); throw new Error("You are not authorized to access the admin portal."); }
      router.replace("/admin/dashboard"); router.refresh();
    } catch (reason) { setError(reason instanceof Error && reason.message === "You are not authorized to access the admin portal." ? reason.message : "Invalid email or password"); } finally { setLoading(false); }
  };
  return <div className="flex min-h-screen items-center justify-center bg-[#0B3D5C] p-4"><div className="w-full max-w-md"><div className="mb-8 text-center"><div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1A8FA3]"><Droplets className="h-8 w-8 text-white" /></div><h1 className="text-2xl font-bold text-white">Gumu Khola Hydropower</h1><p className="mt-1 text-white/60">Admin Portal</p></div><div className="rounded-2xl bg-white p-8 shadow-2xl"><div className="mb-6 flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E4EAEE]"><Lock className="h-5 w-5 text-[#0B3D5C]" /></div><div><h2 className="text-xl font-bold text-[#1E2A33]">Sign in</h2><p className="text-sm text-[#8295a3]">Access the admin dashboard</p></div></div>{error && <div role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}<form onSubmit={handleSubmit} className="space-y-5"><div><label htmlFor="email" className="mb-1 block text-sm font-medium text-[#1E2A33]">Email address</label><input id="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="w-full rounded-lg border border-[#E4EAEE] bg-[#F7FAFB] px-4 py-3 text-sm text-[#1E2A33] outline-none focus:ring-2 focus:ring-[#1A8FA3]" /></div><div><label htmlFor="password" className="mb-1 block text-sm font-medium text-[#1E2A33]">Password</label><div className="relative"><input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required className="w-full rounded-lg border border-[#E4EAEE] bg-[#F7FAFB] px-4 py-3 pr-10 text-sm text-[#1E2A33] outline-none focus:ring-2 focus:ring-[#1A8FA3]" /><button type="button" aria-label="Toggle password visibility" onClick={() => setShowPassword((visible) => !visible)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8295a3] hover:text-[#1E2A33]">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></div><button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0B3D5C] py-3 font-semibold text-white transition-colors hover:bg-[#1A8FA3] disabled:cursor-not-allowed disabled:opacity-60">{loading && <LoaderCircle className="h-4 w-4 animate-spin" />}{loading ? "Signing in…" : "Sign in"}</button></form></div></div></div>;
}
