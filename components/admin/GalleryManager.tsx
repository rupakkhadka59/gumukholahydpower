"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import { GalleryItem } from "@/lib/gallery";

const supportedImageExtensions = [".heic", ".heif", ".jpg", ".jpeg", ".png", ".svg", ".webp", ".avif"];
const supportedImageTypes = supportedImageExtensions.join(", ");

export default function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingDelete, setPendingDelete] = useState<GalleryItem | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/gallery", { cache: "no-store" }).then((response) => response.json()).then((result: { data: GalleryItem[] }) => setItems(result.data)).catch(() => setErrorMessage("Unable to load gallery.")).finally(() => setIsLoading(false));
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (!supportedImageExtensions.includes(extension)) {
      setSelectedFile(null);
      setPreview("");
      setSuccessMessage("");
      setErrorMessage(`Only supported: ${supportedImageTypes}`);
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleAdd = async () => {
    if (!selectedFile) return;

    setIsPosting(true);
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("title", title);
      formData.append("description", description);
      const response = await fetch("/api/gallery", { method: "POST", body: formData });
      const result = await response.json() as { data?: GalleryItem; message?: string };
      if (!response.ok || !result.data) throw new Error(result.message ?? "Unable to add image.");
      setItems((currentItems) => [result.data as GalleryItem, ...currentItems]);
      setTitle("");
      setDescription("");
      setSelectedFile(null);
      setPreview("");
      if (imageInputRef.current) imageInputRef.current.value = "";
      setSuccessMessage("Image added");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to add image.");
    } finally {
      setIsPosting(false);
    }
  };

  const handleDelete = (id: string) => {
    fetch("/api/gallery", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
      .then(async (response) => {
        if (!response.ok) throw new Error("Delete failed");
        const result = await fetch("/api/gallery", { cache: "no-store" }).then((galleryResponse) => galleryResponse.json()) as { data: GalleryItem[] };
        setItems(result.data);
      })
      .catch(() => setErrorMessage("Unable to delete image."));
  };

  return (
    <section className="bg-white rounded-xl border border-[#E4EAEE] p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-lg bg-[#3EB489]/10 flex items-center justify-center">
          <ImagePlus className="w-5 h-5 text-[#3EB489]" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#1E2A33]">Gallery</h2>
          <p className="text-sm text-[#8295a3]">Add and manage pictures shown on the public Gallery page.</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] mb-6">
        <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Picture title" className="px-3 py-2 border border-[#E4EAEE] rounded-lg text-sm bg-[#F7FAFB] focus:outline-none focus:ring-2 focus:ring-[#1A8FA3]" />
        <input value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Picture description" className="px-3 py-2 border border-[#E4EAEE] rounded-lg text-sm bg-[#F7FAFB] focus:outline-none focus:ring-2 focus:ring-[#1A8FA3]" />
        <label className="flex cursor-pointer items-center rounded-lg border border-dashed border-[#1A8FA3]/50 bg-[#F7FAFB] px-3 py-2 text-sm text-[#1A8FA3]">
          <span className="truncate">{selectedFile?.name ?? "Choose picture"}</span>
          <input ref={imageInputRef} type="file" accept={supportedImageExtensions.join(",")} onChange={handleFileChange} className="sr-only" />
        </label>
        <button type="button" onClick={handleAdd} disabled={!selectedFile || isPosting} className="rounded-lg bg-[#0B3D5C] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1A8FA3] disabled:cursor-not-allowed disabled:opacity-50">{isPosting ? "Posting..." : "Post Picture"}</button>
      </div>
      {successMessage && <p role="status" className="mb-6 text-sm font-medium text-[#3EB489]">{successMessage}</p>}
      {errorMessage && <p role="alert" className="mb-6 text-sm font-medium text-red-500">{errorMessage}</p>}

      {preview && <Image src={preview} alt="Selected gallery preview" width={160} height={100} unoptimized className="mb-6 h-24 w-40 rounded-lg object-cover" />}

      {isLoading && <p className="text-sm text-[#8295a3]">Loading gallery...</p>}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.id} className="group relative overflow-hidden rounded-lg border border-[#E4EAEE]">
            <Image src={item.image} alt={item.title} width={240} height={160} unoptimized className="aspect-[3/2] w-full object-cover" />
            <div className="flex items-center justify-between gap-2 p-2">
              <div className="min-w-0"><p className="truncate text-sm font-medium text-[#1E2A33]">{item.title}</p><p className="truncate text-xs text-[#8295a3]">{item.description}</p></div>
              <button type="button" onClick={() => setPendingDelete(item)} aria-label={`Delete ${item.title}`} className="shrink-0 rounded p-1 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {pendingDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="delete-gallery-title">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <h2 id="delete-gallery-title" className="text-lg font-bold text-[#1E2A33]">Are you sure you want to delete this image?</h2>
            <p className="mt-2 truncate text-sm text-[#8295a3]">{pendingDelete.title}</p>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setPendingDelete(null)} className="rounded-lg border border-[#E4EAEE] px-4 py-2 text-sm font-medium text-[#1E2A33] transition-colors hover:bg-[#F7FAFB]">Cancel</button>
              <button type="button" onClick={() => { handleDelete(pendingDelete.id); setPendingDelete(null); }} className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600">OK</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
