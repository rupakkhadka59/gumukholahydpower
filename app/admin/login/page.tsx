"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Droplets, Eye, EyeOff, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 800)); // Simulate network delay

    // Simple mock authentication — replace with real auth in production
    if (email === "admin@gumukholahydro.com" && password === "admin123") {
      sessionStorage.setItem("admin_auth", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid email or password.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0B3D5C] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1A8FA3] rounded-2xl mb-4">
            <Droplets className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Gumu Khola Hydropower</h1>
          <p className="text-white/60 mt-1">Admin Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#E4EAEE] rounded-full flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#0B3D5C]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1E2A33]">Sign In</h2>
              <p className="text-sm text-[#8295a3]">Access the admin dashboard</p>
            </div>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#1E2A33] mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gumukholahydro.com"
                required
                className="w-full px-4 py-3 border border-[#E4EAEE] rounded-lg text-[#1E2A33] bg-[#F7FAFB] focus:outline-none focus:ring-2 focus:ring-[#1A8FA3] focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#1E2A33] mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 border border-[#E4EAEE] rounded-lg text-[#1E2A33] bg-[#F7FAFB] focus:outline-none focus:ring-2 focus:ring-[#1A8FA3] focus:border-transparent text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8295a3] hover:text-[#1E2A33]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0B3D5C] hover:bg-[#1A8FA3] text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#E4EAEE] text-center">

          </div>
        </div>
      </div>
    </div>
  );
}
