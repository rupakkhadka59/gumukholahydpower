"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { NewsItem } from "@/lib/data";

export default function NewsList() {
  const [items, setItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch("/api/news", { cache: "no-store" })
      .then((response) => response.json())
      .then((result: { data: NewsItem[] }) => setItems(result.data))
      .catch(() => undefined);
  }, []);

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article key={item.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
          {item.imageUrl && <div className="relative aspect-video"><Image src={item.imageUrl} alt={item.title} fill unoptimized className="object-cover" /></div>}
          <div className="p-6">
            <div className="mb-3 text-sm font-medium text-secondary">{new Date(item.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
            <h2 className="mb-3 text-xl font-bold text-primary transition-colors hover:text-secondary"><Link href={`/news/${item.id}`}>{item.title}</Link></h2>
            <p className="mb-6 line-clamp-3 text-muted-foreground">{item.excerpt}</p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href={`/news/${item.id}`} className="text-sm font-medium text-primary transition-colors hover:text-secondary">Read Full Article</Link>
              {item.pdfUrl && <a href={item.pdfUrl} target="_blank" rel="noreferrer" className="text-sm font-medium text-secondary transition-colors hover:text-secondary-light">View PDF</a>}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
