"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Building2, Calendar, MapPin } from "lucide-react";
import { careersStorageKey, initialVacancies, Vacancy } from "@/lib/careers";

export default function CareersListings() {
  const [vacancies, setVacancies] = useState<Vacancy[]>(initialVacancies);

  useEffect(() => {
    const storedVacancies = window.localStorage.getItem(careersStorageKey);
    if (!storedVacancies) return;

    try {
      const storedItems = JSON.parse(storedVacancies) as Vacancy[];
      requestAnimationFrame(() => setVacancies(storedItems));
    } catch {
      window.localStorage.removeItem(careersStorageKey);
    }
  }, []);

  const openVacancies = vacancies.filter((vacancy) => vacancy.isOpen);

  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-border">
      <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">Open Positions</h2>
      <div className="space-y-4">
        {openVacancies.length === 0 && (
          <p className="text-muted-foreground">There are no open positions at this time.</p>
        )}
        {openVacancies.map((job) => (
          <div key={job.id} className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-secondary">
            <div>
              <h3 className="font-bold text-lg text-primary dark:text-white">{job.title}</h3>
              <div className="text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 mt-1">
                <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" />{job.department}</span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Apply by {new Date(job.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
              </div>
              {job.description && <p className="text-sm text-muted-foreground mt-2">{job.description}</p>}
            </div>
            <Link href="/contact#contact-form" className="bg-primary hover:bg-primary-light text-white px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap">
              Apply Now
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center text-sm text-muted-foreground">
        Don&apos;t see a perfect fit? Send your resume to <a href="mailto:careers@gumukholahydro.com" className="text-secondary hover:underline">careers@gumukholahydro.com</a>
      </div>
    </div>
  );
}
