import GalleryManager from "@/components/admin/GalleryManager";

export default function AdminGalleryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1E2A33]">Gallery</h1>
        <p className="mt-1 text-[#8295a3]">Post pictures and manage the content shown on the public Gallery page.</p>
      </div>
      <GalleryManager />
    </div>
  );
}
