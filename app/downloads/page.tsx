"use client";

import Hero from "@/components/ui/Hero";
import { FileText, Download, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

type DownloadItem = {
  id: string;
  title: string;
  description: string;
  fileSize: string;
  type: string;
  date: string;
  fileUrl?: string;
};

export default function DownloadsPage() {
  const [items, setItems] = useState<DownloadItem[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/downloads", { cache: "no-store" })
      .then((response) => response.json())
      .then((result: { data?: DownloadItem[] }) => setItems(result.data ?? []))
      .finally(() => setIsLoading(false));
  }, []);

  const handleDownload = async (item: DownloadItem) => {
    if (!item.fileUrl) return;

    const response = await fetch(item.fileUrl, { cache: "no-store" });
    if (!response.ok) throw new Error("Unable to download this PDF.");

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const fileName = `${item.title.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "document"}.pdf`;

    link.href = objectUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(objectUrl);
  };

  return (
    <div>
      <Hero
        title="Downloads & Resources"
        subtitle="Access detailed reports, environmental assessments, and technical articles related to our hydropower projects."
        imageSrc="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80"
      />

      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="mb-4 text-3xl font-bold text-primary dark:text-white">Research & Reports</h2>
          <p className="text-lg text-muted-foreground">
            Download our latest publications and technical documents to learn more about run-of-river generation, environmental conservation, and our operational metrics.
          </p>
        </div>

        <div className="space-y-6">
          {isLoading && <p className="text-sm text-slate-500">Loading documents...</p>}
          {!isLoading && items.length === 0 && <p className="text-sm text-slate-500">No documents are available right now.</p>}

          {items.map((item) => (
            <div key={item.id} className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-secondary sm:flex-row sm:items-center">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-8 w-8 text-primary" />
              </div>

              <div className="flex-grow">
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-bold text-primary dark:text-white">{item.title}</h3>
                  <span className="rounded-full border border-secondary/20 bg-secondary/10 px-2.5 py-0.5 text-xs font-semibold text-secondary">
                    {item.type}
                  </span>
                </div>
                <p className="mb-3 text-muted-foreground">{item.description}</p>
                <div className="text-sm font-medium text-slate-500">
                  {item.fileSize} • Published on {new Date(item.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </div>
              </div>

              <div className="flex w-full shrink-0 gap-3 sm:w-auto">
                {item.fileUrl && (
                  <button
                    type="button"
                    onClick={() => setSelectedPdf(item.fileUrl ?? null)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-border bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View PDF
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleDownload(item)}
                  disabled={!item.fileUrl}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPdf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <h3 className="text-lg font-semibold text-slate-800">PDF Preview</h3>
              <button type="button" onClick={() => setSelectedPdf(null)} className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200">
                Close
              </button>
            </div>
            <iframe src={selectedPdf} title="PDF preview" className="h-full w-full" />
          </div>
        </div>
      )}
    </div>
  );
}
