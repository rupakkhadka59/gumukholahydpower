"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { careersStorageKey, initialVacancies, Vacancy } from "@/lib/careers";
import type { ActivityItem } from "@/lib/activity-store";
import { Zap, Newspaper, Download, Briefcase, Images, ArrowRight, TrendingUp } from "lucide-react";

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState({ projects: 0, news: 0, reports: 0, vacancies: 0, gallery: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/projects", { cache: "no-store" }).then((response) => response.json()),
      fetch("/api/news", { cache: "no-store" }).then((response) => response.json()),
      fetch("/api/downloads", { cache: "no-store" }).then((response) => response.json()),
      fetch("/api/gallery", { cache: "no-store" }).then((response) => response.json()),
    ]).then(([projectsResult, newsResult, reportsResult, galleryResult]) => {
      let vacancyCount = initialVacancies.length;
      const storedVacancies = window.localStorage.getItem(careersStorageKey);
      if (storedVacancies) {
        try {
          vacancyCount = (JSON.parse(storedVacancies) as Vacancy[]).length;
        } catch {
          window.localStorage.removeItem(careersStorageKey);
        }
      }
      setCounts({
        projects: projectsResult.data.length,
        news: newsResult.data.length,
        reports: reportsResult.data.length,
        vacancies: vacancyCount,
        gallery: galleryResult.data.length,
      });
    }).catch(() => undefined).finally(() => setIsLoading(false));

    fetch("/api/activity", { cache: "no-store" })
      .then((response) => response.json())
      .then((result: { data: ActivityItem[] }) => setRecentActivity(result.data));
  }, []);

  const statCards = [
    { label: "Total Projects", value: counts.projects, icon: Zap, color: "bg-[#0B3D5C]", href: "/admin/projects" },
    { label: "News Articles", value: counts.news, icon: Newspaper, color: "bg-[#1A8FA3]", href: "/admin/news" },
    { label: "Reports", value: counts.reports, icon: Download, color: "bg-[#3EB489]", href: "/admin/downloads" },
    { label: "Vacancies", value: counts.vacancies, icon: Briefcase, color: "bg-[#8295a3]", href: "/admin/careers" },
    { label: "Gallery Pictures", value: counts.gallery, icon: Images, color: "bg-[#3EB489]", href: "/admin/gallery" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1E2A33]">Dashboard</h1>
        <p className="text-[#8295a3] mt-1">Welcome back, Admin. Here&apos;s an overview of your site.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link href={stat.href} key={stat.label} className="group bg-white rounded-xl border border-[#E4EAEE] p-5 shadow-sm hover:shadow-md hover:border-[#1A8FA3] transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <ArrowRight className="w-4 h-4 text-[#E4EAEE] group-hover:text-[#1A8FA3] transition-colors" />
              </div>
              <p className="text-3xl font-bold text-[#1E2A33]">{isLoading ? "..." : stat.value}</p>
              <p className="text-sm text-[#8295a3] mt-1">{stat.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-[#E4EAEE] p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[#1A8FA3]" />
            <h2 className="text-lg font-bold text-[#1E2A33]">Recent Activity</h2>
          </div>
          <div className="space-y-4">
            {recentActivity.length === 0 && <p className="text-sm text-[#8295a3]">No recent activity yet.</p>}
            {recentActivity.slice(0, 5).map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-[#1A8FA3] mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-[#1E2A33]">{item.text}</p>
                  <p className="text-xs text-[#8295a3] mt-0.5">{new Date(item.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
      </div>

      {/* View Site */}
      <div className="bg-gradient-to-r from-[#0B3D5C] to-[#1A8FA3] rounded-xl p-6 flex items-center justify-between">
        <div>
          <p className="text-white font-bold text-lg">View your website</p>
          <p className="text-white/70 text-sm">See how changes look live on the public site.</p>
        </div>
        <Link href="/" target="_blank" className="bg-white text-[#0B3D5C] font-semibold px-5 py-2 rounded-lg hover:bg-[#F7FAFB] transition-colors text-sm whitespace-nowrap">
          Open Site →
        </Link>
      </div>
    </div>
  );
}
