"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X, MapPin, Building2, Calendar, CheckCircle, XCircle } from "lucide-react";

interface Vacancy {
  id: string;
  title: string;
  type: string;
  location: string;
  department: string;
  deadline: string;
  description: string;
  isOpen: boolean;
}

const initialVacancies: Vacancy[] = [
  { id: "j1", title: "Senior Civil Engineer", type: "Full-Time", location: "On-Site (Upper Gumu)", department: "Engineering", deadline: "2026-09-30", description: "Lead civil engineering works on site.", isOpen: true },
  { id: "j2", title: "Environmental Health & Safety Manager", type: "Full-Time", location: "Regional Office", department: "Operations", deadline: "2026-09-15", description: "Manage EHS compliance across all plant sites.", isOpen: true },
  { id: "j3", title: "Hydrologist", type: "Full-Time", location: "Headquarters", department: "R&D", deadline: "2026-10-01", description: "Analyze hydrological data to optimize generation output.", isOpen: false },
];

const emptyForm: Omit<Vacancy, "id"> = {
  title: "", type: "Full-Time", location: "", department: "", deadline: "", description: "", isOpen: true,
};

export default function AdminCareersPage() {
  const [items, setItems] = useState<Vacancy[]>(initialVacancies);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Vacancy | null>(null);
  const [form, setForm] = useState(emptyForm);

  const openAdd = () => { setEditItem(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (v: Vacancy) => { setEditItem(v); setForm({ title: v.title, type: v.type, location: v.location, department: v.department, deadline: v.deadline, description: v.description, isOpen: v.isOpen }); setShowModal(true); };

  const handleSave = () => {
    if (editItem) {
      setItems((prev) => prev.map((v) => v.id === editItem.id ? { ...editItem, ...form } : v));
    } else {
      setItems((prev) => [...prev, { id: `j${Date.now()}`, ...form }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this vacancy?")) setItems((prev) => prev.filter((v) => v.id !== id));
  };

  const toggleOpen = (id: string) => {
    setItems((prev) => prev.map((v) => v.id === id ? { ...v, isOpen: !v.isOpen } : v));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1E2A33]">Careers & Vacancies</h1>
          <p className="text-[#8295a3] mt-1">{items.filter((v) => v.isOpen).length} open, {items.filter((v) => !v.isOpen).length} closed</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#0B3D5C] hover:bg-[#1A8FA3] text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors">
          <Plus className="w-4 h-4" /> Post Vacancy
        </button>
      </div>

      <div className="space-y-4">
        {items.map((v) => (
          <div key={v.id} className={`bg-white rounded-xl border p-5 shadow-sm flex items-start justify-between gap-4 ${v.isOpen ? "border-[#E4EAEE]" : "border-[#E4EAEE] opacity-60"}`}>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${v.isOpen ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                  {v.isOpen ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                  {v.isOpen ? "Open" : "Closed"}
                </span>
                <span className="text-xs text-[#8295a3] bg-[#F7FAFB] border border-[#E4EAEE] px-2 py-0.5 rounded-full">{v.type}</span>
              </div>
              <h3 className="font-bold text-[#1E2A33] text-lg mb-2">{v.title}</h3>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#8295a3]">
                <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" />{v.department}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{v.location}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Deadline: {new Date(v.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
              </div>
              {v.description && <p className="text-sm text-[#8295a3] mt-2 line-clamp-2">{v.description}</p>}
            </div>
            <div className="flex flex-col gap-2 flex-shrink-0">
              <button onClick={() => toggleOpen(v.id)} title={v.isOpen ? "Close vacancy" : "Re-open vacancy"} className={`p-2 rounded-lg transition-colors text-xs font-medium px-3 ${v.isOpen ? "text-red-500 hover:bg-red-50" : "text-green-600 hover:bg-green-50"}`}>
                {v.isOpen ? "Close" : "Reopen"}
              </button>
              <button onClick={() => openEdit(v)} className="p-2 text-[#1A8FA3] hover:bg-[#1A8FA3]/10 rounded-lg transition-colors"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(v.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E4EAEE]">
              <h2 className="text-lg font-bold text-[#1E2A33]">{editItem ? "Edit Vacancy" : "Post New Vacancy"}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-[#F7FAFB] rounded-lg"><X className="w-5 h-5 text-[#8295a3]" /></button>
            </div>
            <div className="p-6 space-y-4">
              {([["Title", "title"], ["Location", "location"], ["Department", "department"]] as const).map(([label, field]) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-[#1E2A33] mb-1">{label}</label>
                  <input type="text" value={form[field]} onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))} className="w-full px-3 py-2 border border-[#E4EAEE] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A8FA3] bg-[#F7FAFB]" />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1E2A33] mb-1">Employment Type</label>
                  <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))} className="w-full px-3 py-2 border border-[#E4EAEE] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A8FA3] bg-[#F7FAFB]">
                    <option>Full-Time</option><option>Part-Time</option><option>Contract</option><option>Internship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1E2A33] mb-1">Application Deadline</label>
                  <input type="date" value={form.deadline} onChange={(e) => setForm((f) => ({ ...f, deadline: e.target.value }))} className="w-full px-3 py-2 border border-[#E4EAEE] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A8FA3] bg-[#F7FAFB]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E2A33] mb-1">Job Description</label>
                <textarea rows={4} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="w-full px-3 py-2 border border-[#E4EAEE] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A8FA3] resize-none bg-[#F7FAFB]" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="isOpen" checked={form.isOpen} onChange={(e) => setForm((f) => ({ ...f, isOpen: e.target.checked }))} className="w-4 h-4 accent-[#0B3D5C]" />
                <label htmlFor="isOpen" className="text-sm font-medium text-[#1E2A33]">Mark as Open (accepting applications)</label>
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6 pt-2">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-[#E4EAEE] rounded-lg text-sm font-medium text-[#1E2A33] hover:bg-[#F7FAFB] transition-colors">Cancel</button>
              <button onClick={handleSave} className="flex-1 px-4 py-2 bg-[#0B3D5C] hover:bg-[#1A8FA3] text-white rounded-lg text-sm font-medium transition-colors">Save Vacancy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
