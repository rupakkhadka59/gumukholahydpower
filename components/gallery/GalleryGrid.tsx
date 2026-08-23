"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { GalleryItem } from "@/lib/gallery";

export default function GalleryGrid({ limit }: { limit?: number }) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    fetch("/api/gallery", { cache: "no-store" }).then((response) => response.json()).then((result: { data: GalleryItem[] }) => setItems(result.data)).catch(() => undefined).finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedItem) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedItem(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem]);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {isLoading && <p className="text-sm text-muted-foreground">Loading gallery...</p>}
      {(limit ? items.slice(0, limit) : items).map((item) => (
        <button key={item.id} type="button" onClick={() => setSelectedItem(item)} className="group overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm transition-shadow hover:shadow-md">
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={item.image} alt={item.title} fill unoptimized className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <figcaption className="p-4"><h2 className="font-semibold text-primary">{item.title}</h2><p className="mt-1 text-sm text-muted-foreground">{item.description}</p></figcaption>
          </figure>
        </button>
      ))}
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4" role="dialog" aria-modal="true" aria-label={selectedItem.title} onClick={() => setSelectedItem(null)}>
          <div className="relative flex max-h-[90vh] w-full max-w-5xl flex-col items-center" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => setSelectedItem(null)} aria-label="Close image" className="absolute right-0 top-0 z-10 rounded-full bg-white/90 p-2 text-primary transition-colors hover:bg-white">
              <X className="h-6 w-6" />
            </button>
            <div className="relative h-[70vh] w-full">
              <Image src={selectedItem.image} alt={selectedItem.title} fill unoptimized className="object-contain" sizes="90vw" />
            </div>
            <div className="w-full max-w-2xl bg-white p-5 text-center">
              <h2 className="text-xl font-bold text-primary">{selectedItem.title}</h2>
              {selectedItem.description && <p className="mt-1 text-muted-foreground">{selectedItem.description}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
