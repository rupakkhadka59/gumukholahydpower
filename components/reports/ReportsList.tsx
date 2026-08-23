"use client";

import { useEffect, useState } from "react";
import { ArrowDownToLine, FileText } from "lucide-react";
import type { DownloadItem } from "@/lib/data";

export default function ReportsList() {
  const [reports, setReports] = useState<DownloadItem[]>([]);

  useEffect(() => {
    fetch("/api/downloads", { cache: "no-store" })
      .then((response) => response.json())
      .then((result: { data: DownloadItem[] }) => setReports(result.data))
      .catch(() => undefined);
  }, []);

  return (
    <div className="space-y-5">
      {reports.map((report) => (
        <article key={report.id} className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary"><FileText className="h-7 w-7" /></div>
          <div className="flex-1">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-secondary">{report.type} | {report.fileSize}</p>
            <h2 className="mb-2 text-xl font-bold text-primary">{report.title}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{report.description}</p>
          </div>
          {report.fileUrl ? (
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <a href={report.fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-md bg-secondary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-secondary-light">
                View PDF
              </a>
              <a href={report.fileUrl} download className="inline-flex items-center justify-center gap-2 rounded-md border border-secondary px-4 py-3 text-sm font-semibold text-secondary transition-colors hover:bg-secondary-light/10">
                <ArrowDownToLine className="h-4 w-4" />
                Download PDF
              </a>
            </div>
          ) : (
            <a href="/downloads" className="inline-flex items-center justify-center gap-2 rounded-md bg-secondary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-secondary-light">View Downloads</a>
          )}
        </article>
      ))}
    </div>
  );
}
