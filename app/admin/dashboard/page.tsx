"use client";

import Link from "next/link";
import { projects, news, downloads } from "@/lib/data";
import { Zap, Newspaper, Download, Briefcase, ArrowRight, TrendingUp } from "lucide-react";

const statCards = [
  { label: "Total Projects", value: projects.length, icon: Zap, color: "bg-[#0B3D5C]", href: "/admin/projects" },
  { label: "News Articles", value: news.length, icon: Newspaper, color: "bg-[#1A8FA3]", href: "/admin/news" },
  { label: "Downloads", value: downloads.length, icon: Download, color: "bg-[#3EB489]", href: "/admin/downloads" },
  { label: "Vacancies", value: 3, icon: Briefcase, color: "bg-[#8295a3]", href: "/admin/careers" },
];

const recentActivity = [
  { text: "New news article added: 'Upper Gumu Milestone'", time: "2 hours ago" },
  { text: "Project 'Upper Gumu' status updated to Under Construction", time: "1 day ago" },
  { text: "Download added: 'Annual Report 2025'", time: "3 days ago" },
  { text: "New vacancy posted: Senior Civil Engineer", time: "5 days ago" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1E2A33]">Dashboard</h1>
        <p className="text-[#8295a3] mt-1">Welcome back, Admin. Here's an overview of your site.</p>
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
              <p className="text-3xl font-bold text-[#1E2A33]">{stat.value}</p>
              <p className="text-sm text-[#8295a3] mt-1">{stat.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions + Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-[#E4EAEE] p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#1E2A33] mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/admin/news" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#F7FAFB] border border-[#E4EAEE] hover:border-[#1A8FA3] transition-all group">
              <div className="w-9 h-9 bg-[#1A8FA3]/10 rounded-lg flex items-center justify-center">
                <Newspaper className="w-5 h-5 text-[#1A8FA3]" />
              </div>
              <div>
                <p className="font-medium text-[#1E2A33] text-sm">Post News Article</p>
                <p className="text-xs text-[#8295a3]">Publish a press release or update</p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#E4EAEE] group-hover:text-[#1A8FA3] ml-auto transition-colors" />
            </Link>
            <Link href="/admin/downloads" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#F7FAFB] border border-[#E4EAEE] hover:border-[#1A8FA3] transition-all group">
              <div className="w-9 h-9 bg-[#3EB489]/10 rounded-lg flex items-center justify-center">
                <Download className="w-5 h-5 text-[#3EB489]" />
              </div>
              <div>
                <p className="font-medium text-[#1E2A33] text-sm">Add Download / Article</p>
                <p className="text-xs text-[#8295a3]">Upload a new report or document</p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#E4EAEE] group-hover:text-[#1A8FA3] ml-auto transition-colors" />
            </Link>
            <Link href="/admin/careers" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#F7FAFB] border border-[#E4EAEE] hover:border-[#1A8FA3] transition-all group">
              <div className="w-9 h-9 bg-[#0B3D5C]/10 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-[#0B3D5C]" />
              </div>
              <div>
                <p className="font-medium text-[#1E2A33] text-sm">Post Vacancy</p>
                <p className="text-xs text-[#8295a3]">Announce a new job opening</p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#E4EAEE] group-hover:text-[#1A8FA3] ml-auto transition-colors" />
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-[#E4EAEE] p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[#1A8FA3]" />
            <h2 className="text-lg font-bold text-[#1E2A33]">Recent Activity</h2>
          </div>
          <div className="space-y-4">
            {recentActivity.map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-[#1A8FA3] mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-[#1E2A33]">{item.text}</p>
                  <p className="text-xs text-[#8295a3] mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
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
