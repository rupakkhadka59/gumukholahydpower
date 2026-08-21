"use client";

import { useState } from "react";
import { downloads as initialDownloads } from "@/lib/data";
import type { DownloadItem } from "@/lib/data";
import { Plus, Pencil, Trash2, X, FileText } from "lucide-react";

const emptyForm = { title: "", description: "", fileSize: "", type: "PDF", date: "" };

export default function AdminDownloadsPage() {
  const [items, setItems] = useState<DownloadItem[]>(initialDownloads);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<DownloadItem | null>(null);
  const [form, setForm] = useState(emptyForm);

  const openAdd = () => { setEditItem(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (item: DownloadItem) => { setEditItem(item); setForm({ title: item.title, description: item.description, fileSize: item.fileSize, type: item.type, date: item.date }); setShowModal(true); };

  const handleSave = () => {
    if (editItem) {
      setItems((prev) => prev.map((d) => d.id === editItem.id ? { ...editItem, ...form } : d));
    } else {
      setItems((prev) => [...prev, { id: `d${Date.now()}`, ...form }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this download?")) setItems((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1E2A33]">Downloads & Articles</h1>
          <p className="text-[#8295a3] mt-1">{items.length} documents</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#0B3D5C] hover:bg-[#1A8FA3] text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors">
          <Plus className="w-4 h-4" /> Add Document
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-[#E4EAEE] p-5 shadow-sm flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="bg-[#0B3D5C]/10 p-3 rounded-lg flex-shrink-0">
                <FileText className="w-5 h-5 text-[#0B3D5C]" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 bg-[#1A8FA3]/10 text-[#1A8FA3] text-xs font-semibold rounded-full">{item.type}</span>
                  <span className="text-xs text-[#8295a3]">{item.fileSize}</span>
                </div>
                <h3 className="font-bold text-[#1E2A33] mb-1">{item.title}</h3>
                <p className="text-sm text-[#8295a3] line-clamp-2">{item.description}</p>
                <p className="text-xs text-[#8295a3] mt-1">{new Date(item.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
              </div>
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
              <h2 className="text-lg font-bold text-[#1E2A33]">{editItem ? "Edit Document" : "Add New Document"}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-[#F7FAFB] rounded-lg"><X className="w-5 h-5 text-[#8295a3]" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1E2A33] mb-1">Title</label>
                <input type="text" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="w-full px-3 py-2 border border-[#E4EAEE] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A8FA3] bg-[#F7FAFB]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E2A33] mb-1">Description</label>
                <textarea rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="w-full px-3 py-2 border border-[#E4EAEE] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A8FA3] resize-none bg-[#F7FAFB]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1E2A33] mb-1">File Size</label>
                  <input type="text" placeholder="e.g. 4.2 MB" value={form.fileSize} onChange={(e) => setForm((f) => ({ ...f, fileSize: e.target.value }))} className="w-full px-3 py-2 border border-[#E4EAEE] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A8FA3] bg-[#F7FAFB]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1E2A33] mb-1">File Type</label>
                  <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))} className="w-full px-3 py-2 border border-[#E4EAEE] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A8FA3] bg-[#F7FAFB]">
                    <option>PDF</option><option>DOCX</option><option>XLSX</option><option>PPT</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E2A33] mb-1">Publish Date</label>
                <input type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} className="w-full px-3 py-2 border border-[#E4EAEE] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A8FA3] bg-[#F7FAFB]" />
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6 pt-2">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-[#E4EAEE] rounded-lg text-sm font-medium text-[#1E2A33] hover:bg-[#F7FAFB] transition-colors">Cancel</button>
              <button onClick={handleSave} className="flex-1 px-4 py-2 bg-[#0B3D5C] hover:bg-[#1A8FA3] text-white rounded-lg text-sm font-medium transition-colors">Save Document</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
