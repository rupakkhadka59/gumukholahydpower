"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { projects as initialProjects } from "@/lib/data";
import type { Project } from "@/lib/data";
import { Plus, Pencil, Trash2, MapPin, Zap, X } from "lucide-react";

type FormData = Omit<Project, "id">;

const emptyForm: FormData = {
  name: "", location: "", capacityMW: 0, status: "Planning",
  commissioningYear: undefined, image: "", description: "",
};

const statusColors: Record<Project["status"], string> = {
  Operational: "bg-green-100 text-green-800",
  "Under Construction": "bg-yellow-100 text-yellow-800",
  Planning: "bg-slate-100 text-slate-600",
};

export default function AdminProjectsPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Project | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/projects", { cache: "no-store" })
      .then((response) => response.json())
      .then((result: { data: Project[] }) => setItems(result.data))
      .catch(() => setItems(initialProjects))
      .finally(() => setIsLoading(false));
  }, []);

  const openAdd = () => { setEditItem(null); setForm(emptyForm); setSelectedImage(null); setShowModal(true); };
  const openEdit = (p: Project) => { setEditItem(p); setForm({ name: p.name, location: p.location, capacityMW: p.capacityMW, status: p.status, commissioningYear: p.commissioningYear, image: p.image, description: p.description }); setSelectedImage(null); setShowModal(true); };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedImage(event.target.files?.[0] ?? null);
  };

  const handleSave = async () => {
    const project = editItem ? { ...editItem, ...form } : { id: `p${Date.now()}`, ...form };
    const body = new FormData();
    Object.entries(project).forEach(([key, value]) => {
      if (value !== undefined) body.append(key, String(value));
    });
    if (selectedImage) body.append("imageFile", selectedImage);
    const response = await fetch("/api/projects", {
      method: "POST",
      body,
    });
    if (!response.ok) return;
    const result = await response.json() as { data: Project };
    if (editItem) {
      setItems((prev) => prev.map((p) => (p.id === editItem.id ? result.data : p)));
    } else {
      setItems((prev) => [result.data, ...prev]);
    }
    setShowModal(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const response = await fetch("/api/projects", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
      if (response.ok) setItems((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1E2A33]">Projects</h1>
          <p className="text-[#8295a3] mt-1">{items.length} total projects</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#0B3D5C] hover:bg-[#1A8FA3] text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors">
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#E4EAEE] shadow-sm overflow-hidden">
        {isLoading && <p className="p-6 text-sm text-[#8295a3]">Loading projects...</p>}
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E4EAEE] bg-[#F7FAFB]">
              <th className="text-left px-6 py-3 font-semibold text-[#8295a3]">Project</th>
              <th className="text-left px-6 py-3 font-semibold text-[#8295a3] hidden md:table-cell">Location</th>
              <th className="text-left px-6 py-3 font-semibold text-[#8295a3] hidden sm:table-cell">Capacity</th>
              <th className="text-left px-6 py-3 font-semibold text-[#8295a3]">Status</th>
              <th className="text-right px-6 py-3 font-semibold text-[#8295a3]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E4EAEE]">
            {items.map((p) => (
              <tr key={p.id} className="hover:bg-[#F7FAFB] transition-colors">
                <td className="px-6 py-4">
                  <p className="font-medium text-[#1E2A33]">{p.name}</p>
                  {p.commissioningYear && <p className="text-xs text-[#8295a3]">{p.commissioningYear}</p>}
                </td>
                <td className="px-6 py-4 text-[#8295a3] hidden md:table-cell">
                  <div className="flex items-center gap-1"><MapPin className="w-3 h-3" />{p.location}</div>
                </td>
                <td className="px-6 py-4 text-[#1E2A33] hidden sm:table-cell">
                  <div className="flex items-center gap-1"><Zap className="w-3 h-3 text-[#1A8FA3]" />{p.capacityMW} MW</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColors[p.status]}`}>{p.status}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 justify-end">
                    <button onClick={() => openEdit(p)} className="p-2 text-[#1A8FA3] hover:bg-[#1A8FA3]/10 rounded-lg transition-colors"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(p.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E4EAEE]">
              <h2 className="text-lg font-bold text-[#1E2A33]">{editItem ? "Edit Project" : "Add New Project"}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-[#F7FAFB] rounded-lg"><X className="w-5 h-5 text-[#8295a3]" /></button>
            </div>
            <div className="p-6 space-y-4">
              {([["Name", "name", "text"], ["Location", "location", "text"], ["Description", "description", "textarea"]] as const).map(([label, field, type]) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-[#1E2A33] mb-1">{label}</label>
                  {type === "textarea" ? (
                    <textarea rows={3} value={form[field as keyof FormData] as string} onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))} className="w-full px-3 py-2 border border-[#E4EAEE] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A8FA3] resize-none bg-[#F7FAFB]" />
                  ) : (
                    <input type="text" value={form[field as keyof FormData] as string} onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))} className="w-full px-3 py-2 border border-[#E4EAEE] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A8FA3] bg-[#F7FAFB]" />
                  )}
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1E2A33] mb-1">Capacity (MW)</label>
                  <input type="number" value={form.capacityMW} onChange={(e) => setForm((f) => ({ ...f, capacityMW: Number(e.target.value) }))} className="w-full px-3 py-2 border border-[#E4EAEE] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A8FA3] bg-[#F7FAFB]" />
                </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1E2A33] mb-1">Project Image</label>
                    <label className="flex cursor-pointer items-center rounded-lg border border-dashed border-[#1A8FA3]/50 bg-[#F7FAFB] px-3 py-2 text-sm text-[#1A8FA3]">
                      <span className="truncate">{selectedImage?.name ?? (form.image ? "Current project image" : "Choose image")}</span>
                      <input ref={imageInputRef} type="file" accept=".heic,.heif,.jpg,.jpeg,.png,.svg,.webp,.avif" onChange={handleImageChange} className="sr-only" />
                    </label>
                  </div>
                <div>
                  <label className="block text-sm font-medium text-[#1E2A33] mb-1">Year</label>
                  <input type="number" value={form.commissioningYear ?? ""} onChange={(e) => setForm((f) => ({ ...f, commissioningYear: e.target.value ? Number(e.target.value) : undefined }))} className="w-full px-3 py-2 border border-[#E4EAEE] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A8FA3] bg-[#F7FAFB]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E2A33] mb-1">Status</label>
                <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as Project["status"] }))} className="w-full px-3 py-2 border border-[#E4EAEE] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A8FA3] bg-[#F7FAFB]">
                  <option>Operational</option>
                  <option>Under Construction</option>
                  <option>Planning</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6 pt-2">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-[#E4EAEE] rounded-lg text-sm font-medium text-[#1E2A33] hover:bg-[#F7FAFB] transition-colors">Cancel</button>
              <button onClick={handleSave} className="flex-1 px-4 py-2 bg-[#0B3D5C] hover:bg-[#1A8FA3] text-white rounded-lg text-sm font-medium transition-colors">Save Project</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
