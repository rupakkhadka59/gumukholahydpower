"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import type { NewsItem } from "@/lib/data";
import { Plus, Pencil, Trash2, X } from "lucide-react";

const emptyForm = { title: "", date: "", excerpt: "", content: "" };

export default function AdminNewsPage() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<NewsItem | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/news", { cache: "no-store" })
      .then((response) => response.json())
      .then((result: { data: NewsItem[] }) => setItems(result.data))
      .finally(() => setIsLoading(false));
  }, []);

  const openAdd = () => { setEditItem(null); setForm(emptyForm); setSelectedImage(null); setSelectedPdf(null); setShowModal(true); };
  const openEdit = (item: NewsItem) => { setEditItem(item); setForm({ title: item.title, date: item.date, excerpt: item.excerpt, content: item.content }); setSelectedImage(null); setSelectedPdf(null); setShowModal(true); };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => setSelectedImage(event.target.files?.[0] ?? null);
  const handlePdfChange = (event: ChangeEvent<HTMLInputElement>) => setSelectedPdf(event.target.files?.[0] ?? null);

  const handleSave = async () => {
    if (!form.title.trim() || !form.date) return;
    const body = new FormData();
    Object.entries(form).forEach(([key, value]) => body.append(key, value));
    if (selectedImage) body.append("image", selectedImage);
    if (selectedPdf) body.append("pdf", selectedPdf);
    const response = await fetch("/api/news", { method: "POST", body });
    if (!response.ok) return;
    const result = await response.json() as { data: NewsItem };
    if (editItem) {
      setItems((prev) => prev.map((n) => n.id === editItem.id ? result.data : n));
    } else {
      setItems((prev) => [...prev, result.data]);
    }
    setShowModal(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this news article?")) return;
    const response = await fetch("/api/news", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    if (response.ok) setItems((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1E2A33]">News & Updates</h1>
          <p className="text-[#8295a3] mt-1">{items.length} articles</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#0B3D5C] hover:bg-[#1A8FA3] text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors">
          <Plus className="w-4 h-4" /> Add Article
        </button>
      </div>

      <div className="space-y-4">
        {isLoading && <p className="text-sm text-[#8295a3]">Loading news...</p>}
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-[#E4EAEE] p-5 shadow-sm flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-[#1A8FA3]">{new Date(item.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
              </div>
              <h3 className="font-bold text-[#1E2A33] mb-1">{item.title}</h3>
              <p className="text-sm text-[#8295a3] line-clamp-2">{item.excerpt}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => openEdit(item)} className="p-2 text-[#1A8FA3] hover:bg-[#1A8FA3]/10 rounded-lg transition-colors"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(item.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E4EAEE]">
              <h2 className="text-lg font-bold text-[#1E2A33]">{editItem ? "Edit Article" : "Add News Article"}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-[#F7FAFB] rounded-lg"><X className="w-5 h-5 text-[#8295a3]" /></button>
            </div>
            <div className="p-6 space-y-4">
              {(["title", "date", "excerpt"] as const).map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-[#1E2A33] mb-1 capitalize">{field === "date" ? "Date" : field === "excerpt" ? "Description" : "Title"}</label>
                  <input required={field === "title" || field === "date"} type={field === "date" ? "date" : "text"} value={form[field]} onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))} className="w-full px-3 py-2 border border-[#E4EAEE] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A8FA3] bg-[#F7FAFB]" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-[#1E2A33] mb-1">Full Content</label>
                <textarea rows={5} value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} className="w-full px-3 py-2 border border-[#E4EAEE] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A8FA3] resize-none bg-[#F7FAFB]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E2A33] mb-1">Article Image</label>
                <label className="flex cursor-pointer items-center rounded-lg border border-dashed border-[#1A8FA3]/50 bg-[#F7FAFB] px-3 py-2 text-sm text-[#1A8FA3]">
                  <span className="truncate">{selectedImage?.name ?? (editItem?.imageUrl ? "Current article image" : "Choose image")}</span>
                  <input ref={imageInputRef} type="file" accept=".jpg,.jpeg,.png,.svg,.webp,.avif,.heic,.heif" onChange={handleImageChange} className="sr-only" />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E2A33] mb-1">PDF Attachment</label>
                <label className="flex cursor-pointer items-center rounded-lg border border-dashed border-[#1A8FA3]/50 bg-[#F7FAFB] px-3 py-2 text-sm text-[#1A8FA3]">
                  <span className="truncate">{selectedPdf?.name ?? (editItem?.pdfUrl ? "Current PDF attachment" : "Choose PDF (optional)")}</span>
                  <input ref={pdfInputRef} type="file" accept="application/pdf,.pdf" onChange={handlePdfChange} className="sr-only" />
                </label>
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6 pt-2">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-[#E4EAEE] rounded-lg text-sm font-medium text-[#1E2A33] hover:bg-[#F7FAFB] transition-colors">Cancel</button>
              <button onClick={handleSave} className="flex-1 px-4 py-2 bg-[#0B3D5C] hover:bg-[#1A8FA3] text-white rounded-lg text-sm font-medium transition-colors">Save Article</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
